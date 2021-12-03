import styles from './events-card.module.css';
import Moment from 'moment';
import { useState } from 'react';
import EventsPopup from '../events-popup/events-popup';

Moment.locale('en');

const EventsCard = ({ pastEvent, event, token }) => {
  const [popup, togglePopup] = useState(false);

  const { EventPicture, eventName, time, catName, host, eventStatus } = event;

  return (
    <div className={`${pastEvent && styles.pastEvent} ${styles.container}`}>
      <EventsPopup
        event={event}
        popup={popup}
        token={token}
        togglePopup={() => togglePopup(false)}
      />
      <div onClick={() => togglePopup(true)} className={styles.imageContainer}>
        <div className={styles.catName}>{catName}</div>
        {
          eventStatus === 'pending'
            ? null
            : eventStatus === 'approved'
              ? <div className={`${styles.status} ${styles.approve}`}>Approved</div>
              : <div className={`${styles.status} ${styles.reject}`}>Rejected</div>
        }
        <img className={styles.image} src={EventPicture} alt="icon" />
      </div>
      <div className={styles.details}>
        <div className={styles.name}>{eventName}</div>
        <div className={styles.date}>{Moment(time).format('LL')}</div>
        {
          eventStatus === 'pending'
            ? <div className={styles.hostName}>Host: {host && (host.firstName + " " + host.lastName)}</div>
            : <div className={styles.noAttended}>{event.attendance}</div>
        }
        <div onClick={() => togglePopup(true)} className={styles.info}> <i className="fas fa-plus"></i> More Info</div>
        {
          eventStatus !== 'pending'
          &&
          <div className={styles.review}>
            <div className={styles.reviewer}>Approved by: {'Shot'}</div>
            <div className={styles.reviewedDate}>Date: {Moment(Date.now()).format('LL')}</div>
          </div>
        }
      </div>
    </div>
  )
}

export default EventsCard;