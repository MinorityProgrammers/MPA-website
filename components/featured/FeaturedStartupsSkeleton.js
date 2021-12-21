import React from 'react';
import Swiper from 'react-id-swiper';
import FeaturedCardSkeleton from './FeaturedCardSkeleton';

const FeaturedStartupsSkeleton = () => {
  const params = {
    slidesPerView: 3,
    loop: true,
    speed: 700,
    spaceBetween: 0,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    observeParents: true,
    observer: true,

    breakpoints: {
      1440: {
        slidesPerView: 3,
      },
      1025: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 2,
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
    <section className="featured__wrapper">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 featured__text">
            <h2 className="featured__title">Featured Startups</h2>
            <p className="featured__subtitle">
              Invest in the next billion dollar company today
            </p>
          </div>
          <div className="col-lg-9 d-flex align-items-center featured__card">
            <Swiper {...params} grabCursor>
              <FeaturedCardSkeleton />
              <FeaturedCardSkeleton />
              <FeaturedCardSkeleton />
              <FeaturedCardSkeleton />
              <FeaturedCardSkeleton />
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStartupsSkeleton;
