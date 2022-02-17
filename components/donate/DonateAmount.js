import React from 'react';

const DonateAmount = ({
  handleValue,
  amount,
  count,
  setCount,
  setIsDone,
  isDone,
}) => (
  <>
    <div className="container step__amount">
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
            value="10"
            onClick={handleValue}
          >
            $10
          </button>
        </div>
      </div>

    </div>
    <div style={{ background: '#1C1D37', padding: '2.5rem 0' }} className="mt-5">
      <div className="container step__bottom">
        <p>or donate a cusotm ammount</p>
        <div className="step__amount-custom">
          <span>$</span>
          <input
            type="number"
            className="amount-input"
            min="1"
            value={amount}
            onChange={(e) => handleValue(e)}
          />
        </div>
        <button
          className="donate-btn"
          type="submit"
          onClick={() => {
            setCount(count + 1);
            setIsDone(!isDone);
          }}
          disabled={count > 2}
        >
          <span> Donate Now</span>
          <i className="far fa-arrow-alt-circle-right" />
        </button>
      </div>
    </div>
  </>
);

export default DonateAmount;
