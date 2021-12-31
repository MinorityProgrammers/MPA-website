import React, { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch, faArrowRight, faArrowLeft, faExchangeAlt,
} from '@fortawesome/free-solid-svg-icons';
import TotalBalance from './TotalBalance';
import TransactionsHistory from './TransactionsHistory';
import Trends from './Trends';
import CurrencyBalances from './Balance';
import MarketChart from './MarketChart';

const WalletComponent = (props) => {
  const [currentTrendsView, setCurrentTrendsView] = useState('1D');
  const [currentMarketChartView, setCurrentMarketChartView] = useState({ range: '1D', currency: '$MINORITY' });
  const [openForm, setOpenForm] = useState(false);

  // -------------Dummy Data-------------
  const TransactionsList = [
    {
      type: 'withdraw',
      amount: '1.3213',
      currency: 'ETH',
      date: '11/23/2021',
    },
    {
      type: 'deposit',
      amount: '1.3213',
      currency: 'ETH',
      date: '11/24/2021',
    },
    {
      type: 'exchange',
      fromAmount: '600',
      fromCurrency: 'USDC',
      amount: '1.3213',
      currency: 'ETH',
      date: '11/23/2021',
    },
    {
      type: 'withdraw',
      amount: '1.3213',
      currency: 'ETH',
      date: '11/23/2021',
    }, {
      type: 'withdraw',
      amount: '1.3213',
      currency: 'ETH',
      date: '11/23/2021',
    },
    {
      type: 'deposit',
      amount: '1.3213',
      currency: 'ETH',
      date: '11/24/2021',
    },
    {
      type: 'exchange',
      fromAmount: '600',
      fromCurrency: 'USDC',
      amount: '1.3213',
      currency: 'ETH',
      date: '11/23/2021',
    },
    {
      type: 'withdraw',
      amount: '1.3213',
      currency: 'ETH',
      date: '11/23/2021',
    },
    {
      type: 'withdraw',
      amount: '1.3213',
      currency: 'ETH',
      date: '11/23/2021',
    },
    {
      type: 'deposit',
      amount: '1.3213',
      currency: 'ETH',
      date: '11/24/2021',
    },
    {
      type: 'exchange',
      fromAmount: '600',
      fromCurrency: 'USDC',
      amount: '1.3213',
      currency: 'ETH',
      date: '11/23/2021',
    },
    {
      type: 'withdraw',
      amount: '1.3213',
      currency: 'ETH',
      date: '11/23/2021',
    }, {
      type: 'withdraw',
      amount: '1.3213',
      currency: 'ETH',
      date: '11/23/2021',
    },
    {
      type: 'deposit',
      amount: '1.3213',
      currency: 'ETH',
      date: '11/24/2021',
    },
    {
      type: 'exchange',
      fromAmount: '600',
      fromCurrency: 'USDC',
      amount: '1.3213',
      currency: 'ETH',
      date: '11/23/2021',
    },
    {
      type: 'withdraw',
      amount: '1.3213',
      currency: 'ETH',
      date: '11/23/2021',
    },
  ];
  // -------------Dummy data-------------
  const CoinsList = [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 9798.977911,
      price_btc: 1,
      market_cap: 180245643159,
      percent_change_24h: 1.41,
      percent_change_7d: -1.89,
      percent_change_30d: 4.73,
      color: '#FFB35B',
      volume_24h: 26140524526.52,
    },
    {
      id: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      price: 9798.977911,
      price_btc: 1,
      market_cap: 180245643159,
      percent_change_24h: 1.41,
      percent_change_7d: -1.89,
      percent_change_30d: 4.73,
      color: '#889FFF',
      volume_24h: 26140524526.52,
    },
    {
      id: 3,
      name: 'Litecoin',
      symbol: 'LTC',
      price: 9798.977911,
      price_btc: 1,
      market_cap: 180245643159,
      percent_change_24h: 1.41,
      percent_change_7d: -1.89,
      percent_change_30d: 4.73,
      color: '#607DB2',
      volume_24h: 26140524526.52,
    },
    {
      id: 4,
      name: 'Monero',
      symbol: 'XMR',
      price: 190.977911,
      price_btc: 1,
      market_cap: 180245643159,
      percent_change_24h: 1.41,
      percent_change_7d: -1.89,
      percent_change_30d: 4.73,
      color: 'orange',
      volume_24h: 26140524526.52,
    },
    {
      id: 5,
      name: 'Bitcoin Cash',
      symbol: 'BCH',
      price: 9798.977911,
      price_btc: 1,
      market_cap: 180245643159,
      percent_change_24h: 1.41,
      percent_change_7d: -1.89,
      percent_change_30d: 4.73,
      color: '#A474FD59',
      volume_24h: 26140524526.52,
    },
    {
      id: 6,
      name: 'Ethereum Classic ',
      symbol: 'ETC',
      price: 2.977911,
      price_btc: 1,
      market_cap: 180245643159,
      percent_change_24h: 1.41,
      percent_change_7d: -1.89,
      percent_change_30d: 4.73,
      color: 'green',
      volume_24h: 26140524526.52,
    },
    {
      id: 7,
      name: 'Dogecoin',
      symbol: 'DOGE',
      price: 0.17,
      price_btc: 1,
      market_cap: 180245643159,
      percent_change_24h: 1.41,
      percent_change_7d: -1.89,
      percent_change_30d: 4.73,
      color: 'yellow',
      volume_24h: 26140524526.52,
    },
  ];
  // -------------Dummy data-------------
  const OwnedCoins = [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      owned: 1.234123,
    },
    {
      id: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      owned: 40.212,
    },
    {
      id: 3,
      name: 'Litecoin',
      symbol: 'LTC',
      owned: 145.12,
    },
    {
      id: 4,
      name: 'Monero',
      symbol: 'XMR',
      owned: 300.12,
    },
    {
      id: 5,
      name: 'Dogecoin',
      symbol: 'DOGE',
      owned: 3000.12,
    },
  ];

  const ButtonsRow = () => (
    <div className="d-flex flex-row justify-content-between" style={{ width: '100%', height: '100%' }}>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="wallet-dashboard-button" style={{ background: '#474BFF' }}>
          <FontAwesomeIcon icon={faArrowRight} className="fa-2x" style={{ color: 'white' }} />
        </div>
        <p>Deposit</p>
      </div>

      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="wallet-dashboard-button" style={{ background: '#F070F0' }}>
          <FontAwesomeIcon icon={faExchangeAlt} className="fa-2x" style={{ color: 'white' }} />
        </div>
        <p>Swap</p>
      </div>

      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="wallet-dashboard-button" style={{ background: '#FFC700' }}>
          <FontAwesomeIcon icon={faArrowLeft} className="fa-2x" style={{ color: 'white' }} />
        </div>
        <p>Withdraw</p>
      </div>
    </div>
  );

  const TitleAndSearchBox = () => (
    <div className="d-flex flex-row align-items-center" style={{ width: '100%', height: '100%' }}>
      <div className="d-flex flex-row" style={{ width: '30%' }}>
        <p style={{ marginRight: '5px' }}>Dashboard</p>
        <p style={{ color: '#474BFF', marginRight: '5px' }}>{'>'}</p>
        <p>Wallet Dashboard</p>
      </div>

      <div
        className="d-flex flex-row justify-content-between align-items-center"
        style={{
          padding: '10px 20px', border: '1px solid #3E385D33', borderRadius: '5px', height: '40px', width: '30%', marginRight: '3%',
        }}
      >
        <p style={{ margin: 0 }}>Search</p>
        <FontAwesomeIcon icon={faSearch} className="fa-1x" />
      </div>
      <div className="">
        <button className="btn btn-primary" type="button" style={{ background: '#6C6FFF', height: '40px' }}>Add Wallet</button>
      </div>
    </div>
  );

  return (
    <div
      className=""
      style={{
        width: '1395px', padding: '15px', height: '900px', overflowY: 'scroll',
      }}
    >
      {/* Transaction Form */}
      {/* <div className="wallet-transaction-form tw-top-0 tw-left-0 tw-right-0 d-flex justify-content-center align-items-center" style={{ width: '100%', height: '100%', zIndex: 85 }}>
        <div style={{ display: openForm ? 'block' : 'none', height: '50%', width: '30%', background: 'white', opacity: 1, zIndex: 90 }}>
        </div>
      </div> */}
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
};

export default WalletComponent;
