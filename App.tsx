import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import FormButton from './components/FormButton';
import FormInput from './components/FormInput';
import FieldIcon from './components/FormIcons/FieldIcon';

const HIDDEN = 'hidden';
const VISIBLE = 'visible';
const FIELD_ICON_SIZE = 30;
const FIELD_ICON_COLOR = '#CCC';
const USER_NAME_FIELD_ICON_NAME = 'person-sharp';
const USER_EMAIL_FIELD_ICON_NAME = 'mail-sharp';
const USER_PASSWORD_ICON_FIELD_ICON_NAME = 'lock-closed-sharp';
const USER_PASSWORD_HIDDEN_FIELD_ICON_NAME = 'eye-off-sharp';
const USER_PASSWORD_VISIBLE_FIELD_ICON_NAME = 'eye-sharp';

const App = () => {
  const [name, setName] = useState('');
  const [nameTouched, setNameTouched] = useState(false);
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [password2, setPassword2] = useState('');
  const [passwordTouched2, setPasswordTouched2] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(HIDDEN);

  useEffect(() => {
    validateForm();
  }, [name, email, password, password2]);

  const validateForm = () => {
    if (name !== '') setNameTouched(true);
    if (email !== '') setEmailTouched(true);
    if (password !== '') setPasswordTouched(true);
    if (password2 !== '') setPasswordTouched2(true);

    let errors = {
      name: '',
      email: '',
      password: '',
      password2: ''
    };

    if (nameTouched) {
      if (!name) {
        errors.name = 'Name is required';
      }
    }

    if (emailTouched) {
      if (!email) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Email is invalid';
      }
    }

    if (passwordTouched) {
      if (!password) {
        errors.password = 'Password is required';
      } else {
        let passwordErrors = [];
        if (!/\w*[a-z]\w*/.test(password)) passwordErrors.push('a small latin letter');
        if (!/\w*[A-Z]\w*/.test(password)) passwordErrors.push('a capital latin letter');
        if (!/\w*[0-9]\w*/.test(password)) passwordErrors.push('a digit');
        if (!/[!@#$%^&*()\-_"=+{}; :,<.>]/.test(password)) passwordErrors.push('a special character');
        const minPasswordLength = 8;
        if (password.length < minPasswordLength) passwordErrors.push(`at least ${minPasswordLength} characters`);
        if (passwordErrors.length > 0) errors.password = 'Password must have: ' + passwordErrors.join(', ');
      }
    }

    if (passwordTouched2) {
      if (!password2) {
        errors.password2 = 'Password confirmation is required';
      } else if (password !== password2) {
        errors.password2 = 'Password confirmation does not match the password';
      }
    }

    setErrors(errors);

    setIsFormValid(
      nameTouched &&
      emailTouched &&
      passwordTouched &&
      passwordTouched2 &&
      errors.name === '' &&
      errors.email === '' &&
      errors.password === '' &&
      errors.password2 === ''
    );
  };

  const handleSubmit = () => {
    if (isFormValid) {
      console.log('Form submitted successfully!');
      console.log('Name: ', name);
      console.log('E-mail: ', email);
      console.log('Password: ', password);
      console.log('Password2: ', password2);

      // Restoring the original values of variables
      setName('');
      setEmail('');
      setPassword('');
      setPassword2('');
      setNameTouched(false);
      setEmailTouched(false);
      setPasswordTouched(false);
      setPasswordTouched2(false);
      setIsPasswordVisible(HIDDEN);
      setErrors({
        name: '',
        email: '',
        password: '',
        password2: ''
      });
    } else {
      console.log('The data was entered with errors. Please correct them.');
    }
  };

  const togglePasswordVisibility = () => {
    if (isPasswordVisible === HIDDEN) {
      setIsPasswordVisible(VISIBLE);
    } else {
      setIsPasswordVisible(HIDDEN);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scroller}>
        <View style={styles.container}>
          <FormInput
            placeholder={'Name'}
            value={name}
            onChangeText={setName}
            errorMessage={errors.name}
            leftIcon={
              <FieldIcon iconName={USER_NAME_FIELD_ICON_NAME} iconColor={FIELD_ICON_COLOR} iconSize={FIELD_ICON_SIZE} />
            }
          />
          <FormInput
            placeholder={'E-mail'}
            value={email}
            onChangeText={setEmail}
            errorMessage={errors.email}
            leftIcon={
              <FieldIcon
                iconName={USER_EMAIL_FIELD_ICON_NAME}
                iconColor={FIELD_ICON_COLOR}
                iconSize={FIELD_ICON_SIZE}
              />
            }
          />
          <FormInput
            placeholder={'Password'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={isPasswordVisible === HIDDEN ? true : false}
            errorMessage={errors.password}
            leftIcon={
              <FieldIcon
                iconName={USER_PASSWORD_ICON_FIELD_ICON_NAME}
                iconColor={FIELD_ICON_COLOR}
                iconSize={FIELD_ICON_SIZE}
              />
            }
            rightIcon={
              <FieldIcon
                iconName={
                  isPasswordVisible === HIDDEN
                    ? USER_PASSWORD_HIDDEN_FIELD_ICON_NAME
                    : USER_PASSWORD_VISIBLE_FIELD_ICON_NAME
                }
                iconColor={FIELD_ICON_COLOR}
                iconSize={FIELD_ICON_SIZE}
                onPressHandler={togglePasswordVisibility}
              />
            }
          />
          <FormInput
            placeholder={'Password (confirmation)'}
            value={password2}
            onChangeText={setPassword2}
            secureTextEntry={isPasswordVisible === HIDDEN ? true : false}
            errorMessage={errors.password2}
            leftIcon={
              <FieldIcon
                iconName={USER_PASSWORD_ICON_FIELD_ICON_NAME}
                iconColor={FIELD_ICON_COLOR}
                iconSize={FIELD_ICON_SIZE}
              />
            }
            rightIcon={
              <FieldIcon
                iconName={
                  isPasswordVisible === HIDDEN
                    ? USER_PASSWORD_HIDDEN_FIELD_ICON_NAME
                    : USER_PASSWORD_VISIBLE_FIELD_ICON_NAME
                }
                iconColor={FIELD_ICON_COLOR}
                iconSize={FIELD_ICON_SIZE}
                onPressHandler={togglePasswordVisibility}
              />
            }
          />
          <FormButton isDisabled={!isFormValid} onPress={handleSubmit} buttonText={'Submit'} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  scroller: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItem: 'center',
    height: '100%'
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  }
});

export default App;
