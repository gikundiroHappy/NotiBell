import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { Tabs } from 'expo-router';
import { Context } from '@/app/Context/context';

export default function TabsLayout() {
  const context = useContext(Context);

  if (!context) {
    throw new Error('Context must be used within a Provider');
  }

  const { darkMode, doorbellEvents } = context;
  const TabIcon = ({
    focused,
    icon,
    title,
    showBadge = false,
  }: {
    focused: boolean;
    icon: any;
    title: string;
    showBadge?: boolean;
  }) => {
    const unreadNotifications = doorbellEvents.filter(
      (event) => !event.read
    ).length;

    return (
      <View className="flex items-center justify-center w-full">
        <View className="relative">
          <Ionicons
            name={icon}
            color={focused ? '#12A08A' : darkMode ? '#FFFFFF' : 'black'}
            size={24}
          />
          {showBadge && unreadNotifications > 0 && (
            <View className="absolute -top-1 -right-1 bg-red-500 rounded-full h-4 w-4 items-center justify-center">
              <Text className="text-white text-xs">{unreadNotifications}</Text>
            </View>
          )}
        </View>
        <Text
          className={`text-[9px] mt-1 font-poppins-regular ${
            focused ? 'text-[#12A08A]' : darkMode ? 'text-white' : 'text-black'
          }`}
        >
          {title}
        </Text>
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: darkMode ? '#10141E' : '#FFFFFF',
          position: 'absolute',
          borderTopColor: darkMode ? '#5A698F' : '#0061FF1A',
          borderTopWidth: 1,
          height: 65,
          paddingTop: 15,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="home-outline" title="Home" />
          ),
        }}
      ></Tabs.Screen>

      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon="chatbox-outline"
              title="Chat"
              showBadge
            />
          ),
        }}
      ></Tabs.Screen>

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="person-outline" title="Profile" />
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}
