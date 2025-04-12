import { StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import { TextInput } from 'react-native-paper';
import { CustomInputProps } from '../model/customInputProps';
import { Context } from '../Context/context';

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
  const context = useContext(Context);

  if (!context) {
    throw new Error('Context must be used within a Provider');
  }

  const { darkMode } = context;

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
        style={styles(darkMode).textInput}
        underlineColor={darkMode ? '#10141E' : '#F3F5F6'}
        textColor={darkMode ? '#FFFFFF' : 'black'}
        theme={{
          colors: { primary: darkMode ? '#10141E' : '#C4c0c0' },
          roundness: 50,
        }}
        right={
          icon1 ? (
            <TextInput.Icon
              size={19}
              icon={icon1}
              color={darkMode ? '#FFFFFF' : '#12A08A'}
              onPress={onPress}
            />
          ) : null
        }
        left={
          icon2 ? (
            <TextInput.Icon
              size={19}
              icon={icon2}
              color={darkMode ? '#FFFFFF' : '#12A08A'}
              style={styles(darkMode).leftIcon}
            />
          ) : null
        }
      />
    </View>
  );
};

const styles = (darkMode: boolean) =>
  StyleSheet.create({
    textInput: {
      height: 50,
      fontSize: 15,
      backgroundColor: darkMode ? '#161D2F' : 'white',
      borderRadius: 50,
      marginTop: 10,
    },
    leftIcon: {
      backgroundColor: darkMode ? '#10141E' : '#E3F4F1',
    },
  });

export default CustomInput;
