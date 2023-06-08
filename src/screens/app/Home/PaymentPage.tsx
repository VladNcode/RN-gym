import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CardField, useStripe } from '@stripe/stripe-react-native';
import { Button, Layout, StyleService, useStyleSheet } from '@ui-kitten/components';

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  cardStyle: {
    backgroundColor: 'color-basic-300' as const,
    textColor: '#000000' as const,
  },
  cardFieldStyle: {
    width: '100%',
    height: 50,
    marginVertical: 30,
  },
  layoutContainer: {
    flex: 1,
    padding: 24,
  },
});

const PaymentPage = () => {
  const { confirmPayment, initPaymentSheet, presentPaymentSheet } = useStripe();

  const styles = useStyleSheet(themedStyles);

  const [key, setKey] = useState('');
  const [visible, setVisible] = useState(false);

  console.log('key', key);

  useEffect(() => {
    fetch('http://192.168.0.100:3000/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        console.log('intent', res);
        setKey((res as { clientSecret: string }).clientSecret);

        initPaymentSheet({
          paymentIntentClientSecret: key,
          merchantDisplayName: 'Stripe.merchant',
        });
      })
      .catch(e => {
        console.log(e);
        Alert.alert(e.message);
      });
  }, []);

  const handleConfirmation = async () => {
    if (key) {
      const { paymentIntent, error } = await confirmPayment(key, {
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails: {
            email: 'John@email.com',
          },
        },
      });

      if (!error) {
        Alert.alert('Received payment', `Billed for ${paymentIntent?.amount}`);
        console.log(paymentIntent?.amount);
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  const handleSheet = () => {
    presentPaymentSheet();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.layoutContainer} level="1">
        <CardField
          postalCodeEnabled={false}
          placeholders={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={styles.cardStyle as any}
          style={styles.cardFieldStyle}
          onCardChange={cardDetails => {
            console.log('cardDetails', cardDetails);
          }}
          onFocus={focusedField => {
            console.log('focusField', focusedField);
          }}
        />
        <Button onPress={handleConfirmation}>Confirm payment</Button>
        <Button onPress={handleSheet}>Initialize payment sheet</Button>
      </Layout>
    </SafeAreaView>
  );
};

export default PaymentPage;
