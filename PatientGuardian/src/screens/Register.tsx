import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IPV4 } from '../services/HandlerDataFromSever';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigation = useNavigation();
    const handleRegister = async () => {
        if (!fullName || !phoneNumber || !password || !confirmPassword) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
            return;
        }
        try {
            const response = await fetch(`http://${IPV4}:8000/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName,
                    phoneNumber,
                    password,
                }),
            });

            const data = await response.json();
            console.log('Dữ liệu nhận được từ API:', data);

            if (response.status === 201) {
                Alert.alert('Thành công', `Chào mừng, ${data.user.fullName}!`);
                // Lưu thông tin user vào AsyncStorage hoặc state management
                // data.user._id sẽ là string
                navigation.navigate('Home', { userId: data.user._id, userRole: data.user.userRole });
            } else {
                Alert.alert('Lỗi', data.message || 'Đăng ký thất bại');
            }
        } catch (error) {
            console.error('Lỗi kết nối:', error);
            Alert.alert('Lỗi', 'Không thể kết nối đến máy chủ');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng ký tài khoản</Text>

            <TextInput
                style={styles.input}
                placeholder="Họ và tên"
                value={fullName}
                onChangeText={setFullName}
            />

            <TextInput
                style={styles.input}
                placeholder="Số điện thoại"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                maxLength={10}
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Xác nhận lại mật khẩu"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />


            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Đăng ký</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
