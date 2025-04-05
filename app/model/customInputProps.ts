import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

export  interface CustomInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  icon1?: IconSource;
  icon2?: IconSource;
  secureTextEntry?: boolean;
  error?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  onPress?: () => void;
}
const CustomInputPropsExport = {};
export default CustomInputPropsExport;