import React from 'react';

// reusable ImageCard for the HomepageApp Component
const ImageCard = ({
  href, bkgImgSrc, iconSrc,
}) => (
  <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 card__container-app">
    <a href={href}>
      <div className="card border-0 rounded-0">
        <div className="img-banner-app">
          <img
            src={bkgImgSrc}
            alt=""
            className="card-img-top rounded-0"
          />
          <img
            src={iconSrc}
            alt=""
            className="card-img-banner"
          />
        </div>
        {/* <div className="card-body card-body-custom">
          <p className="card-button">{text}</p>
        </div> */}
      </div>
    </a>
  </div>
);

// HomepageApp Component
const HomepageApp = () => (
  <section className="homepage__app">
    <div className="heading__number">
      <h3 className="tw-text-blue-900">02</h3>
    </div>
    <div className="container">
      <h2 className="heading__title mt-5 mb-5 tw-text-blue-900">
        &lsaquo;Minority_App/&rsaquo;
      </h2>

      <div className="row">
        <ImageCard
          href="/learn-page"
          bkgImgSrc="/assets/images/app2.png"
          iconSrc="/assets/images/banner2.svg"
          text="Learn"
        />

        <ImageCard
          href="/incubator"
          bkgImgSrc="/assets/images/app1.png"
          iconSrc="/assets/images/banner1.svg"
          text="Incubator"
        />

        <ImageCard
          href="/mentorship"
          bkgImgSrc="/assets/images/app4.png"
          iconSrc="/assets/images/banner4.svg"
          text="Mentorship"
        />

        <ImageCard
          href="/events"
          bkgImgSrc="/assets/images/app3.png"
          iconSrc="/assets/images/banner3.svg"
          text="Events"
        />

        <ImageCard
          href="/careers"
          bkgImgSrc="/assets/images/app5.png"
          iconSrc="/assets/images/banner5.svg"
          text="Careers"
        />

        <ImageCard
          href="/consultancy"
          bkgImgSrc="/assets/images/app6.png"
          iconSrc="/assets/images/banner6.svg"
          text="Consultancy"
        />
      </div>
    </div>
  </section>
);

export default HomepageApp;
