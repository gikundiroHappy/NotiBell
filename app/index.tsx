import React, { useState, useRef, useContext } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { ListRenderItemInfo } from 'react-native';
import { router } from 'expo-router';
import { OnboardingItem, onboards } from './constants/onboarding';
import { Context } from './Context/context';
import { Redirect } from 'expo-router';

const { width } = Dimensions.get('window');

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<OnboardingItem>>(null);

  const context = useContext(Context);

  if (!context) {
    throw new Error('Context must be used within a Provider');
  }

  const { isLoggedIn } = context;

  if (isLoggedIn) {
    return <Redirect href="/(root)/(tabs)" />;
  }

  const handleNext = () => {
    if (currentIndex < onboards.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      router.navigate('/Auth/login');
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSkip = () => {
    router.navigate('/Auth/login');
  };

  const renderItem = ({ item }: ListRenderItemInfo<OnboardingItem>) => {
    return (
      <View
        className="w-full items-center justify-center px-8"
        style={{ width }}
      >
        <Image
          source={item.image}
          style={{ width: width * 0.6, height: width * 0.6 }}
          className="mb-10"
          resizeMode="contain"
        />
        <Text className="text-2xl font-poppins-semibold text-[#1AB69D] text-center mb-4">
          {item.title}
        </Text>
        <Text className="text-base text-[#333333] text-center leading-6 font-poppins-regular">
          {item.text}
        </Text>
      </View>
    );
  };

  const renderPagination = () => {
    return (
      <View className="flex-row justify-center items-center my-9">
        {onboards.map((_, index) => (
          <View
            key={index}
            className={`h-2 w-9 rounded mx-1 ${
              index === currentIndex ? 'bg-[#1AB69D]' : 'bg-[#F3F3F3]'
            }`}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <TouchableOpacity className="self-end px-4 py-2" onPress={handleSkip}>
        <Text className="text-base text-black">Skip</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={onboards}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x / width
          );
          setCurrentIndex(newIndex);
        }}
      />

      {renderPagination()}

      <View className="flex-row justify-between px-5 pb-6">
        <TouchableOpacity
          className="py-3 rounded-lg justify-center items-center bg-[#F3F3F3] w-[47%] "
          onPress={handleBack}
          disabled={currentIndex === 0}
        >
          <Text
            className={`text-base font-medium ${
              currentIndex === 0 ? 'text-[#878787]' : 'text-black'
            }`}
          >
            Back
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-[#1AB69D] py-3 rounded-lg justify-center items-center w-[47%]"
          onPress={handleNext}
        >
          <Text className="text-base font-medium text-white">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
