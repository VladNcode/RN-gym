import { Dimensions, StyleSheet } from 'react-native';

import { COLOR_SCHEME } from '../../../constants';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    margin: width * 0.06,
    marginTop: height * 0.1,
    flex: 1,
  },
  inputsContainer: {
    marginTop: 36,
  },
  input: {
    marginTop: 24,
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
    color: COLOR_SCHEME.darkGray,
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: COLOR_SCHEME.blue,
    marginTop: 24,
  },
});
