import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useContext, useState } from 'react';
import CustomInput from '../components/customInput';
import Button from '../components/button';
import { router } from 'expo-router';
import { Context } from '../Context/context';
import FlashMessage, { showMessage } from 'react-native-flash-message';

const register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const context = useContext(Context);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleValidation = () => {
    let valid = true;
    if (email.trim() === '') {
      setEmailError('Email is required');
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Your email is not valid');
      valid = false;
      // showMessage({
      //   message: 'Invalid Email',
      //   description: 'Please enter a valid email address.',
      //   type: 'warning',
      //   icon: 'warning',
      //   position: 'top',
      // });
    } else {
      setEmailError('');
    }
    if (password.trim() === '') {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }
    return valid;
  };

  if (!context) {
    throw new Error('Context must be used within a Provider');
  }

  const { Register, error } = context;

  const handleRegister = async () => {
    if (handleValidation()) {
      setLoading(true);
      const success = await Register(email, password, username);

      if (success) {
        showMessage({
          message: 'Login Successful',
          type: 'success',
          icon: 'success',
          duration: 3000,
        });
        router.replace('/Auth/login');
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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <FlashMessage position="top" />
        <View className="bg-secondary dark:bg-bgdark flex-1 h-full p-6 flex flex-col justify-center">
          <View className="flex flex-row justify-center">
            <Image
              source={require('../../assets/images/login-register.png')}
              className=""
            />
          </View>

          <Text className="text-primary font-poppins-bold text-2xl py-8">
            Register
          </Text>

          <CustomInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            icon2="account-outline"
            secureTextEntry={false}
            keyboardType="default"
          />

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

          <View className="pt-10">
            <Button
              title="Register"
              loading={loading}
              onPress={handleRegister}
            ></Button>
          </View>

          <View className="flex-row justify-center mt-20">
            <Text className="text-gray-700 text-sm font-poppins-regular dark:text-textdark">
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.navigate('/Auth/login')}>
              <Text className="text-primary text-sm font-poppins-bold">
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default register;
