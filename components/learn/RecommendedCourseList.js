import React from "react";

const RecommendedCourseList = ({ course, handleCourseInfo, showModal }) => {
  const { earn, name, description, tags } = course;
  return (
    <div className="courses-items px-3 mb-4 mx-2 tw-shadow-lg ">
      <div className="pt-3" />
      <div className="d-pb-1 ml-2 tw-mb-1">
        <h3 className="course-name mt-3 ">{name}</h3>
      </div>
      <p className="course-des ml-2 mb-3">{description}</p>
      <p className="tw-flex tw-flex-row ">
        {tags.map((tag) => (
          <p className="tw-mr-2 course-tag-style tw-m-1">{tag}</p>
        ))}
      </p>

      <div className="course-items-footer">
        <p className="course-earn-style">Earn {earn}</p>
        <button
          type="button"
          onClick={() => {
            showModal();
            handleCourseInfo(course);
          }}
          data-toggle="modal"
          data-target="#exampleModal"
          className=" px-3 banner-btn tw-mt-4 tw-mr-3"
        >
          Enroll Now <span className="tw-ml-2"> &#8594;</span>
        </button>
      </div>
    </div>
  );
};

export default RecommendedCourseList;
