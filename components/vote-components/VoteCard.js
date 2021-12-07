import React, { useState } from 'react';

const VoteCard = function ({ card }) {
  return (
    <div className="vote-card">
      <div className={card.size === 'small' ? 'vote-card-img small' : 'vote-card-img'}>
        <img src={card.imgUrl} alt="" />
      </div>
      <div className="vote-card-text">
        {card.title}
      </div>
    </div>
  );
};

export default VoteCard;
