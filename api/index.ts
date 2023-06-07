import express from 'express';
import Stripe from 'stripe';

const stripe = new Stripe('secret_key', {
  apiVersion: '2022-11-15',
  typescript: true,
});
const app = express();
app.use(express.json());

app.post('/create-payment-intent', async (_, res) => {
  console.log('request');
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 5000, // 50 usd
    currency: 'usd',
  });

  return res.status(200).json({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(3000, () => console.log('Server up'));
