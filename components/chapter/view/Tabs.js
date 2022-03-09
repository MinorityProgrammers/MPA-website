import React, { useState } from 'react';
import styles from './chapter.module.scss';

const Tabs = () => {
  const [active, setActive] = useState({
    overview: true,
    events: false,
    governance: false,
    members: false,
    resources: false,
  });
  let a;
  const updateActive = (name) => {
    const update = {};
    const stats = Object.keys(active);
    stats.forEach((stat) => {
      update[stat] = false;
    });
    update.name = true;
    setActive(update);
  };
  return (
    <>
      <div className={styles.tabs}>
        <div onClick={() => updateActive('overview')} className={active.overview && styles.active}>
          <p>
            Overview
          </p>
          <div />

        </div>
        <div className={active.overview && styles.events}>
          <p> Events</p>
          {' '}
          <div />
        </div>
        <div>
          <p> Governance</p>
          <div />
        </div>
        <div>

          <p> Members</p>
          <div />
        </div>
        <div>
          <p> Resources</p>
          <div />
        </div>
      </div>
      <div className={styles.line} />
    </>
  );
};

export default Tabs;
