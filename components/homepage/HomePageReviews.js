import React, { useState } from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import TweetEmbed from './TweetEmbed';
import TweetSkeltonLoader from './TweetSkeltonLoader';

const HomePageReviews = () => {
  const [tweetsLoading, setTweetsLoading] = useState(true);

  const data = [
    { tweetId: '1444383109307412487' },
    { tweetId: '1431364200132190219', options: { cards: 'hidden' } },
    { tweetId: '1455675414765051905' },
    { tweetId: '1484769427489009670' },
    { tweetId: '1486289656203427845' },
    { tweetId: '1484447708668649475' },
    { tweetId: '1484833789058633729' },
    { tweetId: '1484692573713276935', loading: false },

  ];
  const params = {
    slidesPerView: 3,
    // loop: true,
    slidesPerGroup: 3,
    speed: 700,
    noSwiping: true,
    navigation: {
      nextEl: data.length >= 3 ? '.swiper-button-next' : '',
      prevEl: data.length >= 3 ? '.swiper-button-prev' : '',
    },
    observeParents: true,
    observer: true,
    breakpoints: {
      1440: {
        slidesPerView: data.length >= 3 ? 3 : data.length,
        slidesPerGroup: 3,
      },
      1025: {
        slidesPerView: data.length >= 3 ? 3 : data.length,
        slidesPerGroup: 3,
      },
      1024: {
        slidesPerView: data.length >= 2 ? 2 : data.length,
        slidesPerGroup: 1,
      },
      769: {
        slidesPerView: data.length >= 2 ? 2 : data.length,
        slidesPerGroup: 1,
      },
      768: {
        slidesPerView: data.length >= 2 ? 1 : data.length,
        slidesPerGroup: 1,
      },
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
    },
  };
  const skeltonCount = () => {
    let num;
    if (window.innerWidth < 768) {
      num = 1;
    } else if (window.innerWidth < 1200) {
      num = 2;
    } else {
      num = 3;
    }
    return num;
  };

  return (
    <section className="homepage__Reviews">
      <div className="container">
        <h2 style={{ textAlign: 'center' }} className="top__part__title">
          See what people are saying
        </h2>
        <p className="tw-text-2xl tw-text-center md:tw-w-full tw-mt-5 tw-mx-auto md:tw-text-base tw-mb-16 tw-text-white">
          Still not sure ?  Learn from other People how MPA is a big impact
        </p>
        {tweetsLoading
          && (
            <Swiper containerClass="swiper-container skelton-container" wrapperClass="swiper-wrapper skelton-wrapper" slidesPerView={skeltonCount()} {...params} observer={false} grabCursor>
              {
              Array.apply(0, Array(skeltonCount())).map((element) => (
                <TweetSkeltonLoader key={element} />))
              }
            </Swiper>
          )}

        <Swiper containerClass={`${!tweetsLoading ? 'swiper-container' : 'swiper-container swiper-container-unloaded'}`} {...params}>
          { data.map((tweet) => (
            <div className="item tweet__card" id={`tweet-${tweet.tweetId}`} key={tweet.tweetId}>
              <div className="card card__container homepage__comment">
                <TweetEmbed
                  tweetId={tweet.tweetId}
                  options={tweet.options}
                  tweetsLoading={tweet.loading}
                  setTweetsLoading={setTweetsLoading}
                />
              </div>
            </div>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HomePageReviews;
