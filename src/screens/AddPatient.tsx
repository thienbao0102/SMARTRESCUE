import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import HeaderPatient from '../components/HeaderPatient';
import { patients } from '../data/patient';

const AddPatientScreen = ({ navigation }) => {
  const [form, setForm] = useState({ id: '', name: '', age: '', condition: '', phone: '' });

  const handleSubmit = () => {
    if (!form.name || !form.age || !form.phone) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }
    patients.push({ ...form, avatar: 'https://i.pravatar.cc/150?img=8', lastCheck: 'Vừa xong' });
    Alert.alert('Thành công', 'Đã thêm bệnh nhân mới');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <HeaderPatient title="Thêm Bệnh Nhân" iconName="arrow-left" onNotificationPress={() => navigation.goBack()} notificationCount={undefined} />
      <ScrollView contentContainerStyle={styles.formContainer}>
        {['id', 'name', 'age', 'condition', 'phone'].map((field, index) => (
          <View style={styles.inputGroup} key={index}>
            <Text style={styles.label}>{field === 'id' ? 'Mã bệnh nhân' : field === 'name' ? 'Họ và tên' : field === 'age' ? 'Tuổi' : field === 'condition' ? 'Tình trạng' : 'Số điện thoại'}</Text>
            <TextInput
              style={styles.input}
              placeholder={`Nhập ${field}`}
              value={form[field]}
              onChangeText={(text) => setForm({ ...form, [field]: text })}
              keyboardType={field === 'age' ? 'numeric' : field === 'phone' ? 'phone-pad' : 'default'}
            />
          </View>
        ))}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
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
});

export default AddPatientScreen;
