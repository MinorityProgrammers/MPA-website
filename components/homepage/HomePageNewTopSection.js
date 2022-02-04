import React from 'react';

const HomepageNewTopSection = () => (
  <section style={{ backgroundImage: "url('/assets/images/home-page/hero-bg.png')" }} className="homepage__hero">
    {/* <div className="tw-absolute tw-bottom-10 tw-left-0 tw-z-0">
      <img
        src="/assets/images/home-page/hero-bg.png"
        alt=""
        className="tw-w-1/3 tw-opacity-30"
      />
    </div> */}
    <div className="container top__part tw-relative tw-justify-between tw-flex tw-flex-row tw-w-full tw-h-full lg:tw-flex-col-reverse">
      <div className="tw-flex tw-flex-col tw-pb-20 top__part__content lg:tw-pt-2 tw-z-10">
        {/* content sections */}
        <div className="tw-mt-4">
          <p className="top__part__title">Minority Programmers Association</p>
        </div>
        <div className="tw-mt-4 tw-font-medium">
          <p className="tw-text-xl tw-pr-32 md:tw-text-base tw-text-white sm:tw-pr-0">
            Join an international network of developers unifying together
            to build socially impactful projects & spread STEM education
            to marginalized communities
            <br />
            <br />
            Connect your wallet to
            {' '}
            <span>REGISTER FOR FREE!</span>
          </p>
        </div>
        <div className="tw-mt-11 tw-w-11/12 tw-grid tw-grid-cols-2 sm:tw-w-full">
          <div className="hero__join__button">
            {' '}
            <p><a href="https://snapshot.org/#/minorityprogrammers.eth">Join Us</a></p>
          </div>
          <div className="hero__connect__button">
            {' '}
            <p>Learn how to connect</p>
          </div>
        </div>
      </div>
      <div className="tw-pt-20 tw-z-10 tw-h-full homepage__hero__img">
        {/* image sections */}
        <img
          src="/assets/images/home-page/meta.svg"
          alt="blockchain"
          className="tw-w-full tw-h-ful tw-max-w-lg"
        />
      </div>
    </div>
  </section>
);

export default HomepageNewTopSection;
