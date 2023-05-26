import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { Alert, Linking, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Checkbox, CustomButton, FooterLink, Input, Title } from '../../../components';
import {
  PRIVACY_POLICY_LINK,
  SignUpNavigationProp,
  TERMS_AND_CONDITIONS_LINK,
  isFirebaseSignUpError,
} from '../../../constants';
import { styles } from './styles';

interface SignUpState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const fieldValuesMap: Record<keyof SignUpState, string> = {
  firstName: 'First name',
  lastName: 'Last name',
  email: 'Email',
  password: 'Password',
  confirmPassword: 'Confirm password',
};

const initialValues: SignUpState = { lastName: '', firstName: '', email: '', password: '', confirmPassword: '' };

export const SignUp = React.memo(({ navigation }: { navigation: SignUpNavigationProp }) => {
  const [agreed, setAgreed] = useState(false);
  const [state, setState] = useState<SignUpState>({ ...initialValues });
  const [errors, setErrors] = useState<SignUpState>({ ...initialValues });

  const onChange = (key: string) => (value: string) => {
    setState(s => {
      return { ...s, [key]: value };
    });
  };

  const navigateToSignIn = () => {
    navigation.navigate('SignIn');
  };

  const onLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const onSubmit = async () => {
    try {
      let error = false;

      Object.keys(state).forEach(key => {
        if (!state[key as keyof typeof state]) {
          setErrors(errs => ({
            ...errs,
            [key]: `${fieldValuesMap[key as keyof SignUpState]} is a required field`,
          }));
          error = true;
        } else {
          setErrors(errs => ({ ...errs, [key]: '' }));
        }
      });

      if (error) {
        return;
      }

      if (state.password !== state.confirmPassword) {
        Alert.alert('Passwords do not match');
        return;
      }

      if (!agreed) {
        Alert.alert('You need to agree to the Terms of Service and Privacy Policy');
        return;
      }

      if (state.password === state.confirmPassword && agreed) {
        const result = await auth().createUserWithEmailAndPassword(state.email, state.password);

        await result.user.updateProfile({
          displayName: `${state.firstName} ${state.lastName}`,
        });
      }
    } catch (err) {
      if (isFirebaseSignUpError(err)) {
        if (err.code === 'auth/email-already-in-use') {
          Alert.alert('Email is already in use');
        }
        if (err.code === 'auth/invalid-email') {
          Alert.alert('Email is invalid');
        }
        if (err.code === 'auth/operation-not-allowed') {
          Alert.alert('Operation is not allowed');
        }
        if (err.code === 'auth/weak-password') {
          Alert.alert('Password is too weak');
        }
      } else {
        Alert.alert('Something went wrong');
        console.error(err);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title text="Join the hub!" />

        <View style={styles.inputsContainer}>
          <Input errorText={errors.firstName} onChangeText={onChange('firstName')} placeholder="First Name" />
          <Input
            errorText={errors.lastName}
            onChangeText={onChange('lastName')}
            style={styles.input}
            placeholder="Last Name"
          />
          <Input
            errorText={errors.email}
            onChangeText={onChange('email')}
            style={styles.input}
            keyboardType="email-address"
            placeholder="Email"
          />
          <Input
            errorText={errors.password}
            onChangeText={onChange('password')}
            style={styles.input}
            secureTextEntry
            placeholder="Password"
          />
          <Input
            errorText={errors.confirmPassword}
            onChangeText={onChange('confirmPassword')}
            style={styles.input}
            secureTextEntry
            placeholder="Confirm Password"
          />
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox checked={agreed} setChecked={setAgreed} />

          <View style={styles.checkboxTextContainer}>
            <Text style={styles.checkboxText}>I agree to the </Text>
            <TouchableOpacity onPress={() => onLinkPress(TERMS_AND_CONDITIONS_LINK)}>
              <Text style={styles.link}>Terms of Service </Text>
            </TouchableOpacity>
            <Text style={styles.checkboxText}>and </Text>
            <TouchableOpacity onPress={() => onLinkPress(PRIVACY_POLICY_LINK)}>
              <Text style={styles.link}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>

        <CustomButton style={styles.button} onPress={onSubmit}>
          Create account
        </CustomButton>

        <FooterLink text="Already registered?" linkText="Sign in!" onPress={navigateToSignIn} />
      </ScrollView>
    </SafeAreaView>
  );
});
