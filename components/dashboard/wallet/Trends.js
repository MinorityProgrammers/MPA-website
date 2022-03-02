import React, { useState } from 'react';
import CoinCard from './CoinCard';

const Trends = ({ data }) => {
  const [currentView, setCurrentView] = useState('Daily');

  const CoinsList = data;

  return (
    <div className="d-flex flex-column" style={{ width: '100%', height: '100%' }}>
      {/* first row */}
      <div className="d-flex flex-row justify-content-between align-items-center" style={{ height: '30px', width: '100%', marginBottom: '15px' }}>
        <p style={{ fontSize: '20px', fontWeight: '700', color: 'white' }}> Trends</p>
        <div>
          <button
            type="button"
            onClick={() => { setCurrentView('Daily'); }}
            className={currentView === 'Daily' ? 'trends-button-selected' : 'trends-button'}
            style={{
              borderRadius: '12px', fontSize: '12px', padding: '3px 15px', marginRight: '3px',
            }}
          >
            1D
          </button>
          <button
            type="button"
            onClick={() => { setCurrentView('Weekly'); }}
            className={currentView === 'Weekly' ? 'trends-button-selected' : 'trends-button'}
            style={{
              borderRadius: '12px', fontSize: '12px', padding: '3px 15px', marginRight: '3px',
            }}
          >
            1W
          </button>
          <button
            type="button"
            onClick={() => { setCurrentView('Monthly'); }}
            className={currentView === 'Monthly' ? 'trends-button-selected' : 'trends-button'}
            style={{ borderRadius: '12px', fontSize: '12px', padding: '3px 15px' }}
          >
            1M
          </button>
        </div>

      </div>
      {/* second row list of currency in possess */}
      <div style={{ height: '365px', width: '100%', overflowY: 'scroll' }}>
        {CoinsList.map((coin) => (
          <CoinCard info={coin} view={currentView} />
        ))}
      </div>
    </div>
  );
};

export default Trends;
