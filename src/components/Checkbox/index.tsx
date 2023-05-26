import React from 'react';
import { Pressable, View } from 'react-native';

import { styles } from './styles';

interface CheckboxProps {
  checked: boolean;
  setChecked?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Checkbox = React.memo(({ checked, setChecked }: CheckboxProps) => {
  const onPress = () => {
    if (setChecked) setChecked(value => !value);
  };

  return (
    <Pressable onPress={onPress} style={[styles.container, checked && styles.checked]}>
      {checked && <View style={styles.innerSquare} />}
    </Pressable>
  );
});
