import React from 'react';
import { ImageBackground, SafeAreaView, Text, View } from 'react-native';

import { CustomButton } from '../../../components';
import { OnboardingNavigationProp } from '../../../constants';
import { styles } from './styles';

export const Onboarding = React.memo(({ navigation }: { navigation: OnboardingNavigationProp }) => {
  const onPressSignIn = () => {
    navigation.navigate('SignIn');
  };
  const onPressSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView>
      <ImageBackground source={require('../../../assets/onboarding.png')} style={styles.image}>
        <View style={styles.container}>
          <Text style={styles.title}>Best task management app</Text>
          <Text style={styles.subtitle}>Get organized by sorting out all your tasks and boost your productivity.</Text>

          <View style={styles.buttonsContainer}>
            <CustomButton onPress={onPressSignIn}>Log In</CustomButton>
            <CustomButton style={styles.bottomButton} onPress={onPressSignUp}>
              Get Started
            </CustomButton>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
});
