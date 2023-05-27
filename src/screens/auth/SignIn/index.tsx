import auth from '@react-native-firebase/auth';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, SafeAreaView, View } from 'react-native';

import { CustomButton, FooterLink, Input, Title } from '../../../components';
import { SignInNavigationProp, isFirebaseSignInError } from '../../../constants';
import { styles } from './styles';

interface SignInState {
  email: string;
  password: string;
}

export const SignIn = React.memo(({ navigation }: { navigation: SignInNavigationProp }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<SignInState>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInState) => {
    try {
      await auth().signInWithEmailAndPassword(data.email, data.password);
    } catch (error) {
      if (isFirebaseSignInError(error)) {
        if (error.code === 'auth/invalid-email') {
          Alert.alert('Invalid email');
        }
        if (error.code === 'auth/user-disabled') {
          Alert.alert('User is disabled');
        }
        if (error.code === 'auth/user-not-found') {
          Alert.alert('Wrong email or password');
        }
        if (error.code === 'auth/wrong-password') {
          Alert.alert('Wrong email or password');
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
        <Controller
          control={control}
          rules={{ required: true, pattern: /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,10}\b$/i }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              keyboardType="email-address"
              style={styles.input}
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorText={
                errors.email &&
                isSubmitted &&
                (errors.email?.type === 'pattern' ? 'Invalid email' : 'This field is required')
              }
            />
          )}
          name="email"
        />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              secureTextEntry
              style={styles.input}
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorText={errors.password && isSubmitted && 'This field is required'}
            />
          )}
          name="password"
        />
      </View>

      <CustomButton style={styles.button} onPress={handleSubmit(onSubmit)}>
        Log in
      </CustomButton>

      <FooterLink text="Not registered?" linkText="Sign up!" onPress={navigateToSignup} />
    </SafeAreaView>
  );
});
