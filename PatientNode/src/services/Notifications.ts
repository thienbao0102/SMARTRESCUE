import { Notifications } from 'react-native-notifications';
import { PermissionsAndroid, Platform, Alert } from 'react-native';

// Đăng ký khi app khởi động
export const registerNotificationEvents = () => {
  Notifications.registerRemoteNotifications();

  Notifications.events().registerNotificationReceivedForeground((notification, completion) => {
    console.log("Thông báo khi đang foreground:", notification.payload);
    completion({ alert: true, sound: true, badge: false });
  });

  Notifications.events().registerNotificationOpened((notification, completion) => {
    console.log("Thông báo được nhấn:", notification.payload);
    completion();
  });
};

// Gửi thông báo local
export const sendLocalNotification = () => {
  Notifications.postLocalNotification({
    title: "Cảnh báo",
    body: "Chúng tôi phát hiện bạn có thể gặp sự cố. Bạn ổn chứ?",
    silent: false,
    category: "SOME_CATEGORY",
    payload: { type: "warning" }
  }as any);
};

// Yêu cầu cấp quyền thông báo
// Chỉ cần gọi hàm này một lần khi ứng dụng khởi động
export const requestNotificationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) { // Android 13+
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: "Quyền thông báo",
            message: "Ứng dụng cần quyền gửi thông báo để cảnh báo sự cố.",
            buttonNeutral: "Hỏi lại sau",
            buttonNegative: "Từ chối",
            buttonPositive: "Đồng ý"
          }
        );
  
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Quyền thông báo đã được cấp");
        } else {
          console.log("Quyền thông báo bị từ chối");
          Alert.alert("Chú ý", "Bạn đã từ chối nhận thông báo. Một số chức năng có thể không hoạt động.");
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };