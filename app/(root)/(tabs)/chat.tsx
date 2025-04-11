import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { chatData, chatsList } from '@/app/constants/chat';
import { formatTime, formatDate } from '@/app/Utils/dateUtils';
import { router } from 'expo-router';

const Chat = () => {
  const [chats, setChats] = useState<chatData[]>(chatsList);

  const todayChats = chats.filter((chat) => {
    const today = new Date();
    const chatDate = new Date(chat.time);
    return (
      chatDate.getDate() === today.getDate() &&
      chatDate.getMonth() === today.getMonth() &&
      chatDate.getFullYear() === today.getFullYear()
    );
  });

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const thisWeekChats = chats.filter((chat) => {
    const chatDate = new Date(chat.time);
    return chatDate > oneWeekAgo && !todayChats.includes(chat);
  });

  const earlierChats = chats.filter((chat) => {
    const chatDate = new Date(chat.time);
    return chatDate <= oneWeekAgo;
  });

  const hasNotifications =
    todayChats.length > 0 ||
    thisWeekChats.length > 0 ||
    earlierChats.length > 0;

  const goToChat = (chat: chatData) => {
    router.navigate(`/pages/chatDetail?chatId=${chat.id}`);
  };

  const NotificationItem = ({ item }: { item: chatData }) => (
    <TouchableOpacity
      key={item.id}
      className="bg-white rounded-xl shadow-sm border border-gray-100 mb-3 overflow-hidden"
      onPress={() => goToChat(item)}
    >
      <View className="p-4 flex-row items-center">
        <View className="bg-gray-100 h-10 w-10 rounded-full items-center justify-center mr-3">
          <MaterialIcons name="doorbell" size={20} color="#12A08A" />
        </View>
        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            <Text className="font-poppins-medium text-gray-800">
              Gate Doorbell
            </Text>
            <Text className="text-xs text-gray-500">
              {formatTime(new Date(item.time))}
            </Text>
          </View>
          <Text className="text-gray-500 mt-1" numberOfLines={2}>
            {item.message}
          </Text>
        </View>
        {!item.read && (
          <View className="ml-2 h-3 w-3 rounded-full bg-[#12A08A]" />
        )}
      </View>
      <View className="bg-gray-50 px-4 py-2">
        <Text className="text-xs font-poppins-regular text-gray-500">
          {formatDate(new Date(item.time))}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const EmptyNotifications = () => (
    <View className="p-8 items-center my-6 mx-4">
      <MaterialIcons name="notifications-none" size={48} color="#12A08A" />
      <Text className="text-gray-500 text-center mt-4 font-poppins-medium">
        No doorbell activity
      </Text>
      <Text className="text-gray-400 text-center mt-2 font-poppins-regular">
        You'll see visitor notifications here when someone rings your doorbell
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <View className="px-4 py-4 flex-row justify-between items-center border-b border-gray-100">
        <View className="flex-1">
          <Text className="text-lg font-poppins-semibold text-center text-gray-800">
            Visitor Notifications
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        {hasNotifications ? (
          <View className="px-4 py-6">
            {todayChats.length > 0 && (
              <View className="mt-2">
                <Text className="font-poppins-medium text-gray-800 mb-3">
                  Today's Doorbell
                </Text>
                {todayChats.map((chat) => (
                  <NotificationItem key={chat.id} item={chat} />
                ))}
              </View>
            )}

            {thisWeekChats.length > 0 && (
              <View className="mt-6">
                <Text className="font-poppins-medium text-gray-800 mb-3">
                  This Week's Doorbell
                </Text>
                {thisWeekChats.map((chat) => (
                  <NotificationItem key={chat.id} item={chat} />
                ))}
              </View>
            )}

            {earlierChats.length > 0 && (
              <View className="mt-6 mb-10">
                <Text className="font-poppins-medium text-gray-800 mb-3">
                  Earlier Doorbell Activity
                </Text>
                {earlierChats.map((chat) => (
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
