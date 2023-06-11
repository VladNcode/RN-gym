import { Dimensions, StyleSheet } from 'react-native';

import { COLOR_SCHEME } from '../../../constants';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    padding: width * 0.06,
    paddingTop: height * 0.1,
    flex: 1,
  },
  inputsContainer: {
    marginTop: 36,
  },
  input: {
    marginTop: 12,
  },
  checkboxContainer: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxTextContainer: {
    marginLeft: 13,
    flexDirection: 'row',
  },
  checkboxText: {
    color: COLOR_SCHEME.gray,
  },
  link: {
    textDecorationLine: 'underline',
  },
  button: {
    marginTop: 24,
  },
  checkboxError: { marginTop: 6 },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
