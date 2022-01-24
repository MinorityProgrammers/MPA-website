import React from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

function HomePageAboutUs() {
  return (
    <section className="homepage__about">
      <div className="container tw-relative tw-justify-between tw-flex tw-flex-row tw-w-full tw-h-full lg:tw-flex-col-reverse">
        <div className="tw-h-full tw-min-w-full video-container tw-flex-col">
          <LiteYouTubeEmbed
            playerClass="yt-playbtn"
            activeClass="lyt-activated"
            wrapperClass="yt-lite"
            id="VZmd8EOj3UA"
            title="minority programmers introduction video"
          />
        </div>
        <div className="homepage__about-right tw-flex-col">
          <h2 className="about-us__title top__part__title">
            About Us
            <img
              src="/assets/images/home-page/about-title-icon.svg"
              alt="blockchain"
            />
          </h2>
          <p className="about-us__text tw-text-xl tw-text-white">
            We are an international network of developers unifying together to
            build socially impactful projects & spread STEM education to marginalized communitie
          </p>
        </div>
      </div>
    </section>
  );
}

export default HomePageAboutUs;
