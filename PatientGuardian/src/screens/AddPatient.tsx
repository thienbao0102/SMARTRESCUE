import React, { useState } from 'react';
import { 
  View, ScrollView, Text, TextInput, 
  TouchableOpacity, StyleSheet, Alert, ActivityIndicator 
} from 'react-native';
import HeaderPatient from '../components/HeaderPatient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPV4 } from '../services/HandlerDataFromSever';

const AddPatientScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    phone: '',
    condition: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.age || !form.phone) {
      Alert.alert('Lỗi', 'Vui lòng điền các trường bắt buộc');
      return;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      Alert.alert('Lỗi', 'Số điện thoại phải có 10 chữ số');
      return;
    }

    setIsLoading(true);
    try {
      const userData = JSON.parse(await AsyncStorage.getItem('userData'));
      
      const response = await fetch(`http://${IPV4}:8000/patient/register-by-relative`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          age: parseInt(form.age),
          phoneNumber: form.phone,
          password: Math.random().toString(36).slice(-8), // Random password
          diseaseDescription: form.condition,
          relativeId: userData._id
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Thêm bệnh nhân thất bại');

      Alert.alert('Thành công', 'Đã thêm bệnh nhân mới', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Lỗi', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderPatient 
        title="Thêm Bệnh Nhân" 
        iconName="arrow-left" 
        onNotificationPress={() => navigation.goBack()} 
        notificationCount={undefined} 
      />
      
      <ScrollView contentContainerStyle={styles.formContainer}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2E86C1" />
          </View>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Họ và tên</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập họ tên"
            value={form.name}
            onChangeText={(text) => setForm({...form, name: text})}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tuổi</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập tuổi"
            keyboardType="numeric"
            value={form.age}
            onChangeText={(text) => setForm({...form, age: text})}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Số điện thoại</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập số điện thoại"
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={(text) => setForm({...form, phone: text})}
            maxLength={10}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tình trạng bệnh</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập tình trạng"
            value={form.condition}
            onChangeText={(text) => setForm({...form, condition: text})}
          />
        </View>

        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.submitText}>LƯU THÔNG TIN</Text>
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
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#2E86C1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    zIndex: 1000,
  },
});

export default AddPatientScreen;
