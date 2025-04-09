import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();
let pendingNotification: { screen: string; params?: object } | null = null;

export function navigate(name: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  } else {
    pendingNotification = { screen: name, params };
  }
}


export function handlePendingNotification() {
  if (navigationRef.isReady() && pendingNotification) {
    navigationRef.navigate(
      pendingNotification.screen as never,
      pendingNotification.params as never
    );
    pendingNotification = null;
  }
}