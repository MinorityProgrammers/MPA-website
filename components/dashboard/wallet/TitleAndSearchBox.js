import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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

export default TitleAndSearchBox;
