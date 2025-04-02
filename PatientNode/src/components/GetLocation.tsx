import React, { useState, useEffect } from 'react';
import { View, Text, Button, PermissionsAndroid, Platform } from 'react-native';
// import Geolocation from 'react-native-geolocation-service';
import GetLocation from 'react-native-get-location';


const GetCurrentLocation = ({location, setLocation}) => {
  const [permissionGranter, setPermissionGranter] = useState(false);

  //gọi cấp quyền khi bắt đầu chạy ứng dụng
  useEffect(() => {
    _getLocationPermission();
  }, []);

  //hàm yêu cầu cấp quyền
  async function _getLocationPermission() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Please Allow Location permission to continue..',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.warn('You can use the Location');
          setPermissionGranter(true);
        } else {
          console.warn('Location permission denied');
          setPermissionGranter(false);
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }

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
  //hàm lấy vị trí hiện tại
  function getCurrentLocation() {
    if (permissionGranter) {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      })
        .then(location => {
          console.log("current location:", location);
          setLocation(prevLocation => ({
            ...prevLocation,
            latitude: location.latitude,
            longitude: location.longitude,
          }));
        })
        .catch(error => {
          const { code, message } = error;
          console.warn(code, message);
        });
    }
  }

  return (
    <View>
      <Button title="Lấy vị trí" onPress={getCurrentLocation} />
      {location && (
        <Text>Vị trí: {location.longitude}, {location.latitude}</Text>
      )}
    </View>
  );
};

export default GetCurrentLocation;
