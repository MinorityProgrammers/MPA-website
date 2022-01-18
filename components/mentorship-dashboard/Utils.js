import React from 'react';
import axios from 'axios';
import styles from '../../styles/MentorCSS/Calendar.module.css';

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const Events = ({
  events,
  selectedDates,
  setEvents,
  setSelectedDates,
  user_id,
}) => {
  const deleteHandler = (event) => {
    const newEvents = events.filter((el) => el._id != event._id);
    const arr = [];
    newEvents.map((d) => {
      const date = new Date(Date.parse(d.event_date));
      if (date) {
        arr.push(new Date(Date.parse(d.event_date)));
      }
    });
    setEvents(newEvents);

    setSelectedDates(arr);

    const token = window.localStorage.getItem('jwtToken');
    const user = JSON.parse(window.localStorage.getItem('userInfo'));
    const { is_mentor } = user.user;
    if (token != null) {
      axios
        .patch(
          `${process.env.BASE_URI}/${is_mentor ? 'mentor' : 'mentee'}/${
            user_id._id
          }`,
          {
            calender_events: newEvents,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className={styles.eventsDetail}>
      <div className={`${styles.row} ${styles.eventsHeader}`}>Events</div>
      <div className={styles.line} />
      {events.length === 0 && <h2 className={styles.eventFalied}>No Events</h2>}
      {events.map((event) => (
        <div className={styles.views} key={event._id}>
          <div className={`${styles.row} ${styles.rowDate}`}>
            <div>{event.event_date}</div>
            <img
              className={styles.eventOutIcon}
              width={20}
              height={15}
              onClick={(e) => deleteHandler(event)}
              src="/assets/images/mentor/event-exit-icon.svg"
              alt="exit-icon"
            />
          </div>
          <div className={`${styles.row} ${styles.rowEventName}`}>
            {event.title}
          </div>
          <div className={`${styles.row} ${styles.eventDescription}`}>
            {event.description}
          </div>
        </div>
      ))}
    </div>
  );
};
