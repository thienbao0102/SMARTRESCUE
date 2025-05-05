import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ScrollView,
  ActivityIndicator
} from 'react-native';
import HeaderPatient from '../components/HeaderPatient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPV4 } from '../services/HandlerDataFromSever';

const RegisterPatientScreen = ({ navigation }) => {
  const [account, setAccount] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [info, setInfo] = useState({
    name: '',
    age: '',
    phone: '',
    location: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    const { username, password, confirmPassword } = account;
    const { name, age, phone, location } = info;

    // Validate
    if (!username || !password || !confirmPassword || !name || !age || !phone) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      Alert.alert('Lỗi', 'Số điện thoại phải có 10 chữ số');
      return;
    }

    setIsLoading(true);
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (!userDataString) {
        throw new Error('User data not found in storage');
      }
      const userData = JSON.parse(userDataString);
      
      const response = await fetch(`http://${IPV4}:8000/register-by-relative`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          age: parseInt(age),
          phoneNumber: phone,
          password,
          diseaseDescription: location,
          relativeId: userData._id,
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Đăng ký thất bại');

      Alert.alert('Thành công', 'Đã thêm bệnh nhân mới', [
        { text: 'OK', onPress: () => navigation.navigate('PatientManagement') }
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
        title="Đăng Ký Tài Khoản Bệnh Nhân"
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

        <Text style={styles.sectionTitle}>Thông tin tài khoản</Text>
        <TextInput
          style={styles.input}
          placeholder="Tên đăng nhập"
          value={account.username}
          onChangeText={(text) => setAccount({ ...account, username: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry
          value={account.password}
          onChangeText={(text) => setAccount({ ...account, password: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Xác nhận mật khẩu"
          secureTextEntry
          value={account.confirmPassword}
          onChangeText={(text) => setAccount({ ...account, confirmPassword: text })}
        />

        <Text style={styles.sectionTitle}>Thông tin bệnh nhân</Text>
        <TextInput
          style={styles.input}
          placeholder="Họ và tên"
          value={info.name}
          onChangeText={(text) => setInfo({ ...info, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Tuổi"
          keyboardType="numeric"
          value={info.age}
          onChangeText={(text) => setInfo({ ...info, age: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          keyboardType="phone-pad"
          value={info.phone}
          onChangeText={(text) => setInfo({ ...info, phone: text })}
          maxLength={10}
        />
        <TextInput
          style={styles.input}
          placeholder="Địa chỉ/Mô tả bệnh"
          value={info.location}
          onChangeText={(text) => setInfo({ ...info, location: text })}
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleRegister}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>ĐĂNG KÝ</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  formContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#2E86C1',
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2E86C1',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    opacity: 1,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
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

export default RegisterPatientScreen;