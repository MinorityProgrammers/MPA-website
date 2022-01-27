import React, { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import SponsorshipPaymentCompleted from './SponsorshipPaymentCompleted';
import SponsorshipPaymentDetails from './SponsorshipPaymentDetails';

const SponsorshipCard = ({ sponsorshipOption }) => {
  const [isDone, setIsDone] = useState(false);
  const [count, setCount] = useState(1);

  const [succeeded, setSucceeded] = useState(false);
  const [, setOrderID] = useState(false);
  const [billingDetails, setBillingDetails] = useState([]);
  const [, setPayment] = useState([]);

  const amount = sponsorshipOption === 'ally'
    ? 5000
    : sponsorshipOption === 'friend'
      ? 3000
      : sponsorshipOption === 'mafia'
        ? 1000
        : 0;

  // creates one time paypal order
  const createOrder = (data, actions) => actions.order
    .create({
      purchase_units: [
        {
          amount: {
            value: amount,
          },
        },
      ],
      application_context: {
        shipping_preference: 'NO_SHIPPING',
      },
    })
    .then((_orderID) => {
      setOrderID(_orderID);
      return _orderID;
    });

  // handles when a payment is confirmed for paypal
  const onApprove = (data, actions) => actions.order.capture().then((details) => {
    const { purchase_units } = details;
    setBillingDetails(details);
    setPayment(purchase_units);
    setSucceeded(true);
    setIsDone(true);
    setCount(count + 1); // this was changed from count++ to setCount(count+1)
  });

  return (
    <div className="sponsor-card-wrapper">
      <div className="sponsor-card">
        <h1>Pay with credit card</h1>

        {count === 1 ? (
          <>
            {!succeeded ? (
              <PayPalButtons
                style={{
                  color: 'white',
                  shape: 'rect',
                  label: 'pay',
                  tagline: false,
                  layout: 'horizontal',
                }}
                createOrder={createOrder}
                onApprove={onApprove}
                fundingSource={paypal.FUNDING.PAYPAL}
              />
            ) : (
              <SponsorshipPaymentCompleted
                sponsorshipOption={sponsorshipOption}
                billingDetails={billingDetails}
                count={count}
                setCount={setCount}
                amount={amount}
                isDone={isDone}
                setIsDone={setIsDone}
                succeeded={succeeded}
              />
            )}
          </>
        ) : null}
        {count === 2 ? (
          <SponsorshipPaymentDetails
            sponsorshipOption={sponsorshipOption}
            amount={amount}
            billingDetails={billingDetails}
            count={count}
            setCount={setCount}
            setIsDone={setIsDone}
          />
        ) : null}

        {succeeded ? (
          <div className="step__button mt-3">
            <button
              className="button btn-gradient"
              type="submit"
              onClick={() => {
                setCount(count + 1);
                setIsDone(!isDone);
              }}
              disabled={count > 2}
            >
              Continue
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default SponsorshipCard;
