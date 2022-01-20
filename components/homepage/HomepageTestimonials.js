import React, { useCallback, useEffect, useState } from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import { allies, sponsors, TestimonialsCollection } from './testimonialSectionData';

const HomepageTestimonials = () => {
  const [swiper, setSwiper] = useState(null);
  const [currentIndex, updateCurrentIndex] = useState(0);

  const updateIndex = useCallback(
    () => updateCurrentIndex(swiper.realIndex),
    [swiper],
  );

  const goNext = () => {
    updateIndex();
    swiper.slideNext();
  };

  const goPrev = () => {
    swiper.slidePrev();
    updateIndex();
  };

  useEffect(() => {
    if (swiper !== null) {
      swiper.on('slideChange', updateIndex);
    }

    return () => {
      if (swiper !== null) {
        swiper.off('slideChange', updateIndex);
      }
    };
  }, [swiper, updateIndex]);

  const params = {
    loop: true,
    speed: 500,
    allowTouchMove: true,
  };

  return (
    <section className="homepage__testimonials">
      <div className="heading__number">
        <h3 className="tw-text-blue-900">03</h3>
      </div>
      <div className="container">
        <div className="heading__title-container">
          <h2
            className={
              currentIndex === 0
                ? 'sponsor__title tw-text-blue-900'
                : 'sponsor__title heading-clicked'
            }
          >
            &lsaquo;Past_sponsors/&rsaquo;
          </h2>
          <h2
            className={
              currentIndex === 1
                ? 'sponsor__title tw-text-blue-900'
                : 'sponsor__title heading-clicked'
            }
          >
            &lsaquo;Testimonials/&rsaquo;
          </h2>
          <h2
            className={
              currentIndex === 2
                ? 'sponsor__title tw-text-blue-900'
                : 'sponsor__title heading-clicked'
            }
          >
            &lsaquo;Allies/&rsaquo;
          </h2>
        </div>

        <Swiper {...params} getSwiper={setSwiper}>
          {/* Sponsor */}
          <div className="container" style={{ margin: '-3rem 0 0 0' }}>
            <div className="row homepage__testimonials-sponsor">
              {sponsors.map((sponsor, index) => (
                <div className="col-lg-3 col-md-4 sponsor-col" key={`${`sponsor${index}`}`}>
                  <a
                    href={sponsor.sponsorLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="item sponsor-item">
                      <img
                        src={sponsor.imgSrc}
                        width="200px"
                        alt={sponsor.sponsorLink}
                      />
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="container">
            {TestimonialsCollection.map((t) => (
              <div
                className="row homepage__testimonials-container mt-3"
                key={t.name}
              >
                <div className="homepage__testimonials-left m-2">
                  <img src={t.imgSrc} className="rounded-circle" alt={t.name} />
                </div>
                <div className="homepage__testimonials-right m-4">
                  <h4>{t.quote}</h4>
                  <p className="overline">
                    {t.name}
                    ,
                    {t.position}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Ally */}
          <div className="container" style={{ margin: '-3rem 0 0 0' }}>
            <div className="row homepage__testimonials-sponsor">
              {allies.map((ally, index) => (
                <div className="col-lg-3 col-md-4 sponsor-col" key={`${`ally${index}`}`}>
                  <a href={ally.allyLink} target="_blank" rel="noreferrer">
                    <div className="item sponsor-item">
                      <img
                        src={ally.imgSrc}
                        width="200px"
                        alt={ally.allyLink}
                      />
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </Swiper>
      </div>
      <div className="homepage-carousel-btn">
        <div
          onClick={goPrev}
          className="homepage-carousel-btn__left-btn banner-arrow"
        >
          <i className="fas fa-arrow-left" />
        </div>
        <div
          onClick={goNext}
          className="homepage-carousel-btn__right-btn banner-arrow"
        >
          <i className="fas fa-arrow-right" />
        </div>
      </div>
    </section>
  );
};

export default HomepageTestimonials;
