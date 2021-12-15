import React from 'react';

const HomepageWave = () => (
  <section className="homepage__wave">
    <div className="heading__number">
      <h3 className="tw-text-blue-900">04</h3>
    </div>
    <div className="container">
      <h2 className="heading__title mt-5 mb-5 tw-text-blue-900">
        &lsaquo;The_minority_wave/&rsaquo;
      </h2>
      <div className="row">
        <div className="col-lg-4 col-md-4 card__container-core">
          <a
            href="https://minoritythinktank.org"
            target="_blank"
            className="card-button"
            rel="noreferrer"
          >
            <div className="card  border-0 rounded-0">
              <div className="wave__img-left">
                <img
                  src="/assets/images/wave1.svg"
                  alt=""
                  className="card-img-top"
                />
              </div>
              <div className="card-body tw-bg-blue-800">
                <h1 className="wave__text-title">MINORITY THINK TANK</h1>
              </div>
            </div>
          </a>
        </div>

        <div className="col-lg-8 col-md-8 card__container-core">
          <a
            href="https://minorityventure.com"
            target="_blank"
            className="card-button"
            rel="noreferrer"
          >
            <div className="card border-0 rounded-0">
              <div className="gradient__mvc wave__img-right">
                <img
                  className="mvc__svg"
                  src="/assets/images/mvcicon.svg"
                  alt=""
                />
                <img
                  src="/assets/images/wave2.jpg"
                  alt=""
                  className="card-img-top rounded-0"
                />
              </div>
              <div className="card-body tw-bg-blue-800">
                <h1 className="wave__text-title">MINORITY VENTURE CAPITAL</h1>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div className="wave__text">
        <p>
          From ideation, to build, to investment, we provide turnkey vertical
          integration for minorities to deliver products to markets.
        </p>
      </div>
    </div>
  </section>
);

export default HomepageWave;
