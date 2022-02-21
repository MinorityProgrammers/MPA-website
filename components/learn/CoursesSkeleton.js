import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import RecommendedCoursesListSkeleton from './RecommendedCoursesListSkeleton';

const CoursesSkeleton = ({ title }) => {
  const coursesLength = 4;

  const conditionalInfinite = {
    arrows: false,
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
        <div className="course-category d-flex font-weight-bold tw-justify-center" />
        <div className="mt-3 pt-2 FRCourses">
          <Slider {...conditionalInfinite}>
            <RecommendedCoursesListSkeleton />
            <RecommendedCoursesListSkeleton />
            <RecommendedCoursesListSkeleton />
            <RecommendedCoursesListSkeleton />
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default CoursesSkeleton;
