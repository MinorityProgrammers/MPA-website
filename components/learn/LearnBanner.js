import React from 'react';

const LearnBanner = () => (
  <div className="learnBanner banner-bg">
    <div className="h-100 d-flex align-items-center">
      <div className="col-md-6 p-0">
        <div className="learnBanner-image" />
      </div>
      <div className="learnBanner-details col-12 col-md-6 d-flex flex-column align-items-center justify-content-center">
        <h1 className="text-white font-weight-bold mb-2">
          Learn high in demand
          <br />
          IT Skills & Get Crypto
        </h1>
        <div className="font-weight-bold" style={{}}>
          <span className="text-white">powered by</span>
          <span className="ml-2 text-dark">KoinStreet</span>
        </div>
      </div>
    </div>
  </div>
);

export default LearnBanner;
