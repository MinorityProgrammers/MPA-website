import { useState } from 'react';
import styles from './jobs-card.module.css';
import JobsPopup from './jobs-popup';

const JobsCard = function ({ data }) {
  const [popup, togglePopup] = useState(false);

  const {
    easy_apply, job_title, location, pay, job_type, companyId: { company_name },
  } = data;

  const handleClick = () => {
    togglePopup(true);
  };

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.popupContainer} ${popup ? styles.show : styles.hide}`}>
        <JobsPopup data={data} togglePopup={togglePopup} />
      </div>

      <div onClick={handleClick} className={styles.container}>
        <div className={styles.title}>{job_title}</div>
        <div className={styles.industry}>{company_name}</div>
        <div className={styles.location}>{location}</div>
        <div className={styles.amountPaid}>{pay}</div>
        {
          job_type ? <div className={styles.easyapply}>{job_type}</div> : null
        }
        {
          easy_apply ? <div className={styles.easyapply}>Easy Apply</div> : null
        }
        <div className={styles.sect}>
          {
            (new Array(6).fill(null)) // this code should be replaced with job responsibilities when added to the database. Lorem ipsum should be replaced with an actual responsibility.
              .filter((_, idx) => idx < 4)
              .map((_, idx) => (
                <div key={idx} className={styles.list}>
                  <span className={`${styles.listStyle} ${styles.circle}`} />
                  {`${'Lorem ipsum dolor, sit amet consectetur adipisicing elit.'.substring(0, 40)}...`}
                </div>
              ))
          }
        </div>
      </div>
    </div>
  );
};

export default JobsCard;
