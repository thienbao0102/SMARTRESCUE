import { Button, Text, View } from 'react-native';
import React from 'react';

const Login = ({ navigation }) => {
  return (
    <View>
      <Text>Login</Text>
      <Text>Login</Text>
      <Text>Login</Text>
      <Text>Login</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      </View>
  )
}

export default Login;
