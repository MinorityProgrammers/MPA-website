import React from 'react';

const ServicesCard = (props) => (
  <div className="item">
    <div className={props.item.classNameOne}>
      <div className="course-category-two__icon">
        <i className={props.item.icon} />
      </div>
      <h3 className="course-category-two__title">
        <a href={props.item.serviceLink}>{props.item.tileName}</a>
      </h3>
    </div>
  </div>
);

export default ServicesCard;
