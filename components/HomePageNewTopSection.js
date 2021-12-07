import React from 'react';

const HomepageNewTopSection = function () {
  return (
    <section className="tw-flex tw-flex-row  homepage__hero tw-w-full tw-h-full lg:tw-flex-col-reverse">
      <div className="tw-flex tw-flex-col tw-px-10 tw-pt-64 lg:tw-pt-2">
        {/* content sections */}
        <div className="tw-w-1/3 tw-mt-4">
          <p className="tw-text-4xl tw-font-bold">Minority Programmers Associations</p>
        </div>
        <div className="tw-mt-4 tw-font-medium">
          <p className="tw-text-xl lg:tw-text-sm">We are an International network of developers unifying together to build socially impactful projects and spread STEM education to marginalized communities.</p>
        </div>
        <div className="tw-mt-4">
          <a href="/join">
            <button type="button" className="tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">
              JOIN NOW
            </button>
          </a>
        </div>
      </div>
      <div className="tw-w-11/12 tw-p-10 lg:tw-p-2 lg:tw-pt-10">
        {/* image sections */}
        <img src="/assets/images/meta.png" alt="" className="tw-w-full tw-h-full" />
      </div>
    </section>
  );
};

export default HomepageNewTopSection;
