import React from 'react';
import styles from './header.module.css';

const Header = function () {
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <h1>EMPLOYERS DASHBOARD</h1>
      </div>
      <div className={styles.search}>
        <i className="fas fa-search" />
        <input type="text" placeholder="  Search" />
      </div>
    </div>
  );
};

export default Header;
