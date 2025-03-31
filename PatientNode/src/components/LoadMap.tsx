import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-gesture-handler';

const LoadMap = () => {
  const [region, setRegion] = useState({
    latitude: 10.7769,
    longitude: 106.7009,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  return (
    <>
      <Text>Hello Map</Text>
      <MapView
        style={styles.map}
        provider="google"
        region={region} // Bản đồ thay đổi khi `region` thay đổi
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)} // Cập nhật state khi di chuyển bản đồ
      />
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
