import React from 'react';

const AllyCard = ({ item }) => (
  <div className="item">
    <a href={item.allyLink} target="_blank" rel="noreferrer">
      <img src={item.imgSrc} width="123px" alt="" />
    </a>
  </div>
);

export default AllyCard;
