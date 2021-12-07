import { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './jobs.module.css';
import Card from '../../Card/Card';

const contents = [
  {
    title: 'Front End Developer',
    status: '21',
    date: '4/12/2021',
    progress: 'in Progress',
  },
  {
    title: 'Front End Developer',
    status: '21',
    date: '4/12/2021',
    progress: 'in Progress',
  },
  {
    title: 'Front End Developer',
    status: '21',
    date: '4/12/2021',
    progress: 'in Progress',
  },
  {
    title: 'Front End Developer',
    status: '21',
    date: '4/12/2021',
    progress: 'in Progress',
  },
];

const Jobs = function ({ load }) {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const userToken = window.localStorage.getItem('jwtToken');
    if (userToken !== null) {
      axios
        .get('https://koinstreet-learn-api.herokuapp.com/api/v1/job/userJobs', {
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
          <div key={index} className={styles.card}>
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
