import React, { useState, useEffect } from 'react';
import MapView, { Marker, Polyline  } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-gesture-handler';
// import MapViewDirections from 'react-native-maps-directions';

const LoadMap = ({ region, setRegion }) => {
  const [routeCoords, setRouteCoords] = useState([]);
  const marker = {
    latitude: 10.823171225464137,
    longitude: 106.69345779879565,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  useEffect(() => {
    const getRoute = async () => {
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${region.longitude},${region.latitude};${marker.longitude},${marker.latitude}?overview=full&geometries=geojson`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.routes.length > 0) {
          const coords = data.routes[0].geometry.coordinates.map(coord => ({
            latitude: coord[1],
            longitude: coord[0],
          }));
          setRouteCoords(coords);
        }
      } catch (error) {
        console.error('Lỗi lấy dữ liệu tuyến đường:', error);
      }
    };

    getRoute();
  }, [region]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRegion(prevRegion => ({
        ...prevRegion,
        latitude: prevRegion.latitude, // Cập nhật vị trí (ví dụ: dịch chuyển một chút)
        longitude: prevRegion.longitude,
      }));
    }, 15000); // 15 giây

    return () => clearInterval(interval); // Xóa interval khi component unmount
  }, []);

  return (
    <>
      <Text>Hello Map</Text>
      <MapView
        style={styles.map}
        provider="google"
        region={region} // Bản đồ thay đổi khi `region` thay đổi
        // onRegionChangeComplete={(newRegion) => { setRegion(newRegion)}} // Cập nhật state khi di chuyển bản đồ
      >
        <Marker coordinate={{
          latitude: region.latitude,
          longitude: region.longitude,
          latitudeDelta: region.latitudeDelta,
          longitudeDelta: region.longitudeDelta
        }}></Marker>
        <Marker coordinate={{
          latitude: marker.latitude,
          longitude: marker.longitude,
          latitudeDelta: region.latitudeDelta,
          longitudeDelta: region.longitudeDelta
        }}></Marker>
        {/* <MapViewDirections
          origin={region}
          destination={marker}
          apikey={'AIzaSyBENojg59fFBnDQ9VaE-LnGxoXO68xuTGE'}
          strokeWidth={3}
          strokeColor="blue"
          onError={(errorMessage) => console.log("Directions API Error:", errorMessage)}
        /> */}
        {/* Vẽ đường đi */}
        {routeCoords.length > 0 && (
          <Polyline coordinates={routeCoords} strokeWidth={4} strokeColor="blue" />
        )}
      </MapView >
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    position: 'relative',
    height: '50%',
  },
});

export default LoadMap;
