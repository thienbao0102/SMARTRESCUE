import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeaderPatient from '../components/HeaderPatient';

const PatientDetailScreen = ({ route, navigation }: any) => {
  const { patient } = route.params;

  return (
    <View style={styles.container}>
      <HeaderPatient
        notificationCount={0}
        iconName="arrow-left"
        onNotificationPress={() => navigation.goBack()} title={undefined} />

      <ScrollView>
        <View style={styles.card}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
            style={styles.avatarLarge}
          />
          <Text style={styles.name}>{patient.name}</Text>
          {/* tuổi */}
          <View style={styles.detailRow}>
            <Icon name="person" size={20} color="red" />
            <Text style={styles.detailText}>Tuổi: {patient.age}</Text>
          </View>
          {/* số điện thoại */}
          <View style={styles.detailRow}>
            <Icon name="phone" size={20} color="red" />
            <Text style={styles.detailText}>STD: {patient.phoneNumber} </Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="health-and-safety" size={20} color="red" />
            <Text style={styles.detailText}>Bệnh: {patient.diseaseDescription} </Text>
          </View>
          {/* dia chi */}
          <View style={styles.detailRow}>
            <Icon name="location-on" size={20} color="#2E86C1" />
            <Text style={styles.detailText}>{patient.location}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.locationButton}
          onPress={() => navigation.navigate('FollowPatient', { patientId: patient._id })}
        >
          <Text style={styles.emergencyText}>Xem vị trí bệnh nhân</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  avatarLarge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 16,
  },
  locationButton: {
    backgroundColor: '#2EC17CFF',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  emergencyText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default PatientDetailScreen;
