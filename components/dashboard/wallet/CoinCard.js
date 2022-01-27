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
      className="d-flex flex-row justify-content-between align-items-center"
      style={{
        height: '64px',
        width: '100%',
        padding: '4px 12px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      }}
    >
      {/* Logo */}
      <div className="d-flex flex-row">
        <div
          style={{
            height: '54px',
            width: '54px',
            background: '#A474FD59',
            marginRight: '4px',
          }}
        />
        {/* Name */}
        <div className="d-flex flex-column">
          <p style={{ color: 'black', fontWeight: '700' }}>{coinInfo.name}</p>
          <p style={{ color: 'gray', fontSize: '10px' }}>{coinInfo.symbol}</p>
        </div>
      </div>
      {/* Value */}
      <div
        className="d-flex flex-column justify-content-start align-items-end"
        style={{ height: '100%' }}
      >
        <p
          style={{
            margin: 0,
            fontWeight: '500',
            color: 'gray',
            fontSize: '12px',
          }}
        >
          $
          {coinInfo.price.toFixed(2)}
        </p>
        <p
          style={{
            fontSize: '10px',
            color: coinInfo[localCurrentView] >= 0 ? '#2DB632' : '#ED5959',
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
