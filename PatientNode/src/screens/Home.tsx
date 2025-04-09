import { Button, View } from 'react-native';
import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
// import ShowListHospital from '../components/ShowListHospital';
import { registerNotificationEvents, requestNotificationPermission } from '../services/Notifications';
import { startBackgroundTask, stopBackgroundTask } from '../services/ServiceRunBackground';
import { getLocationPermission } from '../services/HandlerServices';
import { showAlert } from '../services/GetDataSensors';

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
    <View style={{ flex: 1 }}>
      <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
      <Button title="Stop background running" onPress={() => stopBackgroundTask()} />
      {/* <ShowListHospital location={location} /> */}
    </View>
  );
};

export default Home;
