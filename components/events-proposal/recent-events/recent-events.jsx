import React, { useState, useRef, useEffect } from 'react';
import EventsCard from '../events-card/events-card';
import styles from './recent-events.module.css';

const RecentEvents = ({ events, eventStatus, token }) => {
  const [scrollPos, setScrollPos] = useState(0);
  const [recentEvents, setRecentEvents] = useState([]);
  const menuRef = useRef(null);
  const dateNow = Date.now();
  let eventTime = null;

  useEffect(() => {
    const recent = events.filter((event) => {
      eventTime = new Date(event.time).getTime();
      return event.eventStatus === eventStatus && dateNow < eventTime;
    });

    setRecentEvents(recent);
  }, [events, eventStatus]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Recently
        {' '}
        <br />
        {eventStatus === 'pending'
          ? 'Added'
          : eventStatus === 'approved'
            ? 'Approved'
            : eventStatus === 'rejected'
              ? 'Rejected'
              : ''}
      </div>
      {recentEvents.length ? (
        <>
          <div
            onScroll={() => setScrollPos(menuRef.current.scrollLeft)}
            ref={menuRef}
            className={styles.events}
          >
            {recentEvents.map((data, idx) => (
              <EventsCard key={`${idx + 1}`} event={data} token={token} />
            ))}
          </div>
          <div
            onClick={() => {
              menuRef.current.scrollLeft = scrollPos - 500;
            }}
            className={styles.arrowLeft}
          >
            <img src="/assets/images/events-arrow-left.png" alt="" />
          </div>
          <div
            onClick={() => {
              menuRef.current.scrollLeft = scrollPos + 500;
            }}
            className={styles.arrowRight}
          >
            <img src="/assets/images/events-arrow-right.png" alt="" />
          </div>
        </>
      ) : (
        <div className={styles.empty}>No Events Available</div>
      )}
    </div>
  );
};

export default RecentEvents;
