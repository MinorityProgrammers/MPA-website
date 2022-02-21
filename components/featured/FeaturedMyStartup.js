import React from "react";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";
import FeaturedMyCard from "./FeaturedMyCard";

const FeaturedMyStartup = ({ data, setClickRegister, userData }) => {
  const params = {
    slidesPerView: data.length,
    loop: data.length >= 3,
    speed: 700,
    spaceBetween: 0,
    navigation: {
      nextEl: data.length >= 3 ? ".swiper-button-next" : "",
      prevEl: data.length >= 3 ? ".swiper-button-prev" : "",
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    observeParents: true,
    observer: true,
    rebuildOnUpdate: true,
    breakpoints: {
      1440: {
        slidesPerView: data.length >= 3 ? 3 : data.length,
      },
      1025: {
        slidesPerView: data.length >= 3 ? 3 : data.length,
      },
      1024: {
        slidesPerView: data.length >= 2 ? 2 : data.length,
      },
      768: {
        slidesPerView: data.length >= 2 ? 2 : data.length,
      },
      640: {
        slidesPerView: data.length >= 2 ? 2 : data.length,
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
          <div className=" featured__text">
            <h2 className="featured__title">My Startups</h2>
          </div>
          <div className="col-lg-12 col-md-12 d-flex align-items-center justify-content-center ">
            {userData === null && (
              <div className="container text-center mt-3 mb-3 featured__card-empty">
                <h1 className="featured__card-title mb-3">
                  Please Login To View Startups you have shares in!
                </h1>
                <div className="btn__container">
                  <a
                    href="#"
                    className="button btn-filled sm"
                    onClick={() => {
                      setClickRegister(true);
                    }}
                  >
                    Login
                  </a>
                </div>
              </div>
            )}
            {userData !== null && data.length === 0 ? (
              <div className="container text-center mt-3 mb-3 featured__card-empty">
                <h1 className="featured__card-title mb-3">
                  You have not funded any startup yet
                </h1>
                <div className="btn__container">
                  <a href="#" className="button btn-filled sm">
                    Explore Startups
                  </a>
                </div>
              </div>
            ) : (
              <Swiper {...params} grabCursor>
                {data.map((s, i) => (
                  <div className="item" key={`${i + 1}`}>
                    <FeaturedMyCard data={s.startup_id} />
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

export default FeaturedMyStartup;
