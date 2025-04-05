import { StyleSheet, View } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-paper';
import CustomInputProps from '../model/customInputProps';

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChangeText,
  icon1,
  icon2,
  secureTextEntry = false,
  error,
  keyboardType = 'default',
  onPress,
}) => {
  return (
    <View>
      <TextInput
        label={label}
        value={value}
        mode="flat"
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        error={!!error}
        keyboardType={keyboardType}
        style={styles.textInput}
        underlineColor="#F3F5F6"
        textColor="black"
        theme={{
          colors: { primary: '#C4c0c0' },
          roundness: 50,
        }}
        right={
          icon1 ? (
            <TextInput.Icon
              size={19}
              icon={icon1}
              color={'#12A08A'}
              onPress={onPress}
            />
          ) : null
        }
        left={
          icon2 ? (
            <TextInput.Icon
              size={19}
              icon={icon2}
              color={'#12A08A'}
              style={styles.leftIcon}
            />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    fontSize: 15,
    backgroundColor: 'white',
    borderRadius: 50,
    marginTop: 10,
  },
  leftIcon: {
    backgroundColor: '#E3F4F1',
  },
});

export default CustomInput;
