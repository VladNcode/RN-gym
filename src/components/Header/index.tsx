import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { RootDrawerParamsList } from '../../constants';
import { styles } from './styles';

interface HeaderProps {
  title: string;
}

export const Header = React.memo(({ title }: HeaderProps) => {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamsList>>();

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <Pressable hitSlop={8} onPress={openDrawer}>
        <Image style={styles.icon} source={require('../../assets/menu.png')} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.icon} />
    </View>
  );
});
