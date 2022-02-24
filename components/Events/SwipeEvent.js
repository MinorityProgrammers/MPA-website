import React from "react";
import Swiper from "swiper";
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
    // slidesPerView: data.length,
    // loop: data.length >= 3,
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
      // when window width is >= 640px
      200: {
        slidesPerView: 1,
      },
      // when window width is >= 918px
      918: {
        slidesPerView: 1.5,
      },
      // when window width is >= 1400px
      1400: {
        slidesPerView: 2,
      },
      // when window width is >= 2400px
      2400: {
        slidesPerView: 2,
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
