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
import { useDetectOutsideClick } from '../../components/UseDetectOutsideClick';
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
  const [filter, setFilter] = useState({
    pay: '',
    job_type: '',
    remote: '',
    date_posted: '0',
    job_industry: '',
    description: '',
    location: '',
  });
  const [queryObj, setQueryObj] = useState({});
  const [activeJobIndex, setActiveJobIndex] = useState(0);
  const descriptionInput = useRef();

  const fetchData = () => {
    setLoading(true);
    fetch(`${process.env.BASE_URI}/job`)
      .then((response) => response.json())
      .then((response) => {
        setJobs(response.data);
        setAllJobs(response.data);

        // check if the views is mobile or desktop to display "current view job"
        if (window.innerWidth <= 991) {
          changeCurrentJob(null);
        } else {
          changeCurrentJob(response.data[0]);
        }

        setTimeout(() => {
          // TO TEST LOADING SKELETON COMMENT OUT setLoading(false);
          setLoading(false);
          setLoadingReq(true);
        }, 1);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

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

    // closes form
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
    changeCurrentJob((prevJob) => currJob);
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
    // if the form is open, close it and return
    if (window.getComputedStyle(btn.nextSibling).display === 'block') {
      btn.nextSibling.style.display = 'none';
      return;
    }

    // close all other forms when any form button is clicked on
    for (const i of document.getElementsByClassName('job-filter-item-form')) {
      i.style.display = 'none';
    }

    // open the form which is the next sibling of the button that was clicked
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
      .then((response) => {
        successToast('Job Saved Successfully!');
        fetchSavedJobs();
      })
      .catch((err) => {
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
  }, []);

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

  // jobStubs will be fetched from database and then map... the fetch will have ALL query parameters
  // (search description, search location, filters, jobs per page, current page)
  const jobStubs =
    jobs?.length > 0 ? (
      jobs.slice(pagesVisited, pagesVisited + jobsPerPage).map((job, idx) => (
        <div
          className={idx === activeJobIndex ? 'job-stub active' : 'job-stub'}
          key={idx}
          onClick={(e) => changeJobAndColor(e, job, idx)}
        >
          <div className="job-stub-header">
            <div className="job-stub-title">{job.job_title}</div>
            <div className="job-stub-company">
              {job?.companyId?.company_name}
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
    // if nothing is changed in the input searches, rerun query with same parameters
    e.preventDefault();
    // let queryObj={};
    let blank = true;
    if (e.target.childNodes[0].value) {
      queryObj.description = e.target.childNodes[0].value;
      blank = false;
      setJobs(
        jobs.filter((job) =>
          job.job_description
            .toLowerCase()
            .includes(queryObj.description.toLowerCase())
        )
      );
    }

    if (!blank) {
      router.push({ query: queryObj });
    } else {
      delete queryObj.description;
      router.push({ query: queryObj });
      filterJobs();
    }
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    inputSearchSubmit(e);
  };

  const onEmptySearchFields = () => {
    if (!descriptionInput.current.value) {
      delete queryObj.description;
      router.push({ query: queryObj });
      filterJobs();
    }
  };

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // renders jsx elements (page contents)
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
        <div id="join" />
        <div className="container jobsMain">
          <div className="jobsMain-search">
            <div className="container">
              <h1 className="header_searchbar">Search for Jobs</h1>
            </div>
            <div className="options">
              <div className="jobs-main-filters" onClick={() => openModal()}>
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
                  className="search-btn btn tw-bg-blue-600 tw-text-white hover:tw-text-white tw-px-3"
                  type="submit"
                >
                  Search
                </button>
              </form>
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
                        <span>{currentJob.location}</span>
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
                    <hr className="current-job__rule" />
                    <div className="apply__section">
                      <div className="apply__section-header">
                        <h2 className="description-header">Job Description</h2>
                      </div>
                      <span>{currentJob.job_description}</span>
                      <div>
                        <hr className="current-job__rule" />
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
                                        <ul key={index}>
                                          <li className="list-style-square">
                                            <span>
                                              {skill.years}{' '}
                                              {skill.years === 1
                                                ? 'year '
                                                : 'years '}
                                            </span>
                                            <span> {skill.skill}</span>
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
                              <span>Salary</span>
                              <div>{`${currentJob.pay}`}</div>
                            </div>
                            <div>
                              <span>Job Type</span>
                              <div>{currentJob.job_type}</div>
                            </div>
                            <div>
                              <span>Remote</span>
                              <div>
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
      </Layout>
    </CareersMainComponent>
  );
};

export default JobsMain;
