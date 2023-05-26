import { StyleSheet } from 'react-native';

import { COLOR_SCHEME } from '../../constants';

export const styles = StyleSheet.create({
  footer: {
    marginTop: 36,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: COLOR_SCHEME.gray,
    fontSize: 15,
  },
  footerLink: {
    color: COLOR_SCHEME.purple,
    marginLeft: 5,
    fontSize: 15,
    fontWeight: '700',
  },
});
