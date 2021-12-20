import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import styles from '../../styles/MentorCSS/Course.module.css';

const MenteeSprint = ({ sprint, mentor, mentee }) => {
  return (
    <div className={styles.container}>
      <div className={styles.containerTitle + ' ' + styles.capstoneTitle}>
        <div>{sprint.title}</div>
        <div className={styles.capstoneDate}>
          <span>Posted:</span>
          {sprint.createdAt.split('T')[0] +
            ' at ' +
            sprint.createdAt.split('T')[1].split('.')[0]}
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.grid}>
        <div>
          <div className={styles.avatersContainer}>
            <div>
              <div className={styles.colTitle}>Mentor</div>
              <div className={styles.menteesIcon}>
                <OverlayTrigger
                  overlay={
                    <Tooltip>
                      {mentor.user_id.firstName + ' ' + mentor.user_id.lastName}
                    </Tooltip>
                  }
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
                  overlay={
                    <Tooltip>
                      {`${mentee.user_id.firstName} ${mentee.user_id.lastName}`}
                    </Tooltip>
                  }
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
                style={{ left: sprint.progress_percentage }}
                src="/assets/images/mentor/pointer.png"
                alt="pointer"
              />
              <div className={styles.progressBar}>
                <div
                  style={{ width: sprint.progress_percentage }}
                  className={styles.bar}
                ></div>
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
            </div>
          </div>
        </div>

        <div className={styles.courseDescription}>
          <div className={styles.colTitle}>Sprint Description</div>
          <div>
            <div className={styles.event}>{sprint.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenteeSprint;
