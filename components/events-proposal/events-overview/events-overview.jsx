import React from 'react';
import RecentEvents from '../recent-events/recent-events';
import styles from './events-overview.module.css';

const EventsOverview = function ({ events, token }) {
  return (
    <div className={styles.container}>
      <RecentEvents events={events} eventStatus="pending" token={token} />
      <div className={styles.underlineContainer}>
        <div className={styles.underline} />
      </div>
      <RecentEvents events={events} eventStatus="approved" token={token} />
      <div className={styles.underlineContainer}>
        <div className={styles.underline} />
      </div>
      <RecentEvents events={events} eventStatus="rejected" token={token} />
    </div>
  );
};

export default EventsOverview;
