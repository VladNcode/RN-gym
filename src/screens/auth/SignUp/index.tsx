import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ImageProps, Linking, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { Button, CheckBox, Icon, Input, Layout, Text } from '@ui-kitten/components';

import ErrorCaption from '../../../components/ErrorCaption';
import FooterLink from '../../../components/FooterLink';
import {
  PRIVACY_POLICY_LINK,
  SignUpNavigationProp,
  TERMS_AND_CONDITIONS_LINK,
  isFirebaseSignUpError,
} from '../../../constants';
import { styles } from './styles';

type SignUpState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignUp = React.memo(({ navigation }: { navigation: SignUpNavigationProp }) => {
  const [agreed, setAgreed] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
    watch,
  } = useForm<SignUpState>({
    defaultValues: {
      lastName: '',
      firstName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const navigateToSignIn = () => {
    navigation.navigate('SignIn');
  };

  const onLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const onSubmit = async (data: SignUpState) => {
    try {
      const result = await auth().createUserWithEmailAndPassword(data.email, data.password);

      await result.user.updateProfile({
        displayName: `${data.firstName} ${data.lastName}`,
      });
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

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(s => !s);
  };

  const toggleSecureEntry2 = (): void => {
    setSecureTextEntry2(s => !s);
  };

  const renderIcon = (props: Partial<ImageProps> | undefined): React.ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const renderIcon2 = (props: Partial<ImageProps> | undefined): React.ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry2}>
      <Icon {...props} name={secureTextEntry2 ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <Layout style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text category="h3">Join the club!</Text>

        <View style={styles.inputsContainer}>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                value={value}
                label="First name"
                placeholder="First name"
                onChangeText={onChange}
                onBlur={onBlur}
                status={errors.firstName && isSubmitted ? 'danger' : 'basic'}
                caption={errors.firstName && isSubmitted ? ErrorCaption('This field is required') : undefined}
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={styles.input}
                value={value}
                label="Last name"
                placeholder="Last name"
                onChangeText={onChange}
                onBlur={onBlur}
                status={errors.lastName && isSubmitted ? 'danger' : 'basic'}
                caption={errors.lastName && isSubmitted ? ErrorCaption('This field is required') : undefined}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{ required: true, pattern: /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,10}\b$/i }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={styles.input}
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
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: true,
              minLength: 8,
              validate: (val: string) => {
                if (watch('password') !== val) {
                  return 'Your passwords do no match';
                }
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={styles.input}
                value={value}
                label="Confirm password"
                placeholder="Confirm password"
                caption={
                  errors.confirmPassword && isSubmitted
                    ? ErrorCaption(
                        errors.confirmPassword?.type === 'minLength'
                          ? 'Should contain at least 8 symbols'
                          : errors.confirmPassword?.message || 'This field is required',
                      )
                    : undefined
                }
                accessoryRight={renderIcon2}
                secureTextEntry={secureTextEntry2}
                status={errors.confirmPassword && isSubmitted ? 'danger' : 'basic'}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />

          <View style={styles.checkboxContainer}>
            <CheckBox checked={agreed} onChange={setAgreed} />
            <View style={styles.checkboxTextContainer}>
              <Text category="c1">I agree to the </Text>
              <TouchableOpacity onPress={() => onLinkPress(TERMS_AND_CONDITIONS_LINK)}>
                <Text status="info" category="label" style={styles.link}>
                  Terms of Service{' '}
                </Text>
              </TouchableOpacity>
              <Text category="c1">and </Text>
              <TouchableOpacity onPress={() => onLinkPress(PRIVACY_POLICY_LINK)}>
                <Text status="info" category="label" style={styles.link}>
                  Privacy Policy
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {isSubmitted && !agreed && (
            <Text status="danger" category="label" style={styles.checkboxError}>
              Must agree to the Terms of Service and Privacy Policy
            </Text>
          )}
        </View>

        <Button style={styles.button} onPress={handleSubmit(onSubmit)}>
          Submit
        </Button>

        <FooterLink text="Already registered?" linkText="Sign in!" onPress={navigateToSignIn} />
      </ScrollView>
    </Layout>
  );
});
