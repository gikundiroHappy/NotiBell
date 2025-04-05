import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useContext } from 'react';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { Context } from '@/app/Context/context';
import { router } from 'expo-router';

const EditProfile = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('Context must be used within a Provider');
  }

  const { logout, userData } = context;

  const HandleLogout = async () => {
    try {
      await logout();
      router.replace('/Auth/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <View className="bg-[#12A08A] h-52">
        <Text className="text-lg text-white text-center font-poppins-semibold py-10">
          Profile
        </Text>

        <View className="relative top-10">
          <View className="bg-[#F4F1DE] mx-auto rounded-full">
            <Image
              source={{
                uri: userData?.profUrl
                  ? userData.profUrl
                  : 'https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png',
              }}
              className="w-28 h-28 rounded-full"
            />
          </View>

          <Text className="font-poppins-semibold text-[#3D405B] text-center mt-4 mb-1">
            {userData?.fullname || 'User'}
          </Text>
          <Text className="text-[#3D405B] text-center text-sm">
            {userData?.email || 'email@example.com'}
          </Text>
          <TouchableOpacity
            className="bg-primary mx-auto px-8 py-3 rounded-[6px] mt-10"
            onPress={() => router.navigate('../../pages/editProfile')}
          >
            <Text className="font-poppins-regular text-white text-sm">
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-28 mx-8">
          <View className="flex flex-row gap-4">
            <Feather name="moon" size={20} />
            <Text className="font-poppins-medium">Darkmode</Text>
          </View>

          <TouchableOpacity
            className="flex flex-row gap-4 mt-4"
            onPress={HandleLogout}
          >
            <MaterialIcons name="logout" size={20} color="#12A08A" />
            <Text className="font-poppins-medium text-primary">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
