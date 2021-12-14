import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import styles from './topheader.module.css';
import { JobsFilters } from '../../../career-components/JobsFilters';
import JobsMainContent from '../JobsMainContent';
import Loader from '../../../Loader';
import axios from 'axios';

export async function getServerSideProps(context) {
  return {
    props: {
      query: context.query,
    },
  };
}

const TopHeader = function (props) {
  const [currentJob, changeCurrentJob] = useState({});
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [modalView, toggleModalView] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingReq, setLoadingReq] = useState(false);
  const [allJobs, setAllJobs] = useState([]);
  const [filter, setFilter] = useState({
    pay: '0',
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
  const locationInput = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    fetch(`${process.env.BASE_URI}/job`)
      .then((response) => response.json())
      .then((response) => {
        setJobs(response.data);
        setAllJobs(response.data);
        changeCurrentJob(response.data[0]);
        setTimeout(() => {
          setLoading(false);
          setLoadingReq(true);
        }, 1);
      })
      .catch((error) => console.log(error));
  };

  const filterJobs = () => {
    fetch(
      `${process.env.BASE_URI}/job?pay=${filter.pay}&remote=${filter.remote}&job_type=${filter.job_type}&date_posted=${filter.date_posted}&job_industry=${filter.job_industry}`,
    )
      .then((response) => response.json())
      .then((response) => {
        // setAllJobs(response.data)
        if (response.data.length >= 1) {
          changeCurrentJob(response.data[0]);
          setJobs(response.data);
        } else {
          changeCurrentJob(null);
          setJobs(null);
        }
        setTimeout(() => {
          setLoading(false);
          setLoadingReq(true);
        }, 1);
      });
  };

  const router = useRouter();

  function changePerPage(e) {
    const queryObj = { ...props.query };
    queryObj.per_page = e.target.value;
    router.push({ query: queryObj });
  }

  function submitForm(btn) {
    // reset to page 1
    if (queryObj.page) {
      delete queryObj.page;
    }

    // closes form
    if (btn.target.name != 'remote') {
      btn.target.parentNode.parentNode.parentNode.style.display = 'none';
    }

    if (btn.target.name == 'pay') {
      if (btn.target.value != '0') {
        queryObj.pay = btn.target.value;
        filter.pay = btn.target.value;
      } else {
        filter.pay = '0';
        delete queryObj.pay;
      }
      router.push({ query: queryObj });
    }

    if (btn.target.name == 'remote') {
      if (btn.target.checked == true) {
        queryObj.remote = true;
        filter.remote = true;
      } else {
        filter.remote = '';
        delete queryObj.remote;
      }
      router.push({ query: queryObj });
    }

    if (btn.target.name == 'job_type') {
      if (btn.target.checked == true) {
        queryObj.job_type = btn.target.value;
        filter.job_type = btn.target.value;
      } else {
        filter.job_type = '';
        delete queryObj.job_type;
      }
      router.push({ query: queryObj });
    }

    if (btn.target.name == 'job_industry') {
      if (btn.target.checked == true) {
        queryObj.job_industry = btn.target.value;
        filter.job_industry = btn.target.value;
      } else {
        filter.job_industry = '';
        delete queryObj.job_industry;
      }
      router.push({ query: queryObj });
    }

    if (btn.target.name == 'date_posted') {
      if (btn.target.value != '0') {
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
        'jobs-main-container-list',
      )[0].style.display = 'block';
      document.getElementsByClassName(
        'jobs-main-container-single',
      )[0].style.display = 'block';

      winSize.current = 'large';
    } else if (
      winSize.current == 'large'
      && document.querySelector('.jobsMain')
    ) {
      document.getElementsByClassName(
        'jobs-main-container-single',
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
      document.getElementsByClassName('jobsMain-search')[0].style.display = 'none';
      document.getElementsByClassName(
        'jobs-main-container-list',
      )[0].style.display = 'none';
      document.getElementsByClassName('jobs-main-filters')[0].style.display = 'none';
      document.getElementsByClassName('jobsMain-perPage')[0].style.display = 'none';
      document.getElementsByClassName(
        'jobs-main-container-single',
      )[0].style.display = 'block';
    }
  }

  function closeSingle() {
    document.getElementsByClassName('jobsMain-search')[0].style.display = 'block';
    document.getElementsByClassName('jobs-main-filters')[0].style.display = 'block';
    document.getElementsByClassName('jobsMain-perPage')[0].style.display = 'block';
    document.getElementsByClassName(
      'jobs-main-container-single',
    )[0].style.display = 'none';
    document.getElementsByClassName('jobsMain')[0].style.height = 'auto';
    document.getElementsByClassName(
      'jobs-main-container-list',
    )[0].style.display = 'block';
  }

  function openFilterForm(btn) {
    // if the form is open, close it and return
    // console.log(window.getComputedStyle(btn.nextSibling).display)
    if (window.getComputedStyle(btn.nextSibling).display == 'block') {
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

  const token = typeof window !== 'undefined'
    ? window.localStorage.getItem('jwtToken')
    : null;
  const userInfo = typeof window !== 'undefined'
    ? window.localStorage.getItem('userInfo')
    : null;

  const saveJob = (job) => {
    console.log(job);
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
        },
      )
      .then((response) => {
        console.log('Saved', response);
        successToast('Job Saved Successfully!');
        fetchSavedJobs();
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        errorToast('Job not saved, something went wrong, please contact us.');
      });
  };

  const fetchSavedJobs = () => {
    if (token) {
      // setLoading(true)

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
          setSavedJobs(response.data.data);
          setLoading(false);
          console.log('Saved Jobs', response);
        });
    }
  };

  const getAppliedJobs = () => {
    if (token) {
      setLoading(true);

      axios
        .get(
          `${process.env.BASE_URI}/easyApply/userApplied`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => {
          setAppliedJobs(response.data.data);
          setLoading(false);
          console.log('Applied Jobs', response.data);
        });
    }
  };

  // <button disabled className="job-stub-saved">Saved</button> :
  // <a className="job-stub-saveLink" onClick={() => saveJob(job)}>Save Job</a>

  useEffect(() => {
    fetchSavedJobs();
    getAppliedJobs();
  }, []);

  const savedJobsId = savedJobs.map(
    (singleSavedJob) => singleSavedJob.job_id._id,
  );
  const appliedJobsId = appliedJobs.map(
    (singleAppliedJob) => singleAppliedJob.job_id._id,
  );

  const authPlease = () => {
    errorToast('Please, Sign in your account and after save and apply jobs.');
    if (!token) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }
  };

  // jobStubs will be fetched from database and then map... the fetch will have ALL query parameters(search description, search location, filters, jobs per page, current page)
  const jobStubs = jobs != null
    ? jobs.map((job, idx) => (
      <div
        className={idx == activeJobIndex ? 'job-stub active' : 'job-stub'}
        key={idx}
        onClick={(e) => changeJobAndColor(e, job, idx)}
      >
        <div className="job-stub-header">
          <div className="job-stub-title">{job.job_title}</div>
          <div className="job-stub-company">{job.company_name}</div>
          <div className="job-stub-location">{job.location}</div>
        </div>
        <div className="job-stub-description">{job.job_description}</div>
        <div className="job-stub-footer">
          <div className="job-stub-postDate">
            Posted:
            {' '}
            {new Date(job.updatedAt).toDateString().substr(3)}
          </div>
          {userInfo != null ? (
            savedJobsId.includes(job._id) ? (
              <button disabled className="job-stub-saved">
                Saved
              </button>
            ) : (
              <a className="job-stub-saveLink" onClick={() => saveJob(job)}>
                Save Job
              </a>
            )
          ) : (
            <a className="job-stub-saveLink" onClick={authPlease}>
              Save Job
            </a>
          )}
        </div>
      </div>
    ))
    : '';

  const totalCount = 102;
  const perPage = 10;
  const totalPages = Math.ceil(102 / perPage); // 11

  function makePages() {
    const totPages = totalPages;

    const queryObj = { ...props.query };
    const { page } = queryObj;
    const pageArray = [];

    if (page) {
      pageArray.push(page);

      // push page to first placeholder if page number is greater than 1 and there are more than one pages
      if (page > 1) {
        pageArray.unshift(1);
      }

      // push page to second placeholder if page number is less than the last page
      if (page < totPages) {
        pageArray.push(totPages);
      }
    } else {
      pageArray.push(1);
      if (totPages > 1) {
        pageArray.push(totPages);
      }
    }
    return pageArray.map((page) => {
      let currPage;
      if (!props.query.page) {
        currPage = 1;
      } else {
        currPage = props.query.page;
      }

      return (
        <a style={currPage == page ? { background: '#151371' } : {}} key={page}>
          <button
            style={currPage == page ? { color: 'white' } : {}}
            onClick={() => pageSelector(page)}
          >
            {page}
          </button>
        </a>
      );
    });
  }

  function pageSelector(page) {
    console.log(page);
    const queryObj = { ...props.query };
    if (page == 1 && queryObj.page) {
      delete queryObj.page;
    } else if (page != 1) {
      queryObj.page = page;
    }

    router.push({ query: queryObj });
  }

  function nextButton() {
    const queryObj = { ...props.query };
    if (!queryObj.page) {
      queryObj.page = 2;
    } else {
      queryObj.page = Number(queryObj.page) + 1;
      console.log(typeof queryObj.page);
    }

    router.push({ query: queryObj });
  }

  function prevButton() {
    console.log('prev');
    const queryObj = { ...props.query };
    if (queryObj.page == 2) {
      delete queryObj.page;
    } else {
      queryObj.page = Number(queryObj.page) - 1;
    }

    router.push({ query: queryObj });
  }

  function inputSearchSubmit(e) {
    // if nothing is changed in the input searches, rerun query with same parameters
    e.preventDefault();
    // let queryObj={};
    let blank = true;
    if (e.target.childNodes[0].value) {
      queryObj.description = e.target.childNodes[0].value;
      blank = false;
      setJobs(
        jobs.filter((job) => job.job_description
          .toLowerCase()
          .includes(queryObj.description.toLowerCase())),
      );
    }
    if (e.target.childNodes[1].value) {
      queryObj.location = e.target.childNodes[1].value;
      blank = false;
      setJobs(
        jobs.filter((job) => job.location.toLowerCase().includes(queryObj.location.toLowerCase())),
      );
    }

    if (!blank) {
      router.push({ query: queryObj });
    } else {
      delete queryObj.location;
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
    if (!descriptionInput.current.value && !locationInput.current.value) {
      delete queryObj.description;
      delete queryObj.location;
      router.push({ query: queryObj });
      filterJobs();
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1>Search for Jobs</h1>
      </div>
      <div className={styles.options}>
        <JobsFilters
          submitForm={submitForm}
          openFilterForm={openFilterForm}
          filter={filter}
          fetchData={fetchData}
          queryObj={queryObj}
        />
        <form className="job-search-filter">
          <i className="fas fa-search" />
          <input
            type="search"
            name="description"
            ref={descriptionInput}
            onChange={() => onEmptySearchFields()}
            placeholder="  Search"
          />
        </form>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="jobs-main-container">
          {jobStubs}
          <div className="jobs-main-contianer-list" />
          <div className="jobs-paginator">
            <a>
              <button
                className="jobs-paginator-btn"
                disabled={!props.query.page}
                onClick={prevButton}
              >
                {'<'}
              </button>
            </a>
            <div className="jobs-paginator-numbers">{makePages()}</div>
            <a>
              <button
                className="jobs-paginator-btn"
                disabled={props.query.page == totalPages}
                onClick={nextButton}
              >
                {'>'}
              </button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopHeader;
