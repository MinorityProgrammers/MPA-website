import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import DonateStripeForm from './DonateStripeForm';

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

const DonateStripModal = ({ showModal, setShowModal, amount }) => {
  const [isDone, setIsDone] = useState(false);
  const [name, setName] = useState('');
  const [checkoutError, setCheckoutError] = useState();
  const [checkoutSuccess, setCheckoutSuccess] = useState();

  return (
    <>
      {showModal ? (
        <>
          <div className="donate__modal-overlay" />
          <div className="donate__modal-bg">
            <div className="donate__modal-content">
              {!isDone ? (
                <>
                  <h3>
                    Donation Amount: $
                    {amount}
                  </h3>
                  <Elements stripe={stripePromise}>
                    <DonateStripeForm
                      setIsDone={setIsDone}
                      name={name}
                      setName={setName}
                      setCheckoutError={setCheckoutError}
                      setCheckoutSuccess={setCheckoutSuccess}
                      checkoutSuccess={checkoutSuccess}
                      checkoutError={checkoutError}
                    />
                  </Elements>
                </>
              ) : (
                <div className="stripe-donated">
                  <p className="donated-success">Donate successful!</p>
                  <p>
                    Hi,
                    {name}
                  </p>
                  <p>Thank you for your contribution</p>
                  <hr className="mt-2 mb-2" />
                  <p>Details of donation:</p>
                  <div className="stripe-details">
                    <div className="stripe-detail">
                      <p className="stripe-detail-topic">Amount:</p>
                      <p>
                        $
                        {amount}
                      </p>
                    </div>
                    <div className="stripe-detail">
                      <p className="stripe-detail-topic">Payment method:</p>
                      <p>Credit card</p>
                    </div>
                  </div>
                  <a href="/index-4" className="btn-donate">
                    Back to MPA
                  </a>
                </div>
              )}
            </div>
            {isDone ? (
              ''
            ) : (
              <button
                type="button"
                className="donate__btn-close"
                onClick={() => setShowModal((prev) => !prev)}
              >
                <i className="fas fa-times" />
              </button>
            )}
          </div>
        </>
      ) : null}
    </>
  );
};

export default DonateStripModal;
