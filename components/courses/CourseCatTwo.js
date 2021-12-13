import React from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';

const CourseCatTwo = () => {
  const params = {
    slidesPerView: 5,
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
        slidesPerView: 5,
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
    <section className="course-category-two">
      <div className="container text-center">
        <div className="inner-container">
          <div className="course-category-two__carousel">
            <Swiper {...params}>
              <div className="item">
                <div className="course-category-two__single color-1">
                  <div className="course-category-two__icon">
                    <i className="kipso-icon-desktop" />
                  </div>
                  <h3 className="course-category-two__title">
                    <a href="#">IT & Software</a>
                  </h3>
                </div>
              </div>
              <div className="item">
                <div className="course-category-two__single color-2">
                  <div className="course-category-two__icon">
                    <i className="kipso-icon-web-programming" />
                  </div>
                  <h3 className="course-category-two__title">
                    <a href="#">Development</a>
                  </h3>
                </div>
              </div>
              <div className="item">
                <div className="course-category-two__single color-3">
                  <div className="course-category-two__icon">
                    <i className="kipso-icon-music-player" />
                  </div>
                  <h3 className="course-category-two__title">
                    <a href="#">Music</a>
                  </h3>
                </div>
              </div>
              <div className="item">
                <div className="course-category-two__single color-4">
                  <div className="course-category-two__icon">
                    <i className="kipso-icon-camera" />
                  </div>
                  <h3 className="course-category-two__title">
                    <a href="#">Photography</a>
                  </h3>
                </div>
              </div>
              <div className="item">
                <div className="course-category-two__single color-5">
                  <div className="course-category-two__icon">
                    <i className="kipso-icon-targeting" />
                  </div>
                  <h3 className="course-category-two__title">
                    <a href="#">Marketing</a>
                  </h3>
                </div>
              </div>
              <div className="item">
                <div className="course-category-two__single color-6">
                  <div className="course-category-two__icon">
                    <i className="kipso-icon-health" />
                  </div>
                  <h3 className="course-category-two__title">
                    <a href="#">Health & Fitness</a>
                  </h3>
                </div>
              </div>
              <div className="item">
                <div className="course-category-two__single color-1">
                  <div className="course-category-two__icon">
                    <i className="kipso-icon-desktop" />
                  </div>
                  <h3 className="course-category-two__title">
                    <a href="#">IT & Software</a>
                  </h3>
                </div>
              </div>
              <div className="item">
                <div className="course-category-two__single color-2">
                  <div className="course-category-two__icon">
                    <i className="kipso-icon-web-programming" />
                  </div>
                  <h3 className="course-category-two__title">
                    <a href="#">Development</a>
                  </h3>
                </div>
              </div>
              <div className="item">
                <div className="course-category-two__single color-3">
                  <div className="course-category-two__icon">
                    <i className="kipso-icon-music-player" />
                  </div>
                  <h3 className="course-category-two__title">
                    <a href="#">Music</a>
                  </h3>
                </div>
              </div>
              <div className="item">
                <div className="course-category-two__single color-4">
                  <div className="course-category-two__icon">
                    <i className="kipso-icon-camera" />
                  </div>
                  <h3 className="course-category-two__title">
                    <a href="#">Photography</a>
                  </h3>
                </div>
              </div>
              <div className="item">
                <div className="course-category-two__single color-1">
                  <div className="course-category-two__icon">
                    <i className="kipso-icon-desktop" />
                  </div>
                  <h3 className="course-category-two__title">
                    <a href="#">IT & Software</a>
                  </h3>
                </div>
              </div>
              <div className="item">
                <div className="course-category-two__single color-2">
                  <div className="course-category-two__icon">
                    <i className="kipso-icon-web-programming" />
                  </div>
                  <h3 className="course-category-two__title">
                    <a href="#">Development</a>
                  </h3>
                </div>
              </div>
              <div className="item">
                <div className="course-category-two__single color-3">
                  <div className="course-category-two__icon">
                    <i className="kipso-icon-music-player" />
                  </div>
                  <h3 className="course-category-two__title">
                    <a href="#">Music</a>
                  </h3>
                </div>
              </div>
              <div className="item">
                <div className="course-category-two__single color-4">
                  <div className="course-category-two__icon">
                    <i className="kipso-icon-camera" />
                  </div>
                  <h3 className="course-category-two__title">
                    <a href="#">Photography</a>
                  </h3>
                </div>
              </div>
              <div className="item">
                <div className="course-category-two__single color-5">
                  <div className="course-category-two__icon">
                    <i className="kipso-icon-targeting" />
                  </div>
                  <h3 className="course-category-two__title">
                    <a href="#">Marketing</a>
                  </h3>
                </div>
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseCatTwo;