import React from 'react';
import styles from './builder.module.css';

const MpaBuilder = () => (
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <div className={styles.logo}>
        <div className={`${styles.bar} ${styles.bar_1}`} />
        <div className={`${styles.bar} ${styles.bar_2}`} />
        <div className={`${styles.bar} ${styles.bar_3}`}>
          <div className={styles.dot} />
          <div className={styles.dot} />
        </div>
      </div>
      <div className={styles.loader_container}>
        <div className={styles.leftLoader} />
        <div className={styles.rightLoader} />
      </div>
      <div className={styles.text}>Building Minority Programmers</div>
    </div>
  </div>
);

export default MpaBuilder;
