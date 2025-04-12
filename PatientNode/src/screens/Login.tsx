import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { handlerLogin } from '../services/APiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import { navigate } from '../navigation/RootNavigation';

const Login = ({ navigation }: any) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('refreshToken');

      if (token) {
        try {
          const decoded = jwtDecode(token);
          const now = Date.now() / 1000;

          if (decoded.exp && decoded.exp > now) {
            // Token còn hiệu lực → vào Home
            navigate('Home');
            return;
          }
        } catch (error) {
          console.log('Decode error:', error);
        }
      }

      // Token không có hoặc hết hạn → vào Login
      navigate('Login');
    };

    checkToken();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/patient.png')} style={styles.logo} />
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
        maxLength={25}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
       <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() =>{
        console.log('phone:', phone);
        console.log('password:', password);
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
    alignItems: 'center',
    backgroundColor: '#F5F9FF',
  },
  logo: {
    width: '70%',
    height:'50%',
    aspectRatio: 1,
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3A7BD5',
    textAlign: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    borderColor: '#3A7BD5',
    textAlign: 'auto',
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
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginRight: '10%',
    marginBottom: 15,
  },
  forgotPasswordText: {
    color: '#3A7BD5',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
export default Login;
