import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { formatTime, formatDate } from '@/app/Utils/dateUtils';
import { router } from 'expo-router';
import { Context, DoorbellEvent } from '@/app/Context/context';

const Chat = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('Context must be used within a Provider');
  }

  const { doorbellEvents, markAsRead } = context;

  const today = new Date();
  today.setHours(0, 0, 0, 0)

  const todayEvents = doorbellEvents.filter(event => {
    const eventDate = new Date(Number(event.timestamp) * 1000);
    return eventDate >= today;
  });

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const thisWeekEvents = doorbellEvents.filter(event => {
    const eventDate = new Date(Number(event.timestamp) * 1000);
    return eventDate >= oneWeekAgo && eventDate < today;
  });

  const earlierEvents = doorbellEvents.filter(event => {
    const eventDate = new Date(Number(event.timestamp) * 1000);
    return eventDate < oneWeekAgo;
  });

  const hasNotifications = doorbellEvents.length > 0;

  const goToChat = (event: DoorbellEvent) => {
    markAsRead(event.id);
    router.navigate(`/pages/chatDetail?eventId=${event.id}`);
  };

  const NotificationItem = ({ item }: { item: DoorbellEvent }) => (
    <TouchableOpacity
      key={item.id}
      className="bg-white dark:bg-bgnavy rounded-xl shadow-sm border border-gray-100 dark:border-borderdark mb-3 overflow-hidden"
      onPress={() => goToChat(item)}
    >
      <View className="p-4 flex-row items-center">
        <View className="bg-gray-100 dark:bg-bgdark h-10 w-10 rounded-full items-center justify-center mr-3">
          <MaterialIcons name="doorbell" size={20} color="#12A08A" />
        </View>
        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            <Text className="font-poppins-medium text-gray-800 dark:text-textdark">
              Gate Doorbell
            </Text>
            <Text className="text-xs text-gray-500 dark:text-textdark">
               {item.timestamp && formatTime(item.timestamp)}
            </Text>
          </View>
          <Text className="text-gray-500 mt-1" numberOfLines={2}>
            {item.message}
            {item.response && ` - Response: ${item.response}`}
          </Text>
        </View>
        {!item.read && (
          <View className="ml-2 h-3 w-3 rounded-full bg-[#12A08A]" />
        )}
      </View>
      <View className="bg-gray-50 dark:bg-borderdark px-4 py-2">
        <Text className="text-xs font-poppins-regular text-gray-500 dark:text-textdark">
          {item.timestamp && formatDate(item.timestamp)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const EmptyNotifications = () => (
    <View className="p-8 items-center my-6 mx-4">
      <MaterialIcons name="notifications-none" size={48} color="#12A08A" />
      <Text className="text-gray-500 text-center mt-4 font-poppins-medium dark:text-textdark">
        No doorbell activity
      </Text>
      <Text className="text-gray-400 text-center mt-2 font-poppins-regular">
        You'll see visitor notifications here when someone rings your doorbell
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-bgdark">
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <View className="px-4 py-4 flex-row justify-between items-center border-b border-gray-100 dark:border-borderdark">
        <View className="flex-1">
          <Text className="text-lg font-poppins-semibold text-center text-gray-800 dark:text-textdark">
            Visitor Notifications
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        {hasNotifications ? (
          <View className="px-4 py-6">
            {todayEvents.length > 0 && (
              <View className="mt-2">
                <Text className="font-poppins-medium text-gray-800 dark:text-textdark mb-3">
                  Today's Doorbell
                </Text>
                {todayEvents.map((chat) => (
                  <NotificationItem key={chat.id} item={chat} />
                ))}
              </View>
            )}

            {thisWeekEvents.length > 0 && (
              <View className="mt-6">
                <Text className="font-poppins-medium text-gray-800 dark:text-textdark mb-3">
                  This Week's Doorbell
                </Text>
                {thisWeekEvents.map((chat) => (
                  <NotificationItem key={chat.id} item={chat} />
                ))}
              </View>
            )}

            {earlierEvents.length > 0 && (
              <View className="mt-6 mb-10">
                <Text className="font-poppins-medium text-gray-800 dark:text-textdark mb-3">
                  Earlier Doorbell Activity
                </Text>
                {earlierEvents.map((chat) => (
                  <NotificationItem key={chat.id} item={chat} />
                ))}
              </View>
            )}
          </View>
        ) : (
          <View className="flex-1 justify-center" style={{ marginTop: 80 }}>
            <EmptyNotifications />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chat;
