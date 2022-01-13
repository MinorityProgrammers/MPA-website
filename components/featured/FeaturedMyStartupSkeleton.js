import React from 'react';
import Swiper from 'react-id-swiper';
import FeaturedMyCardSkeleton from './FeaturedMyCardSkeleton';

const FeaturedMyStartupSkeleton = () => {
  const params = {
    slidesPerView: 4,
    loop: true,
    speed: 700,
    spaceBetween: 0,
    navigation: {
      nextEl: 4 ? '.swiper-button-next' : '',
      prevEl: 4 ? '.swiper-button-prev' : '',
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    observeParents: true,
    observer: true,
    rebuildOnUpdate: true,
    // Responsive breakpoints
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
          <div className="col-lg-3 col-md-12 featured__text">
            <h2 className="featured__title">My Startups</h2>
            <p className="featured__subtitle">
              These are startups you have some shares in
            </p>
          </div>
          <div className="col-lg-9 col-md-12 d-flex align-items-center justify-content-center ">
            <Swiper {...params} grabCursor>
              <FeaturedMyCardSkeleton />
              <FeaturedMyCardSkeleton />
              <FeaturedMyCardSkeleton />
              <FeaturedMyCardSkeleton />
              <FeaturedMyCardSkeleton />
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMyStartupSkeleton;
