import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.06,
    paddingTop: height * 0.1,
  },
  button: {
    marginTop: 46,
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputsContainer: {
    marginTop: 36,
  },
  input: {
    marginTop: 12,
  },
});

export default styles;
