import React from 'react';

const BrandCard = function (props) {
  return (
    <div className="item">
      <a href={props.item.brandLink} target="_blank" rel="noreferrer">
        <img src={props.item.imgSrc} padding="1em" width="123px" alt="" />
      </a>
    </div>
  );
};

export default BrandCard;
