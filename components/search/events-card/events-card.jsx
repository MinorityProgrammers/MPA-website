import React, { useState } from 'react';
import Moment from 'moment';
import styles from './events-card.module.css';
import EventsPopup from './events-popup';

Moment.locale('en');

const EventsCard = function ({ data }) {
  const [popup, togglePopup] = useState(false);
  const [isImage, setImage] = useState(false);

  const {
    EventPicture, eventName, catName, Virtual, time,
  } = data;

  const handleClick = () => {
    togglePopup(true);
  };

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.popupContainer} ${popup ? styles.show : styles.hide}`}>
        <EventsPopup data={data} togglePopup={togglePopup} />
      </div>

      <div onClick={handleClick} className={styles.container}>
        <div className={styles.imageContainer}>
          {
            !isImage ? <div className={styles.imagePlaceholder} /> : null
          }
          <img style={{ display: isImage ? 'inline-block' : 'hidden' }} className={styles.image} src={EventPicture} onLoad={() => setImage(true)} alt="event-banner" />
          <div className={styles.catName}>{catName}</div>
        </div>
        <div className={styles.name}>{eventName}</div>
        <div className={styles.time}>{Moment(time).format('LL')}</div>
        <div className={styles.mode}>{Virtual ? 'Virtual' : 'In-person'}</div>
      </div>
    </div>
  );
};

export default EventsCard;
