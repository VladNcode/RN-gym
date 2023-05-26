import { Dimensions, StyleSheet } from 'react-native';
import { COLOR_SCHEME } from '../../../constants';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_SCHEME.white,
    padding: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: height * 0.6,
  },
  title: {
    color: COLOR_SCHEME.black,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: COLOR_SCHEME.gray,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 16,
    maxWidth: width * 0.65,
  },
  buttonsContainer: {
    width: width * 0.65,
    marginTop: 40,
  },
  bottomButton: {
    backgroundColor: COLOR_SCHEME.blue,
    marginTop: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
