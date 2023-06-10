import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
  },
  map: {
    width,
    height: height / 2.3,
    marginTop: 10,
  },
  address: {
    textAlign: 'center',
  },
  divider: {
    marginVertical: 10,
  },
  description: {
    marginTop: 10,
  },
  hoursContainer: {
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  hours: {
    width: '40%',
  },
  spinner: { justifyContent: 'center', alignItems: 'center', marginTop: '70%' },
});

export default styles;
