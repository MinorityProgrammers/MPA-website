import React from 'react';

const FeaturedCourseList = function ({
  course, sameUserCourses, handleCourseInfo, enrolledBtn, showModal
}) {
  const {
    earn, name, description, _id,
  } = course;

  const userCoursesId = [];
  sameUserCourses.forEach((userCourse) => {
    userCoursesId.push(userCourse._id);
  });

  return (
    <div className="courses-items px-3 mb-4 mx-2 tw-bg-white tw-shadow-lg">
      <div className="pt-3">
        <div className="earn-rate ml-auto d-flex align-items-center">
          <img src="https://i.ibb.co/Yjpy6PN/dot.png" className="img-fluid ml-2" alt="" />
          <span className="pl-4">
            Earn
            {earn}
          </span>
        </div>
      </div>
      <div className="d-pb-1 ml-2">
        <h3 className="course-name mt-3 mb-0 tw-text-white">{name}</h3>
      </div>
      <p className="course-des ml-2">{description}</p>

      <div className="text-center pb-4">
        {userCoursesId.includes(_id)
          ? (
            <button disabled={enrolledBtn} onClick={() =>{showModal(); handleCourseInfo(course)}} className="btn px-5 banner-btn mt-3" data-toggle="modal" data-target="#exampleModal">
              Enrolled
            </button>
          )
          : !userCoursesId.includes(_id)
            ? (
              <button onClick={() =>{showModal(); handleCourseInfo(course)}} className="btn px-5 banner-btn mt-3" data-toggle="modal" data-target="#exampleModal">
                Enroll
              </button>
            )
            : ''}
      </div>

    </div>
  );
};

export default FeaturedCourseList;
