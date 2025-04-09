import BackgroundService from 'react-native-background-actions';
import { getDataFromSensors } from './GetDataSensors';
import { getCurrentLocation, haversineDistance } from './HandlerServices';
import { updateLocation } from './APiServices';

let runGetLocation = 0;
let lastedLocation:any = null;
// Hàm sleep để đợi một khoảng thời gian
const sleep = (time : any) => new Promise((resolve) => setTimeout(resolve, time));

const options = {
    taskName: 'SMARTRESCUE',
    taskTitle: 'Đang chạy nền',
    taskDesc: 'Theo dõi và cảm biến đang hoạt động...',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    parameters: {
        locationDelay: 5000,
        getDataSensorsDelay: 200,
    },
};

// Hàm này sẽ chạy trong background
const veryIntensiveTask = async () => { //taskDataArguments
    await new Promise(async () => {
        while (BackgroundService.isRunning()) {
            getDataFromSensors();
            runGetLocation++;
            // Gọi hàm lấy vị trí hiện tại
            if (runGetLocation === 15) {
                try {
                    const currentLocation = await getCurrentLocation();
                    if (!currentLocation) {
                        console.warn("Không lấy được vị trí!");
                        return;
                    }
                    console.log('currentLocation:', currentLocation);
                    if (lastedLocation === null) {
                        lastedLocation = currentLocation;
                        updateLocation(currentLocation);
                    } else {
                        const distance = haversineDistance(
                            lastedLocation?.latitude,
                            lastedLocation?.longitude,
                            currentLocation.latitude,
                            currentLocation.longitude
                        );

                        if (distance > 30) {
                            lastedLocation = currentLocation;
                            updateLocation(currentLocation);
                        }
                    }
                }
                catch (error) {
                    console.error('Error getting location:', error);
                }
                runGetLocation = 0;
            }
            await sleep(200);
        }
    });
};

// Hàm bắt đầu chạy background task
export const startBackgroundTask = async () => {
    if (!BackgroundService.isRunning()) {
        await BackgroundService.start(veryIntensiveTask, options);
    }
};

// Hàm đóng background task
export const stopBackgroundTask = async () => {
    await BackgroundService.stop();
};