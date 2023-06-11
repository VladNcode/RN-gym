import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1 },
  backdrop: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  safeAreaContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 60,
    marginRight: 16,
  },
  cardTextContainer: { flex: 1 },
  cardPrice: { marginTop: 16 },
  cardButton: { marginTop: 16 },
  itemCard: { padding: 16 },
  cartContainer: {
    borderTopWidth: 1,
    padding: 16,
  },
  footerControl: {
    marginHorizontal: 6,
    width: '40%',
  },
  checkoutText: { textAlign: 'center' },
  checkoutButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  modalCard: { width: width * 0.8, minHeight: 150, justifyContent: 'center', alignItems: 'center' },
  modalButton: { marginTop: 16 },
  spinner: { justifyContent: 'center', alignItems: 'center', marginTop: '70%' },
});

export default styles;
