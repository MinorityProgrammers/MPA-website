import React, { useState } from 'react';
import styles from './select.module.css';

const Select = ({
  items,
  setItems,
  onClick,
  onChange,
  defaultValue,
}) => {
  const [heading, setHeading] = useState(defaultValue);
  const [list] = useState([
    { category: 'weekly', text: 'week' }, { category: 'monthly', text: 'Month' }, { category: 'all', text: 'All Time' },
  ]);

  const handleSelect = (active) => {
    const arr2 = [];
    items.forEach((item) => {
      const i = Object.keys(item)[0];
      if (i === active.category) {
        setHeading(i);
        arr2.push({ [i]: true });
      } else {
        arr2.push({ [i]: false });
      }
    });
    setItems(arr2);
    onChange(active.category);
    onClick();
  };

  return (
    <div className={styles.selectContainer}>
      {list
          && list.map((item, idx) => (
            <div
              key={`${idx + 1}`}
              onClick={() => handleSelect(item)}
              className={`${styles.selectItem} ${heading === item.category && styles.toggle}`}
            >
              {item.text}
            </div>
          ))}
    </div>
  );
};

export default Select;
