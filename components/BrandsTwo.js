import React from 'react';
import Swiper from 'react-id-swiper';
import AllyCard from './AllyCard';
import 'swiper/css/swiper.css';

const BrandsTwo = function () {
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

  const AllyTile = [
    {
      allyLink: 'https://mason360.gmu.edu/bam/',
      imgSrc: 'assets/images/brand-1-1.png',
    },
    {
      allyLink: 'https://www.encode.club/',
      imgSrc: 'assets/images/encodeclub1.jpg',
    },
    { allyLink: 'https://aisnet.org/', imgSrc: 'assets/images/ais.png' },
    { allyLink: 'https://devpost.com/', imgSrc: 'assets/images/devpost.png' },
    {
      allyLink: 'https://thelastmile.org/',
      imgSrc: 'assets/images/lastmile.png',
    },
    { allyLink: 'https://blockchainedu.org/', imgSrc: 'assets/images/ben.png' },
  ];

  return (
    <section className="brand-two ">
      <div className="container">
        <div className="block-title">
          <h2 className="block-title__title">Ally Organizations</h2>
        </div>
        <div className="brand-one__carousel">
          <Swiper {...params}>
            {AllyTile.map((allies, index) => (
              <div className="swiper-slide" key={index}>
                <AllyCard item={allies} key={index} />
              </div>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default BrandsTwo;
