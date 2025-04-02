import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { accelerometer, gyroscope, setUpdateIntervalForType, SensorTypes } from "react-native-sensors";

// Cài đặt tần số lấy dữ liệu (100ms)
setUpdateIntervalForType(SensorTypes.accelerometer, 100);
setUpdateIntervalForType(SensorTypes.gyroscope, 100);

const CRASH_THRESHOLD = 30; // Ngưỡng phát hiện tai nạn (gia tốc lớn bất thường)

const GetSensorData = () => {
    const [accelData, setAccelData] = useState({ x: 0, y: 0, z: 0 });
    const [gyroData, setGyroData] = useState({ x: 0, y: 0, z: 0 });
    const [deltaAccel, setDeltaAccel] = useState();
    const [deltaGyro, setDeltaGyro] = useState();

    useEffect(() => {
        const accelSubscription = accelerometer.subscribe(({ x, y, z }) => {
            const delta = Math.sqrt(
                Math.pow(x - accelData.x, 2) +
                Math.pow(y - accelData.y, 2) +
                Math.pow(z - accelData.z, 2)
            );
            setDeltaAccel(delta);
            if (delta > CRASH_THRESHOLD) {
                Alert.alert("Cảnh báo!", "Tai nạn có thể đã xảy ra!");
            }

            setAccelData({ x, y, z });
        });

        const gyroSubscription = gyroscope.subscribe(({ x, y, z }) => {
            const deltaGyro = Math.sqrt(
                Math.pow(x - gyroData.x, 2) +
                Math.pow(y - gyroData.y, 2) +
                Math.pow(z - gyroData.z, 2)
            );
            setDeltaGyro(deltaGyro)
            if (deltaGyro > 5) {
                Alert.alert("Chuyển động mạnh phát hiện!");
            }
            setGyroData({ x, y, z });
        });

        return () => {
            accelSubscription.unsubscribe();
            gyroSubscription.unsubscribe();
        };
    }, [accelData, gyroData]);

    return (
        <View style={{ padding: 20 }}>
            <Text>Ứng dụng phát hiện tai nạn đang chạy...</Text>
            <Text>Gia tốc kế: x: {accelData.x.toFixed(2)}, y: {accelData.y.toFixed(2)}, z: {accelData.z.toFixed(2)}</Text>
            <Text>Delta Gia tốc kế: {deltaAccel}</Text>
            <Text>Con quay hồi chuyển: x: {gyroData.x.toFixed(2)}, y: {gyroData.y.toFixed(2)}, z: {gyroData.z.toFixed(2)}</Text>
            <Text>Delta Con quay hồi chuyển: {deltaGyro}</Text>
        </View>
    );
};

export default GetSensorData;
