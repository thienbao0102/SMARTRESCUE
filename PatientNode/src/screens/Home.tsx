import { Button, View } from 'react-native';
import React from 'react';
import LoadMap from '../components/LoadMap';

const Home = ({ navigation }) => {
  return (
    <View style={{flex:1}}>
      <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
      <LoadMap/>
    </View>
  );
};

export default Home;
