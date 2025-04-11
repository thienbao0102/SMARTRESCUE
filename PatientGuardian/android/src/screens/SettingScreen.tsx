import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SettingScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    console.log('Đăng xuất được gọi');

    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Đăng xuất', style: 'destructive', onPress: () => navigation.replace('Login') }
      ]
    );
  };
  console.log('SettingScreen rendered');


  return (
    <View style={styles.container}>
      {/* Header với nút back */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#2E86C1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cài đặt</Text>
     {/* Placeholder để căn giữa title */}
        <View style={{ width: 24 }} />

      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Các mục cài đặt */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('RegisterPatient')}
        >
          <Icon name="person-add" size={22} color="#2E86C1" style={styles.icon} />
          <Text style={styles.menuText}>Đăng ký bệnh nhân</Text>
          <Icon name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('PatienManager')}
        >
          <Icon name="group" size={22} color="#2E86C1" style={styles.icon} />
          <Text style={styles.menuText}>Quản lý bệnh nhân</Text>
          <Icon name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Profile')}
        >
          <Icon name="account-circle" size={22} color="#2E86C1" style={styles.icon} />
          <Text style={styles.menuText}>Hồ sơ cá nhân</Text>
          <Icon name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>

        {/* Phần ngăn cách */}
        <View style={styles.divider} />

        {/* Nút đăng xuất */}
        <TouchableOpacity 
          style={[styles.menuItem, styles.logoutItem]} 
          onPress={handleLogout}
        >
          <Icon name="exit-to-app" size={22} color="#e74c3c" style={styles.icon} />
          <Text style={[styles.menuText, { color: '#e74c3c' }]}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
  },
  content: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  icon: {
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  divider: {
    height: 1,
    backgroundColor: '#eeeeee',
    marginVertical: 16,
  },
  logoutItem: {
    backgroundColor: '#fff8f8',
    borderColor: '#ffdddd',
    borderWidth: 1,
  },
});
