import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './jobs.module.css';
import Card from '../../Card/Card';

const Jobs = ({ load }) => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const userToken = window.localStorage.getItem('jwtToken');
    if (userToken !== null) {
      axios
        .get(`${process.env.BASE_URI}/job/userJobs`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => setJobs(res.data.data));
    }
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1>Jobs</h1>
        <span>{jobs.length >= 1 && `(${jobs.length}) new applied`}</span>
      </div>
      <hr className={styles.horizontal} />
      {jobs.length >= 1 ? (
        jobs.slice(0, load).map((item, index) => (
          <div key={`${index + 1}`} className={styles.card}>
            <Card
              title={item.job_title}
              status={item.job_title.length}
              date={item.createdAt}
              progress="in Progress"
            />
          </div>
        ))
      ) : (
        <h2 className={styles.no_item}>No Jobs Posted, Start Posting</h2>
      )}
    </div>
  );
};

export default Jobs;
