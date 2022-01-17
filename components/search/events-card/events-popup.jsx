import React from 'react';
import Moment from 'moment';
import Link from 'next/link';
import styles from './events-popup.module.css';

Moment.locale('en');

const EventsPopup = function ({ data, togglePopup }) {
  const {
    EventPicture, eventName, location, Virtual, EventDescription, time, host,
  } = data;

  return (
    <div className={styles.container}>
      <div className={styles.closePopupContainer}>
        <i onClick={() => togglePopup(false)} className={`${styles.closePopup} fas fa-times`} />
      </div>
      <div className={styles.image_host_theme}>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={EventPicture} alt="event-banner" />
        </div>
        <div className={styles.host_theme}>
          <div className={styles.theme}>{eventName}</div>
          <div className={styles.hostContainer}>
            {
              host
                ? (
                  <>
                    <h3 className={styles.hostTitle}>Hosted by</h3>
                    <div className={styles.profile}>
                      <div className={styles.profileImageContainer}>
                        {
                        host.profilePicture
                          ? <img className={styles.Profilemage} src={host.profilePicture} alt="event-banner" />
                          : <div className={styles.imagePlaceholder}><i className="fas fa-user" /></div>
                      }
                      </div>
                      <div>
                        <div className={styles.profileName}>{`${host.lastName} ${host.firstName}`}</div>
                        <div className={styles.location}>{location}</div>
                      </div>
                    </div>
                  </>
                )
                : <div>NO HOST</div>
            }
          </div>
          <div className={styles.date}>
            <div className={styles.time}>{Moment(time).format('LL')}</div>
            {/* <div className={styles.endDate}>10:00am to Oct 30, 12:00pm EDT</div> */}
          </div>
          <h3 className={styles.venue}>
            Event is hosted
            {Virtual ? 'online' : 'offline'}
          </h3>
          <Link href="/events">
            <a className={styles.registerButton}>Register</a>
          </Link>
        </div>
      </div>

      <div className={styles.otherInfo}>
        <div className={styles.description}>
          <h3 className={styles.title}>Event Description</h3>
          <div className={styles.text}>{EventDescription}</div>
        </div>
      </div>
    </div>
  );
};

export default EventsPopup;
