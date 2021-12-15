import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';

const JobsFilters = ({
  submitForm,
  openFilterForm,
  filter,
  fetchData,
  queryObj,
  showModal,
  setShowModal,
}) => {
  const remoteCheckbox = useRef();

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'scroll';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  // closes form when cancel is clicked
  function closeForm(btn) {
    btn.parentNode.parentNode.style.display = 'none';
  }

  const router = useRouter();

  // toggles the filters options/buttons when the "filter" button is clicked on small screens
  function openFilters() {
    if (
      window.getComputedStyle(document.querySelector('.jobFilters')).display
      === 'none'
    ) {
      document.querySelector('.jobFilters').style.display = 'flex';
    } else if (
      window.getComputedStyle(document.querySelector('.jobFilters')).display
      === 'flex'
    ) {
      document.querySelector('.jobFilters').style.display = 'none';
    }
    setShowModal(true);
  }

  // show filters when screen size gets bigger than 767px
  function assureFiltersOpen() {
    document.querySelector('.jobFilters');
    if (window.innerWidth > 768) {
      document.querySelector('.jobFilters').style.display = 'flex';
    } else if (window.innerWidth < 768) {
      document.querySelector('.jobFilters').style.display = 'none';
    }
  }

  // only allow one checkbox to be selected per filter
  function checkboxesOff(e) {
    e.target.parentNode.parentNode.querySelectorAll('li').forEach((item) => {
      if (item.childNodes[0].value !== e.target.value) {
        item.childNodes[0].checked = false;
      }
    });
  }

  // add window event listener to toggle "Filters" button on and off
  useEffect(() => {
    window.addEventListener('resize', assureFiltersOpen);
    return () => window.removeEventListener('resize', assureFiltersOpen);
  }, []);

  const resetFilter = () => {
    filter.job_type = '';
    filter.date_posted = '';
    filter.remote = '';
    filter.pay = '';
    filter.job_industry = '';

    delete queryObj.pay;
    delete queryObj.date_posted;
    delete queryObj.remote;
    delete queryObj.job_type;
    delete queryObj.job_industry;

    router.push({ query: queryObj });

    document.querySelectorAll('li input').forEach((input) => {
      input.checked = false;
    });

    remoteCheckbox.current.checked = false;

    fetchData();
  };

  // MODAL

  // filters-open-btn
  return (
    <>
      <button type="button" className="filters-open-btn " onClick={openFilters}>
        <i
          className="fas fa-sort-amount-down"
          style={{ color: '#ff4fcd', fontSize: '2rem' }}
        />
      </button>

      <div className="jobFilters">
        <div className="job-filter-item">
          <button
            type="button"
            id="first-item-title"
            className="job-filter-item-title "
            onClick={(e) => openFilterForm(e.currentTarget)}
          >
            {filter.date_posted === '0'
              ? 'Date Posted'
              : `Past ${filter.date_posted
                .charAt(0)
                .toUpperCase()}${filter.date_posted.slice(1)}`}
            <span>&#9660;</span>
          </button>
          <div className="job-filter-item-form">
            <ul className="job-filter-item-form-list">
              <li>
                <input
                  type="checkbox"
                  name="date_posted"
                  value="0"
                  onChange={(e) => {
                    submitForm(e);
                    checkboxesOff(e);
                  }}
                />
                <span>Any</span>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="date_posted"
                  value="day"
                  onChange={(e) => {
                    submitForm(e);
                    checkboxesOff(e);
                  }}
                />
                <span>Past 24 Hours</span>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="date_posted"
                  value="week"
                  onChange={(e) => {
                    submitForm(e);
                    checkboxesOff(e);
                  }}
                />
                <span>Past Week</span>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="date_posted"
                  value="month"
                  onChange={(e) => {
                    submitForm(e);
                    checkboxesOff(e);
                  }}
                />
                <span>Past Month</span>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="date_posted"
                  value="year"
                  onChange={(e) => {
                    submitForm(e);
                    checkboxesOff(e);
                  }}
                />
                <span>Past Year</span>
              </li>
            </ul>
            <div className="job-filter-item-form-options">
              <button
                type="button"
                className="job-filter-item-form-options-cancel"
                onClick={(e) => closeForm(e.currentTarget)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div className="job-filter-item">
          <button
            type="button"
            className="job-filter-item-title "
            onClick={(e) => openFilterForm(e.currentTarget)}
          >
            {filter.job_industry === '' ? 'Industry' : filter.job_industry}
            <span>&#9660;</span>
          </button>
          <div className="job-filter-item-form">
            <ul className="job-filter-item-form-list">
              <li>
                <input
                  type="checkbox"
                  name="job_industry"
                  value="Technology"
                  onChange={(e) => {
                    submitForm(e);
                    checkboxesOff(e);
                  }}
                />
                <span>Technology</span>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="job_industry"
                  value="Health"
                  onChange={(e) => {
                    submitForm(e);
                    checkboxesOff(e);
                  }}
                />
                <span>Health</span>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="job_industry"
                  value="Education"
                  onChange={(e) => {
                    submitForm(e);
                    checkboxesOff(e);
                  }}
                />
                <span>Education</span>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="job_industry"
                  value="Consultancy"
                  onChange={(e) => {
                    submitForm(e);
                    checkboxesOff(e);
                  }}
                />
                <span>Consultancy</span>
              </li>
            </ul>
            <div className="job-filter-item-form-options">
              <button
                type="button"
                className="job-filter-item-form-options-cancel"
                onClick={(e) => closeForm(e.currentTarget)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div className="job-filter-item">
          <button
            type="button"
            className="job-filter-item-title "
            onClick={(e) => openFilterForm(e.currentTarget)}
          >
            {filter.pay === '' ? 'Pay' : `${filter.pay}+`}
            <span>&#9660;</span>
          </button>
          <div className="job-filter-item-form">
            <ul className="job-filter-item-form-list">
              <li>
                <input
                  type="checkbox"
                  name="pay"
                  value=""
                  onChange={(e) => {
                    submitForm(e);
                    checkboxesOff(e);
                  }}
                />
                <span>Any</span>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="pay"
                  value="40000"
                  onChange={(e) => {
                    submitForm(e);
                    checkboxesOff(e);
                  }}
                />
                <span>$40,000+</span>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="pay"
                  value="60000"
                  onChange={(e) => {
                    submitForm(e);
                    checkboxesOff(e);
                  }}
                />
                <span>$60,000+</span>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="pay"
                  value="80000"
                  onChange={(e) => {
                    submitForm(e);
                    checkboxesOff(e);
                  }}
                />
                <span>$80,000+</span>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="pay"
                  value="100000"
                  onChange={(e) => {
                    submitForm(e);
                    checkboxesOff(e);
                  }}
                />
                <span>$100,000+</span>
              </li>
            </ul>
            <div className="job-filter-item-form-options">
              <button
                type="button"
                className="job-filter-item-form-options-cancel"
                onClick={(e) => closeForm(e.target)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div className="job-filter-item">
          <button
            type="button"
            className="job-filter-item-title "
            onClick={(e) => openFilterForm(e.currentTarget)}
          >
            {filter.job_type === '' ? 'Job Type' : filter.job_type}
            <span>&#9660;</span>
          </button>
          <div className="job-filter-item-form">
            <ul className="job-filter-item-form-list">
              <li>
                <input
                  type="checkbox"
                  name="job_type"
                  value="Full-Time"
                  onChange={(e) => {
                    submitForm(e);
                    checkboxesOff(e);
                  }}
                />
                <span>Full-Time</span>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="job_type"
                  value="Part-Time"
                  onChange={(e) => {
                    submitForm(e);
                    checkboxesOff(e);
                  }}
                />
                <span>Part-Time</span>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="job_type"
                  value="Contract"
                  onChange={(e) => {
                    submitForm(e);
                    checkboxesOff(e);
                  }}
                />
                <span>Contract</span>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="job_type"
                  value="Internship"
                  onChange={(e) => {
                    submitForm(e);
                    checkboxesOff(e);
                  }}
                />
                <span>Internship</span>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="job_type"
                  value="Temporary"
                  onChange={(e) => {
                    submitForm(e);
                    checkboxesOff(e);
                  }}
                />
                <span>Temporary</span>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="job_type"
                  value="Seasonal"
                  onChange={(e) => {
                    submitForm(e);
                    checkboxesOff(e);
                  }}
                />
                <span>Seasonal</span>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="job_type"
                  value="Freelance"
                  onChange={(e) => {
                    submitForm(e);
                    checkboxesOff(e);
                  }}
                />
                <span>Freelance</span>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="job_type"
                  value="Volunteer"
                  onChange={(e) => {
                    submitForm(e);
                    checkboxesOff(e);
                  }}
                />
                <span>Volunteer</span>
              </li>
            </ul>
            <div className="job-filter-item-form-options">
              <button
                type="button"
                className="job-filter-item-form-options-cancel"
                onClick={(e) => closeForm(e.currentTarget)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div className="job-filter-item remote-item">
          <label htmlFor="remote" className="remote-label">
            {' '}
            Remote
            {' '}
          </label>
          <input
            className="remote-checkmate"
            id="remote"
            type="checkbox"
            name="remote"
            ref={remoteCheckbox}
            onChange={(e) => submitForm(e)}
          />
        </div>
        <div className="job-filter-item">
          {filter.pay !== ''
          || filter.job_type !== ''
          || filter.date_posted !== ''
          || filter.remote !== ''
          || filter.job_industry !== '' ? (
            <button
              type="button"
              className="job-filter-reset"
              onClick={() => resetFilter()}
            >
              Clear
            </button>
            ) : (
              <button
                type="button"
                className="job-filter-reset"
                style={{ display: 'none' }}
                onClick={() => resetFilter()}
              >
                Clear
              </button>
            )}
        </div>
      </div>
    </>
  );
};

export default JobsFilters;
