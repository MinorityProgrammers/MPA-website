import React from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import BrandCard from './BrandCard';

const BrandsOne = function () {
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

  const Brands = [
    {
      brandLink: 'https://www.accenture.com/',
      imgSrc: 'assets/images/accenture.png',
    },
    { brandLink: 'https://www.cgi.com/en', imgSrc: 'assets/images/cgi.png' },
    {
      brandLink: 'https://www.captechconsulting.com/',
      imgSrc: 'assets/images/caotech.png',
    },
    {
      brandLink: 'https://www.jmu.edu/cise/cs/',
      imgSrc: 'assets/images/jmucs.png',
    },
    {
      brandLink: 'https://www.jmu.edu/cob/',
      imgSrc: 'assets/images/jmucob.png',
    },
  ];

  return (
    <section className="brand-two ">
      <div className="container">
        <div className="block-title">
          <h2 className="block-title__title">Our Past Sponsors</h2>
        </div>
        <div className="brand-one__carousel">
          <Swiper {...params}>
            {Brands.map((brands, index) => (
              <div className="swiper-slide" key={index}>
                <BrandCard item={brands} key={index} />
              </div>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default BrandsOne;
