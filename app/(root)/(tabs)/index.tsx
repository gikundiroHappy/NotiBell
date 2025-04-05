import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text className="text-blue-600 font-poppins-extrabold text-xl">
        Home Screen
      </Text>
      <Text className="p-4 leading- font-poppins-medium">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil mollitia
        aperiam fugiat possimus sed ipsum deleniti dolor? Non a fugiat iure id
        deleniti eum expedita necessitatibus? Temporibus facilis blanditiis
        dolor.
      </Text>
      <Link href="./../components/onboarding">Onboarding</Link>
      <Text className="bg-red-100">
        Edit app/index.tsx to edit this screen.
      </Text>
      <Link href="/Auth/register">Register</Link>
      <Link href="/Auth/login">Login</Link>
    </View>
  );
}
