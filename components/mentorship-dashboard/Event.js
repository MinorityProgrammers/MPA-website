import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import styles from '../../styles/MentorCSS/Course.module.css';

const Event = ({ event, mentor, mentee }) => {
  return (
    <div className={styles.container}>
      <div className={styles.containerTitle}>{event.title}</div>
      <div className={styles.line}></div>
      <div className={styles.grid}>
        <div>
          <div className={styles.avatersContainer}>
            <div>
              <div className={styles.colTitle}>Speaker</div>
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
              <div className={styles.colTitle}>Attending</div>
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
          <div className={styles.eventDate}>
            <p> Date of Event:</p>{' '}
            {event.createdAt.split('T')[0] +
              ' at ' +
              event.createdAt.split('T')[1].split('.')[0]}
          </div>
        </div>

        <div className={styles.courseDescription}>
          <div className={styles.colTitle}>Event Description</div>
          <div>
            <div className={styles.event}>{event.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
