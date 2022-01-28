import React from 'react';

const OverlayCard = ({ children }) => (
  <div className="overlay-card">
    <div className="inner-section">{children}</div>
  </div>
);

export default OverlayCard;
