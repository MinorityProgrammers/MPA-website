import React from 'react';

const DonateAmount = ({
  handleValue,
  amount,
  count,
  setCount,
  setIsDone,
  isDone,
}) => (
  <div className="step__amount">
    <h2 className="tw-text-blue-900">Choose the amount of your gift:</h2>
    <div className="row step__amount-items">
      <div className="col-lg-3 col-md-3 col-sm-6 col-custom">
        <button
          type="button"
          className="step__amount-item"
          value="250"
          onClick={handleValue}
        >
          $250
        </button>
      </div>
      <div className="col-lg-3 col-md-3 col-sm-6 col-custom">
        <button
          type="button"
          className="step__amount-item"
          value="100"
          onClick={handleValue}
        >
          $100
        </button>
      </div>
      <div className="col-lg-3 col-md-3 col-sm-6 col-custom">
        <button
          type="button"
          className="step__amount-item"
          value="75"
          onClick={handleValue}
        >
          $75
        </button>
      </div>
      <div className="col-lg-3 col-md-3 col-sm-6 col-custom">
        <button
          type="button"
          className="step__amount-item"
          value="50"
          onClick={handleValue}
        >
          $50
        </button>
      </div>
      <div className="col-lg-3 col-md-3 col-sm-6 col-custom">
        <button
          type="button"
          className="step__amount-item"
          value="30"
          onClick={handleValue}
        >
          $30
        </button>
      </div>
      <div className="col-lg-3 col-md-3 col-sm-6 col-custom">
        <button
          type="button"
          className="step__amount-item"
          value="10"
          onClick={handleValue}
        >
          $10
        </button>
      </div>
      <div className="col-lg-3 col-md-3 col-sm-6 col-custom">
        <button
          type="button"
          className="step__amount-item"
          value="3"
          onClick={handleValue}
        >
          $3
        </button>
      </div>
      <div className="col-lg-3 col-md-3 col-sm-6 col-custom">
        <div className="step__amount-item">
          <i className="fas fa-dollar-sign" />
          <input
            type="number"
            className="amount-input "
            min="1"
            value={amount}
            onChange={(e) => handleValue(e)}
          />
        </div>
      </div>
    </div>
    {amount && (
      <div className="step__button mt-3">
        <button
          className="button btn-blued"
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
  </div>
);

export default DonateAmount;
