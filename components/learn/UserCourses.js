import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import UserCoursesList from './UserCourseList';

const UserCourses = ({ enrolledCourses, user }) => {
  const coursesLength = enrolledCourses.length;

  const conditionalInfinite = {
    dots: false,
    speed: 2000,
    slidesToShow: 3,
    infinite: coursesLength > 3,
    autoplay: true,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          infinite: coursesLength > 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          infinite: coursesLength >= 1,
        },
      },
    ],
  };

  return (
    <div>
      <div className="mb-5 pb-3">
        <div className="course-category d-flex font-weight-bold tw-justify-center">
          <h1 className="courseCategory-title">My Courses</h1>
        </div>
        <div
          className={
            coursesLength > 2
              ? 'mt-3 courses-info pt-2'
              : 'mt-3 courses-info pt-2 user-courses'
          }
        >
          <Slider {...conditionalInfinite}>
            {enrolledCourses
              && enrolledCourses.map((course) => (
                <UserCoursesList
                  enrolledCourse={course}
                  key={course._id}
                  userInfo={user}
                />
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default UserCourses;
