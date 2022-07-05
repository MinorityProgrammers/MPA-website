import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './chapter.module.scss';

const Events = ({ token }) => {
  const [pastEvents, setPastEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [active, setActive] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (token != null) {
      axios
        .get(`${process.env.BASE_URI}/event`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dateNow = Date.now();
          // dateNow < new Date(event.time).getTime()
          const events = res.data.data.filter((event) => (
            event.approved !== null
              && event.approved === true
          ));
          const upcoming = events.filter((event) => (
            dateNow < new Date(event.time).getTime()
          ));
          setPastEvents(events.slice(0, 7));
          setUpcomingEvents(upcoming.slice(0, 7));
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
          console.log(error.config);
          setPastEvents([]);
          setUpcomingEvents([]);
        });
    }
  }, []);
  const getTime = (date, time) => {
    const eventDate = new Date(date);
    let hr = eventDate.getHours();
    if (hr === 0) hr = 1;
    if (time) {
      return hr > 12 ? `(EST ${hr} Pm - ${(hr + 2) < 12 ? `${hr + 2} pm` : `${hr - 12} Am`})` : `(EST ${hr} Am - ${(hr + 2) < 12 ? `${hr + 2} Am` : `${hr - 12} Pm`})`;
    }

    return eventDate.toDateString();
  };
  return (
    <div className={styles.events}>
      <div className="tw-flex tw-justify-between">
        <h2>Chapter Events</h2>
        <div className={styles.topPartBtns}>
          <p style={{ background: !active ? ' #6938ef' : '' }} onClick={() => setActive(false)}>Upcoming</p>
          <a style={{ background: active ? ' #6938ef' : '' }} onClick={() => setActive(true)}>Past Events</a>
        </div>
      </div>
      <div className={styles.eventsCard}>
        { active && pastEvents.map((event) => (
          <div>
            <img src={event?.EventPicture} alt="event cover" />
            <div className={styles.detail}>
              <h2>
                {event?.eventName}
              </h2>
              <p>
                {event?.EventDescription}

              </p>
              <div className={styles.date}>
                <div>
                  {getTime(event?.time, true)}
                </div>
                <p>
                  {getTime(event?.time, false)}
                </p>
              </div>
              <div className={styles.btnContainer}>
                {/* <p>Pre Register</p> */}
                <a onClick={() => router.push(
                  '/events',
                )}
                >
                  More Info

                </a>
              </div>
            </div>
          </div>
        ))}
        { !active && upcomingEvents.map((event) => (
          <div>
            <img src={event?.EventPicture} alt="event cover" />
            <div className={styles.detail}>
              <h2>
                {event?.eventName}
              </h2>
              <p>
                {event?.EventDescription}

              </p>
              <div className={styles.date}>
                <div>
                  {getTime(event?.time, true)}
                </div>
                <p>
                  {getTime(event?.time, false)}
                </p>
              </div>
              <div className={styles.btnContainer}>
                <p>Pre Register</p>
                <a onClick={() => router.push(
                  '/events',
                )}
                >
                  More Info

                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Events;
