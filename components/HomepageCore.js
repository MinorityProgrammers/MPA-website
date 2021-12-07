import React, { useState } from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';

const CORE_PRINCIPLES = [
  {
    id: '1',
    image: '/assets/images/core1.png',
    icon: '/assets/images/core1.svg',
    color: 'pink',
    title: 'Diversity in stem',
    description:
      'Our priority for diversity and collaboration, has urged us to create an environment that fosters inclusivity and diversity of both cultures and perspective',
    url: '#',
  },
  {
    id: '2',
    image: '/assets/images/core2.png',
    icon: '/assets/images/core2.svg',
    color: 'blue',
    title: 'Software engineer',
    description: 'We focus on shipping out industry grade software products',
    url: '#',
  },
  {
    id: '3',
    image: '/assets/images/core3.png',
    icon: '/assets/images/core3.svg',
    color: 'yellow',
    title: 'Entrepreneuship',
    description:
      'We ignite entrepreneurship within minority communities as an avenue for innovation and upward mobility',
    url: '#',
  },
  {
    id: '4',
    image: '/assets/images/core4.png',
    icon: '/assets/images/core4.svg',
    color: 'pink',
    title: 'Interdisciplinary learning',
    description:
      ' We motivate ourselves to learn by making connections between ideas and concepts across different professional and academic disciplines.',
    url: '#',
  },
  {
    id: '5',
    image: '/assets/images/core5.png',
    icon: '/assets/images/core5.svg',
    color: 'blue',
    title: 'Innovations',
    description:
      'We nurture new ideas and encourage our employees to think out of the box. There is no one solution to all problems',
    url: '#',
  },
  {
    id: '6',
    image: '/assets/images/core6.png',
    icon: '/assets/images/core6.svg',
    color: 'yellow',
    title: 'Project-based learning',
    description:
      'We believe in project based learning as the most effective means of delivering professional team driven experiences to students around the world',
    url: '#',
  },
  {
    id: '7',
    image: '/assets/images/core7.png',
    icon: '/assets/images/core7.svg',
    color: 'pink',
    title: 'Professional development',
    description:
      'We provide resources for continual learning and skills enhancement to adapt to the changes in progressive technological advancements.',
    url: '#',
  },
  {
    id: '8',
    image: '/assets/images/core8.png',
    icon: '/assets/images/core8.svg',
    color: 'blue',
    title: 'activating passions',
    description:
      'Passion activates purpose. We strongly believe in creating a community that fuels your passion and ideas.',
    url: '#',
  },
  {
    id: '9',
    image: '/assets/images/core9.png',
    icon: '/assets/images/core9.svg',
    color: 'yellow',
    title: 'Sense of community',
    description:
      'We strive to build a supportive community for developers to engage, share knowledge, motivate and grow into valuable assets.',
    url: '#',
  },
  {
    id: '10',
    image: '/assets/images/core10.png',
    icon: '/assets/images/core10.svg',
    color: 'pink',
    title: 'Training/onboarding',
    description:
      'Our training and onboarding has been meticulously designed to focus on new employees social and performance',
    url: '#',
  },
  {
    id: '11',
    image: '/assets/images/core11.png',
    icon: '/assets/images/core11.svg',
    color: 'blue',
    title: 'Humanitarian focused',
    description:
      'We build products that at its core help people improve humanity',
    url: '#',
  },
  {
    id: '12',
    image: '/assets/images/core11.png',
    icon: '/assets/images/core11.svg',
    color: 'yellow',
    title: 'Mentorship',
    description:
      ' Our mentorship program provides learning opportunities, expands your professional network and to gain new perspectives to build a successful career.',
    url: '#',
  },
];

const HomepageCore = function () {
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
        <h3 className="text_white">03</h3>
      </div>
      <div className="container">
        <h2 className="heading__title mt-5 mb-5 text_white">
          &lsaquo;Core_principles/&rsaquo;
        </h2>
        <div className="row">
          <Swiper {...params}>
            {CORE_PRINCIPLES.map(
              ({
                id, image, icon, color, title, url, description,
              }) => (
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
                          onClick={() => handlePopup({
            id,
            image,
            icon,
            color,
            title,
            url,
            description,
          })}
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
              ),
            )}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HomepageCore;

const Popup = function ({
  image, icon, color, title, description, togglePopup,
}) {
  return (
    <div className="popup_wrapper-core">
      <div onClick={togglePopup} className="popup_btn_close-core">
        <i className="fas fa-times" />
      </div>
      <div className="popup-core">
        <div style={{ background: `url(${image})` }} className="popup_bg-core">
          <div className="popup_content-core">
            <div className="popup_heading-core">
              <div className={`popup_image_container-core ${color}`}>
                <img className="popup_img-core" src={icon} />
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
};
