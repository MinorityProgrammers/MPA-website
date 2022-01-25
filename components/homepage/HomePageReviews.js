/* eslint-disable max-len */
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import TweetEmbed from 'react-tweet-embed';
import React from 'react';

const HomePageReviews = () => {
  const data = [
    '1444383109307412487',
    '1455675414765051905',
    '1431364200132190219',
  ];
  const params = {
    slidesPerView: data.length,
    loop: data.length > 3,
    speed: 700,
    noSwiping: true,
    navigation: {
      nextEl: data.length >= 3 ? '.swiper-button-next' : '',
      prevEl: data.length >= 3 ? '.swiper-button-prev' : '',
    },
    observeParents: true,
    observer: true,
    // rebuildOnUpdate: true,
    // Responsive breakpoints
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
      769: {
        slidesPerView: data.length >= 2 ? 2 : data.length,
      },
      768: {
        slidesPerView: data.length >= 2 ? 1 : data.length,
      },
      320: {
        slidesPerView: 1,
      },
    },
  };
  //   parent.document
  //     .querySelectorAll('iframe, frame')
  //     .forEach((frame) => {
  //       console.log(frame);
  //     });

  return (
    <section className="homepage__Reviews">
      <div className="heading__number">
        <h3 className="tw-text-blue-900">04</h3>
      </div>
      <div className="container">
        <h2 className="heading__title mt-5 mb-5 tw-text-blue-900">
          &lsaquo;testimonials/&rsaquo;
        </h2>

        <Swiper {...params} grabCursor>
          {data.map((comment) => (
            <div className="item" key={comment.id}>
              <div className="card card__container homepage__comment">
                <TweetEmbed
                  className="css-1dbjc4n"
                  id={comment}
                  options={{
                    cards: 'hidden', width: 300, maxWidth: 350,
                  }}
                  onLoad={(tweetWidgetEl) => {
                    const tweetEl = tweetWidgetEl.shadowRoot.querySelector('.EmbeddedTweet');
                    tweetEl.style.margin = 'auto';
                  }}
                />
              </div>
            </div>
          ))}
        </Swiper>
        {/* <p className="swiper__counter">3/6</p> */}
      </div>
    </section>
  );
};

export default HomePageReviews;
