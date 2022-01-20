import React from 'react';

const TotalBalance = () => (
  <div className="total-balance-card-dashboard-wallet">
    <div className="inner-total-balance-card-dashboard-wallet d-flex flex-column justify-content-between">
      {/* First Row */}
      <div className="d-flex flex-row justify-content-between" style={{}}>
        <p style={{ fontSize: '20px', margin: 0, fontWeight: 700 }}>Total Balance</p>
        <select name="fiat-currency" className="btn btn-primary" style={{ background: '#474BFF' }}>
          <option value="USD" selected>USD</option>
          <option value="AUD">AUD</option>
          <option value="JPY">JPY</option>
          <option value="EUR">EUR</option>
        </select>

      </div>
      {/* Second Row */}
      <div style={{ marginBottom: '10px' }}>
        <p style={{ fontSize: '40px', fontWeight: 700, margin: 0 }}>$ 60,300,000</p>
      </div>
      {/* Third Row */}
      <div className="d-flex flex-row justify-content-between align-items-start">
        <select name="fiat-currency" className="btn btn-primary" style={{ color: '#474BFF', background: 'white' }}>
          <option value="deposit">Deposit</option>
          <option value="swap">Exchange</option>
          <option value="widthdraw">Withdraw</option>
        </select>
        <button type="button" className="btn btn-primary" style={{ background: '#474BFF', paddingLeft: '25px', paddingRight: '25px' }}>Connect Wallet</button>
      </div>
    </div>
  </div>
);

export default TotalBalance;
