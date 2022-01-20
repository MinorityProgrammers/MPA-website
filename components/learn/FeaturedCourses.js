import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FeaturedCourseList from './FeaturedCourseList';

const FeaturedCourses = function ({
  courses, handleCourseInfo, enrolledCourses, enrolledBtn, showModal,
}) {
  const coursesLength = courses.length;

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
  const sameUserCourses = courses && courses.filter(
    (course) => enrolledCourses.some((eCourse) => course._id === eCourse.courseId._id),
  );

  return (
    <div>
      <div className="mb-5 pb-3">
        <div className="course-category d-flex font-weight-bold tw-justify-center">
          <h1 className="courseCategory-title ">Featured Courses</h1>
        </div>
        <div className={coursesLength > 2 ? 'mt-3 courses-info pt-2 FRCourses' : 'mt-3 courses-info pt-2 featured-courses'}>
          <Slider {...conditionalInfinite}>
            {courses && courses.map((course) => (
              <FeaturedCourseList
                showModal={showModal}
                course={course}
                handleCourseInfo={handleCourseInfo}
                key={course._id}
                sameUserCourses={sameUserCourses}
                enrolledBtn={enrolledBtn}
              />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCourses;
