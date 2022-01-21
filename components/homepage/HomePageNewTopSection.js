import React from 'react';
import Account from '../Account';

const HomepageNewTopSection = () => (
  <section className="homepage__hero">
    <div className="tw-absolute tw-bottom-10 tw-left-0 tw-z-0">
      <img
        src="/assets/images/bg/Yellow.png"
        alt=""
        className="tw-w-1/3 tw-opacity-30"
      />
    </div>
    <div className="container top__part tw-relative tw-flex tw-flex-row tw-w-full tw-h-full lg:tw-flex-col-reverse">
      <div className="tw-flex tw-flex-col tw-pb-20 tw-px-4 lg:tw-pt-2 tw-z-10">
        {/* content sections */}
        <div className="tw-mt-4">
          <p className="top__part__title">Diversity meets web3</p>
        </div>
        <div className="tw-mt-4 tw-font-medium">
          <p className="tw-text-xl lg:tw-text-sm tw-text-white">
            Join over 2 thousand International network of minority developers
            changing the world through tech.
            <br />
            <br />
            Connect your wallet to
            {' '}
            <span>REGISTER FOR FREE!</span>
          </p>
        </div>
        <div className="tw-mt-4 tw-grid tw-grid-cols-2">
          <Account />
          <div>
            <a className="tw-text-lg tw-mt-2.5 tw-block" target="_blank">
              Checkout our  other Apps
              <i className="fas fa-arrow-right" />
            </a>
          </div>
        </div>
      </div>
      <div className="tw-w-11/12 tw-z-10 tw-h-full homepage__hero__img">
        {/* image sections */}
        <img
          src="/assets/images/meta.svg"
          alt=""
          className="tw-w-full tw-h-ful "
        />
      </div>
    </div>
  </section>
);

export default HomepageNewTopSection;
