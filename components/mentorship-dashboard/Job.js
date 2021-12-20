import { Button } from 'react-bootstrap';
import styles from '../../styles/MentorCSS/Course.module.css';

const Job = ({ job }) => {
  return (
    <div className={styles.container}>
      <div className={styles.containerTitle + ' ' + styles.capstoneTitle}>
        <div> {job.title} </div>
        <div>
          <Button
            bsPrefix={'btn btn-secondary btn-sm ' + styles.reviewBtn}
            variant="secondary"
            size="sm"
          >
            Review
          </Button>
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.grid}>
        <div>
          <div className={styles.companyDetail}>
            <p style={{ fontWeight: 'bold' }}>{job.company.name} </p>
            <p> {job.company.location}</p>
            <p>{job.company.size}</p>
          </div>
          <div className={styles.capstoneDate}>
            <span>Posted:</span>{' '}
            {job.createdAt.split('T')[0] +
              ' at ' +
              job.createdAt.split('T')[1].split('.')[0]}
          </div>
        </div>

        <div className={styles.courseDescription}>
          <div className={styles.colTitle}>Job Description </div>
          <div>
            <div className={styles.event}>{job.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;
