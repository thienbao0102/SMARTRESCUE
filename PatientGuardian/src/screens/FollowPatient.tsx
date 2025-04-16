// screens/FollowPatient.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MapFollower from '../components/MapFollower';
import ViewHistoryButton from '../components/ViewHistoryButton';
import { getLocationPatient, getRoadHistoryPatient } from '../services/HandlerDataFromSever';
import DropdownModal from '../components/PickerCustom';
import ViewDirectionButton from '../components/ViewDirectionButton';
import { getCurrentLocation, getRoute } from '../services/HandlerService';

const FollowPatient = ({ route, navigation }: any) => {
  const { patientId } = route.params;
  console.log('patientId:', patientId);
  const [dataFromSever, setDataFromSever] = useState([]); // Dữ liệu từ server
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [direction, setDirection] = useState([]); // Lịch sử đường đi
  const [showRoadHistoryOfDay, setShowRoadHistoryOfDay] = useState(false); //show hộp chọn ngày
  const [selectedDate, setSelectedDate] = useState(''); //ngày đã chọn

  //goi api lay vi tri hien tai cua benh nhan va lich su di chuyen
  useEffect(() => {
    getLocationPatient(patientId, setCurrentLocation);
    getRoadHistoryPatient(patientId, setDataFromSever);
  }, []);

  //tạo mảng chứa các ngày của lịch sử đường đi
  const availableDates = dataFromSever.map(item => ({
    label: item.date,
    value: item.date,
  }));
  console.log('availableDates:', availableDates);

  //Lọc dữ liệu theo ngày đã chọn
  useEffect(() => {
    const filterPathByDate = () => {
      if (!selectedDate) return; // Nếu không có ngày đã chọn thì không làm gì cả
      const historyForDate = dataFromSever.find(item => item.date === selectedDate);

      if (historyForDate) {
        const convertedPath = historyForDate.path.map((point: any) => ({
          latitude: point.coordinates[1],
          longitude: point.coordinates[0],
        }));
        console.log('convertedPath:', convertedPath);
        setDirection(convertedPath);
      } else {
        setDirection([]); // nếu không có path thì để trống
      }
    };
    filterPathByDate();
  }, [dataFromSever, selectedDate]);

  return (
    <View style={styles.container}>
      {/* Nút back */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="#fff" />
        <Text style={styles.backText}>Quay lại</Text>
      </TouchableOpacity>

      {/* nut xem duong di */}
      <ViewDirectionButton onPress={async()=>{
        const region = await getCurrentLocation();
        console.log('region:', region);
        getRoute(region, currentLocation, setDirection);
        console.log('direction getRoute:', direction);
      }}/>

      {/* Nút xem lịch sử */}
      <ViewHistoryButton onPress={() => setShowRoadHistoryOfDay(true)} />

      {/* Chọn ngày xem lịch sử */}
      {showRoadHistoryOfDay && (
        <DropdownModal
          visible={showRoadHistoryOfDay}
          onClose={() => setShowRoadHistoryOfDay(false)}
          data={availableDates}
          onSelect={(item: string) => {
            setSelectedDate(item);
            setShowRoadHistoryOfDay(false);
          }}
        />
      )}

      {/* Bản đồ */}
      <MapFollower
        location={currentLocation}
        direction={direction.length > 0 ? direction : undefined} // Nếu không có đường đi thì không truyền vào prop direction
      />
    </View>
  );
};

export default FollowPatient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    backgroundColor: '#2E86C1',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    zIndex: 3,
  },
  backText: {
    color: '#ffffff',
    marginLeft: 6,
    fontSize: 16,
  },
});
