import { useState, useEffect } from 'react';
import styles from './select.module.css';

const Select = function ({
  items, setItems, onClick, onChange, toggle, defaultValue,
}) {
  const [heading, setHeading] = useState(defaultValue);
  const [list, setList] = useState([]);

  useEffect(() => {
    const arr = [];
    items && items.forEach((item) => {
      if (Object.values(item)[0] === true) {
        setHeading(Object.keys(item)[0]);
      } else {
        arr.push(Object.keys(item)[0]);
      }
    });
    setList(arr);
  }, [items]);

  const handleSelect = (active) => {
    const arr = [];
    const arr2 = [];
    items.forEach((item) => {
      const i = Object.keys(item)[0];
      if (i === active) {
        setHeading(i);
        arr2.push({ [i]: true });
      } else {
        arr.push(i);
        arr2.push({ [i]: false });
      }
    });
    setList(arr);
    setItems(arr2);
    onChange(active);
    onClick();
  };

  return (
    <div className={styles.selectContainer}>
      <div onClick={onClick} className={styles.selectHeading}>
        {heading}
        <i style={{ transform: toggle ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', marginLeft: '0.5em' }} className="fas fa-angle-down" />
      </div>
      <div className={`${styles.selectList} ${toggle && styles.toggle}`}>
        {
            list && list.map((item, idx) => (
              <div key={idx} onClick={() => handleSelect(item)} className={styles.selectItem}>{item}</div>
            ))
          }
      </div>
    </div>
  );
};

export default Select;
