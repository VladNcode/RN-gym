import React from 'react';
import { Text } from 'react-native';

import { styles } from './styles';

interface InputProps {
  text: string;
  type?: 'tasks' | 'auth';
}

export const Title = React.memo(({ text, type = 'auth' }: InputProps) => (
  <Text style={type === 'auth' ? styles.authTitle : styles.taskTitle}>{text}</Text>
));
