import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import React from 'react';
import TweetEmbed from './TweetEmbed';

const HomePageReviews = () => {
  const data = [
    { tweetId: '1444383109307412487' },
    { tweetId: '1431364200132190219', options: { cards: 'hidden' } },
    { tweetId: '1455675414765051905' },
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
          {data.map((tweet) => (
            <div className="item tweet__card" id={`tweet-${tweet.tweetId}`} key={tweet.tweetId}>
              <div className="card card__container homepage__comment">
                <TweetEmbed
                  tweetId={tweet.tweetId}
                  options={tweet.options}
                  onLoad={(tweetWidgetEl) => {
                    const tweetEl = tweetWidgetEl.shadowRoot.querySelector('.EmbeddedTweet');
                    tweetEl.style.margin = 'auto';
                  }}
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
