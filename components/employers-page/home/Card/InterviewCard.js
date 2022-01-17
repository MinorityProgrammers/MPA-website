import React from 'react';
import styles from './interview_card.module.css';

const InterviewCard = function ({
  date, time, name, description, image,
}) {
  return (
    <div>
      <div className={styles.root}>
        <div className={styles.head}>
          <img src={image || '/assets/images/profile.jpg'} alt="profile_image" />
          <div className={styles.identity}>
            <h3>{name}</h3>
            <span>{description}</span>
          </div>
        </div>
        <hr className={styles.horizontal} />
        <div className={styles.footer}>
          <span className={styles.date}>{date}</span>
          <span className={styles.time}>{time}</span>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
