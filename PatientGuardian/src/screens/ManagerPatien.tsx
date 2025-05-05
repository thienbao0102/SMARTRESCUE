import React, { useState, useEffect } from 'react';
import { 
  View, FlatList, Text, TouchableOpacity, 
  StyleSheet, Image, TextInput, ActivityIndicator, 
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeaderPatient from '../components/HeaderPatient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPV4 } from '../services/HandlerDataFromSever';

const PatientManagementScreen = ({ navigation }) => {
  const [patients, setPatients] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchPatients = async () => {
    setRefreshing(true);
    try {
      const userData = JSON.parse(await AsyncStorage.getItem('userData'));
      const response = await fetch(`http://${IPV4}:8000/by-relative/${userData._id}`);
      const data = await response.json();
      
      setPatients(data.map(p => ({
        id: p._id,
        name: p.name,
        age: p.age,
        phone: p.phoneNumber,
        condition: p.diseaseDescription,
        avatar: `https://i.pravatar.cc/150?u=${p.phoneNumber}`,
        lastCheck: 'Vừa xong',
      })));
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tải danh sách bệnh nhân');
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const deletePatient = async (id) => {
    try {
      const response = await fetch(`http://${IPV4}:8000/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setPatients(patients.filter(patient => patient.id !== id));
      } else {
        throw new Error('Xóa thất bại');
      }
    } catch (error) {
      Alert.alert('Lỗi', error.message);
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.patientCard}
      onPress={() => navigation.navigate('PatientDetail', { patient: item })}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.patientInfo}>
        <Text style={styles.patientName}>{item.name}</Text>
        <View style={styles.detailRow}>
          <Text style={styles.patientDetail}>Tuổi: {item.age}</Text>
          <Text style={styles.patientDetail}>SDT: {item.phone}</Text>
        </View>
        {item.condition && (
          <Text style={styles.conditionText}>Tình trạng: {item.condition}</Text>
        )}
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
      <HeaderPatient 
        title="Quản lý Bệnh Nhân" 
        iconName="arrow-left" 
        onNotificationPress={() => navigation.goBack()} 
        notificationCount={undefined} 
      />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm bệnh nhân..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <Icon name="search" size={24} color="#666666" style={styles.searchIcon} />
      </View>

      {refreshing && !searchText ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2E86C1" />
        </View>
      ) : (
        <FlatList
          data={filteredPatients}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          refreshing={refreshing}
          onRefresh={fetchPatients}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Không tìm thấy bệnh nhân nào</Text>
          }
        />
      )}

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
    paddingBottom: 80,
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
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  patientDetail: {
    fontSize: 14,
    color: '#666666',
  },
  conditionText: {
    fontSize: 13,
    color: '#e74c3c',
    fontStyle: 'italic',
    marginTop: 3,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});

export default PatientManagementScreen;