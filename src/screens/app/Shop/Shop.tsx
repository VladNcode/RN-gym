import firestore from '@react-native-firebase/firestore';
import React, { useMemo, useState } from 'react';
import { Image, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRecoilValue } from 'recoil';

import { useStripe } from '@stripe/stripe-react-native';
import { Button, Card, Layout, Modal, Spinner, Text, TopNavigation } from '@ui-kitten/components';

import useFetchData from '../../../hooks/useFetchData';
import useSocialShareButton from '../../../hooks/useSocialShareButton';
import { userState } from '../../../store/user';
import styles from './styles';
import { Product } from './types';

const Shop = (): React.ReactElement => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const user = useRecoilValue(userState);

  const SocialShareButton = useSocialShareButton();

  const [products, loading] = useFetchData<Product>('products');

  const [cart, setCart] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(false);

  const userRef = firestore().doc(`users/${user?.uid}`);

  const totalPrice = useMemo(
    () => cart.reduce((total: number, product: Product) => total + parseFloat(product.price.slice(1)), 0),
    [cart],
  );

  const addToCart = (product: Product) => {
    setCart(c => [...c, product]);
  };

  const closeModal = () => {
    setVisible(false);
    setError(false);
  };

  const handleSheet = async () => {
    const body = JSON.stringify({
      amount: totalPrice.toFixed(2),
    });

    try {
      const response = await fetch('http://192.168.0.100:3000/create-payment-intent', {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const res = await response.json();
      console.log('intent', res);

      await initPaymentSheet({
        paymentIntentClientSecret: res.clientSecret,
        merchantDisplayName: 'Stripe.merchant',
        style: 'automatic',
      });

      const paymentResult = await presentPaymentSheet();

      if (!paymentResult.error) {
        const doc = {
          userId: userRef,
          products: cart,
          paid: true,
          received: false,
        };

        await firestore().collection('usersPurhases').add(doc);
        setVisible(true);
      }
    } catch (e) {
      console.error(e);
      setError(true);
      setVisible(true);
    } finally {
      setCart([]);
    }
  };

  const renderMerchandiseCard = ({ item }: { item: Product }) => (
    <Card style={styles.itemCard} key={item.id}>
      <View style={styles.cardContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />

        <View style={styles.cardTextContainer}>
          <Text category="h6">{item.name}</Text>
          <Text category="s1">{item.description}</Text>
          <Text category="h6" style={styles.cardPrice}>
            {item.price}
          </Text>
        </View>
      </View>
      <Button onPress={() => addToCart(item)} style={styles.cardButton}>
        ADD TO CART
      </Button>
    </Card>
  );

  if (loading) {
  }

  return (
    <Layout style={styles.container} level="1">
      <SafeAreaView style={styles.safeAreaContainer}>
        <TopNavigation title="Shop" alignment="center" />
      </SafeAreaView>

      {loading ? (
        <View style={styles.spinner}>
          <Spinner size="giant" />
        </View>
      ) : (
        <FlatList data={products} renderItem={renderMerchandiseCard} keyExtractor={item => item.id} />
      )}

      {cart.length > 0 && (
        <Layout style={styles.cartContainer} level="3">
          <Text category="h6" style={styles.checkoutText}>
            Shopping Cart Total: ${totalPrice.toFixed(2)}
          </Text>

          <View style={styles.checkoutButtonsContainer}>
            <Button status="basic" style={styles.footerControl} size="small" onPress={() => setCart([])}>
              Clear cart
            </Button>
            <Button status="info" style={styles.footerControl} size="small" onPress={handleSheet}>
              Checkout
            </Button>
          </View>
        </Layout>
      )}

      <Modal visible={visible} backdropStyle={styles.backdrop} onBackdropPress={closeModal}>
        <Card style={styles.modalCard} disabled={true}>
          <Text category="h6">{error ? 'Your purchase has failed! 🤯' : 'Your purchase was successfull! 😻'}</Text>
          <Button size="small" style={styles.modalButton} status={error ? 'basic' : 'success'} onPress={closeModal}>
            DISMISS
          </Button>

          {!error && (
            <SocialShareButton
              styles={styles.modalButton}
              options={{
                message: `Check out all the cool things you can buy in this gym!`,
              }}
            />
          )}
        </Card>
      </Modal>
    </Layout>
  );
};

export default Shop;
