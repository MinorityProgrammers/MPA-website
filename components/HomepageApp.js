import React from 'react';

const HomepageApp = function () {
  return (
    <section className="homepage__app">
      <div className="heading__number">
        <h3 className="text_white">02</h3>
      </div>
      <div className="container">
        <h2 className="heading__title mt-5 mb-5 text_white">
          &lsaquo;Minority_App/&rsaquo;
        </h2>

        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 card__container-app">
            <a href="/learn-page">
              <div className="card border-0 rounded-0">
                <div className="img-banner-app">
                    <img
                      src="/assets/images/app2.png"
                      alt=""
                      className="card-img-top rounded-0"
                    />
                    <img
                      src="/assets/images/banner2.svg"
                      alt=""
                      className="card-img-banner"
                    />
                  </div>
                <div className="card-body card-body-custom">
                    <p className="card-button">Learn</p>
                  </div>
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 card__container-app">
            <a href="/incubator">
              <div className="card border-0 rounded-0">
                <div className="img-banner-app">
                    <img
                      src="/assets/images/app1.png"
                      alt=""
                      className="card-img-top rounded-0"
                    />
                    <img
                      src="/assets/images/banner1.svg"
                      className="card-img-banner"
                    />
                  </div>
                <div className="card-body card-body-custom">
                    <p href="/incubator" className="card-button">
                      Incubator
                    </p>
                  </div>
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 card__container-app">
            <a href="/mentorship">
              <div className="card border-0 rounded-0">
                <div className="img-banner-app">
                    <img
                      src="/assets/images/app4.png"
                      alt=""
                      className="card-img-top rounded-0"
                    />
                    <img
                      src="/assets/images/banner4.svg"
                      alt=""
                      className="card-img-banner"
                    />
                  </div>
                <div className="card-body card-body-custom">
                    <p className="card-button">Mentorship</p>
                  </div>
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 card__container-app">
            <a href="/events">
              <div className="card border-0 rounded-0">
                <div className="img-banner-app">
                    <img
                      src="/assets/images/app3.png"
                      alt=""
                      className="card-img-top rounded-0"
                    />
                    <img
                      src="/assets/images/banner3.svg"
                      alt=""
                      className="card-img-banner"
                    />
                  </div>
                <div className="card-body card-body-custom">
                    <p className="card-button">Events</p>
                  </div>
              </div>
            </a>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 card__container-app">
            <a href="/careers">
              <div className="card border-0 rounded-0">
                <div className="img-banner-app">
                    <img
                      src="/assets/images/app5.png"
                      alt=""
                      className="card-img-top rounded-0"
                    />
                    <img
                      src="/assets/images/banner5.svg"
                      alt=""
                      className="card-img-banner"
                    />
                  </div>
                <div className="card-body card-body-custom">
                    <p className="card-button">Careers</p>
                  </div>
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 card__container-app">
            <a href="/consultancy">
              <div className="card border-0 rounded-0">
                <div className="img-banner-app">
                    <img
                      src="/assets/images/app6.png"
                      alt=""
                      className="card-img-top rounded-0"
                    />
                    <img
                      src="/assets/images/banner6.svg"
                      alt=""
                      className="card-img-banner"
                    />
                  </div>
                <div className="card-body card-body-custom">
                    <p href="/consultancy" className="card-button">
                      Consultancy
                    </p>
                  </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageApp;
