import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { handlerLogin, checkToken } from '../services/HandlerDataFromSever';

const Login = () => {
  const navigation = useNavigation();
  const [credentials, setCredentials] = useState({
    phoneNumber: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    phoneNumber: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Kiểm tra token khi mở màn hình
  useEffect(() => {
    checkToken();
  }, []);

  const validateForm = () => {
    let valid = true;
    const newErrors = { phoneNumber: '', password: '' };

    if (!credentials.phoneNumber) {
      newErrors.phoneNumber = 'Vui lòng nhập số điện thoại';
      valid = false;
    } else if (!/^\d{10}$/.test(credentials.phoneNumber)) {
      newErrors.phoneNumber = 'Số điện thoại phải có 10 chữ số';
      valid = false;
    }

    if (!credentials.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
      valid = false;
    } else if (credentials.password.length < 8) {
      newErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const result = await handlerLogin(credentials.phoneNumber, credentials.password);

      if (result?.success) {
        // Đăng nhập thành công, chuyển đến màn hình chính
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        // Hiển thị thông báo lỗi từ server
        Alert.alert('Lỗi đăng nhập', result?.message || 'Đăng nhập thất bại');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Lỗi', 'Đã có lỗi xảy ra khi đăng nhập');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    // Clear error khi người dùng bắt đầu nhập
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/patient.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Đăng Nhập</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, errors.phoneNumber && styles.inputError]}
          placeholder="Số điện thoại"
          value={credentials.phoneNumber}
          onChangeText={(text) => handleInputChange('phoneNumber', text)}
          keyboardType="phone-pad"
          maxLength={10}
          autoCapitalize="none"
        />
        {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          placeholder="Mật khẩu"
          value={credentials.password}
          onChangeText={(text) => handleInputChange('password', text)}
          secureTextEntry
          maxLength={25}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      </View>

      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>Đăng ký tài khoản</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.linkText}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Đăng Nhập</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3A7BD5',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#3A7BD5',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  linkText: {
    color: '#3A7BD5',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#3A7BD5',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Login;