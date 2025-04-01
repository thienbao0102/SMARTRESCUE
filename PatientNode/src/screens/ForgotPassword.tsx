import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native';
import React, { useState } from 'react';

const ForgotPassword = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = () => {
    if (!phone) {
      Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
      return;
    }
    // Xử lý logic reset mật khẩu ở đây
    Alert.alert('Thành công', 'Mật khẩu đã được đặt lại');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/forgotpassword.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Đặt Lại Mật Khẩu</Text>

      <TextInput
        style={styles.input}
        placeholder="Số điện thoại đăng ký"
        value={phone}
        maxLength={10}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu mới"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Xác nhận mật khẩu"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleResetPassword}
      >
        <Text style={styles.buttonText}>Xác Nhận</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backLink}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backLinkText}>← Quay lại đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F9FF',
    padding: 20,
  },
  logo: {
    width: "100%",
    height: "50%",
    marginBottom: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#3A7BD5',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    borderColor: '#3A7BD5',
  },
  button: {
    backgroundColor: '#3A7BD5',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backLink: {
    marginTop: 20,
  },
  backLinkText: {
    color: '#3A7BD5',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default ForgotPassword;