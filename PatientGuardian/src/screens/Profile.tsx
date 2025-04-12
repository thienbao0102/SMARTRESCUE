import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

const Profile = ({ navigation }) => {
  // Dữ liệu mẫu
  const profileData = {
    name: "Dr. Nguyễn Văn A",
    position: "Người quản lý AA",
    city: "Hồ Chí Minh",
    email: "dr.nguyenvana@example.com",
    phone: "0912 345 678",
    stats: {
      patients: 42,
      alerts: 5,
      activeCases: 8,
    },
  };

  const activities = [
    { id: 1, action: "Đã xử lý cảnh báo", patient: "Nguyễn Thị B", time: "2 giờ trước" },
    { id: 2, action: "Đã thêm bệnh nhân mới", patient: "Trần Văn C", time: "Hôm nay, 09:30" },
    { id: 3, action: "Đã cập nhật hồ sơ", patient: "Lê Thị D", time: "Hôm qua, 16:45" },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#2E86C1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hồ sơ cá nhân</Text>
       
         {/* Placeholder for alignment */}
         <View style={{ width: 24 }} />
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=11' }} 
          style={styles.avatar}
        />
        <Text style={styles.name}>{profileData.name}</Text>
        <Text style={styles.position}>{profileData.position}</Text>
        <Text style={styles.hospital}>{profileData.city}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{profileData.stats.patients}</Text>
            <Text style={styles.statLabel}>Bệnh nhân</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{profileData.stats.alerts}</Text>
            <Text style={styles.statLabel}>Cảnh báo</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{profileData.stats.activeCases}</Text>
            <Text style={styles.statLabel}>Ca đang theo dõi</Text>
          </View>
        </View>
      </View>

      {/* Contact Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>
        <View style={styles.infoItem}>
          <Icon name="email" size={20} color="#666" />
          <Text style={styles.infoText}>{profileData.email}</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="phone" size={20} color="#666" />
          <Text style={styles.infoText}>{profileData.phone}</Text>
        </View>
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
              <Text style={styles.activityPatient}>{activity.patient}</Text>
              <Text style={styles.activityTime}>{activity.time}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
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
