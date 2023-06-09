import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Text } from '@ui-kitten/components';

import { styles } from './styles';

interface InputProps {
  text: string;
  linkText: string;
  onPress: () => void;
}

const FooterLink = React.memo(({ text, linkText, onPress }: InputProps) => (
  <View style={styles.footer}>
    <Text category="h6">{text}</Text>

    <TouchableOpacity hitSlop={8} onPress={onPress}>
      <Text category="h6" status="primary" style={styles.footerLink}>
        {linkText}
      </Text>
    </TouchableOpacity>
  </View>
));

export default FooterLink;
