import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { handlerLogin } from '../services/HandlerDataFromSever';

const Login = ({ navigation }:any) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/patient.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Đăng Nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        value={phone}
        maxLength={10}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        maxLength={20}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.regisforgot}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerText}>Đăng ký tài khoản</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => {
        handlerLogin(phone, password);
        // navigation.navigate('Home');
      }}>
        <Text style={styles.buttonText}>Đăng Nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  logo: {
    width: '70%',
    height: "50%",
    aspectRatio: 1,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3A7BD5',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#3A7BD5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  regisforgot: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  registerText: {
    color: '#3A7BD5',
    fontSize: 14,
  },
  forgotPasswordText: {
    color: '#3A7BD5',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#3A7BD5',
    padding: 12,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Login;