import { Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import ButtonProps from '../model/buttonProps';

const Button: React.FC<ButtonProps> = ({ title, onPress, loading }) => {
  return (
    <View>
      <TouchableOpacity className="bg-primary rounded-full" onPress={onPress}>
        {loading ? (
          <ActivityIndicator size="large" color="white" className="pt-2" />
        ) : (
          <Text className="text-center py-3 font-poppins-semibold text-white ">
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
export default Button;
