import React from 'react';
import PastEvents from '../past-events/past-events';
import RecentEvents from '../recent-events/recent-events';
import styles from './events-menu.module.css';

const EventsMenu = ({ eventStatus, events, token }) => (
  <div className={styles.container}>
    <RecentEvents events={events} eventStatus={eventStatus} token={token} />
    <PastEvents events={events} eventStatus={eventStatus} token={token} />
  </div>
);

export default EventsMenu;
