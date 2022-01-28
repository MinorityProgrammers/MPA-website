import React from 'react';

const FeaturedAdvice = () => (
  <section className="advice__wrapper">
    <div className="container">
      <div className="row">
        <div className="col-xl-4 col-lg-4">
          <div className="img__container">
            <img src="/assets/images/advice1.png" alt="advice1" />
            <a className="btn">Advise a Startup</a>
          </div>
        </div>
        <div className="col-xl-4 col-lg-4">
          <div className="img__container">
            <img src="/assets/images/advice3.png" alt="advice3" />
            <a className="btn">Join Minority Ventures Cohort</a>
          </div>
        </div>
        <div className="col-xl-4 col-lg-4">
          <div className="img__container">
            <img src="/assets/images/advice2.png" alt="advice2" />
            <a className="btn">Help &lsaquo;Code /&rsaquo;</a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default FeaturedAdvice;
