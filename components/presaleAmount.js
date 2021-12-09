import React, { useState, Fragment } from 'react';

const PresaleAmount = function () {
  const divisor = 10000;
  const [price, setPrice] = useState(69000);
  const [softCap] = useState('100,000');
  const [hardCap] = useState('1,000,000');
  const percentage = price / divisor;

  return (
    <>
      <div className="price-container">
        <div className="price">
          $
          {price}
        </div>
        <div className="logo" />
        <div className="usd-locked">
          USDC LOCKED
          {' '}
          <br />
          <div className="toggle-slide">
            <div className="holders">HOLDERS</div>
            <div className="amount">25</div>
          </div>
        </div>
      </div>
      <div className="progress-bar-amount">
        <div className="accuracy-bar">
          <div className="percentage-indicator" style={{ width: `${percentage}%` }}>
            {percentage.toFixed(1)}
            %
          </div>
        </div>
      </div>
      <div className="button-cap">
        <div className="refund">
          GUARANTEED
          <br />
          {' '}
          REFUND
          <div className="softcap">
            $
            {softCap}
            {' '}
            <br />
            {' '}
            SOFTCAP
          </div>
        </div>
        <div className="hardCap">
          $
          {hardCap}
        </div>
      </div>
    </>
  );
};

export default PresaleAmount;
