import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, Text } from 'react-native';

import { RootTabParamsList } from '../../constants';
import { styles } from './styles';

interface StatusCardProps {
  label: string;
  count: number;
  type?: 'normal' | 'error';
}

export const StatusCard = React.memo(({ label, count, type = 'normal' }: StatusCardProps) => {
  const navigation = useNavigation<DrawerNavigationProp<RootTabParamsList>>();

  const onPress = () => {
    navigation.navigate('Tasks');
  };

  return (
    <Pressable onPress={onPress} style={[styles.container, type === 'error' && styles.errorContainer]}>
      <Text style={[styles.label, type === 'error' && styles.errorText]}>{label}</Text>
      <Text style={[styles.count, type === 'error' && styles.errorText]}>{count}</Text>
    </Pressable>
  );
});
