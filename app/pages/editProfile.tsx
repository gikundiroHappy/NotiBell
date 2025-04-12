import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Context } from '@/app/Context/context';
import CustomInput from '../components/customInput';
import { doc, updateDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '@/firebaseConfig';
import { getItemAsync } from 'expo-secure-store';

const EditProfile = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const context = useContext(Context);

  if (!context) {
    throw new Error('Context must be used within a Provider');
  }

  const { userData, updateUserData } = context;

  useEffect(() => {
    if (userData?.fullname) {
      setUsername(userData.fullname);
    }
  }, [userData]);

  const HandleUpdate = async () => {
    if (!username.trim()) {
      Alert.alert('Error', 'Username cannot be empty');
      return;
    }

    try {
      setLoading(true);

      const userUID = await getItemAsync('userUID');

      if (!userUID) {
        Alert.alert('Error', 'User not authenticated');
        return;
      }

      const userDocRef = doc(FIREBASE_DB, 'user', userUID);
      await updateDoc(userDocRef, {
        fullname: username,
      });

      if (userData) {
        updateUserData({
          ...userData,
          fullname: username,
        });
      }

      Alert.alert('Success', 'Profile updated successfully', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error('Update error:', error);
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <View className="bg-secondary dark:bg-bgdark h-full">
        <View className="bg-[#12A08A] h-52">
          <View className=" flex flex-row items-center gap-32 px-6">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={25} color="white" />
            </TouchableOpacity>
            <Text className="text-lg text-white text-center font-poppins-semibold py-10">
              Edit Profile
            </Text>
          </View>

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
            <Text className="font-poppins-regular text-center text-xs my-2 dark:text-textdark">
              Change picture
            </Text>

            <View className="px-8 py-12">
              <Text className="font-poppins-regular text-sm dark:text-textdark">
                Username
              </Text>
              <CustomInput
                label=""
                value={username}
                onChangeText={setUsername}
                icon2="account-outline"
                secureTextEntry={false}
                keyboardType="default"
              />
            </View>
          </View>

          <View className="mt-28 mx-8">
            <TouchableOpacity
              className="bg-primary mx-auto px-8 py-3 rounded-[8px] mt-10 w-full"
              onPress={HandleUpdate}
              disabled={loading}
            >
              <Text className="font-poppins-medium text-white text-md text-center">
                {loading ? 'Updating...' : 'Update'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
