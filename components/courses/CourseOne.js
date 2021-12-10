import React from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';

const CourseOne = () => {
  const params = {
    slidesPerView: 3,
    loop: true,
    speed: 1000,
    spaceBetween: 30,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    // Responsive breakpoints
    breakpoints: {
      1024: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 2,
      },
      640: {
        slidesPerView: 2,
      },
      320: {
        slidesPerView: 1,
      },
    },
  };
  return (
    <div>
      <section className="course-one__top-title home-one">
        <div className="container">
          <div className="block-title mb-0">
            <h2 className="block-title__title">
              Our
              <br />
              Events
            </h2>
          </div>
        </div>
        <div className="course-one__top-title__curve" />
      </section>

      <section className="course-one course-one__teacher-details home-one">
        <div className="container">
          <div className="course-one__carousel">
            <Swiper {...params}>
              <div className="item">
                <div className="course-one__single color-1">
                  <div className="course-one__image">
                    <img src="/assets/images/course-1-1.jpg" alt="" />
                    <i className="far fa-heart" />
                  </div>
                  <div className="course-one__content">
                    <a href="#" className="course-one__category">
                      Hackathon
                    </a>
                    <div className="course-one__admin">
                      <img src="/assets/images/team-1-1.jpg" alt="" />
                      by <a href="/teacher-details">MinorityProgrammers</a>
                    </div>
                    <h2 className="course-one__title">
                      <a href="/course-details">#ClimateHacks Hackathon</a>
                    </h2>

                    <div className="course-one__meta">
                      <a href="/course-details">
                        <i className="far fa-clock" />
                        Sat April 24 - Sun April 25, 2021
                      </a>
                    </div>
                    <a href="#" className="course-one__link">
                      Sign Up
                    </a>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="course-one__single color-1">
                  <div className="course-one__image">
                    <img src="/assets/images/course-1-1.jpg" alt="" />
                    <i className="far fa-heart" />
                  </div>
                  <div className="course-one__content">
                    <a href="#" className="course-one__category">
                      Hackathon
                    </a>
                    <div className="course-one__admin">
                      <img src="/assets/images/team-1-1.jpg" alt="" />
                      by <a href="/teacher-details">MinorityProgrammers</a>
                    </div>
                    <h2 className="course-one__title">
                      <a href="/course-details">#ElectionHackathon</a>
                    </h2>
                    <div className="course-one__meta">
                      <a href="/course-details">
                        <i className="far fa-clock" />
                        Sat April 24 - Sun April 25, 2021
                      </a>
                      <a href="/course-details">
                        <i className="far fa-folder-open" /> 50 Participants
                      </a>
                      <a href="/course-details">Free</a>
                    </div>
                    <a href="#" className="course-one__link">
                      See Results
                    </a>
                  </div>
                </div>
              </div>
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
};
export default CourseOne;
