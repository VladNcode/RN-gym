import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ImageProps, TouchableWithoutFeedback, View } from 'react-native';

import { Button, Icon, Input, Layout, Spinner, Text } from '@ui-kitten/components';

import ErrorCaption from '../../../components/ErrorCaption';
import FooterLink from '../../../components/FooterLink';
import { SignInNavigationProp, isFirebaseSignInError } from '../../../constants';
import { styles } from './styles';

interface SignInState {
  email: string;
  password: string;
}

const LoadingIndicator = (props: Partial<ImageProps> | undefined): React.ReactElement => (
  <View style={[props?.style, styles.indicator]}>
    <Spinner size="small" />
  </View>
);

export const SignIn = React.memo(({ navigation }: { navigation: SignInNavigationProp }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting },
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

  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(s => !s);
  };

  const renderIcon = (props: Partial<ImageProps> | undefined): React.ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <Layout style={styles.container}>
      <Text category="h3">Welcome back!</Text>

      <View style={styles.inputsContainer}>
        <Controller
          name="email"
          control={control}
          rules={{ required: true, pattern: /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,10}\b$/i }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              label="Email"
              keyboardType="email-address"
              placeholder="Email"
              onChangeText={onChange}
              onBlur={onBlur}
              status={errors.email && isSubmitted ? 'danger' : 'basic'}
              caption={
                errors.email && isSubmitted
                  ? ErrorCaption(errors.email?.type === 'pattern' ? 'Invalid email' : 'This field is required')
                  : undefined
              }
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true, minLength: 8 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={styles.input}
              value={value}
              label="Password"
              placeholder="Password"
              caption={
                errors.password && isSubmitted
                  ? ErrorCaption(
                      errors.password?.type === 'minLength'
                        ? 'Should contain at least 8 symbols'
                        : 'This field is required',
                    )
                  : undefined
              }
              accessoryRight={renderIcon}
              secureTextEntry={secureTextEntry}
              status={errors.password && isSubmitted ? 'danger' : 'basic'}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
      </View>

      <Button
        style={styles.button}
        disabled={isSubmitting}
        appearance={isSubmitting ? 'outline' : 'filled'}
        accessoryLeft={isSubmitting ? LoadingIndicator : undefined}
        onPress={handleSubmit(onSubmit)}>
        Log in
      </Button>

      <FooterLink text="Not registered?" linkText="Sign up!" onPress={navigateToSignup} />
    </Layout>
  );
});
