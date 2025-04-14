import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation, route }) => {
  const [profileData, setProfileData] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu profile từ AsyncStorage hoặc từ route params
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Thử lấy từ route.params trước (nếu điều hướng từ màn hình khác có truyền data)
        if (route.params?.userData) {
          setProfileData(route.params.userData);
        } else {
          // Nếu không có thì lấy từ AsyncStorage
          const userData = await AsyncStorage.getItem('userData');
          if (userData) {
            setProfileData(JSON.parse(userData));
          }
        }
        
        // TODO: Gọi API để lấy activities gần đây nếu cần
        setActivities([
          { id: 1, action: "Đã đăng nhập hệ thống", time: "Hôm nay" },
          // Thêm các activities khác từ API
        ]);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        Alert.alert('Lỗi', 'Không thể tải thông tin hồ sơ');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        { text: 'Hủy', style: 'cancel' },
        { 
          text: 'Đăng xuất', 
          style: 'destructive', 
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userData');
              await AsyncStorage.removeItem('accessToken');
              navigation.replace('Login');
            } catch (error) {
              console.error('Lỗi khi đăng xuất:', error);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Đang tải thông tin...</Text>
      </View>
    );
  }

  if (!profileData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Không tìm thấy thông tin người dùng</Text>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.loginText}>Đăng nhập lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#2E86C1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hồ sơ cá nhân</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Image
          source={{ uri: profileData.avatar || 'https://i.pravatar.cc/150?img=11' }} 
          style={styles.avatar}
        />
        <Text style={styles.name}>{profileData.fullName || 'Chưa cập nhật'}</Text>
        <Text style={styles.position}>{profileData.position || 'Người dùng hệ thống'}</Text>
        <Text style={styles.hospital}>{profileData.city || 'Chưa cập nhật'}</Text>

        {/* Có thể thêm các thống kê nếu cần */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Hoạt động</Text>
          </View>
        </View>
      </View>

      {/* Contact Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>
        <View style={styles.infoItem}>
          <Icon name="phone" size={20} color="#666666" />
          <Text style={styles.infoText}>{profileData.phoneNumber || 'Chưa cập nhật'}</Text>
        </View>
        {profileData.email && (
          <View style={styles.infoItem}>
            <Icon name="email" size={20} color="#666666" />
            <Text style={styles.infoText}>{profileData.email}</Text>
          </View>
        )}
      </View>

      {/* Recent Activities */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hoạt động gần đây</Text>
        {activities.map((activity) => (
          <View key={activity.id} style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Icon name="notifications" size={18} color="#2E86C1" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityAction}>{activity.action}</Text>
              {activity.patient && (
                <Text style={styles.activityPatient}>{activity.patient}</Text>
              )}
              <Text style={styles.activityTime}>{activity.time}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#2E86C1',
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  profileCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    margin: 16,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#2E86C1',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  position: {
    fontSize: 16,
    color: '#2E86C1',
    marginBottom: 3,
  },
  hospital: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E86C1',
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
  },
  section: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 10,
    padding: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333333',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#333333',
  },
  activityItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e8f4fc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityAction: {
    fontSize: 14,
    color: '#333333',
  },
  activityPatient: {
    fontSize: 13,
    color: '#2E86C1',
    marginVertical: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#999999',
  },
  settingsText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: '#333333',
  },
  logoutButton: {
    backgroundColor: '#ffffff',
    padding: 16,
    margin: 16,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    borderColor: 'red',
    borderWidth: 1,
  },
  logoutText: {
    color: 'red',
    fontWeight: 'bold',
  },
});
