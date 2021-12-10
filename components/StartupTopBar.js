import React from 'react';
import { numFormat, convert, percentFund } from '../helpers/formatIncubator';

const StartupTopBar = function ({ data }) {
  return (
    <div className="container top__container">
      <div className="col">
        <div className="row top__left-container">
          <div className="top__detail-container">
            <a href="/incubator" className="">
              <i className="fas fa-arrow-left top__button-back" />
            </a>
            <img className="top__logo" src={data.startupImage} />
            <h3 className="top__name">{data.name}</h3>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12 top__container-column">
        <div className="row top__center-container">
          <div className="top__shares">
            <p>Shares offered</p>
            <p>
              {convert(data.shareOffered)}
              {' '}
              shares
            </p>
          </div>
          <div className="top__funds-container">
            <div className="top__funds">
              <h3 className="top__funds-topic">Funds raised</h3>
              <h3 className="top__funds-percentage">
                {percentFund(data.targetAmount, data.amount)}
                % complete
              </h3>
            </div>
            <h3 className="top__funds-amount">
              $
              {numFormat(data.amount)}
              /$
              {numFormat(data.targetAmount)}
            </h3>
            <div className="progress" style={{ borderRadius: '30px' }}>
              <div
                className="tw-bg-gray-700 "
                role="progressbar"
                style={{
                  width: `${percentFund(data.targetAmount, data.amount)}%`,
                  borderRadius: '30px',
                }}
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="top__button">
          <a href="#" className="button btn-gradient">
            Fund Startup
          </a>
        </div>
      </div>
    </div>
  );
};
export default StartupTopBar;
