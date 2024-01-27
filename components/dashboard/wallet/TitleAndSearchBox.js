import React from 'react';

const TitleAndSearchBox = () => (
  <div className="d-flex flex-row align-items-center wallet-dashboard-title" style={{ width: '100%', height: '100%' }}>
    <div className="d-flex flex-row" style={{ width: '30%', color: 'white' }}>
      <p style={{ marginRight: '5px' }}>Dashboard</p>
      <p style={{ color: '#fcfcfc', marginRight: '5px' }}>{'>'}</p>
      <p>Wallet Dashboard</p>
    </div>

    <div
      className="d-flex flex-row justify-content-between align-items-center wallet-dashboard-search-bar"
    >
      <input placeholder="Search" className="form-control" type="text" />
    </div>
  </div>
);

export default TitleAndSearchBox;
