import { Stack } from 'expo-router';
import './global.css';
import { useFonts } from 'expo-font';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Black: require('../assets/fonts/Outfit-Black.ttf'),
    Bold: require('../assets/fonts/Outfit-Bold.ttf'),
    ExtraBold: require('../assets/fonts/Outfit-ExtraBold.ttf'),
    ExtraLight: require('../assets/fonts/Outfit-ExtraLight.ttf'),
    Light: require('../assets/fonts/Outfit-Light.ttf'),
    Medium: require('../assets/fonts/Outfit-Medium.ttf'),
    Regular: require('../assets/fonts/Outfit-Regular.ttf'),
    SemiBold: require('../assets/fonts/Outfit-SemiBold.ttf'),
    Thin: require('../assets/fonts/Outfit-Thin.ttf'),
  });
  return <Stack />;
}
