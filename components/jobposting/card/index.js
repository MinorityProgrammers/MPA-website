import React, { useState } from 'react';
import styles from './job-card.module.css';

const JobCard = ({
  limit,
  body,
  savejob,
  buttonClick,
  cardClick,
  pageNumber,
}) => {
  const initDataShow = limit && body ? body.slice(0, Number(limit)) : body;
  const [jobs] = useState(initDataShow);

  const jobsPerPage = 5;
  const pagesVisited = pageNumber * jobsPerPage;

  const displayedUsers = jobs
    .slice(pagesVisited, pagesVisited + jobsPerPage)
    .map((item, index) => (
      <div>
        {body && (
          <div
            key={`${index + 1}`}
            onClick={(e) => cardClick(e, item, index)}
            className={styles.root}
          >
            <div className={styles.header}>
              <h1 className="job-stub-title">{item.job_title}</h1>
              <div className="job-stub-company">
                {item?.companyId?.company_name}
              </div>
            </div>
            <div className={styles.footer}>
              <span>
                Posted: {new Date(item.updatedAt).toDateString().substr(3)}
              </span>
              <button type="button" onClick={() => buttonClick(item)}>
                {savejob}
              </button>
            </div>
          </div>
        )}
      </div>
    ));

  return <>{displayedUsers}</>;
};

export default JobCard;
