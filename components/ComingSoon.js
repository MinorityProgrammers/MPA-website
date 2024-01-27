import React, { useState, useEffect } from 'react';

const ComingSoon = ({ closeClick }) => {
  const [delay, setDelay] = useState(true);
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setDelay(false);
    }, 6000);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [1]);

  if (delay) {
    return null;
  }

  return (
    <div>
      <div className="comingsoon-container">
        <div className="CSimg-container">
          <img
            src="/assets/images/underConstruction.png"
            alt="profile"
            className="CS-img"
          />
        </div>
        <p className="CS-text">Coming Soon</p>
        <div className="dropdown-login-button">
          <button
            type="button"
            className="btn tw-bg-blue-700 tw-w-44 tw-text-white hover:tw-text-white"
            onClick={closeClick}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
