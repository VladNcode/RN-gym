import auth from '@react-native-firebase/auth';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { Linking, Text, TouchableOpacity } from 'react-native';

import { CustomDrawerContentType, PRIVACY_POLICY_LINK, TERMS_AND_CONDITIONS_LINK } from '../../constants';
import { styles } from './styles';

export const CustomDrawerContent = React.memo((props: CustomDrawerContentType) => {
  const logout = () => {
    auth().signOut();
  };

  const { navigation } = props;

  const onLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <DrawerContentScrollView {...props}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.link}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Tasks')}>
        <Text style={styles.link}>Tasks</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onLinkPress(PRIVACY_POLICY_LINK)}>
        <Text style={styles.link}>Privacy policy</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onLinkPress(TERMS_AND_CONDITIONS_LINK)}>
        <Text style={styles.link}>Terms & Conditions</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logout}>
        <Text style={styles.link}>Log out</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
});
