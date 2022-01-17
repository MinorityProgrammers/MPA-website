import React, { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import SponsorshipPaymentCompleted from './SponsorshipPaymentCompleted';
import SponsorshipPaymentDetails from './SponsorshipPaymentDetails';

const SponsorshipCard = function ({
  // cardNumber,
  // expMonth,
  // expYear,
  // cardCVC,
  // sponsorCardSaving,
  // termsAgreed,
  // handleCardNumberInput,
  // handleExpMonthInput,
  // handleExpYearInput,
  // handleCardCardCVCInput,
  // handleSponsorCardSave,
  // handleTermsAgreed,
  // handleSponsorCardSubmit,
  sponsorshipOption,
}) {
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

        {/* <h1>Almost complete. All we need is your billing information.</h1>
        <form onSubmit={handleSponsorCardSubmit}>
          <fieldset>
            <div className="sponsor-card-and-total">
              <div className="sponsor-ccd-wrapper">
                <div className="sponsor-ccd">
                  <legend>CREDIT CARD DETAILS</legend>
                  <label>
                    CARD NUMBER
                    <input
                      required
                      type="text"
                      placeholder="XXXX - XXXX - XXXX - XXXX"
                      value={cardNumber}
                      onChange={handleCardNumberInput}
                    />
                  </label>
                  <h4>EXPIRATION</h4>
                  <div className="exp-data">
                    <label>
                      MONTH <br />
                      <input
                        required
                        type="number"
                        placeholder="(MM)"
                        maxLength="2"
                        value={expMonth}
                        onChange={handleExpMonthInput}
                      />
                    </label>
                    <label>
                      YEAR <br />
                      <input
                        required
                        type="number"
                        placeholder="(YY)"
                        maxLength="4"
                        value={expYear}
                        onChange={handleExpYearInput}
                      />
                    </label>
                    <label>
                      CVV <br />
                      <input
                        required
                        type="number"
                        placeholder="***"
                        maxLength="3"
                        value={cardCVC}
                        onChange={handleCardCardCVCInput}
                      />
                    </label>
                  </div>
                </div>
                <div
                  className={`ccd-save-btn ${
                    sponsorCardSaving && "ccd-save-active"
                  }`}
                  onClick={handleSponsorCardSave}
                >
                  SAVE CARD
                </div>
                <div className="ccd-agree-submit">
                  <label>
                    <input
                      required
                      type="checkbox"
                      checked={termsAgreed}
                      onChange={() => handleTermsAgreed(!termsAgreed)}
                    />
                    I agree to all<span> </span>
                    <a href="#">Terms & Conditions</a>
                  </label>
                  <input type="submit" value="SUBMIT" />
                </div>
              </div>
              <div className="sponsor-payment-total">
                <h3>PAYMENT TOTAL</h3>
                <h4>${amount}</h4>
              </div>
            </div>
          </fieldset>
        </form> */}
      </div>
    </div>
  );
};

export default SponsorshipCard;
