import React from 'react';

const CoinCard = ({ info, view }) => {
  const localCurrentView = view === 'Daily'
    ? 'percent_change_24h'
    : view === 'Weekly'
      ? 'percent_change_7d'
      : 'percent_change_30d';
  const coinInfo = info;

  return (
    <div
      className="d-flex flex-row justify-content-between align-items-center coin-row"
    >
      {/* Logo */}
      <div className="d-flex flex-row">
        <img src={coinInfo.src} alt={coinInfo.name} />
        {/* Name */}
        <div className="d-flex flex-column tw-justify-center">
          <p style={{ color: 'white', fontWeight: '700' }}>{coinInfo.name}</p>
          <p style={{ color: '#A7AEF9', fontSize: '10px' }}>{coinInfo.symbol}</p>
        </div>
      </div>
      {/* Value */}
      <div
        className="d-flex flex-column tw-justify-center align-items-end"
        style={{ height: '100%', margin: 'auto', textAlign: 'center' }}
      >
        <p
          style={{
            margin: 0,
            fontWeight: '500',
            color: '#FFFFFF',
            fontSize: '12px',
          }}
        >
          {coinInfo.price.toFixed(2)}
          {' '}
          USD
        </p>
        <p
          style={{
            fontSize: '10px',
            width: '100%',
            textAlign: 'left',
            color: coinInfo[localCurrentView] >= 0 ? '#16A34A' : '#ED5959',
          }}
        >
          {coinInfo[localCurrentView] >= 0 ? '+' : ''}
          {coinInfo[localCurrentView]}
          %
        </p>
      </div>
    </div>
  );
};

export default CoinCard;
