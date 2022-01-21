import React from 'react';

const RecommendedCourseList = function ({
  course,
  handleCourseInfo,
  showModal,
}) {
  const { earn, name, description } = course;

  return (
    <div className="courses-items px-3 mb-4 mx-2 tw-bg-white tw-shadow-lg ">
      <div className="pt-3">
        <div className="earn-rate ml-auto d-flex align-items-center">
          <img
            src="https://i.ibb.co/Yjpy6PN/dot.png"
            className="img-fluid ml-2"
            alt=""
          />
          <span className="pl-4">
            Earn &nbsp;
            {earn}
          </span>
        </div>
      </div>
      <div className="d-pb-1 ml-2">
        <h3 className="course-name mt-3 mb-0">{name}</h3>
      </div>
      <p className="course-des ml-2">{description}</p>

      <div className="text-center pb-4">
        <button
          onClick={() => {
            showModal();
            handleCourseInfo(course);
          }}
          data-toggle="modal"
          data-target="#exampleModal"
          className="btn px-5 banner-btn mt-3"
        >
          Enroll
        </button>
      </div>
    </div>
  );
};

export default RecommendedCourseList;
