import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    padding: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    bottom: 0,
    width,
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 16,
  },
  buttonsContainer: {
    width: width * 0.65,
    marginTop: 40,
  },
  bottomButton: {
    marginTop: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
