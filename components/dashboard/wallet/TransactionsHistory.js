import React from 'react';
import TransactionCard from './TransactionCard';

const TransactionsHistory = ({ data }) => {
  const TransactionsList = data;

  return (
    <div className="d-flex flex-column justify-content-between" style={{ height: '420px', width: '100%', overflowY: 'scroll' }}>
      {TransactionsList.map((transaction) => (
        <TransactionCard info={transaction} />
      ))}
    </div>
  );
};

export default TransactionsHistory;
