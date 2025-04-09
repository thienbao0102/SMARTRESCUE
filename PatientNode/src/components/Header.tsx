import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';


const Header = ({ patientName }) => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* TIeu de */}
      <Text style={styles.appName}>PatientNode</Text>
      <View style={styles.profileContainer}>
        {/* Avatar & Ten */}
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../assets/images/avatar.png')}
            style={styles.avatar}
          />
          <Text style={styles.patientName}>{patientName || 'Guest'}</Text>
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
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  patientName: {
    right: 25,
    paddingTop: 5,
    fontSize: 16,
  },
});

export default Header;
