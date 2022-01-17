import React, { useState } from 'react';
import styles from './users-popup.module.css';

const UsersPopup = function ({ data, togglePopup }) {
  const [isImage, setImage] = useState(false);

  const {
    profilePicture,
    firstName,
    lastName,
    role,
    skills,
    passions,
    programmingSkills,
    userName,
    isMentor,
    isMentee,
  } = data;

  return (
    <div className={styles.container}>

      <div className={styles.info}>
        <div className={styles.imageContainer}>
          {
            !isImage ? <div className={styles.imagePlaceholder}><i className="fas fa-user" /></div> : null
          }
          <img style={{ display: isImage ? 'inline-block' : 'hidden' }} className={styles.image} src={profilePicture} onLoad={() => setImage(true)} alt="user" />
        </div>
        <div className={styles.detailsContainer}>
          <div className={styles.title}>Details</div>
          <div className={styles.name}>
            <span>Full Name: </span>
            {' '}
            {`${lastName} ${firstName}`}
          </div>
          <div className={styles.userName}>
            <span>Username: </span>
            {' '}
            {userName}
          </div>
        </div>

        <i onClick={() => togglePopup(false)} className={`${styles.closePopup} fas fa-times`} />
      </div>

      <div className={styles.otherInfo}>
        <div className={styles.title}>Other Information</div>
        <div className={styles.mentorship}>
          <div className={`${styles.mentor} ${isMentor ? styles.isMentor : null}`}>Mentor</div>
          <div className={`${styles.mentee} ${isMentee ? styles.isMentee : null}`}>Mentee</div>
        </div>

        <div className={styles.role}>
          <div className={styles.title}>Role</div>
          <div>{role}</div>
        </div>

        <div className={styles.skills}>
          <div className={styles.title}>Skills</div>
          <ul>
            {
              skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))
            }
          </ul>
        </div>

        <div className={styles.programmingSkills}>
          <div className={styles.title}>Programming Skills</div>
          <ul>
            {
              programmingSkills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))
            }
          </ul>
        </div>

        <div className={styles.passion}>
          <div className={styles.title}>Passion</div>
          <div className={styles.values}>
            {
              passions.map((passio) => (
                <span key={passio}>{passio}</span>
              ))
            }
          </div>
        </div>

      </div>
    </div>
  );
};

export default UsersPopup;
