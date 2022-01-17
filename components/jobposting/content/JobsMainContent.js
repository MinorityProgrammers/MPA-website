import React from 'react';

const JobsMainContent = function ({ children }) {
  return (
    <div className="careers-main">
      <div className="careers-main-container">
        <div className="careers-main-container-all">{children}</div>
      </div>
    </div>
  );
};

export default JobsMainContent;
