import { Dispatch, SetStateAction } from "react";
import { PermissionsAndroid, Platform } from 'react-native';
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
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    console.log('permissionGranted:', permissionGranted);
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
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        };
        console.log('Current location:', currentLocation);
        return currentLocation;
    } catch (error: any) {
        const { code, message } = error;
        console.warn(`Location error [${code}]: ${message}`);
        return [];
    }
};

//lấy đường đi từ vị trí hiện tại đến vị trí bệnh nhân
export async function getRoute(region, location, setDirection: Dispatch<SetStateAction<any>>) {
    try {
        const url = `https://router.project-osrm.org/route/v1/driving/${region.longitude},${region.latitude};${location.longitude},${location.latitude}?overview=full&geometries=geojson`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.routes.length > 0) {
            const coords = data.routes[0].geometry.coordinates.map(coord => ({
                latitude: coord[1],
                longitude: coord[0],
            }));
            setDirection(coords);
        }
    } catch (error) {
        console.error('Lỗi lấy dữ liệu tuyến đường:', error);
    }
};