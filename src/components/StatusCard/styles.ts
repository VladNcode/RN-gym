import { Dimensions, StyleSheet } from 'react-native';

import { COLOR_SCHEME } from '../../constants';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_SCHEME.lightGray,
    borderRadius: 15,
    padding: 12,
    marginTop: 15,
    width: width * 0.26,
  },

  label: {
    fontSize: 10,
    color: COLOR_SCHEME.blue,
  },
  count: {
    color: COLOR_SCHEME.blue,
    marginTop: 13,
    fontSize: 28,
    fontWeight: '500',
    marginBottom: 8,
  },
  errorContainer: {
    backgroundColor: COLOR_SCHEME.lightRed,
  },
  errorText: {
    color: 'red',
  },
});
