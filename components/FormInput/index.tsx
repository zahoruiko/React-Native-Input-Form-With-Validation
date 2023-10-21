import React, { SetStateAction, Dispatch } from 'react';
import { TextInput, Text, StyleSheet, View } from 'react-native';

type TFormInputProps = {
  placeholder: string;
  value: string;
  onChangeText: Dispatch<SetStateAction<string>>;
  secureTextEntry?: boolean;
  errorMessage: string;
  leftIcon?: React.JSX.Element;
  rightIcon?: React.JSX.Element;
};

const FormInput: React.FC<TFormInputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  errorMessage,
  leftIcon,
  rightIcon,
}) => {
  return (
    <View style={styles.inputWrapper}>
      <View style={styles.inputFieldWrapper}>
        {leftIcon}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          autoCapitalize={'none'}
          placeholderTextColor={'gray'}
        />
        {rightIcon}
      </View>
      <View style={styles.inputErrorsWrapper}>
        {errorMessage !== '' && <Text style={styles.error}>{errorMessage}</Text>}
      </View>
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 60,
    paddingHorizontal: 10,
    fontSize: 18
  },
  inputWrapper: {
    flexDirection: 'column'
  },
  inputFieldWrapper: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: 'lightgray',
    borderRadius: 10,
    marginTop: 6,
    marginBottom: 6
  },
  inputErrorsWrapper: {},
  error: {
    color: 'red',
    fontSize: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 8
  }
});
