import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OverviewCareer = (props) => {
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [currentView, setCurrentView] = useState('applied');

  useEffect(() => {
    if (props.token !== null) {
      axios
        .get('https://koinstreet-learn-api.herokuapp.com/api/v1/job')
        .then((response) => {
          setAllJobs(response.data.data);
          return axios
            .get(
              'https://koinstreet-learn-api.herokuapp.com/api/v1/easyApply/userApplied',
              {
                headers: {
                  Authorization: `Bearer ${props.token}`,
                },
              },
            );
        })
        .then((response) => {
          setLoading(false);
          setAppliedJobs(response.data.data);
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
          setAppliedJobs([]);
          // setAllJobs([]);
          setLoading(true);
        });
    }
  }, []);

  return (
  // this component has 2 rows
  // first row: title + buttons
  // second row: 3 first jobs

    <div className="d-flex flex-column justify-content-between h-100">
      <div className="d-flex flex-row justify-content-between">
        <div>
          <p style={{
            fontSize: '18px', fontWeight: '700', color: 'black', margin: 0,
          }}
          >
            Career

          </p>
        </div>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div className="d-flex flex-row justify-content-between" style={{ height: '25px' }}>
            <div className={currentView === 'applied' ? 'overview-career-button selected' : 'overview-career-button'} onClick={() => { setCurrentView('applied'); }} style={{ marginRight: '2%' }}>
              <p>Applied</p>
            </div>
            <div className={currentView === 'all' ? 'overview-career-button selected' : 'overview-career-button'} onClick={() => { setCurrentView('all'); }}>
              <p>View All</p>
            </div>
          </div>

        </div>
      </div>

      {loading
        ? (
          <div className="overview-career-cards-list d-flex row justify-content-center align-items-between" style={{ height: '100%' }}>
            <img className="empty-events" alt="empty" src="https://s3-alpha-sig.figma.com/img/1246/595d/4a0da69c016851ce633343ee4f30313d?Expires=1639353600&Signature=EJMuUjTc9G61ydW6x2nU~hpJLuXYU8MfNm2x8OtLhmikkWVFKQEepE4zR0xBOZprHcbOwJcH4WmD5e3ugNYd3m4wqqBKhvTbuAjqIVhiSWIXM2WiNo3cZgDe1hHGoocFzHSWcnseBvgqafwvABhbZBjUeogeU0UPFEhb-7D2HzKUxGwrc4kkvCLz7~IQjQCy1sAGxLhqgRa0RD-p~VNtcgemF5N1qpiDe-cwFQL58kHg1v3tZMpGZagi7PC6ryl-i8-PBWVY20znzZ9iaUs2WdcBRqHYuopxGe9Oq4~tyIKsfdOOT05~sDFvwqA33c8YaNc8uhE8-kiu5g~NLGVbKg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
            <p className="empty-events-description">
              You haven’t applied for any jobs on MPA yet. You can do that in the Careers Section.
            </p>
            <div className="d-flex justify-content-center align-items-center" style={{ width: '100%' }}>
              <button type="button" className="btn btn-primary" style={{ background: '#151371', paddingLeft: '31px', paddingRight: '31px' }}>
                Apply For Your First Job
              </button>

            </div>
          </div>
        )
        : (
          <div className="overview-career-cards-list d-flex flex-column justify-content-between" style={{ height: '100%' }}>
            {
            currentView === 'all' // if the view is all
              ? allJobs.length !== 0 // if all jobs is not empty
                ? allJobs.slice(0, 3).map((job) => (
                  <div key={job.createdAt} className="overview-career-card d-flex flex-row justify-content-between">
                    {/* 4 column  logo - company name + position - job type - more details button */}
                    <div className="d-flex flex-row">
                      <div className="overview-career-card-image d-flex justify-content-center align-items-center" style={{ paddingRight: '10px' }}>
                        <img alt="company's logo" src="/assets/images/mpicon.svg" />
                      </div>
                      <div className="overview-career-card-info d-flex flex-column">
                        <p className="overview-career-card-info-title">{job?.companyId?.company_name}</p>
                        <p>{job.job_title}</p>
                      </div>
                    </div>

                    <div className="d-flex flex-row">
                      <div className="overview-career-card-jobtype">
                        <p>{job.job_type}</p>
                      </div>
                      <div className="d-flex justify-content-center align-items-center" style={{ width: '32px' }}>
                        <a href="#" target="_blank">
                          <button className="more-details-button">
                            &gt;
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                ))
                : (
                  <div className="overview-career-cards-list d-flex row justify-content-center align-items-between" style={{ height: '100%' }}>
                    <img className="empty-events" alt="empty" src="https://s3-alpha-sig.figma.com/img/1246/595d/4a0da69c016851ce633343ee4f30313d?Expires=1639353600&Signature=EJMuUjTc9G61ydW6x2nU~hpJLuXYU8MfNm2x8OtLhmikkWVFKQEepE4zR0xBOZprHcbOwJcH4WmD5e3ugNYd3m4wqqBKhvTbuAjqIVhiSWIXM2WiNo3cZgDe1hHGoocFzHSWcnseBvgqafwvABhbZBjUeogeU0UPFEhb-7D2HzKUxGwrc4kkvCLz7~IQjQCy1sAGxLhqgRa0RD-p~VNtcgemF5N1qpiDe-cwFQL58kHg1v3tZMpGZagi7PC6ryl-i8-PBWVY20znzZ9iaUs2WdcBRqHYuopxGe9Oq4~tyIKsfdOOT05~sDFvwqA33c8YaNc8uhE8-kiu5g~NLGVbKg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
                    <p className="empty-events-description">
                      No Jobs Available At The Moment
                    </p>
                  </div>
                )
              : appliedJobs.length > 0 // if current view is applied job then check if applied jobs emptied
                ? appliedJobs.slice(0, 3).map((job) => (
                  <div key={job?.companyId?.authorId} className="overview-career-card d-flex flex-row justify-content-between">
                    {/* 4 column  logo - company name + position - job type - more details button */}
                    <div className="d-flex flex-row">
                      <div className="overview-career-card-image d-flex justify-content-center align-items-center" style={{ paddingRight: '10px' }}>
                        <img alt="company's logo" src="/assets/images/mpicon.svg" />
                      </div>
                      <div className="overview-career-card-info d-flex flex-column">
                        <p className="overview-career-card-info-title">{job.companyId?.company_name}</p>
                        <p>{job.job_title}</p>
                      </div>
                    </div>

                    <div className="d-flex flex-row">
                      <div className="overview-career-card-jobtype">
                        <p>{job.job_type}</p>
                      </div>
                      <div className="d-flex justify-content-center align-items-center" style={{ width: '32px' }}>
                        <a href="#" target="_blank">
                          <button className="more-details-button">
                            &gt;
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                ))
                : (
                  <div className="overview-career-cards-list d-flex row justify-content-center align-items-between" style={{ height: '100%' }}>
                    <img className="empty-events" alt="empty" src="https://s3-alpha-sig.figma.com/img/1246/595d/4a0da69c016851ce633343ee4f30313d?Expires=1639353600&Signature=EJMuUjTc9G61ydW6x2nU~hpJLuXYU8MfNm2x8OtLhmikkWVFKQEepE4zR0xBOZprHcbOwJcH4WmD5e3ugNYd3m4wqqBKhvTbuAjqIVhiSWIXM2WiNo3cZgDe1hHGoocFzHSWcnseBvgqafwvABhbZBjUeogeU0UPFEhb-7D2HzKUxGwrc4kkvCLz7~IQjQCy1sAGxLhqgRa0RD-p~VNtcgemF5N1qpiDe-cwFQL58kHg1v3tZMpGZagi7PC6ryl-i8-PBWVY20znzZ9iaUs2WdcBRqHYuopxGe9Oq4~tyIKsfdOOT05~sDFvwqA33c8YaNc8uhE8-kiu5g~NLGVbKg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
                    <p className="empty-events-description">
                      You haven’t applied for any jobs on MPA yet. You can do that in the Careers Section.
                    </p>
                    <div className="d-flex justify-content-center align-items-center" style={{ width: '100%' }}>
                      <button type="button" className="btn btn-primary" style={{ background: '#151371', paddingLeft: '31px', paddingRight: '31px' }}>
                        Apply For Your First Job
                      </button>
                    </div>
                  </div>
                )
          }

          </div>
        )}

    </div>
  );
};

export default OverviewCareer;
