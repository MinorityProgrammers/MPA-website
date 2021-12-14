import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { successToast } from '../../contexts/utils/toasts';
import SavedOrAppliedJobSkeleton from './SavedOrAppliedJobsSkeleton';

const Saved = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const userInfo = typeof window !== 'undefined'
    ? window.localStorage.getItem('userInfo')
    : null;
  const token = typeof window !== 'undefined'
    ? window.localStorage.getItem('jwtToken')
    : null;

  const fetchData = () => {
    if (token) {
      axios
        .get(
          `${process.env.BASE_URI}/savejob/userjobs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => {
          // filter out invalid responses
          const savedJobsData = response.data.data.filter(
            (jobInfo) => jobInfo.job_id !== null,
          );
          setSavedJobs(savedJobsData);
          setTimeout(setLoading(false), 2000);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteJob = (e) => {
    const x = e.target.parentNode.parentNode;
    x.style.display = 'none';
  };

  const removeSavedJob = (e, jobID) => {
    deleteJob(e);
    if (token) {
      axios
        .delete(
          `${process.env.BASE_URI}/saveJob/${jobID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(() => {
          successToast('Job Removed Successfully!');
        });
    }
  };

  const savedJobsList = savedJobs.map((job) => (
    <div className="saved-job-stub" key={job._id}>
      <div className="saved-job-stub-header">
        <div className="saved-job-stub-title">{job.job_id.job_title}</div>
        <div className="saved-job-stub-company">{job.job_id.company_name}</div>
        <div className="saved-job-stub-location">{job.job_id.location}</div>
      </div>
      <div className="saved-job-stub-description">
        {job.job_id.job_description}
      </div>
      <div className="saved-job-stub-footer">
        <div className="saved-job-stub-postDate">
          Posted:
          {' '}
          {new Date(job.job_id.updatedAt).toDateString().substr(3)}
        </div>
        <a
          className="saved-job-stub-saveLink"
          onClick={(e) => removeSavedJob(e, job._id)}
        >
          Delete
        </a>
      </div>
    </div>
  ));
  return (
    <div className="savedMain">
      <h3 className="savedMain-header">Saved Jobs</h3>
      {loading ? (
        <>
          <SavedOrAppliedJobSkeleton />
          <SavedOrAppliedJobSkeleton />
          <SavedOrAppliedJobSkeleton />
          <SavedOrAppliedJobSkeleton />
        </>
      ) : userInfo != null ? (
        savedJobsList
      ) : (
        <h1>Please sign in to view your saved jobs</h1>
      )}
    </div>
  );
};

export default Saved;
