import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layoutContainer: {
    flex: 1,
    padding: 24,
  },
  text: {
    marginTop: 20,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerControl: {
    marginHorizontal: 6,
    width: '40%',
  },
  name: {
    marginTop: 5,
  },
  alignCenter: {
    alignItems: 'center',
  },
  image: { width: 150, height: 150, borderRadius: 100 },
  divider: {
    marginVertical: 20,
  },
  spinner: { justifyContent: 'center', alignItems: 'center', marginTop: '70%' },
  timeSelector: { marginTop: 20 },
  selectedDateText: {
    textAlign: 'center',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    width: '80%',
  },
  modalText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  modalButtonsContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButton: {
    marginHorizontal: 8,
  },
  alreadyEnrolled: {
    marginTop: 16,
    textAlign: 'center',
  },
});

export default styles;
