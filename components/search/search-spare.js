/* eslint-disable max-len */
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './jobs-card/jobs-card.module.css';

const JobsCard = ({ click, popup, data }) => {
  const {
    job_title,
    job_description,
    location,
    status,
    easy_apply,
    company_name,
    company_description,
    diversity_score,
    type_company,
    website,
    total_dollars_given,
    application_link,
    remote,
    min_requirements,
    weekly_hours,
    benefits,
    additional_compensation,
  } = data;

  return (
    <div
      onClick={click}
      className={`${styles.container} ${popup ? styles.popupView : null}`}
    >
      <section className={`${popup ? styles.header : null}`}>
        <div className={styles.title}>{job_title}</div>
        <div className={styles.industry}>
          {company_name}
          {popup ? <span onClick={() => {}}>{website}</span> : null}
        </div>
        <div className={styles.location}>
          {location}
          {popup ? <span className={styles.remote}>{remote}</span> : null}
        </div>
        {!popup ? (
          <>
            <div className={styles.amountPaid}>{total_dollars_given}</div>
            {easy_apply ? (
              <div className={styles.easyapply}>Easy Apply</div>
            ) : null}
          </>
        ) : (
          <>
            {status ? (
              <div className={`${styles.is} ${styles.active}`}>Active</div>
            ) : (
              <div className={`${styles.not} ${styles.active}`}>Inactive</div>
            )}
            <button type="button">
              Apply Now
              {application_link}
            </button>
          </>
        )}
      </section>

      <section className={styles.main}>
        {popup ? (
          <div className={styles.sect}>
            <div className={styles.sectTitle}>Our Company</div>
            <div className={styles.sectText}>{company_description}</div>
          </div>
        ) : null}

        <div className={styles.sect}>
          {popup ? (
            <div className={styles.sectTitle}>Responsibilities</div>
          ) : null}
          <div className={styles.sectText}>{job_description}</div>
        </div>

        {popup ? (
          <>
            <div className={styles.sect}>
              <div className={styles.sectTitle}>Requirements</div>
              {min_requirements
                && min_requirements.map(({ skill, years }) => (
                  <div
                    className={`${styles.list} ${popup ? styles.expand : null}`}
                  >
                    <span className={`${styles.listStyle} ${styles.disc}`} />
                    {' '}
                    Skill:
                    {' '}
                    {skill}
                    {' '}
                    Experience:
                    {' '}
                    {years}
                    {' '}
                    year(s)
                    {' '}
                  </div>
                ))}
            </div>

            <div className={styles.sect_}>
              <div className={styles.sectTitle_}>
                Company Type:
                {type_company}
              </div>
            </div>

            <div className={styles.sect_}>
              <div className={styles.sectTitle_}>
                Salary:
                {total_dollars_given}
              </div>
            </div>

            <div className={styles.sect_}>
              <div className={styles.sectTitle_}>
                Weekly Hours:
                {weekly_hours}
              </div>
            </div>

            <div className={styles.sect_}>
              <div className={styles.sectTitle_}>
                Work Remotely:
                {remote ? 'Yes' : 'No'}
              </div>
            </div>

            <div className={styles.sect_}>
              <div className={styles.sectTitle_}>
                Benefits:
                {benefits}
              </div>
            </div>

            <div className={styles.sect_}>
              <div className={styles.sectTitle_}>
                Additional Compensation:
                {additional_compensation}
              </div>
            </div>

            <div className={styles.sect_}>
              <div className={styles.sectTitle_}>
                Diversity Score:
                {diversity_score}
              </div>
            </div>
          </>
        ) : null}
      </section>
    </div>
  );
};

export default JobsCard;

[1, 2, 3, 4].map((_, idx) => (
  <div key={`${idx + 0}`}>
    <Skeleton height={20} />
    <br />
    <br />
    <Skeleton height={60} count={3} />
    <br />
    <br />
  </div>
));
