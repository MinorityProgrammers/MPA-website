import React, { useContext } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { GlobalContext } from '../../contexts/provider';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#6772e5',
      color: '#6772e5',
      fontWeight: '400',
      fontFamily: 'Red Hat Display, Segoe UI, sans-serif',
      fontSize: '14px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#7b818a',
      },
    },
    invalid: {
      iconColor: '#ef2961',
      color: '#ef2961',
    },
  },
};

const STRIP_FORM = {
  alignSelf: 'center',
  borderRadius: '7px',
  width: '250px',
};

const CARD_BUTTON = {
  background: '#5469d4',
  color: '#ffffff',
  borderRadius: '4px',
  border: '0',
  padding: '12px 16px',
  fontSize: '16px',
  cursor: 'pointer',
  display: 'block',
  transition: 'all 0.2s ease',
  boxShadow: '0px 4px 5.5px 0px rgba(0, 0, 0, 0.07)',
  width: '50%',
  margin: '2rem auto 0 auto',
};

const INPUT = {
  color: '#6772e5',
  border: '1px solid #6772e5',
  borderRadius: '5px',
  padding: '5px',
  margin: '1rem 0',
  width: '100%',
};

const DonateStripeForm = ({
  setIsDone,
  name,
  setName,
  setCheckoutError,
  setCheckoutSuccess,
  checkoutError,
  checkoutSuccess,
}) => {
  const { amount } = useContext(GlobalContext);
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/payment_intents', {
        body: JSON.stringify({
          amount: amount * 100,
          name,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      const result = await res.json();
      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        result.client_secret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name,
            },
          },
        }
      );

      if (error) throw new Error(error.message);
      if (result) {
        setCheckoutSuccess(true);
        setIsDone(true);
      }
    } catch (err) {
      setCheckoutError(err.message);
    }
  };
  return (
    <form onSubmit={handleSubmit} style={STRIP_FORM}>
      <input
        placeholder="Cardholder name"
        style={INPUT}
        type="Text"
        name="cardholderName"
        onChange={handleChange}
        required
      />
      <CardElement options={CARD_OPTIONS} />
      <button
        type="submit"
        disabled={!stripe}
        style={CARD_BUTTON}
        className="btn btn-filled"
      >
        Donate
      </button>
    </form>
  );
};

export default DonateStripeForm;
