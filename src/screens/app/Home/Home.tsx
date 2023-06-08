import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Dimensions, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PaymentSheet, useStripe } from '@stripe/stripe-react-native';
import {
  Button,
  Card,
  Icon,
  IconElement,
  Layout,
  Modal,
  StyleService,
  Text,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from '@ui-kitten/components';

const { width } = Dimensions.get('window');

const themedStyles = StyleService.create({
  container: { flex: 1 },
  backdrop: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
});

const MenuIcon = (props: any): IconElement => <Icon {...props} name="menu-outline" />;

const OpenMenuAction = (openMenu: () => void): React.ReactElement => (
  <TopNavigationAction onPress={openMenu} icon={MenuIcon} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardImageContainer: {
    borderRadius: 60,
    backgroundColor: '#F7F9FC',
    marginRight: 16,
    padding: 12,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardPrice: {
    marginTop: 16,
  },
  cardButton: {
    marginTop: 16,
  },
  itemCard: {
    padding: 16,
  },
  cartContainer: {
    borderTopWidth: 1,
    padding: 16,
  },
  footerControl: {
    marginHorizontal: 6,
    width: '40%',
  },
  checkoutText: {
    textAlign: 'center',
  },
  checkoutButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
});

const Home = (): React.ReactElement => {
  const merchandiseData = [
    {
      name: 'Gym T-shirt',
      description: 'Comfortable and stylish shirt for any workout.',
      price: '$24.99',
      image: require('../../../assets/icon.png'),
    },
    {
      name: 'Fitness Bag',
      description: 'Roomy and durable bag for gym-goers and outdoor enthusiasts.',
      price: '$39.99',
      image: require('../../../assets/icon.png'),
    },
    {
      name: 'Workout Gloves',
      description: 'Breathable and non-slip gloves for weightlifting or cross training.',
      price: '$14.99',
      image: require('../../../assets/icon.png'),
    },
    {
      name: 'Athletic Shoes',
      description: 'High-quality, durable shoes designed for running and training.',
      price: '$79.99',
      image: require('../../../assets/icon.png'),
    },
    {
      name: 'Yoga Mat',
      description: 'Eco-friendly mat with excellent grip and cushioning for yoga practice.',
      price: '$34.99',
      image: require('../../../assets/icon.png'),
    },
    {
      name: 'Protein Powder',
      description: 'Whey protein powder for muscle recovery and growth.',
      price: '$29.99',
      image: require('../../../assets/icon.png'),
    },
  ];

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const styless = useStyleSheet(themedStyles);
  const navigation = useNavigation<any>();

  const [cart, setCart] = useState<any>([]);
  const [visible, setVisible] = useState(false);

  const totalPrice = cart.reduce((total: any, product: any) => total + parseFloat(product.price.slice(1)), 0);

  const addToCart = (product: any) => {
    setCart((c: any) => [...c, product]);
  };

  const handleSheet = async () => {
    const body = JSON.stringify({
      amount: totalPrice.toFixed(2),
    });

    console.log('body :>> ', body);

    fetch('http://192.168.0.100:3000/create-payment-intent', {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        console.log('intent', res);

        initPaymentSheet({
          paymentIntentClientSecret: res.clientSecret,
          merchantDisplayName: 'Stripe.merchant',

          style: 'automatic',
        }).then(() => {
          setCart([]);
          presentPaymentSheet().then(r => {
            if (!r.error) {
              setVisible(true);
            }
          });
        });
      })
      .catch(e => {
        console.log(e);
        Alert.alert(e.message);
      });
  };

  const renderMerchandiseCard = (item: any, index: any) => (
    <Card style={styles.itemCard} key={index}>
      <View style={styles.cardContainer}>
        <View style={styles.cardImageContainer}>
          <Icon name="shopping-bag" width={60} height={60} fill="#8F9BB3" />
        </View>
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

  return (
    <Layout style={styles.container} level="1">
      <SafeAreaView style={styles.safeAreaContainer}>
        <TopNavigation
          accessoryLeft={() => {
            return OpenMenuAction(navigation.openDrawer);
          }}
          title="Home"
          alignment="center"
        />
      </SafeAreaView>

      <ScrollView>
        <View>{merchandiseData.map(renderMerchandiseCard)}</View>
      </ScrollView>

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

      <Modal visible={visible} backdropStyle={styless.backdrop} onBackdropPress={() => setVisible(false)}>
        <Card style={{ width: width * 0.8 }} disabled={true}>
          <Text>Welcome to UI Kitten 😻</Text>
          <Button onPress={() => setVisible(false)}>DISMISS</Button>
        </Card>
      </Modal>
    </Layout>
  );
};

export default Home;
