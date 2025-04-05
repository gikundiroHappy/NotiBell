import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  const TabIcon = ({
    focused,
    icon,
    title,
  }: {
    focused: boolean;
    icon: any;
    title: string;
  }) => {
    return (
      <View className="flex items-center justify-center w-full">
        <Ionicons name={icon} color={focused ? '#12A08A' : 'black'} size={24} />
        <Text
          className={`text-[9px] mt-1 font-poppins-regular ${
            focused ? 'text-[#12A08A]' : 'text-black'
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
          backgroundColor: '#FFFFFF',
          position: 'absolute',
          borderTopColor: '#0061FF1A',
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
            <TabIcon focused={focused} icon="chatbox-outline" title="Chat" />
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
