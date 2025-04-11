import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { chatsList } from '@/app/constants/chat';
import { formatDate, formatTime } from '@/app/Utils/dateUtils';
import { router } from 'expo-router';

const Index = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [doorbellStatus, setDoorbellStatus] = useState('active');

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const goToNotifications = () => {
    router.navigate('/(root)/(tabs)/chat');
  };

  const goToChat = (chatId: string) => {
    router.navigate(`/pages/chatDetail?chatId=${chatId}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <View className="px-4 py-4 flex-row justify-between items-center border-b border-gray-100">
        <View>
          <Text className="text-lg font-poppins-semibold text-gray-800">
            Welcome Home
          </Text>
          <Text className="text-sm font-poppins-regular text-gray-500">
            Monitor your doorbell activity
          </Text>
        </View>
        <TouchableOpacity
          className="h-10 w-10 bg-gray-100 rounded-full items-center justify-center"
          onPress={() => router.navigate('/(root)/(tabs)/profile')}
        >
          <Ionicons name="person-outline" size={20} color="#12A08A" />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#12A08A']}
          />
        }
      >
        <View className="mx-4 mt-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <View className="px-4 py-4 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View
                className={`h-3 w-3 rounded-full ${
                  doorbellStatus === 'active' ? 'bg-green-600' : 'bg-red-500'
                }`}
              />
              <Text className="ml-2 font-poppins-medium text-gray-800">
                Doorbell System{' '}
                {doorbellStatus === 'active' ? 'Active' : 'Inactive'}
              </Text>
            </View>
            <MaterialIcons name="doorbell" size={24} color="#12A08A" />
          </View>

          <View className="bg-gray-50 px-4 py-3">
            <Text className="text-xs font-poppins-regular text-gray-500">
              Last checked: {new Date().toLocaleTimeString()}
            </Text>
          </View>
        </View>

        <View className="mx-4 mt-6">
          <Text className="font-poppins-medium text-gray-800 mb-3">
            Quick Actions
          </Text>
          <View className="flex-row justify-between">
            <View className="bg-[#12A08A] py-4 px-4 rounded-xl flex-1 mr-3 shadow-sm">
              <MaterialIcons name="meeting-room" size={24} color="white" />
              <Text className="text-white font-poppins-medium mt-2">
                Open Door
              </Text>
              <Text className="text-white text-xs opacity-80 mt-1">
                Send "Opening door" message
              </Text>
            </View>

            <View className="bg-gray-100 py-4 px-4 rounded-xl flex-1 shadow-sm">
              <Ionicons name="chatbubble-outline" size={24} color="#12A08A" />
              <Text className="text-gray-800 font-poppins-medium mt-2">
                Respond
              </Text>
              <Text className="text-gray-500 text-xs mt-1">
                Send a custom message
              </Text>
            </View>
          </View>
        </View>

        <View className="mx-4 mt-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="font-poppins-medium text-gray-800">
              Recent Activity
            </Text>
            <TouchableOpacity onPress={goToNotifications}>
              <Text className="text-[#12A08A] font-poppins-regular">
                See all
              </Text>
            </TouchableOpacity>
          </View>

          {chatsList.filter((item) => !item.read).length > 0 ? (
            chatsList
              .filter((item) => !item.read)
              .sort(
                (a, b) =>
                  new Date(b.time).getTime() - new Date(a.time).getTime()
              )
              .slice(0, 3)
              .map((item) => (
                <TouchableOpacity
                  key={item.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 mb-3 overflow-hidden"
                  onPress={() => goToChat(String(item.id))}
                >
                  <View className="p-4 flex-row items-center">
                    <View className="bg-gray-100 h-10 w-10 rounded-full items-center justify-center mr-3">
                      <MaterialIcons
                        name="doorbell"
                        size={20}
                        color="#12A08A"
                      />
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
                      <Text className="text-gray-500 mt-1" numberOfLines={1}>
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
              ))
          ) : (
            <View className="bg-gray-50 rounded-xl p-6 items-center">
              <MaterialIcons
                name="notifications-none"
                size={40}
                color="#12A08A"
              />
              <Text className="text-gray-500 text-center mt-2 font-poppins-regular">
                No recent doorbell activity
              </Text>
            </View>
          )}
        </View>

        <View className="mx-4 mt-6 mb-28">
          <Text className="font-poppins-medium text-gray-800 mb-3">
            System Status
          </Text>
          <View className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <View className="p-4">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="font-poppins-regular text-gray-800">
                  Battery Level
                </Text>
                <View className="flex-row items-center">
                  <Ionicons
                    name="battery-charging-outline"
                    size={18}
                    color="#12A08A"
                  />
                  <Text className="ml-1 text-primary font-poppins-medium">
                    95%
                  </Text>
                </View>
              </View>
              <View className="flex-row justify-between items-center mb-3">
                <Text className="font-poppins-regular text-gray-800">
                  WiFi Connection
                </Text>
                <View className="flex-row items-center">
                  <Ionicons name="wifi-outline" size={18} color="#12A08A" />
                  <Text className="ml-1 text-primary font-poppins-medium">
                    Strong
                  </Text>
                </View>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="font-poppins-regular text-gray-800">
                  Notifications
                </Text>
                <View className="flex-row items-center">
                  <Ionicons
                    name="notifications-outline"
                    size={18}
                    color="#12A08A"
                  />
                  <Text className="ml-1 text-primary font-poppins-medium">
                    Enabled
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
