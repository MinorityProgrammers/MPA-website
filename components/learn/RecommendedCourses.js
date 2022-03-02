import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import RecommendedCourseList from './RecommendedCourseList';

const RecommendedCourses = ({
  recommendedCourses,
  handleCourseInfo,
  showModal,
}) => {
  const [sliderRef, setSliderRef] = useState(null);
  const coursesLength = recommendedCourses.length;

  const conditionalInfinite = {
    dots: false,
    arrows: false,
    speed: 2000,
    slidesToShow: 2,
    infinite: coursesLength > 2,
    autoplay: true,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          infinite: coursesLength > 2,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          infinite: coursesLength >= 1,
        },
      },
    ],
  };

  return (
    <div>
      <div className="tw-relative">
        <div className="bg-circle-recomended-left" />
      </div>
      <div className="tw-relative">
        <div className="bg-circle-recomended-right" />
      </div>
      <div className="mb-5 pb-3">
        <div
          className="course-category d-flex font-weight-bold"
          style={{ marginLeft: '-80px' }}
        >
          <img
            src="/assets/images/home-page/about-title-icon.svg"
            style={{ maxWidth: '100px', marginRight: '-20px' }}
            alt="bg"
          />
          <div className=" tw-flex">
            <h1 className="courseCategory-title" style={{ marginTop: '30%' }}>
              Recommended Courses
            </h1>
          </div>
        </div>
        <div
          className={
            coursesLength > 2
              ? 'mt-3 pt-2 FRCourses'
              : 'mt-3 courses-info pt-2 recommended-courses'
          }
        >
          <div className="courses-slider-controllers">
            <div onClick={sliderRef?.slickPrev}>
              <i className="fas fa-chevron-circle-left" />
            </div>
            <div onClick={sliderRef?.slickNext}>
              <i className="fas fa-chevron-circle-right" />
            </div>
          </div>
          <Slider ref={setSliderRef} {...conditionalInfinite}>
            {recommendedCourses
              && recommendedCourses.map((course) => (
                <RecommendedCourseList
                  showModal={showModal}
                  course={course}
                  key={course._id}
                  handleCourseInfo={handleCourseInfo}
                />
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default RecommendedCourses;
