import React from 'react';

const UnderBannerBody = (props) => {
  const { text } = props;

  return (
    <div className="below-banner-text">
      <p>{text}</p>
    </div>
  );
};
export default UnderBannerBody;
