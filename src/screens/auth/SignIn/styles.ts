import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    margin: width * 0.06,
    marginTop: height * 0.1,
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
});
