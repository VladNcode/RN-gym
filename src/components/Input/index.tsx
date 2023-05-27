import React from 'react';
import { Image, ScrollView, Text, TextInput, TextInputProps, ViewStyle } from 'react-native';

import { COLOR_SCHEME } from '../../constants';
import { styles } from './styles';

interface InputProps extends TextInputProps {
  style?: ViewStyle;
  errorText?: string | boolean;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  type?: 'outlined';
  icon?: boolean;
}

export const Input = React.memo(
  ({
    errorText = '',
    style = {},
    type,
    icon = false,
    placeholder = 'Search...',
    onChangeText,
    ...rest
  }: InputProps) => {
    return (
      <ScrollView
        contentContainerStyle={[
          styles.container,
          style,
          type === 'outlined' && styles.outlined,
          icon && styles.containerWithIcon,
          !!errorText && styles.errorBorder,
        ]}>
        {icon && <Image resizeMode="contain" style={styles.icon} source={require('../../assets/datePickerIcon.png')} />}
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          placeholderTextColor={COLOR_SCHEME.darkGray}
          placeholder={placeholder}
          {...rest}
        />
        {errorText && typeof errorText === 'string' && <Text style={styles.errorText}>{errorText}</Text>}
      </ScrollView>
    );
  },
);
