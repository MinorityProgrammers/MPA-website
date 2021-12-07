import { useState } from 'react';

const EventCategoryFilterButton = function ({
  category, description, idx, categoryFilter, filter, activebtn, onClickActive,
}) {
  // const [active, setActive] = useState(activebtn)

  const onClick = (idx) => {
    // setActive(!active)
    categoryFilter(idx);
    onClickActive();
  };

  return (
    <div className={activebtn ? `event_title_button${idx + 1} active` : `event_title_button${idx + 1}`} onClick={() => onClick(idx)}>
      <h6>{category}</h6>
      <p>{description}</p>
    </div>
  );
};

export default EventCategoryFilterButton;
