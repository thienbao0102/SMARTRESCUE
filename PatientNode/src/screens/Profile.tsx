import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ProfileProps = {
  name: string;
  age: number;
  phoneNumber: string;
  diseaseDescription: string;
  prioritize: string;
  relatives: string[];
}


const  Profile = ({ navigation}: any) => {

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileProps>();

  useEffect(() => {
    const getDataStorage = async () => {
      const user = await AsyncStorage.getItem('patientUser');
      if (user) {
        const patient = JSON.parse(user);
        setProfile({
          name: patient.name,
          age: patient.age,
          phoneNumber: patient.phoneNumber,
          diseaseDescription: patient.diseaseDescription,
          prioritize: patient.prioritize,
          relatives: patient.relatives,
        });
      }
    }

    getDataStorage();
  },[]);


  const handleSave = () => {
    setIsEditing(false);
    // Thêm logic lưu dữ liệu vào API ở đây
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#3A7BD5" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hồ Sơ Cá Nhân</Text>
        {isEditing ? (
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveButton}>Lưu</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Ionicons name="pencil" size={20} color="#3A7BD5" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.avatarContainer}>
        <Image
          source={require('../assets/images/avatar.png')}
          style={styles.avatar}
        />
        {isEditing && (
          <TouchableOpacity style={styles.changeAvatarBtn}>
            <Text style={styles.changeAvatarText}>Đổi ảnh</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.profileSection}>
        <ProfileField
          label="Họ và tên"
          value={profile?.name}
          editable={isEditing}
          onChangeText={(text: string) => setProfile({ ...profile, name: text })}
        />
        <ProfileField
          label="Tuổi"
          value={profile?.age.toString()}
          editable={isEditing}
          keyboardType="numeric"
          onChangeText={(text: string) => setProfile({ ...profile, age: parseInt(text) || 0 })}
        />
        <ProfileField
          label="Số điện thoại"
          value={profile?.phoneNumber}
          editable={isEditing}
          keyboardType="phone-pad"
          onChangeText={(text: string) => setProfile({ ...profile, phoneNumber: text })}
        />
        <ProfileField
          label="Mô tả bệnh"
          value={profile?.diseaseDescription}
          editable={isEditing}
          multiline
          onChangeText={(text: string) => setProfile({ ...profile, diseaseDescription: text })}
        />
        <ProfileField
          label="Người thân ưu tiên"
          value={profile?.prioritize}
          editable={isEditing}
          onChangeText={(text: string) => setProfile({ ...profile, prioritize: text })}
        />
        <ProfileField
          label="Người thân"
          value={profile?.relatives.join(', ')}
          editable={isEditing}
          onChangeText={(text: string) =>
            setProfile({ ...profile, relatives: text.split(',').map((id) => id.trim()) })
          }
        />
      </View>

    </ScrollView>
  );
};

const ProfileField = ({ label, value, editable, onChangeText, ...props }) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {editable ? (
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          {...props}
        />
      ) : (
        <Text style={styles.fieldValue}>{value}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F9FF',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3A7BD5',
  },
  saveButton: {
    color: '#3A7BD5',
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#3A7BD5',
  },
  changeAvatarBtn: {
    marginTop: 10,
  },
  changeAvatarText: {
    color: '#3A7BD5',
    textDecorationLine: 'underline',
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 5,
  },
  fieldValue: {
    fontSize: 16,
    color: '#333333',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  input: {
    fontSize: 16,
    color: '#333333',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#3A7BD5',
  },
});

export default Profile;