import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { patients as initialPatients } from '../data/patient';
import HeaderPatient from '../components/HeaderPatient';

const PatientManagementScreen = ({ navigation }) => {
  const [patients, setPatients] = useState(initialPatients);
  const [searchText, setSearchText] = useState('');

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const deletePatient = (id) => {
    setPatients(patients.filter(patient => patient.id !== id));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.patientCard}
      onPress={() => navigation.navigate('PatientDetail', { patient: item })}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.patientInfo}>
        <Text style={styles.patientName}>{item.name}</Text>
        <Text style={styles.patientDetail}>Tuổi: {item.age}</Text>
        <Text style={styles.lastCheck}>{item.lastCheck}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deletePatient(item.id)}
      >
        <Icon name="delete" size={24} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <HeaderPatient title="Quản lý Bệnh Nhân" iconName="arrow-left" onNotificationPress={() => navigation.goBack()} notificationCount={undefined} />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm bệnh nhân..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <Icon name="search" size={24} color="#666666" style={styles.searchIcon} />
      </View>

      <FlatList
        data={filteredPatients}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddPatient')}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    position: 'relative',
    margin: 15,
  },
  searchInput: {
    backgroundColor: '#ffffff',
    padding: 12,
    paddingLeft: 45,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dddddd',
    fontSize: 16,
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: 12,
  },
  listContainer: {
    paddingHorizontal: 15,
  },
  patientCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  patientDetail: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 3,
  },
  lastCheck: {
    fontSize: 12,
    color: '#2E86C1',
    marginTop: 5,
  },
  deleteButton: {
    padding: 10,
  },
  addButton: {
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  backText: {
    fontSize: 16,
    marginLeft: 6,
    color: '#2E86C1',
  },  
});

export default PatientManagementScreen;
