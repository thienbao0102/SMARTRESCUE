// screens/FollowPatient.js
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MapFollower from '../components/MapFollower';
import ViewHistoryButton from '../components/ViewHistoryButton';
import { patients } from '../data/patient';

const FollowPatient = ({ route, navigation }) => {
  const { patientId } = route.params;

  const patient = patients.find(p => p.id === patientId);

  const currentLocation = {
    latitude: patient?.latitude || 0,
    longitude: patient?.longitude || 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const [showHistory, setShowHistory] = useState(false);

  // Vị trí trước đó giả lập (ví dụ cách 0.01 độ)
  const previousLocation = {
    latitude: currentLocation.latitude - 0.01,
    longitude: currentLocation.longitude - 0.01,
  };

  return (
    <View style={styles.container}>
      {/* Nút back */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="#fff" />
        <Text style={styles.backText}>Quay lại</Text>
      </TouchableOpacity>

      {/* Nút xem lịch sử */}
      <ViewHistoryButton onPress={() => setShowHistory(!showHistory)} />

      {/* Bản đồ */}
      <MapFollower
        location={currentLocation}
        name={patient?.name}
        historyLocation={showHistory ? previousLocation : null}
      />
    </View>
  );
};

export default FollowPatient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    backgroundColor: '#2E86C1',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    zIndex: 3,
  },
  backText: {
    color: '#ffffff',
    marginLeft: 6,
    fontSize: 16,
  },
});
