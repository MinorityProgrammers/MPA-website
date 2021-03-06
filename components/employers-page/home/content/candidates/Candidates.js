import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './candidate.module.css';
import CandidateCard from '../../Card/CandidateCard';

const Candidates = ({ load }) => {
  const [candidates, setCandidates] = useState([]);
  useEffect(() => {
    const userToken = window.localStorage.getItem('jwtToken');
    if (userToken !== null) {
      axios
        .get(`${process.env.BASE_URI}/job/candidates`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => setCandidates(res.data.data));
    }
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1>Candidates</h1>
        <span>
          {candidates.length >= 1 && `(${candidates.length}) new candidates`}
        </span>
      </div>
      <div>
        <hr className={styles.horizontal} />
      </div>
      {/** INDIVIDUAL CANDIDATES CARDS */}
      {candidates.length > 1 ? (
        candidates.slice(0, load).map((item, index) => (
          <div key={`${`candidate${index}`}`}>
            <CandidateCard
              description={item.job_id?.job_title}
              name={`${item.firstName} ${item.lastName}`}
              image={item.authorId?.profilePicture}
            />
          </div>
        ))
      ) : (
        <h2 className={styles.no_item}>No new Candidate</h2>
      )}
    </div>
  );
};

export default Candidates;
