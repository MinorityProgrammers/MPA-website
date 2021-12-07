import React, { useState } from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';

const SliderOne = function () {
  const [swiper, setSwiper] = useState(null);

  const goNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev();
    }
  };

  return (
    <div className="banner-wrapper">
      <section className="banner-one banner-carousel__one no-dots">

        <Swiper getSwiper={setSwiper}>
          <div className="banner-one__slide banner-one__slide-one">
            <div className="container">
              <div className="banner-one__bubble-1" />
              <div className="banner-one__bubble-2" />
              <div className="banner-one__bubble-3" />
              <img src="/assets/images/slider-1-scratch.png" alt="" className="banner-one__scratch" />

              <div className="row no-gutters">
                <div className="col-xl-12">
                    <h3 className="banner-one__title banner-one__light-color">
                        Minority<br />
                        Programmers Association
</h3>
                    <p className="banner-one__tag-line">Code, Culture, Community.</p>
                    <a href="#join" className="thm-btn banner-one__btn">Join Today</a>
                  </div>
              </div>
            </div>
          </div>
          <div className="banner-one__slide banner-one__slide-two">
            <div className="container">
              <div className="banner-one__bubble-1" />
              <div className="banner-one__bubble-2" />
              <div className="banner-one__bubble-3" />
              <img src="/assets/images/slider-1-scratch.png" alt="" className="banner-one__scratch" />

              <div className="row no-gutters">
                <div className="col-xl-12">
                    <h3 className="banner-one__title banner-one__light-color">
                        Learn<br />
                        to Code
</h3>
                    <p className="banner-one__tag-line">with our international network of developers</p>
                    <a href="#" className="thm-btn banner-one__btn">Learn More</a>
                  </div>
              </div>
            </div>
          </div>
        </Swiper>
      </section>
      <div className="banner-carousel-btn">
        <div onClick={goPrev} className="banner-carousel-btn__left-btn banner-arrow"><i className="kipso-icon-left-arrow" /></div>
        <div onClick={goNext} className="banner-carousel-btn__right-btn banner-arrow"><i className="kipso-icon-right-arrow" /></div>
      </div>
      <div className="banner-one__cta">
        <div className="banner-one__cta-icon">
          <i className="kipso-icon-black-graduation-cap-tool-of-university-student-for-head" />
        </div>
        <div className="banner-one__cta-title">
          <h3 className="banner-one__cta-text">
            <a href="#">
              Read how we encourage our
              students to learn
            </a>
          </h3>
        </div>
        <div className="banner-one__cta-link">
          <a href="#"><i className="kipso-icon-right-arrow" /></a>
        </div>
      </div>
    </div>
  );
};
export default SliderOne;
