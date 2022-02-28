import React from "react";
import "swiper/css/swiper.css";
import Swiper from "react-id-swiper";
import EventCardFeatured from "./EventCard";

const SwipeEvent = ({
  data,
  active,
  userSavedEvents,
  handleMoreInfo,
  setClickRegister,
  userEvent,
  clickRegister,
  userData,
  token,
  allsavedEvents,
}) => {
  const params = {
    slidesPerView: 2,
    loop: true,
    speed: 700,
    spaceBetween: 25,
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
        slidesPerView: 2,
      },
      1025: {
        slidesPerView: 2,
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
    <>
      <Swiper {...params} grabCursor>
        {data?.map((event, i) => (
          <div className="item" key={`${i + 1}`}>
            <EventCardFeatured
              item={event}
              attended={event}
              userSavedEvents={userSavedEvents}
              key={i}
              handleMoreInfo={handleMoreInfo}
              active={active}
              setClickRegister={setClickRegister}
              userEvent={userEvent}
              clickRegister={clickRegister}
              userData={userData}
              token={token}
              allsavedEvents={allsavedEvents}
            />
          </div>
        ))}
      </Swiper>
    </>
  );
};

export default SwipeEvent;
