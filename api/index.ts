import 'dotenv/config';
import express from 'express';
import Stripe from 'stripe';

if (!process.env.STRIPE_KEY) throw Error('Stripe key is missing in env');

const stripe = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: '2022-11-15',
  typescript: true,
});
const app = express();
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  console.log('request');
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.floor(req.body.amount * 100), // 50 usd
    currency: 'usd',
  });

  return res.status(200).json({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(3000, () => console.log('Server up'));
