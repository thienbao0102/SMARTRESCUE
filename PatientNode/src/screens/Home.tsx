import { Button, StyleSheet, View } from 'react-native';
import React , { useState } from 'react';
// import LoadMap from '../components/LoadMap';
// import GetCurrentLocation from '../components/GetLocation';
// import GetSensorData from '../components/GetSensorData';
// import { Text } from 'react-native-gesture-handler';
import Header from '../components/Header';
import HealthMetrics from '../components/HealthMetrics';

const Home = ({ navigation }) => {
  // const [location, setLocation] = useState({
  //   latitude: 10.7769,
  //   longitude: 106.7009,
  //   latitudeDelta: 0.05,
  //   longitudeDelta: 0.05,
  // });
  return (
    <View style={styles.container}>
      <Header patientName="Nguyen Van AA" />
      <HealthMetrics heartRate={102} spo2={97} bloodPressure="120/80" />
      {/* <GetCurrentLocation location={location} setLocation={setLocation}/>
      <LoadMap region={location} setRegion={setLocation}/>
      <GetSensorData/> */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
