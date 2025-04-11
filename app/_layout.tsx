import { Stack } from 'expo-router';
import './global.css';
import { useFonts } from 'expo-font';
import { ContextProvider } from './Context/context';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
    'Black-Italic': require('../assets/fonts/Poppins-BlackItalic.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <ContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="pages/chatDetail"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(root)/(tabs)/profile"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(root)/(tabs)/chat"
          options={{ headerShown: false }}
        />
      </Stack>
    </ContextProvider>
  );
}
