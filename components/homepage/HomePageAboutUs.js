import React from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

function HomePageAboutUs() {
  return (
    <section className="homepage__about tw-relative tw-overflow-x-clip">
      <div className="homepage__abou-bg"><img src="/assets/images/home-page/about-us-bg.svg" alt="about-us bg" /></div>
      <div className="container tw-relative tw-w-full tw-h-full">
        <div className="about-container row">
          <div className="tw-h-full col-lg-8 col-md-12  video-container tw-flex-col">
            <LiteYouTubeEmbed
              playerClass="yt-playbtn"
              activeClass="lyt-activated"
              wrapperClass="yt-lite"
              id="VZmd8EOj3UA"
              title="minority programmers introduction video"
            />
          </div>
          <div className="homepage__about-right col-lg-4 col-md-12 tw-flex-col">
            <h2 className="about-us__title top__part__title">
              About Us
              <img
                src="/assets/images/home-page/about-title-icon.svg"
                alt="blockchain"
              />
            </h2>
            <p className="about-us__text tw-text-xl tw-text-white md:tw-text-base">
              We are an international network of developers unifying together to
              build socially impactful projects & spread STEM education to marginalized communitie
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePageAboutUs;
