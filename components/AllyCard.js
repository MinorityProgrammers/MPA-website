import React from 'react';

const AllyCard = (props) => (
  <div className="item">
    <a href={props.item.allyLink} target="_blank" rel="noreferrer">
      <img src={props.item.imgSrc} width="123px" alt="" />
    </a>
  </div>
);

export default AllyCard;
