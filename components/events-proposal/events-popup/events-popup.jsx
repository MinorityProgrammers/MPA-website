import { useState } from 'react';
import Moment from 'moment';
import axios from 'axios';
import styles from './events-popup.module.css';
import ReviewAction from './review-action';
import ApproveAction from './approve-action';
import RejectAction from './reject-action';
import { successToast } from '../../../contexts/utils/toasts';

Moment.locale('en');

const EventsPopup = function ({
  event, popup, togglePopup, token,
}) {
  const [value, setValue] = useState('');
  const {
    EventPicture, EventDescription, eventLink, catName, eventName, time, host, Virtual, _id, eventStatus,
  } = event;

  const handleReviewFeedback = (event, feedback) => {
    event.preventDefault();
    try {
      axios.patch(
        `${process.env.BASE_URI}/event/${_id}`,
        {
          eventStatus: feedback,
          eventLink,
          eventName,
          EventDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      successToast(`Event ${feedback} successfully`);
      togglePopup();
    } catch (error) {
      console.error(error);
      errorToast('Events approval failed');
      togglePopup();
    }
  };

  return (
    <div className={`${styles.wrapper} ${popup ? styles.show : styles.hide}`}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={EventPicture} alt="" />
        </div>
        <div className={styles.detailsContainer}>
          <div onClick={togglePopup} className={styles.close}><i className="fas fa-times" /></div>
          <div className={styles.imageContainerMobile}>
            <img className={styles.image} src={EventPicture} alt="" />
          </div>
          <div className={styles.profile}>
            <div className={styles.picture}>
              {
              host && host.profilePicture
                ? <img src={host.profilePicture} alt="" />
                : <i className="fas fa-user" />
            }
            </div>
            <div className={styles.name}>
              <div className={styles.key}>Host</div>
              <div className={styles.value}>{host && `${host.firstName} ${host.lastName}`}</div>
            </div>
          </div>
          <div className={styles.details}>
            <div className={styles.about}>
              <div className={styles.catName}>{catName}</div>
              <div className={styles.eventName}>{eventName}</div>
              <div className={styles.eventDescription}>
                <div className={styles.eventTitle}>About event</div>
                <div className={styles.eventContent}>{EventDescription}</div>
              </div>
            </div>
            <div className={styles.other}>

              <div className={styles.eventType}>
                <div className={styles.typeName}>{Virtual ? 'Virtual Event' : 'In Person Event'}</div>
                <div className={styles.typeDate}>{Moment(time).format('LL')}</div>
              </div>

              <div className={styles.created}>
                <div className={styles.createdLabel}>Created:</div>
                <div className={styles.createdDate}>{Moment(time).format('LL')}</div>
              </div>
              {
                eventStatus === 'pending'
                  ? <ReviewAction reveiwFeedback={handleReviewFeedback} value={value} setValue={(e) => setValue(e.target.value)} />
                  : eventStatus === 'approved'
                    ? <ApproveAction popup={popup} reveiwFeedback={handleReviewFeedback} value={value} setValue={(e) => setValue(e.target.value)} />
                    : eventStatus === 'rejected'
                      ? <RejectAction popup={popup} reveiwFeedback={handleReviewFeedback} value={value} setValue={(e) => setValue(e.target.value)} />
                      : null
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPopup;
