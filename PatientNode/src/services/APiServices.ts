import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { navigate } from "../navigation/RootNavigation";

const IPV4 = '192.168.0.100';
//API gửi thông báo đển người thân khi có sự cố xảy ra với người dùng
export async function sendWarning() {
    const relativeId = '12345'; // ID của người thân
    const accessToken = await AsyncStorage.getItem("accessToken");

    fetch(`http://${IPV4}:8000/warning/${relativeId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: 'Warning: High temperature detected!',
        }),
    })
        .then(response => {
            if (response.status === 401 || response.status === 403) {
                refreshAccessToken(sendWarning);
                return;
            }
            return response.json();
        })
        .then(data => {
            if (!data) return;
            console.log('Warning sent successfully:', data);
        })
        .catch(error => {
            // tránh truy cập .stack trực tiếp
            console.error('Error sending warning:', error?.message ?? error);
            console.log('Full error object:', JSON.stringify(error, null, 2));
        });
}

//API cập nhật vị trí mới của patient lên server
export async function updateLocation(location: any) {
    if (location === null) return;
    const user = await AsyncStorage.getItem("patientUser");
    const patient = user ? JSON.parse(user) : null;
    const patientId = patient ? patient._id : null;
    const accessToken = await AsyncStorage.getItem("accessToken");

    const currentLocation = {
        type: "Point",
        coordinates: [location.latitude, location.longitude]
    };
    console.log('currentLocation:', currentLocation);
    console.log('patientId:', patientId);

    fetch(`http://${IPV4}:8000/updateLocation/${patientId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            location: currentLocation,
        }),
    })
        .then(response => {
            if (response.status === 401 || response.status === 403) {
                refreshAccessToken(() => updateLocation(location));
                return;
            }
            return response.json();
        })
        .then(data => {
            if (!data) return;
            console.log('Location from sever', data.location);
        })
        .catch(error => {
            console.error('Error sending warning:', error?.message ?? error);
            console.log('Full error object:', JSON.stringify(error, null, 2));
        });
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
            await AsyncStorage.setItem("patientUser", JSON.stringify(data.user));
            console.log('Access token:', await AsyncStorage.getItem("accessToken"));
            console.log('Refresh token:', await AsyncStorage.getItem("refreshToken"));
            console.log('User:', await AsyncStorage.getItem("patientUser"));
        })
        .catch(error => {
            console.error('Error sending warning:', error?.message ?? error);
            console.log('Full error object:', JSON.stringify(error, null, 2));
        });
}

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