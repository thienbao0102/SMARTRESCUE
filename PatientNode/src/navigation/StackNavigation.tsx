import { } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Profile from '../screens/Profile';
import ForgotPassword from '../screens/ForgotPassword';
import { handlePendingNotification, navigationRef } from './RootNavigation';

const Stack = createStackNavigator();
const StackNavigation = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      handlePendingNotification();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
