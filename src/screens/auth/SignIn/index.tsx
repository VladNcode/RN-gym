import auth from '@react-native-firebase/auth';
import React, { useReducer } from 'react';
import { Alert, SafeAreaView, View } from 'react-native';

import { CustomButton, FooterLink, Input, Title } from '../../../components';
import { SignInNavigationProp, isFirebaseSignInError } from '../../../constants';
import { styles } from './styles';

interface SignInState {
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
}

export const SignIn = React.memo(({ navigation }: { navigation: SignInNavigationProp }) => {
  const [event, updateEvent] = useReducer(
    (prev: SignInState, next: Partial<SignInState>) => {
      return { ...prev, ...next };
    },
    {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    },
  );

  const onSubmit = async () => {
    try {
      if (!event.email) {
        updateEvent({ emailError: 'Email is a required field' });
      } else {
        updateEvent({ emailError: '' });
      }

      if (!event.password) {
        updateEvent({ passwordError: 'Email is a required field' });
      } else {
        updateEvent({ passwordError: '' });
      }

      if (!event.email || !event.password) {
        return;
      }

      await auth().signInWithEmailAndPassword(event.email, event.password);
    } catch (error) {
      if (isFirebaseSignInError(error)) {
        if (error.code === 'auth/invalid-email') {
          Alert.alert('Invalid email');
        }
        if (error.code === 'auth/user-disabled') {
          Alert.alert('User is disabled');
        }
        if (error.code === 'auth/user-not-found') {
          Alert.alert('User not found');
        }
        if (error.code === 'auth/wrong-password') {
          Alert.alert('Wrong password');
        }
      } else {
        Alert.alert('Something went wrong');
        console.error(error);
      }
    }
  };

  const navigateToSignup = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title text="Welcome back!" />

      <View style={styles.inputsContainer}>
        <Input
          errorText={event.emailError}
          onChangeText={value => {
            updateEvent({ email: value });
          }}
          keyboardType="email-address"
          placeholder="Email"
        />
        <Input
          errorText={event.passwordError}
          onChangeText={value => {
            updateEvent({ password: value });
          }}
          style={styles.input}
          secureTextEntry
          placeholder="Password"
        />
      </View>

      <CustomButton style={styles.button} onPress={onSubmit}>
        Log in
      </CustomButton>

      <FooterLink text="Not registered?" linkText="Sign up!" onPress={navigateToSignup} />
    </SafeAreaView>
  );
});
