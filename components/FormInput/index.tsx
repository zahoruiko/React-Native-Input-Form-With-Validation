
import React, { SetStateAction, Dispatch } from 'react';
import { TextInput, Text, StyleSheet } from 'react-native';

type TFormInputProps = {
  placeholder: string;
  value: string;
  onChangeText: Dispatch<SetStateAction<string>>;
  secureTextEntry?: boolean;
  errorMessage: string;
};

const FormInput: React.FC<TFormInputProps> = ({ placeholder, value, onChangeText, secureTextEntry, errorMessage }) => {
  return (
    <>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      {errorMessage !== '' && <Text style={styles.error}>* {errorMessage}</Text>}
    </>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  input: {
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 16
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 12,
    marginLeft: 8
  }
});