import React from 'react';
import styles from './chapterStat.module.css';

const titleUpperCase = (title) => {
  const words = title.toLowerCase().split(' ');

  return words.map((word) => word[0].toUpperCase() + word.substring(1)).join(' ');
};

const ChapterStat = ({
  place, amount, name, idx,
}) => (
  <div className={styles.wrapper}>
    <div
      className={`${styles.effect} `}
    />
    <div
      className={`${styles.container}`}
    >
      <div className={styles.number}>{idx + 1}</div>
      <div className={styles.nameAndLocation}>
        <div className={styles.name}>{titleUpperCase(name)}</div>
        <div className={styles.location}>{place}</div>
      </div>
      <div className={styles.timeAndPoints}>
        <div className={styles.amount}>
          {amount}
&nbsp;points
        </div>
      </div>
    </div>
  </div>
);

export default ChapterStat;
