import React from 'react';

const ComingSoon = function ({ closeClick }) {
  return (
    <div
      className="xl:tw-w-10/12 xl:tw-mr-16 dropdown-coming tw-mr-48 tw-fixed tw-mt-28 sm:tw-mr-8 sm:tw-w-10/12 tw-bg-gray-900 tw-bg-opacity-70 tw-flex tw-flex-col tw-justify-center"
    >
      <p className="mb-3 tw-text-6xl tw-text-center sm:tw-text-3xl tw-my-4">
        Coming soon
      </p>
      <div className="dropdown-login-img tw-flex tw-flex-row tw-justify-end tw-my-4">
        <div className="tw-text-right tw-mr-2">
          <p>Minority</p>
          <p>Programmers</p>
          <p>Team</p>
        </div>
        <img
          src="/assets/images/mpicon.svg"
          alt="profile"
          className="mb-3 tw-w-28"
        />
      </div>
      <div className="dropdown-login-button tw-mt-20 sm:tw-mt-10">
        <button
          className="btn btn-warning tw-w-44 tw-text-white hover:tw-text-white"
          onClick={closeClick}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ComingSoon;
