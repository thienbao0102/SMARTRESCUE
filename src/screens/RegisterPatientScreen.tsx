import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ScrollView
} from 'react-native';
import { patients } from '../data/patient';
import HeaderPatient from '../components/HeaderPatient';
import uuid from 'react-native-uuid'; // Thư viện tạo UUID, bạn có thể cài đặt bằng lệnh: npm install react-native-uuid

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

  const handleRegister = () => {
    const { username, password, confirmPassword } = account;
    const { name, age, phone, location } = info;

    if (!username || !password || !confirmPassword || !name || !age || !phone || !location) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
      return;
    }

    //  Lưu bệnh nhân mới
    const newPatient = {
      id: uuid.v4().toString(),
      username,
      password,
      name,
      age,
      phone,
      location,
      avatar: 'https://i.pravatar.cc/150?img=14',
      lastCheck: 'Chưa theo dõi',
      heartRate: 0,
      spO2: 0,
      bloodPressure: '---',
      city: 'Không rõ',
      latitude: 10.762622,
      longitude: 106.660172,
    };

    patients.push(newPatient);

    Alert.alert('Thành công', 'Tài khoản đã được đăng ký');
    navigation.navigate('PatientManagement');
  };

  return (
    <View style={styles.container}>
      <HeaderPatient
              title="Đăng Ký Tài Khoản Bệnh Nhân"
              iconName="arrow-left"
              onNotificationPress={() => navigation.goBack()} notificationCount={undefined}      />

      <ScrollView contentContainerStyle={styles.formContainer}>
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
        />
        <TextInput
          style={styles.input}
          placeholder="Địa chỉ"
          value={info.location}
          onChangeText={(text) => setInfo({ ...info, location: text })}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>ĐĂNG KÝ</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default RegisterPatientScreen;

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
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});
