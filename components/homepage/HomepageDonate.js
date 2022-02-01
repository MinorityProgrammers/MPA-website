import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../contexts/provider';
import DonateAmount from '../donate/DonateAmount';
import DonateCompleted from '../donate/DonateCompleted';
import DonateDetails from '../donate/DonateDetails';
import DonatePayment from '../donate/DonatePayment';

const HomepageDonate = () => {
  const { amount, donateDispatch } = useContext(GlobalContext);
  const [isDone, setIsDone] = useState(false);
  const [count, setCount] = useState(1);
  const [monthly, setMonthly] = useState(false);

  const [succeeded, setSucceeded] = useState(false);
  const [, setOrderID] = useState(false);
  const [billingDetails, setBillingDetails] = useState([]);
  const [, setPayment] = useState([]);

  const handleValue = (e) => {
    donateDispatch({
      type: 'UPDATE_DONATE_AMOUNT',
      amount: e.target.value,
    });
  };

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
  // const createSubscription = (data, action) => {};

  const onApprove = (data, actions) => actions.order.capture().then((details) => {
    const { purchase_units } = details;
    setBillingDetails(details);
    setPayment(purchase_units);
    setSucceeded(true);
    setIsDone(true);
    setCount(count + 1);
  });

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
      <div className="donate__container">
        <div className="container">
          <h2 className="top__part__title">
            Donate
          </h2>
          <p className="donate__container-subtitle">
            We rely on donations from everyday people just like you to fund our strategic activism.
            Please make a recurring donation to our organization so we can continue to fight to
            bring marginalized communities into the STEM workforce.
          </p>
        </div>
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
        <div style={{ background: '#1C1D37', padding: '2.5rem 0' }} className="tw-my-20">
          <div className="container step__payment-monthly">
            <div className="">
              <input
                type="radio"
                className="step__payment-option"
                name="month_sub"
                onClick={() => {
                  setMonthly(true);
                }}
              />
              <label>Monthly Donation</label>

            </div>
            <div className="">
              <input
                type="radio"
                className="step__payment-option"
                name="month_sub"
                onClick={() => {
                  setMonthly(false);
                }}
              />
              <label>I want to make a single  donation</label>
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
            !succeeded ? (
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
                // createSubscription={createSubscription}
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
            )
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
        {/* <div className="donate__options">
          <h2 className="tw-text-blue-900">Other ways to support us:</h2>
          <div className="donation__option">
            <a
              href="https://commerce.coinbase.com/charges/ZT33MCJR"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-bitcoin" />
            </a>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default HomepageDonate;
