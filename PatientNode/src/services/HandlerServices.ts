import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import GetLocation from 'react-native-get-location';

//hàm yêu cầu cấp quyền
export async function getLocationPermission() {
    let permissionGranted = false;

    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'Please allow location permission to continue...',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Location permission granted');
                if (Platform.Version >= 30) {
                    const backgroundGranted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION
                    );
                    if (backgroundGranted !== PermissionsAndroid.RESULTS.GRANTED) {
                        // Chuyển người dùng đến Settings để cấp thủ công
                        Linking.openSettings();
                        Alert.alert(
                            'Yêu cầu quyền',
                            'Bạn cần cấp quyền truy cập vị trí "Luôn cho phép" trong cài đặt.'
                        );
                    }
                }
                permissionGranted = true;
            } else {
                console.warn('Location permission denied');
                permissionGranted = false;
            }
        } catch (error) {
            console.error('Permission error:', error);
            permissionGranted = false;
        }
    }

    return permissionGranted;
};

//hàm lấy vị trí hiện tại
export async function getCurrentLocation() {
    const permissionGranted = await PermissionsAndroid.check( //hàm kiểm tra quyền
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION
    );
    // console.log('permissionGranted:', permissionGranted);
    if (!permissionGranted) {
        console.warn('Location permission is not granted.');
        return;
    }

    try {
        const location = await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        });

        const currentLocation = {
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        };

        return currentLocation;
    } catch (error: any) {
        const { code, message } = error;
        console.warn(`Location error [${code}]: ${message}`);
        return null;
    }
};

//hàm lấy vị trí hiện tại
// function getCurrentLocation() {
//   if (permissionGranter) { // Kiểm tra nếu đã được cấp quyền
//     Geolocation.getCurrentPosition(
//       position => {
//         console.log(position);
//         setLocation(position); // Cập nhật vị trí vào state
//       },
//       (error) => {
//         console.log('Error:', error.code, error.message);
//         console.warn(error);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//   } else {
//     console.warn("Location permission is not granted");
//   }
// }

//hàm tính khoảng cách giữa 2 vị trí sử dụng công thức Haversine
export function haversineDistance(lat1 :number, lon1 :number, lat2 :number, lon2 :number) {
    const toRad = (x: number) => (x * Math.PI) / 180; // hàm chuyển đổi đơn vị từ độ qua Rad

    const R = 6371e3;
    const latRad1 = toRad(lat1);
    const latRad2 = toRad(lat2);
    const deltaLatRad = toRad(lat2 - lat1);
    const deltaLonRad = toRad(lon2 - lon1);

    const a = Math.sin(deltaLatRad / 2) * Math.sin(deltaLatRad / 2) +
        Math.cos(latRad1) * Math.cos(latRad2) *
        Math.sin(deltaLonRad / 2) * Math.sin(deltaLonRad / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    console.log('Distance:', distance); // log khoảng cách
    return distance;
}