import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import CustomInput from '../components/customInput';
import { router } from 'expo-router';
import Button from '../components/button';
import { Context } from '../Context/context';
import FlashMessage, { showMessage } from 'react-native-flash-message';

const LoginScreen = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const context = useContext(Context);

  if (!context) {
    throw new Error('Context must be used within a Provider');
  }

  const { Login, error } = context;

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let valid = true;

    if (email.trim() == '') {
      setEmailError('Email is required');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password.trim() == '') {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }
    return valid;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      setLoading(true);
      const success = await Login(email, password);

      if (success) {
        showMessage({
          message: 'Login Successful',
          type: 'success',
          icon: 'success',
          duration: 3000,
        });
        router.replace('/(root)/(tabs)');
      } else {
        setLoading(false);
        showMessage({
          message: error,
          hideStatusBar: true,
          type: 'danger',
          icon: 'danger',
          duration: 6000,
        });
      }
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password pressed');
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <FlashMessage position="top" />
        <View className="bg-secondary dark:bg-bgdark flex-1 p-6 flex flex-col justify-center">
          <View className="flex flex-row justify-center">
            <Image
              source={require('../../assets/images/login-register.png')}
              className=""
            />
          </View>

          <Text className="text-primary font-poppins-bold text-2xl py-8">
            Log In
          </Text>

          <CustomInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            icon2="email-outline"
            secureTextEntry={false}
            error={emailError}
            keyboardType="default"
          />
          {emailError ? (
            <Text className="text-[#bc3433] py-3 h-30 font-poppins-regular text-sm">
              {emailError}
            </Text>
          ) : null}

          <CustomInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            icon1={showPassword ? 'eye' : 'eye-off'}
            icon2="lock-outline"
            secureTextEntry={!showPassword}
            error={passwordError}
            keyboardType="default"
            onPress={toggleShowPassword}
          />
          {passwordError ? (
            <Text className="text-[#bc3433] py-3 h-30 font-poppins-regular text-sm">
              {passwordError}
            </Text>
          ) : null}

          <View className="flex flex-row justify-between items-center mt-10">
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text className="text-gray-700 text-sm font-poppins-semibold dark:text-textdark">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <View className="w-56">
              <Button title="Log in" loading={loading} onPress={handleLogin} />
            </View>
          </View>

          <View className="flex-row items-center my-8">
            <View className="flex-1 h-px bg-gray-300"></View>
            <Text className="mx-4 text-sm font-poppins-regular dark:text-textdark">
              or login with
            </Text>
            <View className="flex-1 h-px bg-gray-300"></View>
          </View>

          <View className="flex-row justify-center">
            <TouchableOpacity className="w-10 h-10 mx-2 items-center justify-center bg-white rounded-full mb-6">
              <Image source={require('../../assets/images/google.png')} />
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center">
            <Text className="text-gray-700 text-sm font-poppins-regular dark:text-textdark">
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.navigate('/Auth/register')}>
              <Text className="text-primary text-sm font-poppins-bold">
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
