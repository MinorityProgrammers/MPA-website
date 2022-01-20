import React from 'react';

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
        <div className="tw-w-1/3 tw-mt-4">
          <p className="tw-text-4xl tw-font-bold tw-text-blue-900">Diversity meets web3</p>
        </div>
        <div className="tw-mt-4 tw-font-medium">
          <p className="tw-text-xl lg:tw-text-sm tw-text-blue-900">
            Join over 2 thousand International network of minority developers
            changing the world through tech.
            Connect your wallet to  REGISTER FOR FREE!
          </p>
        </div>
        <div className="tw-mt-4">
          <a href="https://snapshot.org/#/minorityprogrammers.eth" target="_blank" rel="noreferrer">
            <button
              type="button"
              className="tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded"
            >
              JOIN NOW
            </button>
          </a>
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
