import React from "react";

const DonateCompleted = ({
  billingDetails,
  count,
  setCount,
  amount,
  isDone,
  setIsDone,
}) => {
  return (
    <>
      <div className="step__completed">
        <h2>Hi, {billingDetails.payer.name.given_name}</h2>
        <h2>Thank you for your contribution</h2>

        <div className="container step__completed-details">
          <p className="mb-2 title">Details of donation:</p>
          <div className="step__details-box">
            <div className="row">
              <div className="col">
                <p>Name:</p>
              </div>
              <div className="col">
                <p>{billingDetails.payer.name.given_name}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p>Amount:</p>
              </div>
              <div className="col">
                <p>${Number(amount).toFixed(2)}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p>Date:</p>
              </div>
              <div className="col">
                <p>{new Date(billingDetails.create_time).toLocaleString()}</p>
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
    </>
  );
};

export default DonateCompleted;
