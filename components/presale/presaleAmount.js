import React, { useState } from 'react';

const PresaleAmount = () => {
  const divisor = 10000;
  const [price/* , setPrice */] = useState(69000);
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
          <div
            className="percentage-indicator"
            style={{ width: `${percentage}%` }}
          >
            {percentage.toFixed(1)}
            %
          </div>
          <div className="presale-assured">
            {' '}
            <svg
              className="presale-lock"
              width="29"
              height="37"
              viewBox="0 0 29 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.7499 12.6663H23.0416V9.24968C23.0416 4.53467 19.2149 0.708008 14.4999 0.708008C9.78492 0.708008 5.95825 4.53467 5.95825 9.24968V12.6663H4.24992C2.37075 12.6663 0.833252 14.2038 0.833252 16.083V33.1663C0.833252 35.0455 2.37075 36.583 4.24992 36.583H24.7499C26.6291 36.583 28.1666 35.0455 28.1666 33.1663V16.083C28.1666 14.2038 26.6291 12.6663 24.7499 12.6663ZM14.4999 28.0413C12.6207 28.0413 11.0833 26.5038 11.0833 24.6247C11.0833 22.7455 12.6207 21.208 14.4999 21.208C16.3791 21.208 17.9166 22.7455 17.9166 24.6247C17.9166 26.5038 16.3791 28.0413 14.4999 28.0413ZM9.37492 12.6663V9.24968C9.37492 6.41384 11.6641 4.12467 14.4999 4.12467C17.3357 4.12467 19.6249 6.41384 19.6249 9.24968V12.6663H9.37492Z"
                fill="white"
              />
            </svg>
            <span>PRESALE ASSURED</span>
          </div>
        </div>
      </div>
      <div className="button-cap">
        <div className="refund">
          GUARANTEED
          {' '}
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
          {' '}
          <br />
          {' '}
          HARDCAP
        </div>
      </div>
    </>
  );
};

export default PresaleAmount;
