import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ForgotPassword from '../screens/ForgotPassword';
import Login from '../screens/Login';
import Profile from '../screens/Profile';
import HomeScreen from '../screens/HomeScreen';
import Register from '../screens/Register';
import PatientDetailScreen from '../screens/PatientDetailScreen';
import FollowPatient from '../screens/FollowPatient';
import AddPatientScreen from '../screens/AddPatient';
import SettingScreen from '../screens/SettingScreen';
import PatientManagementScreen from '../screens/ManagerPatien';
import RegisterPatientScreen from '../screens/RegisterPatientScreen';
import { navigationRef } from './RootNavigation';

const Stack = createStackNavigator();
const StackNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="PatienManager" component={PatientManagementScreen} />
        <Stack.Screen name="RegisterPatient" component={RegisterPatientScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="FollowPatient" component={FollowPatient} />
        <Stack.Screen name="PatientDetail" component={PatientDetailScreen} />
        <Stack.Screen name="AddPatient" component={AddPatientScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
