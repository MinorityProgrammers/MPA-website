import React, { useState } from 'react';
import Swiper from 'react-id-swiper';
import ModalVideo from 'react-modal-video';
import 'swiper/css/swiper.css';
import AboutSectionItem from './HomepageAboutSectionItem';

const HomepageAbout = () => {
  const [swiper, setSwiper] = useState(null);
  const [isOpen, setOpen] = useState(false);

  const params = {
    loop: true,
    speed: 1000,
  };

  const goNext = () => {
    swiper.slideNext();
  };

  const goPrev = () => {
    swiper.slidePrev();
  };
  return (
    <section className="homepage__about">
      <div className="heading__number">
        <h3 className="tw-text-blue-900">01</h3>
      </div>
      <div className="container">
        <Swiper {...params} getSwiper={setSwiper}>
          <span>
            <AboutSectionItem
              headingTitle="ABOUT_US"
              description="We are an international network of developers unifying together
                to build socially impactful projects &amp; spread STEM education
                to marginalized communities."
              imgSrcList={['/assets/images/globe.svg']}
              onPlayBtnClick={() => setOpen(true)}
            />
          </span>
          <span>
            <AboutSectionItem
              headingTitle="OUR_PEOPLE/"
              description="We are a place for minorities to come meet friends, gain
                guidance, and learn relevant IT skills to become a world leader
                in tech."
              imgBoxCustomClassNames="resize"
              imgSrcList={['/assets/images/about2.2.svg', '/assets/images/about2.1.svg']}
              onPlayBtnClick={() => setOpen(true)}
            />
          </span>
          <span>
            <AboutSectionItem
              headingTitle="OUR_VISION/"
              description="Complete turnkey decentralized vertical integration for scaling
                minority startups from ideation to large scale businesses using
                decentralized protocols."
              imgSrcList={['/assets/images/about4.svg']}
              onPlayBtnClick={() => setOpen(true)}
            />
          </span>
          <span>
            <AboutSectionItem
              headingTitle="FOR_COMPANIES/"
              description="We are a one-stop-shop for companies to recruit, train, and
                onboard diverse talent that cares about advancing the community
                through technology"
              imgSrcList={['/assets/images/about5.svg']}
              onPlayBtnClick={() => setOpen(true)}
            />
          </span>
          <span>
            <AboutSectionItem
              headingTitle="OUR_APP/"
              description="We are a lifelong community run platform that gives minorities
                access to opportunities via ideas, resources, mentorship,
                education, and access to capital"
              imgBoxCustomClassNames="resize"
              imgSrcList={['/assets/images/about3.svg']}
              onPlayBtnClick={() => setOpen(true)}
            />
          </span>
        </Swiper>
        <ModalVideo
          channel="youtube"
          isOpen={isOpen}
          videoId="VZmd8EOj3UA"
          onClose={() => setOpen(false)}
        />
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

export default HomepageAbout;
