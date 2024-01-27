import React, { useState } from 'react';
import TotalBalance from './TotalBalance';
import TransactionsHistory from './TransactionsHistory';
import Trends from './Trends';
import CurrencyBalances from './Balance';
import MarketChart from './MarketChart';
import TransactionsList from './transactionsList';
import CoinsList from './coinsList';
import OwnedCoins from './ownedCoins';
import TitleAndSearchBox from './TitleAndSearchBox';
import ButtonsRow from './ButtonsRow';
import WalletTopTabs from './WalletTopTabs';

const WalletComponent = () => {
  const [currentView, setCurrentView] = useState('Daily');

  return (
    <div
      className="wallet-dashboard-container"
    >
      <div style={{ height: '75px', width: '100%', marginBottom: '30px' }}>
        <TitleAndSearchBox />
      </div>
      <div className="wallet-grid">
        <div style={{ paddingRight: '30px' }}>
          <div className="wallet-left">
            <div style={{ paddingRight: '30px' }}>
              <div
                style={{ height: '200px', width: '100%', marginBottom: '20px' }}
              >
                <TotalBalance />
              </div>
              <div style={{ height: '110px', width: '100%', marginBottom: '20px' }}>
                <ButtonsRow />
              </div>
              <div style={{ width: '100%', height: '420px' }}>
                <TransactionsHistory data={TransactionsList} />
              </div>
            </div>
          </div>
        </div>
        <div className="wallet-right">
          <WalletTopTabs currentView={currentView} setCurrentView={setCurrentView} />
          <div className="line" />
          <div className="currency-chart">
            <Trends currentView={currentView} setCurrentView={setCurrentView} data={CoinsList} />
            <CurrencyBalances
              walletInfo={OwnedCoins}
              currentView={currentView}
              coinsInfo={CoinsList}
            />
          </div>
          <div className="market-chart-container">
            <div>
              <MarketChart coinsInfo={CoinsList} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletComponent;
