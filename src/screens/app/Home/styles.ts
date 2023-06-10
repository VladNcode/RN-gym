import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
  },
  bodyContainer: {
    padding: 25,
    paddingTop: 10,
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginTop: 10,
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 12,
  },
  card: {
    marginTop: 25,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  spinner: { justifyContent: 'center', alignItems: 'center', marginTop: '70%' },
});

export default styles;
