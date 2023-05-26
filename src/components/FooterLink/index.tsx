import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

interface InputProps {
  text: string;
  linkText: string;
  onPress: () => void;
}

export const FooterLink = React.memo(({ text, linkText, onPress }: InputProps) => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>{text}</Text>
    <TouchableOpacity hitSlop={8} onPress={onPress}>
      <Text style={styles.footerLink}>{linkText}</Text>
    </TouchableOpacity>
  </View>
));
