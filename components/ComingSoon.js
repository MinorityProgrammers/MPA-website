import React from 'react';

const ComingSoon = ({ closeClick }) => (
  <div className="comingsoon-container">
    <div className="CSimg-container">
      <img
        src="/assets/images/underConstruction.png"
        alt="profile"
        className="CS-img"
      />
    </div>
    <p className="CS-text">Coming soon...</p>
    <div className="dropdown-login-button">
      <button
        className="btn tw-bg-blue-700 tw-w-44 tw-text-white hover:tw-text-white"
        onClick={closeClick}
      >
        Close
      </button>
    </div>
  </div>
);

export default ComingSoon;
