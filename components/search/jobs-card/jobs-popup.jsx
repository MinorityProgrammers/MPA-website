import React from 'react';
import styles from './jobs-popup.module.css';

const JobsPopup = ({ togglePopup, data }) => {
  const { companyId: { company_name, company_description, website, headquarter, type_company, size_company, diversity_score }, job_responsibilities, easy_apply, status, min_requirements, job_title, application_link, job_description, job_industry, location, remote, pay, weekly_hours, is_deleted, additional_compensation, benefits, job_type } = data;

  return (
    <div className={styles.container}>

      <section className={styles.header}>
        <div className={styles.title}>{job_title}</div>
        <div className={styles.industry}>{company_name}
          <a href={website} className={styles.link}><i className={`${styles.link} fas fa-external-link-alt`}></i></a>
        </div>
        <div className={styles.location}>{location} {remote ? <span className={styles.remote}>Remote</span> : null}</div>
        <a href={application_link}>
          <button className={styles.applyButton}>Apply Now</button>
        </a>
        {
          is_deleted ? <div className={`${styles.is} ${styles.active}`}>Active</div> : <div className={`${styles.not} ${styles.active}`}>Inactive</div>
        }
        {
          easy_apply ? <div className={styles.easyapply}>Easy Apply</div> : null
        }
        <i onClick={() => togglePopup(false)} className={`${styles.closePopup} fas fa-times`}></i>
      </section>

      <section className={styles.main}>
        <div className={styles.sectTitle}>{job_type}</div>

        {
          company_description ?
            <div className={styles.sect}>
              <div className={styles.sectTitle}>Our Company</div>
              <div className={styles.sectText}>{company_description}</div>
            </div>
            : null
        }

        {
          job_description ?
            <div className={styles.sect}>
              <div className={styles.sectTitle}>Job Description</div>
              <div className={styles.sectText}>{job_description}</div>
            </div> : null
        }

        {
          job_responsibilities || true ? // || true should be removed when job_responsibilites is available in the database
            <div className={styles.sect}>
              <div className={styles.sectTitle}>Responsibilities</div>
              {
                (new Array(6).fill(null)) // this code should be replaced with job responsibilities when added to the database. Lorem ipsum should be replaced with an actual responsibility.
                  .map((_, idx) => (
                    <div key={idx} className={`${styles.list} ${styles.expand}`}><span className={`${styles.listStyle} ${styles.disc}`} /> Lorem ipsum dolor, sit amet consectetur adipisicing elit. </div>
                  ))
              }
            </div> : null
        }



        {
          min_requirements ?
            <div className={styles.sect}>
              <div className={styles.sectTitle}>Requirements</div>
              {
                min_requirements.map(({ years, skill }, idx) => (
                  <div key={idx} className={`${styles.list} ${styles.expand}`}><span className={`${styles.listStyle} ${styles.disc}`} />
                    {`${years} year(s) of experience in ${skill}`}
                  </div>
                ))
              }
            </div> : null
        }


        {
          job_industry ?
            <div className={styles.sect_}>
              <div className={styles.sectTitle_}>Job Industry: {job_industry}</div>
            </div>
            : null
        }


        {
          type_company ?
            <div className={styles.sect_}>
              <div className={styles.sectTitle_}>Company Type: {type_company}</div>
            </div>
            : null
        }


        {
          size_company ?
            <div className={styles.sect_}>
              <div className={styles.sectTitle_}>Company Size: {size_company}</div>
            </div>
            : null
        }


        {
          pay ?
            <div className={styles.sect_}>
              <div className={styles.sectTitle_}>Salary: {pay} USD</div>
            </div>
            : null
        }


        {
          weekly_hours ?
            <div className={styles.sect_}>
              <div className={styles.sectTitle_}>Weekly Hours: {weekly_hours}</div>
            </div>
            : null
        }


        {
          remote ?
            <div className={styles.sect_}>
              <div className={styles.sectTitle_}>Work Remotely:  {remote ? 'Yes' : 'NO'}</div>
            </div>
            : null
        }


        {
          benefits ?
            <div className={styles.sect_}>
              <div className={styles.sectTitle_}>Benefits: {benefits}</div>
            </div>
            : null
        }

        {
          additional_compensation ?
            <div className={styles.sect_}>
              <div className={styles.sectTitle_}>Additional Compensation: {additional_compensation}</div>
            </div>
            : null
        }

        {
          diversity_score ?
            <div className={styles.sect_}>
              <div className={styles.sectTitle_}>Diversity Score: {diversity_score}</div>
            </div>
            : null
        }
      </section>

    </div>
  )
}

export default JobsPopup;