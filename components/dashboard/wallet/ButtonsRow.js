import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight, faArrowLeft, faExchangeAlt,
} from '@fortawesome/free-solid-svg-icons';

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

export default ButtonsRow;
