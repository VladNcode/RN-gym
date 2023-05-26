import { StyleSheet } from 'react-native';
import { COLOR_SCHEME } from '../../constants';

export const styles = StyleSheet.create({
  checked: { borderWidth: 2 },
  container: {
    borderWidth: 1,
    borderColor: COLOR_SCHEME.purple,
    borderRadius: 3,
    height: 16,
    width: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerSquare: {
    height: 8,
    width: 8,
    backgroundColor: COLOR_SCHEME.purple,
  },
});
