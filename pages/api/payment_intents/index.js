import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: '2020-03-02',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount } = req.body;
    try {
      const params = {
        payment_method_types: ['card'],
        amount,
        currency: 'usd',
        description: 'MPA Donation',
      };
      const payment_intent = await stripe.paymentIntents.create(params);

      res.status(200).json(payment_intent);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
