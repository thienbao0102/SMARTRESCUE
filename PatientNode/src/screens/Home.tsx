import { Button, View } from 'react-native';
import React , { useState } from 'react';
import LoadMap from '../components/LoadMap';
import GetCurrentLocation from '../components/GetLocation';

const Home = ({ navigation }) => {
  const [location, setLocation] = useState({
    latitude: 10.7769,
    longitude: 106.7009,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  return (
    <View style={{flex:1}}>
      <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
      <GetCurrentLocation location={location} setLocation={setLocation}/>
      <LoadMap region={location} setRegion={setLocation}/>
    </View>
  );
};

export default Home;
