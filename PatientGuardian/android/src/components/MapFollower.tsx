// components/MapFollower.js
import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapFollower = ({ location, name = 'Vị trí bệnh nhân' }) => {
  return (
    <MapView
      style={styles.map}
      initialRegion={location}
      showsUserLocation={true}
    >
      <Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
        title={name}
        description="Bệnh nhân đang ở đây"
      />
    </MapView>
  );
};

export default MapFollower;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
