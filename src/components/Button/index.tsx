import React from 'react';
import { Text, TouchableOpacity, ViewStyle } from 'react-native';

import { styles } from './styles';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  style?: ViewStyle;
}

export const CustomButton = React.memo(({ children, onPress, style }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
});
