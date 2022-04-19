import React from 'react';
import CoinCard from './CoinCard';

const Trends = ({ data, currentView, setCurrentView }) => {
  const CoinsList = data;

  return (
    <div className="d-flex flex-column" style={{ width: '100%', height: '100%' }}>
      {/* second row list of currency in possess */}
      <div className="currencies-update">
        <div style={{ paddingRight: '4px' }}>
          {CoinsList.map((coin) => (
            <CoinCard info={coin} view={currentView} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trends;
