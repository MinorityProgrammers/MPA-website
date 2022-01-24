import React from 'react';
import { Chart } from 'react-google-charts';

const CurrencyBalances = (props) => {
  const { walletInfo } = props;
  const { coinsInfo } = props;

  const chartData = [['Coin', 'Amount']];
  const colorData = [];
  walletInfo.forEach((coin) => {
    const coinOwned = [];
    const ownedCoinInfo = coinsInfo.find((crypto) => crypto.name === coin.name);
    const amountInUSD = ownedCoinInfo.price * coin.owned;
    colorData.push({ color: ownedCoinInfo.color });
    coinOwned.push(coin.name);
    coinOwned.push(amountInUSD);
    coin.AmountInUSD = amountInUSD;
    coin.color = ownedCoinInfo.color;
    chartData.push(coinOwned);
  });

  return (
    <div
      className="d-flex flex-column"
      style={{ width: '100%', height: '100%' }}
    >
      {/* title row */}
      <div
        className="d-flex flex-row justify-content-between align-items-start"
        style={{ height: '15%', width: '100%', marginBottom: '15px' }}
      >
        <p style={{ fontSize: '20px', fontWeight: '700', color: 'black' }}>
          Currency Balances
        </p>
        <button type="button">Add Token</button>
      </div>
      <div className="d-flex flex-row" style={{ width: '100%', height: '80%' }}>
        <div style={{ width: '50%', height: '100%', padding: '15px' }}>
          <Chart
            width="100%"
            height="100%"
            chartType="PieChart"
            loader={<div> Loading Chart</div>}
            data={chartData}
            options={{
              pieHole: 0.7,
              backgroundColor: 'transparent',
              slices: colorData,
              pieSliceText: 'none',
              chartArea: { width: '100%', height: '100%' },
              legend: 'none',
            }}
          />
        </div>

        <div style={{ width: '50%', height: '100%', overflow: 'scroll' }}>
          <CoinsLegend walletInfo={walletInfo} />
        </div>
      </div>
    </div>
  );
};

export default CurrencyBalances;

const CoinsLegend = ({ walletInfo }) => (
  <>
    {walletInfo.map((ownedCoin) => (
      <div
        className="d-flex flex-row justify-content-between"
        style={{
          width: '100%',
          height: '70px',
          background: '#F8F9FD',
          marginBottom: '15px',
          padding: '20px 10px',
        }}
      >
        {/* first column name and symbol */}
        <div className="d-flex flex-column justify-content-start">
          <p style={{ color: 'black', fontWeight: '700' }}>{ownedCoin.name}</p>
          <p style={{ color: 'gray', fontSize: '10px' }}>{ownedCoin.symbol}</p>
        </div>
        {/* amount owned */}
        <div className="d-flex flex-column justify-content-start">
          <p style={{ color: 'gray', fontSize: '12px' }}>
            {ownedCoin.owned.toFixed(2)}
          </p>
        </div>
        {/* amount in USD */}
        <div className="d-flex flex-row justify-content-around">
          <div
            className="d-flex flex-column justify-content-start"
            style={{ marginRight: '3px' }}
          >
            <p style={{ color: 'gray', fontSize: '12px' }}>
              ${ownedCoin.AmountInUSD.toFixed(2).toLocaleString()}
            </p>
          </div>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '5px',
              background: ownedCoin.color,
            }}
          />
        </div>
      </div>
    ))}
  </>
);
