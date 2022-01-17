import React from 'react';
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

const WalletComponent = () => (
  <div
    className=""
    style={{
      width: '1395px', padding: '15px', height: '900px', overflowY: 'scroll',
    }}
  >
    <div className="tw-grid tw-grid-cols-24 tw-grid-rows-10 tw-gap-2 tw-h-full tw-w-full">
      <div className="tw-col-span-24 tw-row-span-1">
        {/* Title Row */}
        <div style={{ height: '75px', width: '100%' }}>
          <TitleAndSearchBox />
        </div>
      </div>

      {/* Content Row */}

      {/* Left side */}
      <div className="tw-col-span-9 tw-row-span-9" style={{ paddingRight: '5%' }}>
        <div className="d-flex flex-column justify-content-between align-items-center">
          <div className="" style={{ height: '200px', width: '100%', marginBottom: '20px' }}>
            <TotalBalance />
          </div>
          <div style={{ height: '100px', width: '100%', marginBottom: '20px' }}>
            <ButtonsRow />
          </div>
          <div style={{ width: '100%', height: '420px' }}>
            <TransactionsHistory data={TransactionsList} />
          </div>
        </div>
      </div>

      <div className="tw-col-span-15 tw-row-span-9">
        <div
          className="d-flex flex-column"
          style={{
            width: '100%', height: '760px', background: '#fdfcf8', borderRadius: '25px', padding: '15px',
          }}
        >
          {/* 1st row */}
          <div
            className="d-flex flex-row"
            style={{
              width: '100%', height: '415px', marginBottom: '20px', background: 'white',
            }}
          >
            <div style={{
              width: '30%', marginRight: '2%', height: '415px', borderRadius: '25px', padding: '15px',
            }}
            >
              <Trends data={CoinsList} />
            </div>

            <div style={{
              width: '68%', height: '100%', borderRadius: '25px', padding: '15px', background: 'white',
            }}
            >
              <CurrencyBalances walletInfo={OwnedCoins} coinsInfo={CoinsList} />
            </div>
          </div>
          {/* 2nd row */}
          <div style={{
            width: '100%', height: '310px', borderRadius: '25px', padding: '15px', background: 'white',
          }}
          >
            <MarketChart coinsInfo={CoinsList} />
          </div>

        </div>
      </div>
    </div>
  </div>
);

export default WalletComponent;
