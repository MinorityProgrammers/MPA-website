import React, { useState, useEffect } from 'react';
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
  const last_tweet = document.getElementById(`twitter-widget-${data.length - 1}`);
  useEffect(() => {
    if (last_tweet) {
      setTweetsLoading(false);
    }
  }, [last_tweet]);
  console.log(last_tweet);
  return (
    <section className="homepage__Reviews">
      <div className="heading__number">
        <h3 className="tw-text-blue-900">04</h3>
      </div>
      <div className="container">
        <h2 className="heading__title mt-5 mb-5 tw-text-blue-900">
          &lsaquo;testimonials/&rsaquo;
        </h2>
        {tweetsLoading
          && (
            <Swiper containerClass="skelton-container" wrapperClass="skelton-wrapper" slidesPerView={skeltonCount()} {...params} grabCursor>
              {
              Array.apply(0, Array(skeltonCount())).map(() => (<TweetSkeltonLoader />))
              }
            </Swiper>
          )}

        <Swiper {...params}>
          { data.map((tweet) => (
            <div className="item tweet__card" id={`tweet-${tweet.tweetId}`} key={tweet.tweetId}>
              <div className="card card__container homepage__comment">
                <TweetEmbed
                  tweetId={tweet.tweetId}
                  options={tweet.options}
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
