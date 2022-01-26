import React, { useState } from 'react';
import styles from './users-card.module.css';
import UsersPopup from './users-popup';

const UsersCard = ({ data }) => {
  const [popup, togglePopup] = useState(false);

  const {
    profilePicture,
    firstName,
    lastName,
    role,
    userName,
    isMentor,
    isMentee,
  } = data;

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.popupContainer} ${
          popup ? styles.show : styles.hide
        }`}
      >
        <UsersPopup data={data} togglePopup={togglePopup} />
      </div>

      <div onClick={() => togglePopup(true)} className={styles.container}>
        <div className={styles.imageContainerWrapper}>
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src={profilePicture || '/assets/images/profile.png'}
              alt="user"
            />
          </div>
        </div>
        <div className={styles.detailsContainer}>
          <div className={styles.name}>
            <span>Full Name: </span> {`${lastName} ${firstName}`}{' '}
          </div>
          <div className={styles.userName}>
            <span>Username: </span> {userName}
          </div>
        </div>
        <div className={styles.otherInfo}>
          <div className={styles.title}>Other Information</div>
          <div className={styles.mentorship}>
            <div
              className={`${styles.mentor} ${
                isMentor ? styles.isMentor : null
              }`}
            >
              Mentor
            </div>
            <div
              className={`${styles.mentee} ${
                isMentee ? styles.isMentee : null
              }`}
            >
              Mentee
            </div>
          </div>

          <div className={styles.roleContainer}>
            <div className={styles.role}>
              <div>Role</div>
              <div>{role}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersCard;
