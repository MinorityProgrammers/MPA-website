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
    slidesPerView: data.length,
    loop: data.length >= 3,
    speed: 700,
    spaceBetween: 15,
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
        slidesPerView: data.length >= 3 ? 2 : data.length,
      },
      1025: {
        slidesPerView: data.length >= 3 ? 2 : data.length,
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
    <>
      <Swiper {...params} grabCursor>
        {data.map((event, i) => (
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
