import React from 'react';

const EventCategoryFilterButton = ({
  category,
  description,
  idx,
  categoryFilter,
  activebtn,
  onClickActive,
}) => {
  const onClick = (_idx) => {
    categoryFilter(_idx);
    onClickActive();
  };

  return (
    <div
      className={
        activebtn
          ? `event_title_button${idx + 1} active`
          : `event_title_button${idx + 1}`
      }
      onClick={() => onClick(idx)}
    >
      <h6>{category}</h6>
      <p>{description}</p>
    </div>
  );
};

export default EventCategoryFilterButton;
