import { StyleSheet } from 'react-native';

import { COLOR_SCHEME } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: COLOR_SCHEME.blue,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  plus: {
    fontSize: 30,
    marginTop: -3,
    marginLeft: 1,
    color: COLOR_SCHEME.white,
    fontWeight: '600',
  },
});
