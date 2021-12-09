import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../contexts/provider';
import DonateAmount from '../DonateAmount';
import DonatePayment from '../DonatePayment';
import DonateCompleted from '../DonateCompleted';
import DonateDetails from '../DonateDetails';

const HomepageDonate = function () {
  const { amount, donateDispatch } = useContext(GlobalContext);
  const [isDone, setIsDone] = useState(false);
  const [count, setCount] = useState(1);
  const [value, setValue] = useState(0);
  const [monthly, setMonthly] = useState(false);

  const [succeeded, setSucceeded] = useState(false);
  const [paypalErrorMessage, setPaypalErrorMessage] = useState('');
  const [orderID, setOrderID] = useState(false);
  const [billingDetails, setBillingDetails] = useState([]);
  const [payment, setPayment] = useState([]);

  // get donate amount when click
  const handleValue = (e) => {
    // dispatch
    donateDispatch({
      type: 'UPDATE_DONATE_AMOUNT',
      amount: e.target.value,
    });
  };

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
    .then((orderID) => {
      setOrderID(orderID);
      return orderID;
    });

  // create paypal subscription
  const createSubscription = (data, action) => {
    // return actions.subscription.create({
    //     'plan_id': 'P-2UF78835G6983425GLSM44MA'
    // })
  };

  // handles when a payment is confirmed for paypal
  const onApprove = (data, actions) => actions.order.capture().then((details) => {
    const { purchase_units } = details;
    setBillingDetails(details);
    setPayment(purchase_units);
    setSucceeded(true);
    setIsDone(true);
    count++;
  });
  // handles payment errors
  const onError = () => {
    setPaypalErrorMessage('Something went wrong with your payment');
  };

  const scrollTo = () => {
    const currentLocation = window.location.href;
    const hasAnchor = currentLocation.includes('/#');
    if (hasAnchor) {
      const anchorId = `${currentLocation.substring(
        currentLocation.indexOf('#') + 1,
      )}`;
      const anchor = document.getElementById(anchorId);
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  scrollTo();

  return (
    <section id="donate" className="homepage__donate">
      <div className="heading__number">
        <h3 className="tw-text-blue-900">07</h3>
      </div>
      <div className="container donate__container">
        <h2 className="heading__title mt-5 mb-5 tw-text-blue-900">
          &lsaquo;Donate/&rsaquo;
        </h2>
        <p className="donate__container-subtitle">
          We rely on donations from everyday people just like you to fund our
          strategic activism. Please make a recurring donation to our
          organization so we can continue to fight to bring marginalized
          communities into the STEM workforce.
        </p>

        <div className="container">
          <div className="row step__header">
            <div
              className={`col step__header-item ${
                count === 1 ? 'step-active' : ''
              } ${isDone ? 'step-done' : ''}`}
            >
              {isDone && amount !== 0 ? (
                <i className="far fa-check-circle" />
              ) : null}
              {' '}
              Amount
            </div>
            <div
              className={`col step__header-item ${
                count === 2 ? 'step-active' : ''
              } ${isDone && succeeded ? 'step-done' : ''}`}
            >
              {isDone && succeeded ? (
                <i className="far fa-check-circle" />
              ) : null}
              {' '}
              Payments
            </div>
            <div
              className={`col step__header-item ${
                count === 3 ? 'step-done' : ''
              }`}
            >
              {isDone && succeeded ? (
                <i className="far fa-check-circle" />
              ) : null}
              Details
            </div>
          </div>
        </div>

        <div>
          {count === 1 ? (
            <DonateAmount
              handleValue={handleValue}
              amount={amount}
              count={count}
              setCount={setCount}
              isDone={isDone}
              setIsDone={setIsDone}
            />
          ) : null}
          {count === 2 ? (
            <>
              {!succeeded ? (
                <DonatePayment
                  amount={amount}
                  count={count}
                  setCount={setCount}
                  isDone={isDone}
                  setIsDone={setIsDone}
                  setMonthly={setMonthly}
                  monthly={monthly}
                  createOrder={createOrder}
                  onApprove={onApprove}
                  createSubscription={createSubscription}
                />
              ) : (
                <DonateCompleted
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
          {count === 3 ? (
            <DonateDetails
              amount={amount}
              billingDetails={billingDetails}
              count={count}
              setCount={setCount}
              setIsDone={setIsDone}
            />
          ) : null}
        </div>
        <div className="donate__options">
          <h2 className="tw-text-blue-900">Other ways to support us:</h2>
          <div className="donation__option">
            <a
              href="https://commerce.coinbase.com/charges/ZT33MCJR"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-bitcoin" />
            </a>
            <a href="sponsorship" target="_blank" rel="noreferrer">
              <i className="fas fa-gift" />
            </a>
            <a href="sponsorship" target="_blank" rel="noreferrer">
              <i className="fas fa-hand-holding-usd" />
            </a>
            <a href="sponsorship" target="_blank" rel="noreferrer">
              <i className="fab fa-twitch" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageDonate;

// Paypal subscription
// https://medium.com/analytics-vidhya/paypal-subscription-in-react-1121c39b26be
// https://github.com/skydiver/nextjs-paypal-integration

// Stripe subscription
