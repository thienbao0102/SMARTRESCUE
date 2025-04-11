import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';


const Header = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* TIeu de */}
      {/* <Text style={styles.appName}>PatientNode</Text> */}
      <Image source={require('../assets/images/logo1.png')} style={styles.logo} />
      <View style={styles.profileContainer}>
        {/* Avatar & Ten */}
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../assets/images/avatar.png')}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },
  logo:{
    height: 70,
    width: 70,
    borderRadius: 40,
  },
});

export default Header;
