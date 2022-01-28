import React from 'react';

const SponsorshipPaymentCompleted = ({
  sponsorshipOption,
  billingDetails,
  count,
  setCount,
  amount,
  setIsDone,
}) => (
  <div className="step__completed">
    <h2 style={{ textAlign: 'center' }}>
      Hi,
      {' '}
      {billingDetails?.payer?.name?.given_name}
    </h2>
    <h2 style={{ textAlign: 'center' }}>Thank you for your sponsorship</h2>

    <div
      style={{ display: 'flex', flexDirection: 'column' }}
      className="container step__completed-details"
    >
      <div className="step__details-box">
        <p
          style={{
            alignSelf: 'center',
            color: 'white',
            textAlign: 'center',
            fontSize: '110%',
            fontWeight: 'bold',
            marginBottom: '20px',
          }}
        >
          Details of MINORITY
          {' '}
          {sponsorshipOption?.toUpperCase()}
          {' '}
          sponsorship
          Payment:
        </p>
        <div className="row">
          <div className="col">
            <p>Name:</p>
          </div>
          <div className="col">
            <p>{billingDetails?.payer?.name?.given_name}</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p>Amount:</p>
          </div>
          <div className="col">
            <p>
              $
              {Number(amount).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p>Date:</p>
          </div>
          <div className="col">
            <p>{new Date(billingDetails?.create_time).toLocaleString()}</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p>Payment method:</p>
          </div>
          <div className="col">
            <p>PayPal</p>
          </div>
        </div>
      </div>
    </div>

    <div className="step__button mt-3">
      <button
        className="button btn-gradient"
        type="submit"
        onClick={() => {
          setCount(count + 1);
          setIsDone(true);
        }}
        disabled={count > 2}
      >
        Complete
      </button>
    </div>
  </div>
);

export default SponsorshipPaymentCompleted;
