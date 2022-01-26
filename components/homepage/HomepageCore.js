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
      <div className="heading__number">
        <h3 className="tw-text-blue-900">02</h3>
      </div>
      <div className="container">
        <h2 className="heading__title mt-5 mb-5 tw-text-blue-900">
          &lsaquo;Core_principles/&rsaquo;
        </h2>
        <div className="row">
          <Swiper {...params}>
            {CORE_PRINCIPLES.map(
              ({ id, image, icon, color, title, url, description }) => (
                <div
                  key={id}
                  className="col-lg-4 col-md-4 col-sm- col-xs-12 card__container-core"
                >
                  <div className="card border-0 rounded-0">
                    <div className="img-banner-core">
                      <img
                        src={image}
                        alt=""
                        className="card-img-top rounded-0"
                      />
                      <div
                        onClick={() =>
                          handlePopup({
                            id,
                            image,
                            icon,
                            color,
                            title,
                            url,
                            description,
                          })
                        }
                        className={`img-banner-core-container ${color}`}
                      >
                        <img
                          src={icon}
                          alt=""
                          className={`card-img-banner-core ${color}`}
                        />
                      </div>
                    </div>
                    <div className="card-body card-body-app">
                      <div className="text-right">
                        <p className="card-button">{title}</p>
                      </div>
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
