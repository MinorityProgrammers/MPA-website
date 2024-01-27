import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

const SwapIcon = () => (
  <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M36.3463 15.6658L29.8178 9.13723C29.6656 8.98505 29.4849 8.86433 29.2861 8.78198C29.0872 8.69962 28.8741 8.65723 28.6589 8.65723C28.2243 8.65723 27.8074 8.82989 27.5001 9.13723C27.1928 9.44457 27.0201 9.86141 27.0201 10.2961C27.0201 10.7307 27.1928 11.1475 27.5001 11.4549L31.254 15.1925H12.3375C11.9046 15.1925 11.4894 15.3644 11.1834 15.6705C10.8773 15.9766 10.7053 16.3918 10.7053 16.8246C10.7053 17.2575 10.8773 17.6727 11.1834 17.9787C11.4894 18.2848 11.9046 18.4568 12.3375 18.4568H35.1875C35.5097 18.4552 35.8243 18.3582 36.0915 18.1781C36.3587 17.9981 36.5666 17.7429 36.6891 17.4449C36.8141 17.1476 36.8482 16.82 36.7872 16.5034C36.7262 16.1868 36.5728 15.8953 36.3463 15.6658ZM28.6589 21.7211H5.80887C5.48665 21.7227 5.17211 21.8196 4.90489 21.9997C4.63767 22.1798 4.42974 22.4349 4.3073 22.733C4.18231 23.0302 4.14816 23.3578 4.20916 23.6745C4.27016 23.9911 4.42358 24.2825 4.65005 24.5121L11.1786 31.0406C11.3304 31.1936 11.5109 31.315 11.7098 31.3979C11.9087 31.4808 12.122 31.5234 12.3375 31.5234C12.5529 31.5234 12.7663 31.4808 12.9651 31.3979C13.164 31.315 13.3446 31.1936 13.4963 31.0406C13.6493 30.8889 13.7707 30.7084 13.8535 30.5095C13.9364 30.3106 13.9791 30.0973 13.9791 29.8818C13.9791 29.6663 13.9364 29.453 13.8535 29.2541C13.7707 29.0552 13.6493 28.8747 13.4963 28.723L9.74235 24.9854H28.6589C29.0918 24.9854 29.5069 24.8134 29.813 24.5073C30.1191 24.2012 30.2911 23.7861 30.2911 23.3532C30.2911 22.9204 30.1191 22.5052 29.813 22.1991C29.5069 21.893 29.0918 21.7211 28.6589 21.7211Z" fill="#F5841F" />
  </svg>

);

const ButtonsRow = () => (
  <div className="d-flex flex-row justify-content-between" style={{ width: '100%', height: '100%' }}>
    <div className="d-flex flex-column justify-content-center align-items-center wallet-button-rows">
      <div className="wallet-dashboard-button wallet-deposite">
        <FontAwesomeIcon icon={faArrowRight} className="fa-2x" style={{ color: '#FD05B3', transform: 'rotate(135deg)' }} />
      </div>
      <p className="wallet-button-rows-text">Deposit</p>
    </div>

    <div className="d-flex flex-column justify-content-center align-items-center wallet-button-rows">
      <div className="wallet-dashboard-button wallet-swap">
        <SwapIcon />
      </div>
      <p className="wallet-button-rows-text">Swap</p>
    </div>

    <div className="d-flex flex-column justify-content-center align-items-center wallet-button-rows">
      <div className="wallet-dashboard-button wallet-withdraw">
        <FontAwesomeIcon icon={faArrowRight} className="fa-2x" style={{ color: '#33D2FF', transform: 'rotate(-45deg)' }} />
      </div>
      <p className="wallet-button-rows-text">Withdraw</p>
    </div>
  </div>
);

export default ButtonsRow;
