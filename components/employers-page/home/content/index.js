import React, { useState } from 'react';
import styles from './content.module.css';
import Jobs from './jobs/Jobs';
import Candidates from './candidates/Candidates';
import Interview from './interview/Interview';

const EmployerContent = () => {
  const [load, setLoad] = useState(3);

  const loadmore = () => {
    setLoad(load + 2);
  };
  return (
    <div>
      {/** Grid of Employers Dashboard */}
      <div className={styles.root}>
        <Jobs load={load} />
        <Candidates load={load} />
        <Interview scheduled={7} />
      </div>
      <div className={styles.footer}>
        <button type="button" onClick={loadmore}>
          load more
        </button>
      </div>
    </div>
  );
};

export default EmployerContent;
