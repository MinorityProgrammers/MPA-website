import React from "react";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";
import FeaturedCard from "./FeaturedCard";

const FeaturedStartups = ({ data, setClickRegister, userData, allfunded }) => {
  const params = {
    slidesPerView: 3,
    loop: true,
    speed: 700,
    spaceBetween: 0,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
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
        <div className="">
          <div className="featured__text">
            <h2 className="featured__title">Featured Startups</h2>
          </div>
          <div className="col-lg-12 d-flex align-items-center featured__card">
            {!data ? (
              <div className="container text-center mt-3 mb-3 featured__card-empty">
                <h1 className="featured__card-title mb-3">
                  There is no startup yet.
                </h1>
                <div className="btn__container">
                  <a href="#" className="button btn-filled sm">
                    Start your own Startup
                  </a>
                </div>
              </div>
            ) : (
              <Swiper {...params} grabCursor>
                {data.map((d, i) => (
                  <div className="item" key={`${i + 1}`}>
                    <FeaturedCard
                      data={d}
                      userData={userData}
                      setClickRegister={setClickRegister}
                      allfunded={allfunded}
                    />
                  </div>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStartups;
