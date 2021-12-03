import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { successToast, notificationToast } from '../../contexts/utils/toasts'
import SavedOrAppliedJobSkeleton from './SavedOrAppliedJobsSkeleton';





const Applied = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(false)

  const userInfo = typeof window !== 'undefined' ? window.localStorage.getItem('userInfo') : null
  const token = typeof window !== 'undefined' ? window.localStorage.getItem('jwtToken') : null

  useEffect(() => {
    getAppliedJobs()
  }, [])
  const getAppliedJobs = () => {
    setLoading(true)
    if (token) {
      axios.get('https://koinstreet-learn-api.herokuapp.com/api/v1/easyApply/userApplied',
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(function (response) {
          const appliedJobsData = response.data.data.filter(jobInfo => jobInfo.job_id !== null)
          setAppliedJobs(appliedJobsData)
          setLoading(false)
          console.log("Applied Jobs", response.data);

        })
    }
  }

  const removeAppliedJob = (e, jobID) => {
    if (token) {
      deleteJob(e)
      axios.delete(`https://koinstreet-learn-api.herokuapp.com/api/v1/easyApply/${jobID}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(function () {
          successToast('Applied Job Deleted Successfully!')
        })
    }

  }

  const deleteJob = (e) => {
    const x = e.target.parentNode.parentNode;
    x.style.display = "none";
  }

  console.log(appliedJobs)


  let appliedJobsList = appliedJobs.map((job) =>
    <div className="saved-job-stub" key={job._id}>
      <div className="saved-job-stub-header">
        <div className="saved-job-stub-title">{job.job_id.job_title}</div>
        <div className="saved-job-stub-company">{job.job_id.company_name}</div>
        <div className="saved-job-stub-location">{job.job_id.location}</div>
      </div>
      <div className="saved-job-stub-description">{job.job_id.job_description}</div>
      <div className="saved-job-stub-footer">
        <div className="saved-job-stub-postDate">Applied: {new Date(job.updatedAt).toDateString().substr(3)}</div>
        <a className="saved-job-stub-saveLink" onClick={(e) => removeAppliedJob(e, job._id)}>Delete</a>
      </div>
    </div>
  )

  return (

    <div className="appliedMain">
      <h3 className="appliedMain-header">Applied Jobs</h3>
      {loading
        ?
        <>
          <SavedOrAppliedJobSkeleton />
          <SavedOrAppliedJobSkeleton />
          <SavedOrAppliedJobSkeleton />
          <SavedOrAppliedJobSkeleton />
        </>
        : (userInfo != null ? appliedJobsList : <h1>Please sign in to view your saved jobs</h1>)}
    </div>

  )
}

export default Applied;




    // const all = [
        //     finalQuickApplyData.get('applicationState'),
        //     finalQuickApplyData.get('resume'),
        //     finalQuickApplyData.get('additional')
        // ]
        // localStorage.setItem('AppliedJob', all)
        // console.log("applicationState", finalQuickApplyData.get('applicationState'))

        // console.log(finalQuickApplyData.get('firstName'))




        // fetch('https://koinstreet-learn-api.herokuapp.com/api/v1/easyApply',
        //     {
        //         method: 'POST',
        //         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
        //         body: finalQuickApplyData
        //     }).then((response) => {
        //         console.log(response)
        //         successToast('You applied to this job Successfully!')
        //     })
        //     .catch((error) => console.log(error));


        // axios({
        //     method: "post",
        //     url: "https://koinstreet-learn-api.herokuapp.com/api/v1/easyApply",
        //     data: finalQuickApplyData,
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //         "Authorization": `Bearer ${token}`
        //     },
        // })
        //     .then(function (response) {
        //         //handle success
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         //handle error
        //         console.log(error);
        //     });
