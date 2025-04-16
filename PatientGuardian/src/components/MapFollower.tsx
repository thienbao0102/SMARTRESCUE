// components/MapFollower.js
import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const MapFollower = ({ location, name = 'Vị trí bệnh nhân', direction }) => {
  const mapRef = useRef(null);

  // Dùng useEffect để animate đến vị trí mới
  useEffect(() => {
    console.log('location:', location);
    if (mapRef.current && location) {
      mapRef.current.animateToRegion(
        {
          latitude: !direction ?location.latitude : direction.at(0).latitude,
          longitude: !direction? location.longitude : direction.at(0).longitude,
          latitudeDelta: location.latitudeDelta,
          longitudeDelta: location.longitudeDelta,
        },
        1000 // thời gian animation 1s
      );
    }
  }, [location, direction]);

  console.log('direction:', direction);
  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: location.latitudeDelta,
        longitudeDelta: location.longitudeDelta,
      }}
      showsUserLocation={true}
    >
      {!direction && (
        <Marker
          coordinate={location}
          title={name}
          description="Bệnh nhân đang ở đây"
          pinColor="red"
        />
      )}


      {direction && (
        <Marker
          coordinate={direction.at(0)}
          title="Vị trí bắt đầu"
          description="Vị trí bắt đầu của đường đi"
          pinColor="blue"
        />
      )}

      {direction && (
        <Marker
          coordinate={direction.at(-1)}
          title="Vị trí kết thúc"
          description="vị trí kết thúc của đường đi"
          pinColor="red"
        />
      )}

      {direction && (
        <Polyline
          coordinates={direction}
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
