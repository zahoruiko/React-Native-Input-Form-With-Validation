import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import FormButton from './components/FormButton';
import FormInput from './components/FormInput';

const App = () => {
  const [name, setName] = useState('');
  const [nameTouched, setNameTouched] = useState(false);
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [name, email, password]);

  const validateForm = () => {
    if (name != '') setNameTouched(true);
    if (email != '') setEmailTouched(true);
    if (password != '') setPasswordTouched(true);

    let errors = {
      name: '',
      email: '',
      password: ''
    };

    if (nameTouched) {
      if (!name) {
        errors.name = 'Name is required.';
      }
    }

    if (emailTouched) {
      if (!email) {
        errors.email = 'Email is required.';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Email is invalid.';
      }
    }

    if (passwordTouched) {
      if (!password) {
        errors.password = 'Password is required.';
      } else {
        let passwordErrors = [];
        if (!/\w*[a-z]\w*/.test(password))
            passwordErrors.push('a small latin letter');
        if (!/\w*[A-Z]\w*/.test(password))
            passwordErrors.push('a capital latin letter');
        if (!/\w*[0-9]\w*/.test(password))
            passwordErrors.push('a digit');
        if (!/[!@#$%^&*()\-_"=+{}; :,<.>]/.test(password))
            passwordErrors.push('a special character');
        const minPasswordLength = 8;
        if (password.length < minPasswordLength)
            passwordErrors.push(`at least ${minPasswordLength} characters`);
        if (passwordErrors.length > 0)
            errors.password = 'Password must have: ' + passwordErrors.join (', ');
      } 
    }

    setErrors(errors);

    setIsFormValid(
      nameTouched &&
      emailTouched &&
      passwordTouched &&
      errors.name === '' &&
      errors.email === '' &&
      errors.password === ''
    );
  };

  const handleSubmit = () => {
    if (isFormValid) {
      console.log('Form submitted successfully!');
    } else {
      console.log('Form has errors. Please correct them.');
    }
  };

  return (
    <View style={styles.container}>
      <FormInput
        placeholder={'Name'}
        value={name}
        onChangeText={setName}
        errorMessage={errors.name}
      />
      <FormInput
        placeholder={'E-mail'}
        value={email}
        onChangeText={setEmail}
        errorMessage={errors.email}
      />
      <FormInput
        placeholder={'Password'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        errorMessage={errors.password}
      />
      <FormButton 
        isDisabled={!isFormValid} 
        onPress={handleSubmit} 
        buttonText={'Submit'} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center'
  }
});

export default App;
