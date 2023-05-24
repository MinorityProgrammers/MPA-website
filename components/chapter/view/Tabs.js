import React, { useState } from 'react';
import styles from './chapter.module.scss';

const Tabs = ({ active, setActive }) => {
  const updateActive = (name) => {
    const update = {};
    const stats = Object.keys(active);
    stats.forEach((stat) => {
      update[stat] = false;
    });
    update[name] = true;
    setActive(update);
  };
  return (
    <>
      <div className={styles.tabs}>
        <div onClick={() => updateActive('overview')} className={active.overview ? styles.active : ''}>
          <p>
            Overview
          </p>
          <div />

        </div>
        <div onClick={() => updateActive('events')} className={active.events ? styles.active : ''}>
          <p> Events</p>
          {' '}
          <div />
        </div>
        <div
        //  onClick={() => updateActive('governance')}
          className={active.governance ? styles.active : ''}
        >
          <p><a href="https://snapshot.org/#/minorityprogrammers.eth"> Governance</a></p>
          <div />
        </div>
        <div onClick={() => updateActive('members')} className={active.members ? styles.active : ''}>

          <p> Members</p>
          <div />
        </div>
        <div onClick={() => updateActive('resources')} className={active.resources ? styles.active : ''}>
          <p> Resources</p>
          <div />
        </div>
      </div>
      <div className={styles.line} />
    </>
  );
};

export default Tabs;
