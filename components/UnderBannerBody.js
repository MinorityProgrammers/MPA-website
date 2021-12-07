import React from 'react';

const UnderBannerBody = function (props) {
  const { text } = props;

  return (
    <div className="below-banner-text">
      <p>{text}</p>
    </div>
  );
};
export default UnderBannerBody;
