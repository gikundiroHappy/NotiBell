// src/services/notifications.ts
import * as Notifications from 'expo-notifications';
import { AndroidNotificationPriority } from 'expo-notifications';

export const setupPushNotifications = async () => {
  // Request permissions
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    console.log('Permission to receive notifications was denied');
    return;
  }

  // Configure how notifications are handled when app is in foreground
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  // Configure notification appearance
  await Notifications.setNotificationChannelAsync('doorbell', {
    name: 'Doorbell Notifications',
    importance: Notifications.AndroidImportance.HIGH,
    sound: 'default',
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FF231F7C',
  });
};

export const sendLocalNotification = async (title: string, body: string) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
    },
    trigger: {
      channelId: 'doorbell',
      seconds: 0,
    }, // Send immediately on the specified channel
  });
};