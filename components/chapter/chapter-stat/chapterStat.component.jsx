import React from 'react';
import styles from './chapterStat.module.css';

const ChapterStat = ({
  number, place, amount, name, time, idx,
}) => {
  const d = new Date(time);
  const h = d.getHours();
  const m = d.getMinutes();
  const s = d.getSeconds();

  const isEven = () => {
    if (parseInt(idx) % 2 === 0) {
      return true;
    }
    return false;
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.effect} ${
          isEven() ? styles.effect1 : styles.effect2
        }`}
      />
      <div
        className={`${styles.container} ${
          isEven() ? styles.grad1 : styles.grad2
        }`}
      >
        <div className={styles.number}>{number}</div>
        <div className={styles.nameAndLocation}>
          <div className={styles.name}>{name}</div>
          <div className={styles.location}>{place}</div>
        </div>
        <div className={styles.timeAndPoints}>
          <div className={styles.amount}>
            {amount}
            <span className={styles.points}>points</span>
            {' '}
            <div className={styles.pts}>pts</div>
            {' '}
          </div>
          <div className={styles.time}>{`${h}:${m}:${s}`}</div>
        </div>
      </div>
    </div>
  );
};

export default ChapterStat;
