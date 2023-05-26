import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, Text } from 'react-native';

import { RootDrawerParamsList } from '../../constants';
import { styles } from './styles';

export const PlusIcon = React.memo(() => {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamsList>>();

  const onPress = () => {
    navigation.navigate('AddTask');
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.plus}>+</Text>
    </Pressable>
  );
});
