import React from 'react';
import { faArrowRight, faArrowLeft, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TransactionCard = ({ info }) => {
  const transactionInfo = info;

  const TransactionType = [
    {
      type: 'deposit',
      icon: faArrowRight,
      background: '#474BFF',
    },
    {
      type: 'exchange',
      icon: faExchangeAlt,
      background: '#F070F0',
    },
    {
      type: 'withdraw',
      icon: faArrowLeft,
      background: '#FFC700',
    },
  ];

  const transIcon = TransactionType.find((trans) => trans.type === transactionInfo.type);

  return (
    <div className="d-flex flex-row justify-content-between align-items-center trans-card">
      {/* icon for transaction type */}
      <div className="d-flex flex-row justify-content-around align-items-center">

        <div
          className="wallet-dashboard-button"
          style={{
            background: transIcon.background, width: '40px', height: '40px', marginRight: '10px',
          }}
        >
          <FontAwesomeIcon icon={transIcon.icon} className="fa-1x" style={{ color: 'white' }} />
        </div>

        {/* Transaction basic info */}
        <div className="d-flex flex-column justify-content-start align-items center">
          <p className="trans-card-text" style={{ color: 'white', fontWeight: '500' }}>{transactionInfo.type.charAt(0).toUpperCase() + transactionInfo.type.slice(1)}</p>
          <p className="trans-card-text" style={{ color: 'rgba(0, 0, 0, 0.47)' }}>Metamask Wallet</p>
        </div>
      </div>
      {/* Amount of transaction */}
      <div>
        <p className="trans-card-text">
          {transactionInfo.type === 'withdraw' ? '-' : '+'}
          {' '}
          {transactionInfo.amount}
          {' '}
          {transactionInfo.currency}
        </p>
      </div>
      {/* Date of transaction */}
      <div>
        <p className="trans-card-text">{transactionInfo.date}</p>
      </div>
    </div>
  );
};

export default TransactionCard;
