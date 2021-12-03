import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RecommendedCoursesListSkeleton from './RecommendedCoursesListSkeleton';

const CoursesSkeleton = (props) => {
  const coursesLength = 4;

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
          infinite: coursesLength > 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          infinite: coursesLength >= 1
        }
      }
    ]
  }

  return (
    <div>
      <div className="mb-5 pb-3">
        <div className="course-category d-flex font-weight-bold">
          <h1 className="courseCategory-title">{props.title}</h1>
        </div>
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