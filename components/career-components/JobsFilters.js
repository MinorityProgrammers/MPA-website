import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import {
  CancelButton,
  ExpandButton,
  ResetButton,
} from "./form/jobs-filters/buttons";
import CheckBoxItem from "./form/jobs-filters/CheckBoxItem";
import jobTypes from "./JobTypes.json";

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
      document.body.style.overflow = "scroll";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showModal]);

  // closes form when cancel is clicked
  function closeForm(btn) {
    btn.parentNode.parentNode.style.display = "none";
  }

  const router = useRouter();

  // toggles the filters options/buttons when the "filter" button is clicked on small screens
  function openFilters() {
    if (
      window.getComputedStyle(document.querySelector(".jobFilters")).display ===
      "none"
    ) {
      document.querySelector(".jobFilters").style.display = "flex";
    } else if (
      window.getComputedStyle(document.querySelector(".jobFilters")).display ===
      "flex"
    ) {
      document.querySelector(".jobFilters").style.display = "none";
    }
    setShowModal(true);
  }

  // show filters when screen size gets bigger than 767px
  function assureFiltersOpen() {
    document.querySelector(".jobFilters");
    if (window.innerWidth > 768) {
      document.querySelector(".jobFilters").style.display = "flex";
    } else if (window.innerWidth < 768) {
      document.querySelector(".jobFilters").style.display = "none";
    }
  }

  // only allow one checkbox to be selected per filter
  function checkboxesOff(e) {
    e.target.parentNode.parentNode.querySelectorAll("li").forEach((item) => {
      if (item.childNodes[0].value !== e.target.value) {
        item.childNodes[0].checked = false;
      }
    });
  }

  const submitAndOffCheckBoxes = (e) => {
    submitForm(e);
    checkboxesOff(e);
  };

  // add window event listener to toggle "Filters" button on and off
  useEffect(() => {
    window.addEventListener("resize", assureFiltersOpen);
    return () => window.removeEventListener("resize", assureFiltersOpen);
  }, []);

  const resetFilter = () => {
    filter.job_type = "";
    filter.date_posted = "";
    filter.remote = "";
    filter.pay = "";
    filter.job_industry = "";

    delete queryObj.pay;
    delete queryObj.date_posted;
    delete queryObj.remote;
    delete queryObj.job_type;
    delete queryObj.job_industry;

    router.push({ query: queryObj });

    document.querySelectorAll("li input").forEach((input) => {
      input.checked = false;
    });

    remoteCheckbox.current.checked = false;

    fetchData();
  };

  const datePosted = {
    0: "Any",
    day: "Past 24 Hours",
    week: "Past Week",
    month: "Past Month",
    year: "Past Year",
  };

  const payAmount = {
    0: "Any",
    40000: "$40,000+",
    60000: "$60,000+",
    80000: "$80,000+",
    100000: "$100,000+",
  };

  // MODAL

  // filters-open-btn
  return (
    <>
      <button type="button" className="filters-open-btn " onClick={openFilters}>
        <span className="filter-button-search">Filter Search</span>
      </button>

      <div className="jobFilters">
        <div className="job-filter-item">
          <ExpandButton id="first-item-title" onClick={openFilterForm}>
            {filter.date_posted === "0"
              ? "Date Posted"
              : `Past ${filter.date_posted
                  .charAt(0)
                  .toUpperCase()}${filter.date_posted.slice(1)}`}
          </ExpandButton>
          <div className="job-filter-item-form">
            <ul className="job-filter-item-form-list">
              {Object.keys(datePosted).map((key) => (
                <CheckBoxItem
                  key={key}
                  name="date_posted"
                  value={key}
                  text={datePosted[key]}
                  onChange={submitAndOffCheckBoxes}
                />
              ))}
            </ul>
            <CancelButton onClick={closeForm} />
          </div>
        </div>

        <div className="job-filter-item">
          <ExpandButton onClick={openFilterForm}>
            {filter.job_industry === "" ? "Industry" : filter.job_industry}
          </ExpandButton>
          <div className="job-filter-item-form">
            <ul className="job-filter-item-form-list">
              {["Technology", "Health", "Education", "Consultancy"].map(
                (jobIndustry) => (
                  <CheckBoxItem
                    key={jobIndustry}
                    name="job_industry"
                    value={jobIndustry}
                    text={jobIndustry}
                    onChange={submitAndOffCheckBoxes}
                  />
                )
              )}
            </ul>
            <CancelButton onClick={closeForm} />
          </div>
        </div>

        <div className="job-filter-item">
          <ExpandButton onClick={openFilterForm}>
            {filter.pay === "" ? "Pay" : `${filter.pay}+`}
          </ExpandButton>
          <div className="job-filter-item-form">
            <ul className="job-filter-item-form-list">
              {Object.keys(payAmount).map((key) => (
                <CheckBoxItem
                  key={key}
                  name="pay"
                  value={key === "0" ? "" : key}
                  text={payAmount[key]}
                  onChange={submitAndOffCheckBoxes}
                />
              ))}
            </ul>
            <CancelButton onClick={closeForm} />
          </div>
        </div>

        <div className="job-filter-item">
          <ExpandButton onClick={openFilterForm}>
            {filter.job_type === "" ? "Job Type" : filter.job_type}
          </ExpandButton>
          <div className="job-filter-item-form">
            <ul className="job-filter-item-form-list">
              {jobTypes.map((jobType) => (
                <CheckBoxItem
                  key={jobType}
                  name="job_type"
                  value={jobType}
                  text={jobType}
                  onChange={submitAndOffCheckBoxes}
                />
              ))}
            </ul>
            <CancelButton onClick={closeForm} />
          </div>
        </div>

        <div className="job-filter-item remote-item mb-2">
          <span className="tw-mr-2 tw-font-semibold tw-text-white tw-align-middle">
            Remote
          </span>
          <label htmlFor="remote" className="jobs-search-switch">
            <input
              className="remote-checkmate"
              id="remote"
              type="checkbox"
              name="remote"
              ref={remoteCheckbox}
              onChange={(e) => submitForm(e)}
            />
            <span className="jobs-search-slider round"></span>
          </label>
        </div>
        <div className="job-filter-item">
          {filter.pay !== "" ||
          filter.job_type !== "" ||
          filter.date_posted !== "" ||
          filter.remote !== "" ||
          filter.job_industry !== "" ? (
            <ResetButton onClick={resetFilter} />
          ) : (
            <ResetButton onClick={resetFilter} style={{ display: "none" }} />
          )}
        </div>
      </div>
    </>
  );
};

export default JobsFilters;
