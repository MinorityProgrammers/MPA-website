import React from 'react';

const TeamCard = function (props) {
  return (
    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
      <div className="team-one__single">
        <div className="team-one__image">
          <img src={props.item.imgSrc} height="206px" width="206px" alt="" />
        </div>
        <div className="team-one__content">
          <h2 className="team-one__name">{props.item.name}</h2>
          <p className="team-one__designation">{props.item.title}</p>
          <p className="team-one__text" />
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
