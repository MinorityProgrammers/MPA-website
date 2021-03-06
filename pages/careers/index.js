import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import CareersMainComponent from '../../components/career-components/CareersMainComponent';
import JobsFilters from '../../components/career-components/JobsFilters';
import LoadingSkeleton from '../../components/career-components/LoadingSkeleton';
import ComingSoon from '../../components/ComingSoon';
import HomepageNav from '../../components/homepage/HomepageNav';
import Layout from '../../components/Layout';
import SidebarTwo from '../../components/sidebar/SidebarTwo';
import useDetectOutsideClick from '../../components/UseDetectOutsideClick';
import links from '../../contexts/utils/links';
import { errorToast, successToast } from '../../contexts/utils/toasts';

export async function getServerSideProps(context) {
  return {
    props: {
      query: context.query,
    },
  };
}

const JobsMain = () => {
  const [open, setOpen] = useState(false);
  const [modalView, toggleModalView] = useState(false);
  const dropdownRef = useRef(null);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, true);
  const [showModal, setShowModal] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);

  const handleClick = () => {
    setHide(!hide);
  };
  if (hide === false) {
    setTimeout(() => {
      setHide(true);
    }, 60000);
  }

  const [currentJob, changeCurrentJob] = useState({});
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingReq, setLoadingReq] = useState(false);
  const [allJobs, setAllJobs] = useState([]);
  const [filter] = useState({
    pay: '',
    job_type: '',
    remote: '',
    date_posted: '0',
    job_industry: '',
    description: '',
    location: '',
  });
  const [queryObj] = useState({});
  const [activeJobIndex, setActiveJobIndex] = useState(0);
  const descriptionInput = useRef();

  const fetchData = () => {
    setLoading(true);
    fetch(`${process.env.BASE_URI}/job`)
      .then((response) => response.json())
      .then((response) => {
        setJobs(response.data);
        setAllJobs(response.data);
        console.log(jobs);

        if (window.innerWidth <= 991) {
          changeCurrentJob(null);
        } else {
          changeCurrentJob(response.data[0]);
        }

        setTimeout(() => {
          setLoading(false);
          setLoadingReq(true);
        }, 1);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [
    typeof window !== 'undefined'
      ? window.localStorage.getItem('jwtToken')
      : null,
  ]);

  const openModal = () => {
    if (window.innerWidth <= 550) setShowModal(!showModal);
  };

  const filterJobs = () => {
    setLoading(true);
    setJobs([]);
    fetch(
      `${process.env.BASE_URI}/job?pay=${filter.pay}&remote=${filter.remote}&job_type=${filter.job_type}&date_posted=${filter.date_posted}&job_industry=${filter.job_industry}`
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.data.length >= 1) {
          if (window.innerWidth <= 991) {
            changeCurrentJob(null);
            setJobs(response.data);
          } else {
            changeCurrentJob(response.data[0]);
            setJobs(response.data);
          }
        } else {
          changeCurrentJob(null);
          setJobs([]);
        }
        setLoading(false);
      });
  };

  const router = useRouter();

  function submitForm(btn) {
    // reset to page 1
    if (queryObj.page) {
      delete queryObj.page;
    }

    if (btn.target.name !== 'remote') {
      btn.target.parentNode.parentNode.parentNode.style.display = 'none';
    }

    if (btn.target.name === 'pay') {
      if (btn.target.value !== '') {
        queryObj.pay = btn.target.value;
        filter.pay = btn.target.value;
      } else {
        filter.pay = '';
        delete queryObj.pay;
      }
      router.push({ query: queryObj });
    }

    if (btn.target.name === 'remote') {
      if (btn.target.checked === true) {
        queryObj.remote = true;
        filter.remote = true;
      } else {
        filter.remote = '';
        delete queryObj.remote;
      }
      router.push({ query: queryObj });
    }

    if (btn.target.name === 'job_type') {
      if (btn.target.checked === true) {
        queryObj.job_type = btn.target.value;
        filter.job_type = btn.target.value;
      } else {
        filter.job_type = '';
        delete queryObj.job_type;
      }
      router.push({ query: queryObj });
    }

    if (btn.target.name === 'job_industry') {
      if (btn.target.checked === true) {
        queryObj.job_industry = btn.target.value;
        filter.job_industry = btn.target.value;
      } else {
        filter.job_industry = '';
        delete queryObj.job_industry;
      }
      router.push({ query: queryObj });
    }

    if (btn.target.name === 'date_posted') {
      if (btn.target.value !== '0') {
        queryObj.date_posted = btn.target.value;
        filter.date_posted = btn.target.value;
      } else {
        filter.date_posted = '0';
        delete queryObj.date_posted;
      }
      router.push({ query: queryObj });
    }

    filterJobs();
  }

  const winSize = useRef(null);
  useEffect(() => {
    winSize.current = window.innerWidth > 991 ? 'large' : 'small';
  }, []);

  function containerReset() {
    if (window.innerWidth > 991 && document.querySelector('.jobsMain')) {
      document.getElementsByClassName(
        'jobs-main-container-list'
      )[0].style.display = 'block';
      document.getElementsByClassName(
        'jobs-main-container-single'
      )[0].style.display = 'block';

      winSize.current = 'large';
    } else if (
      winSize.current === 'large' &&
      document.querySelector('.jobsMain')
    ) {
      document.getElementsByClassName(
        'jobs-main-container-single'
      )[0].style.display = 'none';
      winSize.current = 'small';
    }
  }

  useEffect(() => {
    window.addEventListener('resize', containerReset);
  }, []);

  function changeJobAndColor(e, currJob, idx) {
    setActiveJobIndex(idx);
    changeCurrentJob((/* prevJob */) => currJob);
    if (window.innerWidth <= 991) {
      document.getElementsByClassName('jobsMain-search')[0].style.display =
        'none';
      document.getElementsByClassName(
        'jobs-main-container-list'
      )[0].style.display = 'none';
      document.getElementsByClassName('jobs-main-filters')[0].style.display =
        'none';
      document.getElementsByClassName(
        'jobs-main-container-single'
      )[0].style.display = 'block';
    }
  }

  function closeSingle() {
    document.getElementsByClassName('jobsMain-search')[0].style.display =
      'block';
    document.getElementsByClassName('jobs-main-filters')[0].style.display =
      'block';
    document.getElementsByClassName(
      'jobs-main-container-single'
    )[0].style.display = 'none';
    document.getElementsByClassName('jobsMain')[0].style.height = 'auto';
    document.getElementsByClassName(
      'jobs-main-container-list'
    )[0].style.display = 'block';
  }

  function openFilterForm(btn) {
    if (window.getComputedStyle(btn.nextSibling).display === 'block') {
      btn.nextSibling.style.display = 'none';
      return;
    }

    const elements = document.getElementsByClassName('job-filter-item-form');
    for (let i = 0; i < elements.length; i += 1) {
      elements[i].style.display = 'none';
    }

    if (btn.nextSibling) {
      btn.nextSibling.style.display = 'block';
    }
  }

  const token =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('jwtToken')
      : null;

  const userInfo =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('userInfo')
      : null;

  const fetchSavedJobs = () => {
    if (token) {
      axios
        .get(`${process.env.BASE_URI}/savejob/userjobs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setSavedJobs(response.data.data);
          setLoading(false);
        });
    }
  };

  const saveJob = (job) => {
    axios
      .post(
        `${process.env.BASE_URI}/savejob`,
        {
          job_id: job._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((/* response */) => {
        successToast('Job Saved Successfully!');
        fetchSavedJobs();
      })
      .catch((/* err */) => {
        setLoading(false);
        errorToast('Job not saved, something went wrong, please contact us.');
      });
  };

  const getAppliedJobs = () => {
    if (token) {
      setLoading(true);

      axios
        .get(`${process.env.BASE_URI}/easyApply/userApplied`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setAppliedJobs(response.data.data);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchSavedJobs();
    getAppliedJobs();
  }, [
    typeof window !== 'undefined'
      ? window.localStorage.getItem('jwtToken')
      : null,
  ]);

  const savedJobsId = savedJobs.map(
    (singleSavedJob) => singleSavedJob?.job_id?._id
  );
  const appliedJobsId = appliedJobs.map(
    (singleAppliedJob) => singleAppliedJob?.job_id?._id
  );

  const authPlease = () => {
    errorToast('Please, Sign in your account and after save and apply jobs.');
  };

  const pageCount = Math.ceil(jobs && jobs.length / 5);
  const jobsPerPage = 5;
  const pagesVisited = pageNumber * jobsPerPage;

  const jobStubs =
    jobs?.length > 0 ? (
      jobs.slice(pagesVisited, pagesVisited + jobsPerPage).map((job, idx) => (
        <div
          className={idx === activeJobIndex ? 'job-stub active' : 'job-stub'}
          key={job._id}
          onClick={(e) => changeJobAndColor(e, job, idx)}
        >
          <div className="job-stub-header">
            <div className="job-stub-title">{job.job_title}</div>
            <div className="job-stub-company tw-mb-2 tw-flex tw-flex-row tw-items-center">
              <img src="/assets/images/c-build.svg" alt="career" width={23} />
              <span className="tw-text-white tw-ml-3 tw-font-medium">
                {job?.companyId?.company_name}
              </span>
            </div>
            <div>
              {job?.remote && (
                <div className="tw-flex tw-mb-2 tw-flex-row  tw-items-center">
                  <img
                    src="/assets/images/career-pin.svg"
                    alt="career"
                    width={23}
                  />
                  <span className="tw-text-white tw-font-medium tw-ml-3">
                    Fully Remote
                  </span>
                </div>
              )}
            </div>
            <div className="tw-flex tw-flex-row tw-items-center">
              <img
                src="/assets/images/career-business.svg"
                alt="career"
                width={23}
              />
              <span className="tw-text-white tw-font-medium tw-ml-3">
                Full time
              </span>
            </div>
          </div>
          <div className="job-stub-footer">
            <div className="job-stub-postDate">
              Posted: {new Date(job.updatedAt).toDateString().substr(3)}
            </div>
            {userInfo !== null ? (
              savedJobsId.includes(job._id) ? (
                <button type="button" disabled className="job-stub-saved">
                  Saved
                </button>
              ) : (
                <button
                  type="button"
                  className="job-stub-saveLink"
                  onClick={() => saveJob(job)}
                >
                  Save Job
                </button>
              )
            ) : (
              <button
                type="button"
                className="job-stub-saveLink"
                onClick={authPlease}
              >
                Save Job
              </button>
            )}
          </div>
        </div>
      ))
    ) : (
      <div>
        <h3>No Jobs Available</h3>
      </div>
    );
  function inputSearchSubmit(e) {
    e.preventDefault();
    let blank = true;
    if (e.target.childNodes[0].value) {
      queryObj.search = e.target.childNodes[0].value;
      blank = false;
      const filterJobsByTitle = allJobs.filter((job) =>
        job.job_title.toLowerCase().includes(queryObj.search.toLowerCase())
      );
      const filterJobsByDes = allJobs.filter((job) =>
        job.job_description
          .toLowerCase()
          .includes(queryObj.search.toLowerCase())
      );
      const requirements = (reqs) => {
        const arr = reqs.map((item) => {
          if (item.skill) return item.skill;
          return item;
        });
        return arr.toString().toLowerCase();
      };
      const filterJobsByReq = allJobs.filter((job) => {
        const min_requirements = requirements(job.min_requirements);
        return min_requirements
          .toString()
          .toLowerCase()
          .includes(queryObj.search.toLowerCase());
      });

      if (filterJobsByTitle.length > 0) {
        setJobs(filterJobsByTitle);
        changeCurrentJob(filterJobsByTitle[0]);
      } else if (filterJobsByDes.length > 0) {
        setJobs(filterJobsByDes);
        changeCurrentJob(filterJobsByDes[0]);
      } else if (filterJobsByReq.length > 0) {
        setJobs(filterJobsByReq);
        changeCurrentJob(filterJobsByReq[0]);
      } else {
        setJobs([]);
        changeCurrentJob(null);
      }
    }

    if (!blank) {
      router.push({ query: queryObj });
    } else {
      delete queryObj.search;
      router.push({ query: queryObj });
      filterJobs();
    }
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    inputSearchSubmit(e);
  };

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <CareersMainComponent
      jobsOn
      open={modalView}
      job={currentJob}
      closeModal={() => toggleModalView(false)}
      loadingReq={loadingReq}
      getAppliedJobs={getAppliedJobs}
    >
      <Layout pageTitle="MPA - Careers">
        <HomepageNav open={open} setOpen={setOpen} page="Employers Page" />
        <SidebarTwo
          open={open}
          setOpen={setOpen}
          links={links}
          active="Home"
          handleClick={handleClick}
        />
        {hide === false && <ComingSoon closeClick={handleClick} />}

        <div style={{ background: '#14152A' }}>
          <div id="join" />

          <div className="top-wrapper">
            <div className="careerTopPic">
              <img src="/assets/images/career-1.png" alt="careerTop1" />
            </div>
            <div className="careerTopText">
              <h1>Let's get you hired!</h1>
              <h2>
                Find your next job at companies like Spotify, Google, Square,
                and Twitter
              </h2>
            </div>
          </div>

          <div className="jobsMain">
            <div className="jobsMain-search">
              <div className="search-grid">
                <div className="options">
                  <form
                    className="job-search-filter"
                    onSubmit={(e) => onFormSubmit(e)}
                  >
                    <input
                      className="form-control mx-1"
                      type="search"
                      name="description"
                      ref={descriptionInput}
                      placeholder="Search job description"
                    />
                    <button
                      className="search-btn btn jobs-search-button"
                      type="submit"
                    >
                      Search
                    </button>
                  </form>
                  <div
                    className="jobs-main-filters"
                    onClick={() => openModal()}
                  >
                    <JobsFilters
                      submitForm={submitForm}
                      openFilterForm={openFilterForm}
                      filter={filter}
                      fetchData={fetchData}
                      showModal={showModal}
                      setShowModal={setShowModal}
                      queryObj={queryObj}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* LOADING SKELETON HERE */}
            {loading ? (
              <LoadingSkeleton showCurrent={!(window.innerWidth < 1000)} />
            ) : (
              <div className="jobs-main-container">
                <div className="jobs-main-container-list">
                  {jobStubs}
                  <div className="jobs-paginator">
                    {jobs.length > 0 && (
                      <ReactPaginate
                        previousLabel="<"
                        nextLabel=">"
                        pageCount={pageCount}
                        onPageChange={changePage}
                        initialPage={0}
                        containerClassName="paginationBttns"
                        previousLinkClassName="previousBttn"
                        nextLinkClassName="paginationDisabled"
                        activeClassName="activePage"
                      />
                    )}
                  </div>
                </div>
                {/* CURRENT JOB NOT SHOWN WHILE IN MOBILE VIEW */}
                <div
                  className="right-grid jobs-main-container-single"
                  style={{ display: currentJob == null && 'none' }}
                >
                  {currentJob != null && (
                    <>
                      <div className="current-job__header">
                        <div className="float-current-job__title">
                          <h1 className="current-job__title">
                            {currentJob.job_title}
                          </h1>
                          <button
                            type="button"
                            className="close-single-padding jobs-main-container-single-close"
                            onClick={closeSingle}
                          >
                            <i className="fas fa-times" />
                          </button>
                          <span className="tw-text-white">
                            {currentJob.location}
                          </span>
                        </div>
                        <div className="apply-button">
                          <span>
                            {userInfo != null ? (
                              appliedJobsId.includes(currentJob._id) ? (
                                <button
                                  type="button"
                                  disabled
                                  className="current-job-view-box1-jobInfo-postSave-apply applied-btn"
                                >
                                  Applied
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => {
                                    toggleModalView(true);
                                  }}
                                  className="current-job-view-box1-jobInfo-postSave-apply"
                                >
                                  Apply
                                </button>
                              )
                            ) : (
                              <button
                                type="button"
                                onClick={authPlease}
                                className="current-job-view-box1-jobInfo-postSave-apply"
                              >
                                Apply
                              </button>
                            )}
                          </span>
                        </div>
                      </div>
                      {/* <hr className="current-job__rule" /> */}
                      <div className="apply__section">
                        <div
                          style={{
                            borderBottom: '1px solid #8040d2',
                            paddingBottom: '1rem',
                          }}
                        >
                          <div className="apply__section-header">
                            <h2 className="description-header">
                              Job Description
                            </h2>
                          </div>
                          <span className="tw-text-white">
                            {currentJob.job_description}
                          </span>
                        </div>
                        <div>
                          {/* <hr className="current-job__rule" /> */}
                          <div>
                            <h2 className="description-header">
                              Min Requirements
                            </h2>
                            <div>
                              {loadingReq === true && (
                                <div>
                                  {currentJob.min_requirements
                                    ? currentJob.min_requirements.map(
                                        (skill, index) => (
                                          <ul key={`${index + 1}`}>
                                            <li className="list-style-square">
                                              <span className="tw-text-white">
                                                {skill.years}{' '}
                                                {skill.years === 1
                                                  ? 'year '
                                                  : 'years '}
                                              </span>
                                              <span className="tw-text-gray-300 skill">
                                                {' '}
                                                {skill.skill}
                                              </span>
                                            </li>
                                          </ul>
                                        )
                                      )
                                    : ''}
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <h2 className="description-header">
                              Additional Information
                            </h2>
                            <div className="current-job-view-box5-container">
                              <div>
                                <span className="tw-text-white">Salary</span>
                                <div className="tw-text-white">{`${currentJob.pay}`}</div>
                              </div>
                              <div>
                                <span className="tw-text-white">Job Type</span>
                                <div className="tw-text-white">
                                  {currentJob.job_type}
                                </div>
                              </div>
                              <div>
                                <span className="tw-text-white">Remote</span>
                                <div className="tw-text-white">
                                  {currentJob.remote === true ? 'Yes' : 'No'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </CareersMainComponent>
  );
};

export default JobsMain;
