import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { chatsList } from '@/app/constants/chat';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'visitor';
  timestamp: Date;
}

const ChatDetail = () => {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();
  const numericChatId = parseInt(chatId || '0', 10);

  const chat = chatsList.find((c) => c.id === numericChatId);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (chat) {
      setMessages([
        {
          id: 1,
          text: chat.message || 'Someone rang your Gate doorbell',
          sender: 'visitor',
          timestamp: new Date(chat.time),
        },
      ]);
    }
  }, [chat]);

  const handleSend = () => {
    if (message.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user' as const,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const quickMessages = [
    'No one around call 0780278585',
    "I'll be right there",
    'Please leave the package at the door',
  ];

  if (!chat) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text className="text-lg font-poppins-medium text-gray-800">
          Chat not found
        </Text>
        <TouchableOpacity
          className="mt-4 p-3 bg-[#12A08A] rounded-lg"
          onPress={() => router.back()}
        >
          <Text className="text-white font-poppins-medium">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <View className="px-4 py-4 flex-row items-center border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#12A08A" />
        </TouchableOpacity>
        <Text className="text-lg font-poppins-semibold text-gray-800">
          Gate Doorbell
        </Text>
      </View>

      <View className="items-center py-2 bg-gray-50">
        <Text className="text-xs font-poppins-regular text-gray-500">
          {new Date(chat.time).toLocaleString()}
        </Text>
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        {messages.map((msg) => (
          <View
            key={msg.id}
            className={`my-2 max-w-[75%] ${
              msg.sender === 'user' ? 'self-end ml-auto' : 'self-start mr-auto'
            }`}
          >
            <View
              className={`p-4 rounded-xl ${
                msg.sender === 'user'
                  ? 'bg-[#12A08A] rounded-tr-none'
                  : 'bg-[#EBEDEE] rounded-tl-none'
              }`}
            >
              <Text
                className={`font-poppins-regular ${
                  msg.sender === 'user' ? 'text-white' : 'text-gray-800'
                }`}
              >
                {msg.text}
              </Text>
            </View>
            <Text className="text-xs text-gray-500 mt-1 ml-1">
              {msg.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
        ))}

        {messages.length <= 1 && (
          <View className="mt-6">
            <Text className="text-sm font-poppins-medium text-gray-500 mb-3">
              Quick Responses
            </Text>
            {quickMessages.map((quickMsg, index) => (
              <TouchableOpacity
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-xl p-3 mb-3"
                onPress={() => {
                  const newMsg = {
                    id: messages.length + 1,
                    text: quickMsg,
                    sender: 'user' as const,
                    timestamp: new Date(),
                  };
                  setMessages([...messages, newMsg]);
                }}
              >
                <Text className="text-gray-800 font-poppins-regular">
                  {quickMsg}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
        <View className="flex-row items-center px-4 py-3 bg-white border-t border-gray-200">
          <TextInput
            className="flex-1 px-4 py-2 mr-2"
            placeholder="Type a message..."
            placeholderTextColor="#999"
            value={message}
            onChangeText={setMessage}
          />

          <TouchableOpacity
            onPress={handleSend}
            disabled={message.trim() === ''}
            className={`w-10 h-10 rounded-full items-center justify-center ${
              message.trim() === '' ? 'bg-gray-200' : 'bg-[#12A08A]'
            }`}
          >
            <Ionicons
              name="send"
              size={20}
              color={message.trim() === '' ? '#999' : 'white'}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatDetail;
