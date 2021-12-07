import { useState, useEffect } from 'react';
import EventsCard from '../events-card/events-card';
import styles from './past-events.module.css';

const PastEvents = function ({ eventStatus, events, token }) {
  const dateNow = Date.now();
  let eventTime = null;

  const pastEvents = events
    .filter((event) => {
      eventTime = new Date(event.time).getTime();
      return event.eventStatus === eventStatus && dateNow > eventTime;
    });

  const [view, setView] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [count, setCount] = useState(1);
  const preview = 4;
  const maxCount = Math.ceil(pastEvents.length / preview);

  useEffect(() => {
    setStart((count * preview) - preview);
    setEnd(count * preview);
    const v = pastEvents.slice(start, end);
    setView(v);
  }, [start, end, count, eventStatus, events]);

  useEffect(() => {
    setCount(1);
  }, [eventStatus]);

  const handleUp = () => {
    setCount((c) => (c < maxCount ? c + 1 : c));
  };

  const handleDown = () => {
    setCount((c) => (c > 1 ? c - 1 : c));
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <div className={styles.title}>
          {eventStatus === 'pending' ? 'Waiting for' : eventStatus === 'approved' ? 'Events' : eventStatus === 'rejected' ? 'Events' : ''}
          <br />
          {eventStatus === 'pending' ? 'approval' : eventStatus === 'approved' ? 'Approved' : eventStatus === 'rejected' ? 'Rejected' : ''}
        </div>

        {
          view.length
            ? (
              <>
                <div className={styles.underline} />
                {/* arrow keys on desktop */}
                <div className={styles.arrow}>
                  <div onClick={handleDown} className={styles.arrowLeft}><img src="/assets/images/events-arrow-left.png" alt="" /></div>
                  <div className={styles.count}>
                    {count}
                    {' '}
                    -
                    {' '}
                    {maxCount}
                  </div>
                  <div onClick={handleUp} className={styles.arrowRight}><img src="/assets/images/events-arrow-right.png" alt="" /></div>
                </div>
              </>
            )
            : null
        }
      </div>

      {
        view.length
          ? (
            <>
              <div className={styles.events}>
                {
                view.map((data, idx) => (
                  <EventsCard pastEvent key={idx} event={data} token={token} />
                ))
              }
              </div>
              {/* arrow keys on mobile view */}
              <div className={`${styles.arrow} ${styles.mobile}`}>
                <div onClick={handleDown} className={styles.arrowLeft}><img src="/assets/images/events-arrow-left.png" alt="" /></div>
                <div className={styles.count}>
                  {count}
                  {' '}
                  -
                  {' '}
                  {maxCount}
                </div>
                <div onClick={handleUp} className={styles.arrowRight}><img src="/assets/images/events-arrow-right.png" alt="" /></div>
              </div>
            </>
          )
          : <div className={styles.empty}>No Events Available</div>
      }

    </div>
  );
};

export default PastEvents;
