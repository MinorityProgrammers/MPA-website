import React from 'react';
import styles from './leaderboard.module.css';

const LeadboardCards = ({ topChapter }) => {
  const TitleUpperCase = (title) => {
    const words = title.toLowerCase().split(' ');

    return words.map((word) => word[0].toUpperCase() + word.substring(1)).join(' ');
  };
  return (

    <div style={{ justifyContent: topChapter.length > 2 ? 'space-between' : 'space-evenly' }} className={styles.LeadboardCards}>
      {topChapter[1]
      && (
      <div className={styles.silver}>
        <img src="/assets/images/chapter/silver.svg" alt="first" />
        <div className={styles.detail}>
          <h2>
            {topChapter[1] ? TitleUpperCase(topChapter[1].name) : ''}
          </h2>
          <h3>{topChapter[1]?.place}</h3>
          <p>
            {`${topChapter[1]?.amount} Points`}
          </p>
        </div>
        <div className={styles.viewBtn}>
          <a>View Chapter</a>
        </div>
      </div>
      )}
      {topChapter[0]
      && (
      <div className={styles.gold}>
        <img src="/assets/images/chapter/gold.svg" alt="first" />
        <div className={styles.detail}>
          <h2>
            {topChapter[0] ? TitleUpperCase(topChapter[0].name) : ''}
          </h2>
          <h3>{topChapter[0]?.place}</h3>
          <p>
            {`${topChapter[0]?.amount} Points`}
          </p>
        </div>
        <div className={styles.viewBtn}>
          <a>View Chapter</a>
        </div>
      </div>
      )}
      {topChapter[2]
      && (
      <div className={styles.bronze}>
        <img src="/assets/images/chapter/bronze.svg" alt="first" />
        <div className={styles.detail}>
          <h2>
            {topChapter[2] ? TitleUpperCase(topChapter[2].name) : ''}
          </h2>
          <h3>{topChapter[2]?.place}</h3>
          <p>
            {`${topChapter[2]?.amount} Points`}
          </p>
        </div>
        <div className={styles.viewBtn}>
          <a>View Chapter</a>
        </div>
      </div>
      )}
    </div>

  );
};
export default LeadboardCards;
