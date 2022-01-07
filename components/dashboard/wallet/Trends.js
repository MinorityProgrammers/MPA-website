import { useEffect, useState } from 'react';

const Trends = (props) => {
  const [currentView, setCurrentView] = useState('Daily');

  const CoinsList = props.data;

  const CoinCard = (props) => {
    const localCurrentView = props.view === 'Daily' ? 'percent_change_24h' : props.view === 'Weekly' ? 'percent_change_7d' : 'percent_change_30d';
    const coinInfo = props.info;
    // require:
    // - Logo
    // - Full Name
    // - Symbol
    // - Current price
    // - Difference in % in 1D/1W/1M
    return (
      <div
        className="d-flex flex-row justify-content-between align-items-center"
        style={{
          height: '64px', width: '100%', padding: '4px 12px', borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        }}
      >
        {/* Logo */}
        <div className="d-flex flex-row">
          <div style={{
            height: '54px', width: '54px', background: '#A474FD59', marginRight: '4px',
          }}
          />
          {/* Name */}
          <div className="d-flex flex-column">
            <p style={{ color: 'black', fontWeight: '700' }}>{coinInfo.name}</p>
            <p style={{ color: 'gray', fontSize: '10px' }}>{coinInfo.symbol}</p>
          </div>
        </div>
        {/* Value */}
        <div className="d-flex flex-column justify-content-start align-items-end" style={{ height: '100%' }}>
          <p style={{
            margin: 0, fontWeight: '500', color: 'gray', fontSize: '12px',
          }}
          >
            $
            {coinInfo.price.toFixed(2)}
          </p>
          <p style={{ fontSize: '10px', color: coinInfo[localCurrentView] >= 0 ? '#2DB632' : '#ED5959' }}>
            {coinInfo[localCurrentView] >= 0 ? '+' : ''}
            {coinInfo[localCurrentView]}
            %
          </p>
        </div>
      </div>
    );
  };
  return (
    <div className="d-flex flex-column" style={{ width: '100%', height: '100%' }}>
      {/* first row */}
      <div className="d-flex flex-row justify-content-between align-items-center" style={{ height: '30px', width: '100%', marginBottom: '15px' }}>
        <p style={{ fontSize: '20px', fontWeight: '700', color: 'black' }}> Trends</p>
        <div>
          <button
            onClick={() => { setCurrentView('Daily'); }}
            className={currentView === 'Daily' ? 'trends-button-selected' : 'trends-button'}
            style={{
              borderRadius: '12px', fontSize: '12px', padding: '3px 15px', marginRight: '3px',
            }}
          >
            1D

          </button>
          <button
            onClick={() => { setCurrentView('Weekly'); }}
            className={currentView === 'Weekly' ? 'trends-button-selected' : 'trends-button'}
            style={{
              borderRadius: '12px', fontSize: '12px', padding: '3px 15px', marginRight: '3px',
            }}
          >
            1W

          </button>
          <button
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
