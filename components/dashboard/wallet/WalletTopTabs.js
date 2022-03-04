import React from 'react';

const WalletTopTabs = ({ setCurrentView, currentView }) => (
  <div
    className="d-flex flex-row align-items-center tw-justify-between trends-button-contianer"
    style={{ width: '100%', padding: '1rem' }}
  >
    <div className="tw-flex">
      <p style={{
        fontSize: '24px', fontWeight: '500', marginRight: '20px', color: 'white',
      }}
      >
        {' '}
        Trends
      </p>
      <div className="tw-flex">
        <a
          onClick={() => { setCurrentView('Daily'); }}
          className={currentView === 'Daily' ? 'trends-button-selected' : 'trends-button'}
        >
          1 D
        </a>
        <a
          onClick={() => { setCurrentView('Weekly'); }}
          className={currentView === 'Weekly' ? 'trends-button-selected' : 'trends-button'}
        >
          1 W
        </a>
        <a
          onClick={() => { setCurrentView('Monthly'); }}
          className={currentView === 'Monthly' ? 'trends-button-selected' : 'trends-button'}
        >
          1 M
        </a>
      </div>
    </div>
    <p className="add-token-btn">
      <span><i className="fas fa-plus" /></span>
      {' '}
      Add Token
    </p>
  </div>
);

export default WalletTopTabs;
