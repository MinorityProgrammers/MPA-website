import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import styles from '../../styles/MentorCSS/Course.module.css';

const Workshop = ({ workshop, mentor, mentee }) => (
  <div className={styles.container}>
    <div className={styles.containerTitle}>
      <div>{workshop.title}</div>
    </div>
    <div className={styles.line} />
    <div className={styles.grid}>
      <div>
        <div className={styles.avatersContainer}>
          <div>
            <div className={styles.colTitle}>Mentor</div>
            <div className={styles.menteesIcon}>
              <OverlayTrigger
                overlay={(
                  <Tooltip>
                    {`${mentor.user_id.firstName} ${mentor.user_id.lastName}`}
                  </Tooltip>
                )}
              >
                <img
                  src={
                    mentor.user_id.profilePicture
                      ? mentor.user_id.profilePicture
                      : '/assets/images/mentor/unknown-pic.jfif'
                  }
                  alt={mentor.user_id.lastName}
                />
              </OverlayTrigger>
            </div>
          </div>
          <div>
            <div className={styles.colTitle}>Mentees</div>
            <div className={styles.menteesIcon}>
              <OverlayTrigger
                overlay={(
                  <Tooltip>
                    {`${mentee.user_id.firstName} ${mentee.user_id.lastName}`}
                  </Tooltip>
                )}
              >
                <img
                  src={
                    mentee.user_id.profilePicture
                      ? mentee.user_id.profilePicture
                      : '/assets/images/mentor/unknown-pic.jfif'
                  }
                  alt={mentee.user_id.lastName}
                />
              </OverlayTrigger>
            </div>
          </div>
        </div>
        <div className={styles.progressName}>Your Progress</div>
        <div className={styles.progress}>
          <div>
            <img
              className={styles.pointer}
              style={{ left: workshop.progress_percentage }}
              src="/assets/images/mentor/pointer.png"
              alt="pointer"
            />
            <div className={styles.progressBar}>
              <div
                style={{ width: workshop.progress_percentage }}
                className={styles.bar}
              />
            </div>
            <div className={styles.progressInfo}>
              <div className={styles.sprintCol}>
                <div className={styles.courseInfo}>
                  <div>Start</div>
                </div>
              </div>
              <div className={styles.sprintCol}>
                <div className={styles.courseInfo}>
                  <div> Complete</div>
                </div>
              </div>
            </div>
            <div className={styles.capstoneDate}>
              <span>Posted:</span>
              {`${workshop.createdAt.split('T')[0]} at ${
                workshop.createdAt.split('T')[1].split('.')[0]
              }`}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.courseDescription}>
        <div className={styles.colTitle}>Resume Workshop Instructions</div>
        <div>
          <div className={styles.event}>{workshop.description}</div>
        </div>
      </div>
    </div>
  </div>
);

export default Workshop;
