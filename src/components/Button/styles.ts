import { StyleSheet } from 'react-native';

import { COLOR_SCHEME } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_SCHEME.purple,
    borderRadius: 10,
    padding: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: COLOR_SCHEME.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
