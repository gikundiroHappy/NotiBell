import React, { useContext, useState } from 'react';
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
import { formatDate, formatTime } from '@/app/Utils/dateUtils';
import { router } from 'expo-router';
import { Context } from '@/app/Context/context';

const Index = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [doorbellStatus, setDoorbellStatus] = useState('active');

  const context = useContext(Context);

  if (!context) {
    throw new Error('Context must be used within a Provider');
  }

  const { darkMode, doorbellEvents, markAsRead } = context;

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const goToNotifications = () => {
    router.navigate('/(root)/(tabs)/chat');
  };

  const unreadEvents = doorbellEvents.filter(event => !event.read);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-bgdark">
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <View className="px-4 py-4 flex-row justify-between items-center border-b border-gray-100 dark:border-borderdark">
        <View>
          <Text className="text-lg font-poppins-semibold text-gray-800 dark:text-textdark">
            Welcome Home
          </Text>
          <Text className="text-sm font-poppins-regular text-gray-500 dark:text-textdark">
            Monitor your doorbell activity
          </Text>
        </View>
        <TouchableOpacity
          className="h-10 w-10 bg-gray-100 dark:bg-bgnavy rounded-full items-center justify-center"
          onPress={() => router.navigate('/(root)/(tabs)/profile')}
        >
          <Ionicons
            name="person-outline"
            size={20}
            color={darkMode ? '#FFFFFF' : '#12A08A'}
          />
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
        <View></View> 

        <View className="mx-4 mt-6">
          <Text className="font-poppins-medium text-gray-800 dark:text-textdark mb-3">
            Quick Actions
          </Text>
          <View className="flex-row justify-between">
            <TouchableOpacity 
              className="bg-[#12A08A] py-4 px-4 rounded-xl flex-1 mr-3 shadow-sm"
            >
              <MaterialIcons name="meeting-room" size={24} color="white" />
              <Text className="text-white font-poppins-medium mt-2">
                Open Door
              </Text>
              <Text className="text-white text-xs opacity-80 mt-1">
                Send "Turaje Dufungure" message
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="bg-gray-100 dark:bg-bgnavy py-4 px-4 rounded-xl flex-1 shadow-sm"
              onPress={() => router.navigate('/(root)/(tabs)/chat')}
            >
              <Ionicons name="chatbubble-outline" size={24} color="#12A08A" />
              <Text className="text-gray-800 dark:text-textdark font-poppins-medium mt-2">
                Respond
              </Text>
              <Text className="text-gray-500 text-xs mt-1">
                Send a custom message
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="mx-4 mt-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="font-poppins-medium text-gray-800 dark:text-textdark">
              Recent Activity
            </Text>
            <TouchableOpacity onPress={goToNotifications}>
              <Text className="text-[#12A08A] font-poppins-regular">
                See all
              </Text>
            </TouchableOpacity>
          </View>

          {unreadEvents.length > 0 ? (
            unreadEvents
              .slice(0, 3)
              .map((event) => (
                <TouchableOpacity
                  key={event.id}
                  className="bg-white dark:bg-bgnavy rounded-xl shadow-sm border border-gray-100 dark:border-borderdark mb-3 overflow-hidden"
                  onPress={() => {
                    markAsRead(event.id);
                    router.navigate(`/pages/chatDetail?eventId=${event.id}`);
                  }}
                >
                  <View className="p-4 flex-row items-center">
                    <View className="bg-gray-100 dark:bg-bgdark h-10 w-10 rounded-full items-center justify-center mr-3">
                      <MaterialIcons
                        name="doorbell"
                        size={20}
                        color="#12A08A"
                      />
                    </View>
                    <View className="flex-1">
                      <View className="flex-row items-center justify-between">
                        <Text className="font-poppins-medium text-gray-800 dark:text-textdark">
                          Gate Doorbell
                        </Text>
                        <Text className="text-xs text-gray-500">
                          {event.timestamp && formatTime(event.timestamp)}
                        </Text>
                      </View>
                      <Text className="text-gray-500 mt-1" numberOfLines={1}>
                        {event.message}
                      </Text>
                    </View>
                    {!event.read && (
                      <View className="ml-2 h-3 w-3 rounded-full bg-[#12A08A]" />
                    )}
                  </View>
                  <View className="bg-gray-50 dark:bg-borderdark px-4 py-2">
                    <Text className="text-xs font-poppins-regular text-gray-500 dark:text-textdark">
                      {event.timestamp && formatDate(event.timestamp)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
          ) : (
            <View className="bg-gray-50 dark:bg-bgdark rounded-xl p-6 items-center">
              <MaterialIcons
                name="notifications-none"
                size={40}
                color={darkMode ? '#FFFFFF' : '#12A08A'}
              />
              <Text className="text-gray-500 dark:text-textdark text-center mt-2 font-poppins-regular">
                No recent doorbell activity
              </Text>
            </View>
          )}
        </View>

        <View className="mx-4 mt-6 bg-white dark:bg-bgnavy rounded-xl shadow-sm border border-secondary dark:border-borderdark overflow-hidden">
          <View className="px-2 py-3 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="ml-2 font-poppins-medium text-primary dark:text-textdark">
                Activity Status
              </Text>
            </View>
            <View className="flex-row items-center">
              <MaterialIcons name="doorbell" size={24} color="#12A08A" />
            </View>
          </View>
        
          <View className="bg-gray-50 dark:bg-borderdark px-4 py-4 flex-row justify-between">
            <View>
              <Text className="text-sm font-poppins-regular text-gray-500 dark:text-white">
                Last activity: {doorbellEvents[0]?.timestamp ? formatTime(doorbellEvents[0].timestamp) : 'No activity'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
