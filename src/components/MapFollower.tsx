// components/MapFollower.js
import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const MapFollower = ({ location, name = 'Vị trí bệnh nhân', historyLocation }) => {
  const path = historyLocation
    ? [historyLocation, location]
    : [location];

  return (
    <MapView
      style={styles.map}
      initialRegion={location}
      showsUserLocation={true}
    >
      <Marker
        coordinate={location}
        title={name}
        description="Bệnh nhân đang ở đây"
        pinColor="red"
      />

      {historyLocation && (
        <Marker
          coordinate={historyLocation}
          title="Vị trí trước đó"
          description="Vị trí cũ của bệnh nhân"
          pinColor="blue"
        />
      )}

      {historyLocation && (
        <Polyline
          coordinates={path}
          strokeColor="#2980B9"
          strokeWidth={4}
        />
      )}
    </MapView>
  );
};

export default MapFollower;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
