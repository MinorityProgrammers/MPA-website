import React, { useCallback, useEffect, useState } from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';

const HomepageTestimonials = () => {
  const TestimonialsCollection = [
    {
      id: 1,
      name: 'Bryanna Turman',
      position: 'Social Media Manager',
      quote:
        'MPA hits different. Its a whole gang of coders trying to put on for the world.',
      imgSrc: 'https://minorityprogrammers.com/assets/images/Bryanna.svg',
    },
    {
      id: 2,
      name: 'Seemaab Mujtaba',
      position: 'Software Engineer Intern',
      quote:
        'MPA is the most fun work experience I had and I always had a place to express my ideas!',
      imgSrc: 'https://minorityprogrammers.com/assets/images/Seemaab.svg',
    },
  ];

  const sponsors = [
    {
      sponsorLink: 'https://blockchainedu.org/',
      imgSrc: 'assets/images/cgi.png',
    },
    {
      sponsorLink: 'https://www.accenture.com/us-en',
      imgSrc: 'assets/images/Accenture-Logo.png',
    },
    {
      sponsorLink: 'https://www.captechconsulting.com/',
      imgSrc: 'assets/images/caotech.png',
    },
    {
      sponsorLink: 'https://enzyme.finance/',
      imgSrc: 'assets/images/enzyme-logo.png',
    },
    {
      sponsorLink: 'https://www.stellar.org/',
      imgSrc: 'assets/images/stellar-logo.png',
    },
    {
      sponsorLink: 'https://www.plutopepe.com/',
      imgSrc: 'assets/images/pluto-logo.png',
    },
    {
      sponsorLink: 'https://ripplex.io/',
      imgSrc: 'assets/images/sponsorship/sponsor9.png',
    },
    {
      sponsorLink: 'https://idle.finance/',
      imgSrc: 'assets/images/sponsorship/sponsor7.png',
    },
    {
      sponsorLink: 'https://tokamak.network/',
      imgSrc: 'assets/images/sponsorship/sponsor8.png',
    },
  ];

  const allies = [
    {
      allyLink: 'https://mason360.gmu.edu/bam/',
      imgSrc: 'assets/images/brand-1-1.png',
    },
    {
      allyLink: 'https://thelastmile.org/',
      imgSrc: 'assets/images/lastmile.png',
    },
    { allyLink: 'https://aisnet.org/', imgSrc: 'assets/images/ais.png' },
    {
      allyLink: 'https://www.blockchainedu.org/',
      imgSrc: 'assets/images/ben.png',
    },
    { allyLink: 'https://devpost.com/', imgSrc: 'assets/images/devpost.png' },
    {
      allyLink: 'https://www.blockchainacceleration.org/',
      imgSrc: 'assets/images/baf-logo.png',
    },
    { allyLink: 'https://www.jmu.edu/', imgSrc: 'assets/images/jmucs.png' },
    {
      allyLink: 'https://www.echelondigital.com/',
      imgSrc: 'assets/images/echelon-logo.png',
    },
    {
      allyLink: 'https://montech.io/',
      imgSrc: 'assets/images/sponsorship/sponsor10.png',
    },
    {
      allyLink: 'https://jmuxlabs.org/',
      imgSrc: 'assets/images/sponsorship/sponsor11.png',
    },
    {
      allyLink: 'https://www.learnacademy.org/',
      imgSrc: 'assets/images/sponsorship/sponsorlearn.svg',
    },
    {
      allyLink: 'https://algorand.foundation/',
      imgSrc: 'assets/images/sponsorship/sponsor13.png',
    },
    {
      allyLink: 'https://entethalliance.org/',
      imgSrc: 'assets/images/sponsorship/sponsor14.png',
    },
  ];

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
        <h3 className="tw-text-blue-900">06</h3>
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
                <div className="col-lg-3 col-md-4 sponsor-col" key={index}>
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
            {TestimonialsCollection.map((t, i) => (
              <div
                className="row homepage__testimonials-container mt-3"
                key={i}
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
                <div className="col-lg-3 col-md-4 sponsor-col" key={index}>
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
