import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.06,
    paddingTop: height * 0.1,
  },
  inputsContainer: {
    marginTop: 36,
  },
  input: {
    marginTop: 12,
  },
  button: {
    marginTop: 46,
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
