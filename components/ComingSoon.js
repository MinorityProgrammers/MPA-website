import React from 'react';


const ComingSoon = function ({ closeClick }) {
  return (
    <div
      className="comingsoon-container"
    >
     
      <div className="CSimg-container">
        {/* <div className="tw-text-right tw-mr-2">
          <p>Minority</p>
          <p>Programmers</p>
          <p>Team</p>
        </div> */}
        <img
          src="/assets/images/underConstruction.png"
          alt="profile"
          className="CS-img"
        />
      </div>
      <p className="CS-text">
        Coming soon...
      </p>
      <div className="dropdown-login-button tw-mt-20 sm:tw-mt-10">
        <button
          className="btn tw-bg-blue-700 tw-w-44 tw-text-white hover:tw-text-white"
          onClick={closeClick}
        >
          Close
        </button>
      </div>
      
    </div>
  );
};

export default ComingSoon;
