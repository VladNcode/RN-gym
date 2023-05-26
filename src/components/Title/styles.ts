import { StyleSheet } from 'react-native';

import { COLOR_SCHEME } from '../../constants';

export const styles = StyleSheet.create({
  authTitle: {
    color: COLOR_SCHEME.black,
    fontSize: 28,
    fontWeight: '700',
  },
  taskTitle: {
    fontSize: 24,
    color: COLOR_SCHEME.black,
    fontWeight: '300',
    marginTop: 42,
  },
});
