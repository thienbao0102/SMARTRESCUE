
import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

const App = () => {
  const [region, setRegion] = useState({
    latitude: 10.7769,
    longitude: 106.7009,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  return (
    <View style={styles.container}>
    <MapView
      style={styles.map}
      provider="google"
      region={region} // Bản đồ thay đổi khi `region` thay đổi
      onRegionChangeComplete={(newRegion) => setRegion(newRegion)} // Cập nhật state khi di chuyển bản đồ
    />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;
