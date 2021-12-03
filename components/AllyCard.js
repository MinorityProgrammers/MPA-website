import React from "react";

const AllyCard = (props) => {
  return (
    <div className="item">
      <a href={props.item.allyLink} target="_blank">
        <img src={props.item.imgSrc} width="123px" alt="" />
      </a>
    </div>
  );
};

export default AllyCard;
