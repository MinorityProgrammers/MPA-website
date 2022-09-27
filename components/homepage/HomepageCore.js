/*eslint-disable */
import React, { useState } from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import CORE_PRINCIPLES from './corePrinciplesData';

const HomepageCore = () => {
  const [popupInfo, setPopupInfo] = useState({
    id: '',
    image: '',
    icon: '',
    title: '',
    url: '',
    description: '',
  });

  const params = {
    slidesPerView: 3,
    loop: true,
    speed: 1000,
    spaceBetween: 20,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
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

  const handlePopup = (info) => {
    document.querySelector('.popup_wrapper-core').classList.add('show');
    setPopupInfo(info);
    document.querySelector('.popup-core').classList.add('popup_show-core');
  };

  const handleTogglePopup = () => {
    document
      .querySelector('.popup-core')
      .classList.replace('popup_show-core', 'popup_hide-core');
    document.querySelector('.popup-core').onanimationend = (e) => {
      if (e.animationName === 'hide') {
        document
          .querySelector('.popup-core')
          .classList.remove('popup_hide-core');
        document.querySelector('.popup_wrapper-core').classList.remove('show');
      }
    };
  };

  return (
    <section className="homepage__core">
      <Popup {...popupInfo} togglePopup={handleTogglePopup} />
      <div className="container">
        <h2 className=" top__part__title tw-text-center tw-my-12 tw-text-5xl">
          Our Core Principles
        </h2>
        <div className="row">
          <Swiper {...params}>
            {CORE_PRINCIPLES.map(
              ({ id, icon, color, title, url, description }) => (
                <div
                  key={id}
                  className="col-lg-4 col-md-4 col-sm- col-xs-12 card__container-core homepage_core_header"
                >
                  <div className="card-body card-body-app">
                    <div className="img-banner-core-root">
                      <div
                        onClick={() =>
                          handlePopup({
                            id,
                            icon,
                            color,
                            title,
                            url,
                            description,
                          })
                        }
                        className={`img-banner-core-container`}
                      >
                        <img
                          src={icon}
                          alt=""
                          className={`card-img-banner-core`}
                        />
                      </div>
                    </div>
                    <div className="text-center homepage_core_body">
                      <h3 className="card-button tw-text-white tw-text-3xl tw-mb-4 tw-font-bold">
                        {title}
                      </h3>
                      <span className="tw-text-base">{description}</span>
                    </div>
                  </div>
                </div>
              )
            )}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HomepageCore;

const Popup = ({ image, icon, color, title, description, togglePopup }) => (
  <div className="popup_wrapper-core">
    <div onClick={togglePopup} className="popup_btn_close-core">
      <i className="fas fa-times" />
    </div>
    <div className="popup-core">
      <div style={{ background: `url(${image})` }} className="popup_bg-core">
        <div className="popup_content-core">
          <div className="popup_heading-core">
            <div className={`popup_image_container-core ${color}`}>
              <img className="popup_img-core" src={icon} alt="popup_img-icon" />
            </div>
            <div className={`popup_title_container-core ${color}`}>
              <div className="popup_title-core">{title}</div>
            </div>
          </div>
          <div className="popup_text-core">{description}</div>
        </div>
      </div>
    </div>
  </div>
);
