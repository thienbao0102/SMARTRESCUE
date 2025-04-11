import { Button, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { registerNotificationEvents, requestNotificationPermission } from '../services/Notifications';
import { startBackgroundTask, stopBackgroundTask } from '../services/ServiceRunBackground';
import { getLocationPermission } from '../services/HandlerServices';
import { showAlert } from '../services/GetDataSensors';
import Header from '../components/Header';
import HealthMetrics from '../components/HealthMetrics';

const Home = ({ navigation }:any) => {
  const route = useRoute();
  // const [location, setLocation] = useState({
  //   latitude: 10.7769,
  //   longitude: 106.7009,
  //   latitudeDelta: 0.05,
  //   longitudeDelta: 0.05,
  // });

  //yêu cấp quyền thông báo và đăng ký lắng nghe thông báo
  useEffect(() => {
    requestNotificationPermission();// yêu cầu quyền thông báo
    registerNotificationEvents(); // đăng ký lắng nghe notification
    getLocationPermission(); // yêu cầu quyền truy cập vị trí
    startBackgroundTask();// khởi động dịch vụ chạy nền
    if ((route.params as any)?.fromNotification) {
      showAlert();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      {/* <Button title="stop Background Service" onPress={stopBackgroundTask} /> */}
      <HealthMetrics heartRate={102} spo2={97} bloodPressure="120/80" />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
