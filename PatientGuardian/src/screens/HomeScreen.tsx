import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AdminHeader from '../components/Header';
import PatientList from '../components/PatienList';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { reciveMessageWarning, getListPatient } from '../services/HandlerDataFromSever';
import { getLocationPermission } from '../services/HandlerService';

type Patient = {
  _id: string;
  name: string;
  age: number;
  phoneNumber: string;
  diseaseDescription: string;
}

const HomeScreen = ({ navigation }: any) => {
  const [listPatiens, setListPatiens] = useState<Patient[]>([]);

  useEffect(() => {
    reciveMessageWarning();
    getListPatient(setListPatiens);
    getLocationPermission();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <AdminHeader title="Trang chủ " notificationCount={1} onNotificationPress={() => { } } onBackPress={undefined} />
      <PatientList
        patients={listPatiens}
        onPressItem={(patient: any) =>
          navigation.navigate('PatientDetail', { patient })
        }
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {/* Setting */}
        <TouchableOpacity
          style={styles.set}
          onPress={() => navigation.navigate('Setting')}
        >
          <AntDesign name="setting" size={24} color="#ffffff" />
        </TouchableOpacity>
        {/* Add Patient */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AddPatient')}
        >
          <AntDesign name="adduser" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#2E86C1',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  set: {
    left: 20,
    bottom: 20,
    backgroundColor: '#2E86C1',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});
