import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import Link from 'next/link';

const OverviewCareer = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [currentView, setCurrentView] = useState('applied');

  useEffect(() => {
    if (token !== null) {
      axios
        .get(`${process.env.BASE_URI}/job`)
        .then((response) => {
          setAllJobs(response.data.data);
          return axios.get(`${process.env.BASE_URI}/easyApply/userApplied`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        })
        .then((response) => {
          setTimeout(() => {
            setLoading(false);
          }, 3000);
          setAppliedJobs(response.data.data);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
          console.log(error.config);
          setAppliedJobs([]);
          setLoading(true);
        });
    }
  }, []);
  console.log(allJobs);
  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{
        height: '100%',
        width: '100%',
        overflowY: 'scroll',
        overflowX: 'hidden',
      }}
    >
      <div className="d-flex flex-row justify-content-between">
        <div>
          <p
            style={{
              fontSize: '18px',
              fontWeight: '700',
              color: 'white',
              margin: 0,
            }}
          >
            Career
          </p>
        </div>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div
            className="d-flex flex-row justify-content-between"
            style={{ height: '25px' }}
          >
            <div
              className={
                currentView === 'applied'
                  ? 'overview-career-button selected'
                  : 'overview-career-button'
              }
              onClick={() => {
                setCurrentView('applied');
              }}
              style={{ marginRight: '2%' }}
            >
              <p>Applied</p>
            </div>
            <div
              className={
                currentView === 'all'
                  ? 'overview-career-button selected'
                  : 'overview-career-button'
              }
              onClick={() => {
                setCurrentView('all');
              }}
            >
              <p>View All</p>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div
          className="d-flex flex-row justify-content-start align-items-center"
          style={{ lineHeight: 2 }}
        >
          <Skeleton count={5} height={45} width={440} />
        </div>
      ) : (
        <div
          className="overview-career-cards-list d-flex flex-column justify-content-between"
          style={{ height: '100%' }}
        >
          {currentView === 'all' ? (
            allJobs.length !== 0 ? (
              allJobs.slice(0, 3).map((job) => (
                <div
                  key={job.createdAt}
                  className="overview-career-card d-flex flex-row justify-content-between"
                >
                  <div className="d-flex flex-row">
                    <div
                      className="overview-career-all-image d-flex justify-content-center align-items-center"
                    >
                      <img alt="company's logo" src="/assets/images/mpicon.svg" />

                    </div>
                    <div className="overview-career-card-info d-flex flex-column">
                      <p className="overview-career-card-info-title">
                        {job?.companyId?.company_name}
                      </p>
                      <p style={{ fontWeight: '500', color: '#DEDEDE', fontSize: '10px' }}>
                        {job.job_title}

                      </p>
                    </div>
                  </div>

                  <div className="d-flex flex-row">
                    {/* <div className="overview-career-card-jobtype">
                      <p>{job.job_type}</p>
                    </div> */}
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ width: '32px', cursor: 'pointer' }}
                    >
                      <Link href="/careers">
                        <i style={{ fontSize: '22px' }} className="far fa-arrow-alt-circle-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                className="overview-career-cards-list d-flex row justify-content-center align-items-between"
                style={{ height: '100%' }}
              >
                <img
                  className="empty-events"
                  alt="empty"
                  src="assets/images/dashboard/career.png"
                />
                <p className="empty-events-description">
                  No Jobs Available At The Moment
                </p>
              </div>
            )
          ) : appliedJobs.length > 0 ? (
            appliedJobs.slice(0, 3).map((job) => (
              <div
                key={job?.companyId?.authorId}
                className="overview-career-card d-flex flex-row justify-content-between"
              >
                <div className="d-flex flex-row">
                  <div
                    className="overview-career-card-image d-flex justify-content-center align-items-center"
                    style={{ marginRight: '10px' }}
                  >
                    <img style={{ objectFit: 'contain', border: '1px solid #6938EF' }} alt="company's logo" src="/assets/images/mpicon.svg" />
                  </div>
                  <div className="overview-career-card-info d-flex flex-column">
                    <p className="overview-career-card-info-title">
                      {job?.companyId?.company_name}
                    </p>
                    <p>{job?.job_title}</p>
                  </div>
                </div>

                <div className="d-flex flex-row">
                  <div className="overview-career-card-jobtype">
                    <p>{job?.job_type}</p>
                  </div>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ width: '32px' }}
                  >
                    <a href="#" target="_blank">
                      <button type="button" className="more-details-button">
                        &gt;
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              className="overview-career-cards-list d-flex row justify-content-center align-items-between"
              style={{ height: '100%' }}
            >
              <img
                className="empty-events"
                alt="empty"
                src="assets/images/dashboard/career.png"
              />
              <p className="empty-events-description">
                You haven’t applied for any jobs on MPA yet. You can do that in
                the Careers Section.
              </p>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ width: '100%' }}
              >
                <Link href="/careers">
                  <a
                    className="button-more"
                  >
                    Apply For Your First Job
                  </a>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OverviewCareer;
