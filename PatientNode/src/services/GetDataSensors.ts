import { Alert, AppState } from "react-native";
import { accelerometer, gyroscope, setUpdateIntervalForType, SensorTypes } from "react-native-sensors";
import { sendLocalNotification } from "../services/Notifications";
import { sendWarning } from "../services/APiServices";

let currentAppState = AppState.currentState;

AppState.addEventListener('change', (nextAppState) => {
    currentAppState = nextAppState;
});

type SensorData = {
    x: number;
    y: number;
    z: number;
};

// Cài đặt tần số lấy dữ liệu (100ms)
const CRASH_THRESHOLD = 30; // Ngưỡng phát hiện tai nạn (gia tốc lớn bất thường)
const GYRO_THRESHOLD = 5; // Ngưỡng phát hiện chuyển động mạnh (con quay hồi chuyển lớn bất thường)
let currentDeltaAccel = 0;
let currentDeltaGyro = 0;
let accelData: SensorData = { x: 0, y: 0, z: 0 };
let gyroData: SensorData = { x: 0, y: 0, z: 0 };
let timeoutRef: any = null;
let isShowAlert = false; // Biến để theo dõi trạng thái hiển thị cảnh báo
let userResponded = false;

//hàm lấy dữ liệu cảm biến và thông báo khi có sự cố xảy ra
export async function getDataFromSensors() {
    setUpdateIntervalForType(SensorTypes.accelerometer, 200);
    setUpdateIntervalForType(SensorTypes.gyroscope, 200);

    accelerometer.subscribe(({ x, y, z }) => {
        currentDeltaAccel = Math.sqrt(
            Math.pow(x - accelData.x, 2) +
            Math.pow(y - accelData.y, 2) +
            Math.pow(z - accelData.z, 2)
        );
        accelData.x = x;
        accelData.y = y;
        accelData.z = z;
        showAlertNotifi(currentDeltaAccel, currentDeltaGyro);
    });

    gyroscope.subscribe(({ x, y, z }) => {
        currentDeltaGyro = Math.sqrt(
            Math.pow(x - gyroData.x, 2) +
            Math.pow(y - gyroData.y, 2) +
            Math.pow(z - gyroData.z, 2)
        );
        gyroData.x = x;
        gyroData.y = y;
        gyroData.z = z;
        showAlertNotifi(currentDeltaAccel, currentDeltaGyro);
    });

    return { accelData, gyroData };
}

//hàm delay 
const sleep = (time : any) => new Promise((resolve) => setTimeout(resolve, time));

//hàm xử lý gửi cảnh báo đến người thân khi người dùng không phản hồi trong 60 giây
async function showAlertNotifi(currentDeltaAccel: number, currentDeltaGyro: number) {
    if ((currentDeltaAccel < CRASH_THRESHOLD && currentDeltaGyro < GYRO_THRESHOLD) || isShowAlert) {
        return;
    }
    userResponded = false;
    isShowAlert = true;
    console.log('delta: ', currentDeltaAccel, " ; ", currentDeltaGyro);
    if (currentAppState === 'active') {
        // App đang mở, hiển thị Alert
        showAlert();
    } else {
        // App ở background, gửi notification
        sendLocalNotification();
    }

    await sleep(10000);
    if (!userResponded) {
        console.log('Không có phản hồi. Gửi cảnh báo...');
        sendWarning();
    }

    // isShowAlert = false;
}

export function showAlert() {
    Alert.alert(
        'Cảnh báo',
        'Chúng tôi phát hiện bạn có thể gặp sự cố. Bạn ổn chứ?',
        [
            {
                text: 'Tôi ổn',
                onPress: () => {
                    userResponded = true;
                    clearTimeout(timeoutRef);
                    isShowAlert = false;
                    console.log('User is fine');
                },
                style: 'cancel',
            },
        ],
        { cancelable: false }
    );
}
