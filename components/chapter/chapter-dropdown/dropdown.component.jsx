import React from 'react';
import styles from './dropdown.module.css';

const Dropdown = ({
  heading, list, handleClick, toggle, setMap,
}) => (
  <div className={styles.dropdownContainer}>
    <div onClick={handleClick} className={styles.dropdownHeading}>
      <div>{heading}</div>
      <i
        style={{
          transform: toggle ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
          marginLeft: '0.5em',
        }}
        className="fas fa-angle-down"
      />
    </div>
    <div className={`${styles.dropdownList} ${toggle && styles.toggle}`}>
      {list
        && list.map((item, idx) => (
          <div
            key={`${idx + 1}`}
            onClick={() => setMap(item)}
            className={styles.dropdownItem}
          >
            {item}
          </div>
        ))}
    </div>
  </div>
);

export default Dropdown;
