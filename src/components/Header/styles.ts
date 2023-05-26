import { StyleSheet } from 'react-native';

import { COLOR_SCHEME } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: COLOR_SCHEME.purple,
    fontSize: 16,
    fontWeight: '500',
  },
  icon: {
    width: 24,
    height: 24,
  },
});
