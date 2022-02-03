import React from "react";

const FeaturedCourseList = ({
  course,
  sameUserCourses,
  handleCourseInfo,
  enrolledBtn,
  showModal,
}) => {
  const { earn, name, description, _id, tags } = course;

  const userCoursesId = [];
  sameUserCourses.forEach((userCourse) => {
    userCoursesId.push(userCourse._id);
  });
  return (
    <div className="courses-items px-3 mb-4 mx-2  tw-shadow-lg">
      <div className="pt-3" />
      <div className="d-pb-1 ml-2">
        <h3 className="course-name mt-3 tw-mb-1">{name}</h3>
      </div>
      <p className="course-des ml-2 tw-mb-3">{description}</p>
      <p className="tw-flex tw-flex-row ">
        {tags.map((tag) => (
          <p className="tw-mr-2 course-tag-style">{tag}</p>
        ))}
      </p>

      <div className="text-center pb-4">
        {userCoursesId.includes(_id) ? (
          <button
            type="button"
            disabled={enrolledBtn}
            onClick={() => {
              showModal();
              handleCourseInfo(course);
            }}
            className="btn px-5 banner-btn mt-3"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Enrolled
          </button>
        ) : !userCoursesId.includes(_id) ? (
          <div className="course-items-footer">
            <p className="course-earn-style">Earn {earn}</p>
            <button
              type="button"
              onClick={() => {
                showModal();
                handleCourseInfo(course);
              }}
              className="btn px-5 banner-btn mt-3"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Enroll <span className="tw-ml-2"> &#8594;</span>
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default FeaturedCourseList;
