import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Linking, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Checkbox, CustomButton, FooterLink, Input, Title } from '../../../components';
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title text="Join the club!" />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={styles.input}
              placeholder="First name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorText={errors.firstName && isSubmitted && 'This field is required'}
            />
          )}
          name="firstName"
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={styles.input}
              placeholder="Last name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorText={errors.lastName && isSubmitted && 'This field is required'}
            />
          )}
          name="lastName"
        />
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
        <Controller
          control={control}
          rules={{
            required: true,
            validate: (val: string) => {
              if (watch('password') !== val) {
                return 'Your passwords do no match';
              }
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              secureTextEntry
              style={styles.input}
              placeholder="Confirm password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorText={
                errors.confirmPassword && isSubmitted && (errors.confirmPassword?.message || 'This field is required')
              }
            />
          )}
          name="confirmPassword"
        />

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
        {isSubmitted && !agreed && (
          <Text style={styles.checkboxError}>Must agree to the Terms of Service and Privacy Policy</Text>
        )}

        <CustomButton style={styles.button} onPress={handleSubmit(onSubmit)}>
          Submit
        </CustomButton>

        <FooterLink text="Already registered?" linkText="Sign in!" onPress={navigateToSignIn} />
      </ScrollView>
    </SafeAreaView>
  );
});
