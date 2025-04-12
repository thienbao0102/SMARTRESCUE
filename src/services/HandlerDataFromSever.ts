import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { Alert } from 'react-native';
import EventSource from 'react-native-sse';
import { navigate } from '../navigation/RootNavigation';

const IPV4 = '192.168.1.5';
const id = '64e8fa54b84c2b3d7e5abc10';

//xử lý nhận cảnh báo từ sever gửi về
export async function reciveMessageWarning() {
    const accessToken = await AsyncStorage.getItem("accessToken")

    if(accessToken){
        const decoded = jwtDecode(accessToken);
        const now = Date.now() / 1000;
        if (!decoded.exp || decoded.exp <= now){
            refreshAccessToken(reciveMessageWarning);
            return;
        }
    }

    const source = new EventSource(`http://${IPV4}:8000/sendwarning/${id}`,{
        headers: {
          Authorization: `Bearer ${accessToken}`, // Gửi token vào header
        }
      });

    // Khi nhận được tin nhắn từ server
    source.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        console.log('Dữ liệu nhận được từ server:', data);

        // Xử lý dữ liệu như: hiển thị thông báo, điều hướng...
    });

    // source.open();
}

//API login
export function handlerLogin(phoneNumber: string, password: string) {
    if (phoneNumber.length !== 10 || password.length < 8 || password.length > 25) {
        Alert.alert("Thông báo", "Số điện thoại không hợp lệ hoặc mật khẩu không hợp lệ!",
            [
                {
                    text: 'oke',
                    style: 'cancel',
                },
            ],
            { cancelable: false }
        );
        return;
    }

    fetch(`http://${IPV4}:8000/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phoneNumber: phoneNumber,
            password: password,
            userRole: 0,
        }),
    })
        .then(async (response) => {
            if (response.status !== 200) {
                const errorData = await response.json();
                Alert.alert("Thông báo", errorData.message, [
                    {
                        text: 'oke',
                        style: 'cancel',
                    },
                ],
                    { cancelable: false }
                );
                return;
            }
            return response.json();
        })
        .then(async (data) => {
            if (!data) return;
            await AsyncStorage.setItem("accessToken", data.accessToken);
            await AsyncStorage.setItem("refreshToken", data.refreshToken);
            await AsyncStorage.setItem("relativesUser", JSON.stringify(data.user));
            console.log('Access token:', await AsyncStorage.getItem("accessToken"));
            console.log('Refresh token:', await AsyncStorage.getItem("refreshToken"));
            console.log('User:', await AsyncStorage.getItem("relativesUser"));
            navigate('Home');
        })
        .catch(error => {
            console.error('Error sending warning:', error?.message ?? error);
            console.log('Full error object:', JSON.stringify(error, null, 2));
        });
};

//access token hết hạn thì gọi api này để lấy access token mới
async function refreshAccessToken(callback = () => { }) {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    fetch(`http://${IPV4}:8000/refresh-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            refreshToken: refreshToken,
        }),
    })
        .then(async (response) => {
            if (!response.ok) {
                await AsyncStorage.removeItem("accessToken");
                await AsyncStorage.removeItem("refreshToken");
                Alert.alert("Thông Báo", "Phiên đăng nhập đã hết, vui lòng đăng nhập lại.",
                    [
                        {
                            text: 'Login',
                            onPress: () => { navigate('Login') },
                            style: 'cancel',
                        },
                    ],
                    { cancelable: false }
                );
                return;
            }
            return response.json();
        })
        .then(async (data) => {
            if (!data) return;
            console.log('Access token refreshed:', data.accessToken);
            await AsyncStorage.setItem("accessToken", data.accessToken);
            return callback();
        })
        .catch(error => {
            console.error('Error refreshing access token:', error);
        }
        );

};


export async function checkToken(){
    const token = await AsyncStorage.getItem('refreshToken');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decoded.exp && decoded.exp > now) {
          // Token còn hiệu lực → vào Home
          navigate('Home');
          return;
        }
      } catch (error) {
        console.log('Decode error:', error);
      }
    }

    // Token không có hoặc hết hạn → vào Login
    navigate('Login');
  };