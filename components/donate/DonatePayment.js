import React, { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import DonateStripeModal from './DonateStripeModal';

const DonatePayment = ({
  amount,
  count,
  setCount,
  setIsDone,
  isDone,
  monthly,
  createOrder,
  onApprove,
  succeeded,
  createSubscription,
}) => {
  const [showModal, setShowModal] = useState(false);
  // modal for stripe
  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <>
      <div className="step__payment container">
        <h2 className="step__payment-amount">
          $
          {amount}
          {monthly === true && '/month'}
        </h2>
        <h2
          className="step__payment-change"
          onClick={() => {
            setCount(count - 1);
            setIsDone(false);
          }}
          disabled={count < 2}
        >
          <p>
            <i className="far fa-edit" />
            {' '}
            Change amount
          </p>
        </h2>
      </div>
      {/* <p className="text-md mt-2 mb-2">Make it monthly!</p> */}
      <div className="payment__buttons container mt-3">
        <div className="col mt-4">
          <p className="mt-2 mb-2">Pay with card</p>
          <div className="stripe-payment tw-mr-5" onClick={() => openModal()}>
            <a>Pay by card</a>
          </div>
          <DonateStripeModal
            showModal={showModal}
            setShowModal={setShowModal}
            amount={amount}
          />
        </div>
        <div className="col mt-4">
          <p className="mt-2 mb-2">Or make a donation with</p>
          {monthly === false ? (
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
            <>
              <PayPalButtons
                amount={amount}
                currency="USD"
                createSubscription={createSubscription}
                style={{
                  label: 'subscribe',
                }}
                fundingSource={paypal.FUNDING.PAYPAL}
              />
            </>
          )}
        </div>
      </div>
      {/* <div className="donate__legal">
        <h2>Legal information:</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In morbi ut
          adipiscing pulvinar risus, sit ut velit duis. Metus nibh nulla diam
          egestas mauris egestas rhoncus cras.
        </p>
      </div> */}
      {succeeded && (
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
      )}
    </>
  );
};

export default DonatePayment;
