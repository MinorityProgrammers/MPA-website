import React from "react";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";

const CourseCatOne = () => {
  const params = {
    slidesPerView: 6,
    loop: true,
    speed: 1000,
    spaceBetween: 30,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    // Responsive breakpoints
    breakpoints: {
      1024: {
        slidesPerView: 6,
      },
      768: {
        slidesPerView: 4,
      },
      640: {
        slidesPerView: 3,
      },
      320: {
        slidesPerView: 2,
      },
    },
  };

  return (
    <section className="thm-gray-bg course-category-one">
      <div className="container-fluid text-center">
        <div className="block-title text-center">
          <h2 className="block-title__title">
            Our Core
            <br />
            Principles
          </h2>
        </div>
        <div className="course-category-one__carousel">
          <Swiper {...params}>
            <div className="item">
              <div className="course-category-one__single color-1">
                <div className="course-category-one__icon">
                  <i className="kipso-icon-desktop"></i>
                </div>
                <h3 className="course-category-one__title">
                  <a href="#">Diversity in STEM</a>
                </h3>
              </div>
            </div>
            <div className="item">
              <div className="course-category-one__single color-2">
                <div className="course-category-one__icon">
                  <i className="kipso-icon-web-programming"></i>
                </div>
                <h3 className="course-category-one__title">
                  <a href="#">Software Engineering</a>
                </h3>
              </div>
            </div>
            <div className="item">
              <div className="course-category-one__single color-3">
                <div className="course-category-one__icon">
                  <i className="kipso-icon-music-player"></i>
                </div>
                <h3 className="course-category-one__title">
                  <a href="#">Interdisciplinary Learning</a>
                </h3>
              </div>
            </div>
            <div className="item">
              <div className="course-category-one__single color-4">
                <div className="course-category-one__icon">
                  <i className="kipso-icon-camera"></i>
                </div>
                <h3 className="course-category-one__title">
                  <a href="#">Project Based Learning</a>
                </h3>
              </div>
            </div>
            <div className="item">
              <div className="course-category-one__single color-5">
                <div className="course-category-one__icon">
                  <i className="kipso-icon-targeting"></i>
                </div>
                <h3 className="course-category-one__title">
                  <a href="#">Activating Passions</a>
                </h3>
              </div>
            </div>
            <div className="item">
              <div className="course-category-one__single color-6">
                <div className="course-category-one__icon">
                  <i className="kipso-icon-health"></i>
                </div>
                <h3 className="course-category-one__title">
                  <a href="#">Training/Onboarding</a>
                </h3>
              </div>
            </div>
            <div className="item">
              <div className="course-category-one__single color-1">
                <div className="course-category-one__icon">
                  <i className="kipso-icon-desktop"></i>
                </div>
                <h3 className="course-category-one__title">
                  <a href="#">Job Placement</a>
                </h3>
              </div>
            </div>
            <div className="item">
              <div className="course-category-one__single color-2">
                <div className="course-category-one__icon">
                  <i className="kipso-icon-web-programming"></i>
                </div>
                <h3 className="course-category-one__title">
                  <a href="#">Entrepreneurship</a>
                </h3>
              </div>
            </div>
            <div className="item">
              <div className="course-category-one__single color-3">
                <div className="course-category-one__icon">
                  <i className="kipso-icon-music-player"></i>
                </div>
                <h3 className="course-category-one__title">
                  <a href="#">Innovation</a>
                </h3>
              </div>
            </div>
            <div className="item">
              <div className="course-category-one__single color-4">
                <div className="course-category-one__icon">
                  <i className="kipso-icon-camera"></i>
                </div>
                <h3 className="course-category-one__title">
                  <a href="#">Professional Development</a>
                </h3>
              </div>
            </div>
            <div className="item">
              <div className="course-category-one__single color-4">
                <div className="course-category-one__icon">
                  <i className="kipso-icon-camera"></i>
                </div>
                <h3 className="course-category-one__title">
                  <a href="#">Sense of Community</a>
                </h3>
              </div>
            </div>
            <div className="item">
              <div className="course-category-one__single color-4">
                <div className="course-category-one__icon">
                  <i className="kipso-icon-camera"></i>
                </div>
                <h3 className="course-category-one__title">
                  <a href="#">Mentorship</a>
                </h3>
              </div>
            </div>
            <div className="item">
              <div className="course-category-one__single color-4">
                <div className="course-category-one__icon">
                  <i className="kipso-icon-camera"></i>
                </div>
                <h3 className="course-category-one__title">
                  <a href="#">Humanitarian Focused</a>
                </h3>
              </div>
            </div>
          </Swiper>
        </div>

        <a href="/services" className="thm-btn">
          See Our Services
        </a>
      </div>
    </section>
  );
};
export default CourseCatOne;
