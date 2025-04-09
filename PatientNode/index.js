/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Notifications } from 'react-native-notifications';
import { navigate } from './src/navigation/RootNavigation';

Notifications.events().registerNotificationOpened((notification, completion) => {
    console.log("Notification opened by device user", notification);
    navigate('Home', { fromNotification: true });
    completion();
  });
AppRegistry.registerComponent(appName, () => App);
