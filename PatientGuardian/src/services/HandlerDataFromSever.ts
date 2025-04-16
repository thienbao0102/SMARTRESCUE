import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { Alert } from 'react-native';
import EventSource from 'react-native-sse';
import { navigate } from '../navigation/RootNavigation';
import { Dispatch, SetStateAction } from 'react';

export const IPV4 = '192.168.1.5';
const id = '64e8fa54b84c2b3d7e5abc10';

type Patient = {
    _id: string;
    name: string;
    age: number;
    phoneNumber: string;
    diseaseDescription: string;
}

//xử lý nhận cảnh báo từ sever gửi về
export async function reciveMessageWarning() {
    const accessToken = await AsyncStorage.getItem("accessToken")

    if (accessToken) {
        const decoded = jwtDecode(accessToken);
        const now = Date.now() / 1000;
        if (!decoded.exp || decoded.exp <= now) {
            refreshAccessToken(reciveMessageWarning);
            return;
        }
    }

    const source = new EventSource(`http://${IPV4}:8000/sendwarning/${id}`, {
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
export async function handlerLogin(phoneNumber: string, password: string) {
    if (phoneNumber.length !== 10 || password.length < 8) {
        Alert.alert("Lỗi", "Số điện thoại phải có 10 số và mật khẩu ít nhất 8 ký tự");
        return;
    }

    try {
        const response = await fetch(`http://${IPV4}:8000/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                phoneNumber : phoneNumber,
                password : password,
                userRole : 1,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Đăng nhập thất bại');
        }

        await Promise.all([
            AsyncStorage.setItem('accessToken', data.accessToken),
            AsyncStorage.setItem('refreshToken', data.refreshToken),
            AsyncStorage.setItem('userData', JSON.stringify(data.user)),
        ]);

        // Navigation sẽ được xử lý ở component
        return { success: true, user: data.user };

    } catch (error: any) {
        Alert.alert("Lỗi đăng nhập", error.message || 'Không thể kết nối đến server');
        return { success: false };
    }
}

//api lấy danh sách bệnh nhân theo id của người thân
export async function getListPatient(setData: Dispatch<SetStateAction<Patient[]>>) {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const getRelativesUser = await AsyncStorage.getItem("relativesUser");
    const relativesUser = JSON.parse(getRelativesUser);
    const listPatientsID = relativesUser.patients;
    console.log('Relatives user- patients:', listPatientsID);
    console.log('typeof listPatientsID:', typeof listPatientsID);

    if (listPatientsID.length === 0) {
        return;
    }

    fetch(`http://${IPV4}:8000/getInforPatients`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            listPatientId: listPatientsID,
        }),
    })
        .then(async (response) => {
            if (response.status === 401 || response.status === 403) {
                refreshAccessToken(() => getListPatient(setData));
                return;
            }
            return response.json();
        })
        .then(data => {
            if (!data) return;

            console.log('Patient list:', data);
            setData(data.listPatients);
        })
        .catch(error => {
            console.error('Error fetching patient list:', error);
        });
};

//api lấy location của bệnh nhân
export async function getLocationPatient(patientId: string, setLocation: Dispatch<SetStateAction<any>>) {
    const accessToken = await AsyncStorage.getItem("accessToken");
    // console.log('patientId:', patientId);

    fetch(`http://${IPV4}:8000/getLocation/${patientId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    })
        .then(async (response) => {
            if (response.status === 401 || response.status === 403) {
                refreshAccessToken(() => getLocationPatient(patientId, setLocation));
                return;
            }
            return response.json();
        })
        .then(data => {
            if (!data) return;
            setLocation((prev: any) => ({
                ...prev,
                latitude: data.location[1],
                longitude: data.location[0],
            })
            );
        })
        .catch(error => {
            console.error('Error fetching patient location:', error);
        });
};

//api lấy roadhistory của bệnh nhân
export async function getRoadHistoryPatient(patientId: string, setDataFromSever: Dispatch<SetStateAction<any>>) {
    const accessToken = await AsyncStorage.getItem("accessToken");

    fetch(`http://${IPV4}:8000/getRoadHistory/${patientId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    })
        .then(async (response) => {
            if (response.status === 401 || response.status === 403) {
                refreshAccessToken(() => getRoadHistoryPatient(patientId, setDataFromSever));
                return;
            }
            return response.json();
        })
        .then(data => {
            if (!data) return;
            console.log('Road history:', data);
            setDataFromSever(data.roadHistory);
        })
        .catch(error => {
            console.error('Error fetching patient road history:', error);
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

//Kiểm tra token có hợp lệ hay không
export async function checkToken() {
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