import React from 'react';
import { ImageBackground, View } from 'react-native';

import { Button, Layout, Text } from '@ui-kitten/components';

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
    <ImageBackground source={require('../../../assets/onboarding.png')} style={styles.image}>
      <Layout style={styles.container}>
        <Text category="h4">Best task management app</Text>
        <Text category="s1" style={styles.subtitle}>
          Get organized by sorting out all your tasks and boost your productivity.
        </Text>

        <View style={styles.buttonsContainer}>
          <Button onPress={onPressSignIn}>Log in</Button>
          <Button status="control" style={styles.bottomButton} onPress={onPressSignUp}>
            Get Started
          </Button>
        </View>
      </Layout>
    </ImageBackground>
  );
});
