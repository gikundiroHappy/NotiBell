import React, { useState, useEffect, useContext } from 'react';
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
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { Context } from '../Context/context';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'visitor';
  timestamp: Date;
  responseTimestamp?: Date;
}

const ChatDetail = () => {
   const { eventId } = useLocalSearchParams<{ eventId: string }>();

  const context = useContext(Context);

  if (!context) {
    throw new Error('Context must be used within a Provider');
  }

  const { doorbellEvents, sendResponse } = context;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const event = doorbellEvents.find(e => e.id === eventId);

  useEffect(() => {
    if (event) {
      const initialMessages: Message[] = [{
        id: 1,
        text: 'Visitor at the door',
        sender: 'visitor',
        timestamp: new Date(Number(event.timestamp) * 1000),
      }];

      if (event.response) {
        initialMessages.push({
          id: 2,
          text: event.response,
          sender: 'user',
          timestamp: new Date(event.responseTimestamp ? event.responseTimestamp : event.timestamp * 1000),
        });
      }

      setMessages(initialMessages);
    }
  }, [event]);



  const handleSend = async () => {
    if (message.trim() === '' || !eventId) return;
  
    try {
      const responseTimestamp = Date.now();
  
      await sendResponse(eventId, message);
  
      setMessages((prevMessages) => {
        const filtered = prevMessages.filter(msg => msg.sender !== 'user');
  
        const newMessage: Message = {
          id: responseTimestamp,
          text: message,
          sender: 'user',
          timestamp: new Date(responseTimestamp),
        };
  
        return [...filtered, newMessage];
      });
  
      setMessage('');
    } catch (error) {
      Alert.alert('Error', 'Failed to send message');
    }
  };

  const quickMessages = [
    'Hamagara 0780278585',
    "Ndaje",
    'Sindi mu rugo',
  ];

   if (!event) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-bgdark justify-center items-center">
        <Text className="text-lg font-poppins-medium text-gray-800 dark:text-textdark">
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
    <SafeAreaView className="flex-1 bg-white dark:bg-bgdark">
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <View className="px-4 py-4 flex-row items-center border-b border-gray-100 dark:border-borderdark">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#12A08A" />
        </TouchableOpacity>
        <Text className="text-lg font-poppins-semibold text-gray-800 dark:text-textdark">
          Gate Doorbell
        </Text>
      </View>

      <View className="items-center py-2 bg-gray-50 dark:bg-borderdark">
        <Text className="text-xs font-poppins-regular text-gray-500 dark:text-textdark">
            {new Date(Number(event.timestamp) * 1000).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric',month: 'long', day: 'numeric',})}
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
                  : 'bg-[#EBEDEE] dark:bg-bgnavy rounded-tl-none'
              }`}
            >
              <Text
                className={`font-poppins-regular ${
                  msg.sender === 'user'
                    ? 'text-white'
                    : 'text-gray-800 dark:text-textdark'
                }`}
              >
                {msg.text}
              </Text>
            </View>
            <Text className="text-xs text-gray-500 mt-1 ml-1">
              {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
        ))}

        {messages.length <= 1 && (
          <View className="mt-6">
            <Text className="text-sm font-poppins-medium text-gray-500 dark:text-borderdark mb-3">
              Quick Responses
            </Text>
            {quickMessages.map((quickMsg, index) => (
              <TouchableOpacity
                key={index}
                className="bg-gray-50 dark:bg-bgnavy border border-gray-200 dark:border-borderdark rounded-xl p-3 mb-3"
                onPress={() => {
                  setMessage(quickMsg);
                  // auto-send the quick message
                  // handleSend();
                }}
              >
                <Text className="text-gray-800 dark:text-textdark font-poppins-regular">
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
        <View className="flex-row items-center px-4 py-3 bg-white dark:bg-bgdark border-t border-gray-200 dark:border-borderdark">
          <TextInput
            className="flex-1 px-4 py-2 mr-2 dark:text-textdark"
            placeholder="Type a message..."
            placeholderTextColor="#999"
            value={message}
            onChangeText={setMessage}
          />

          <TouchableOpacity
            onPress={handleSend}
            disabled={message.trim() === ''}
            className={`w-10 h-10 rounded-full items-center justify-center ${
              message.trim() === ''
                ? 'bg-gray-200 dark:bg-bgnavy'
                : 'bg-[#12A08A]'
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
