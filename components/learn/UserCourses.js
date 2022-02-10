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
    slidesToShow: 2,
    infinite: coursesLength > 2,
    autoplay: true,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          infinite: coursesLength > 1,
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
    <div className="tw-relative">
      <div className="">
        <div
          className={
            coursesLength > 2
              ? 'courses-info pt-2'
              : 'courses-info pt-2 user-courses'
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
