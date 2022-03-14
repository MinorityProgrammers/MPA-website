import React from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

function HomePageAboutUs() {
  return (
    <section className="homepage__about tw-relative tw-overflow-x-clip">
      <div className="homepage__abou-bg">
        <img
          src="/assets/images/home-page/about-us-bg.svg"
          alt="about-us bg"
          style={{ overflow: 'hidden' }}
        />
      </div>
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
            <div>
              <h2 className="about-us__title top__part__title">
                About Us
                <img
                  src="/assets/images/home-page/about-title-icon.svg"
                  alt="bg"
                />
              </h2>
              <p className="about-us__text tw-text-xl tw-text-white md:tw-text-base">
                We are an international network of developers unifying together
                to build socially impactful projects & spread STEM education to
                marginalized communities
              </p>
            </div>
            {/* <div className='tw-flex tw-flex-row tw-justify-between about-us__num-section'>
              <div>
                <p className="about-us__text tw-text-xl tw-text-white md:tw-text-base">Interns</p>
                <h3 className='about-us__title about-us__numbers'>500+</h3>
              </div>
              <div>
                <p className="about-us__text tw-text-xl tw-text-white md:tw-text-base">Hackathons</p>
                <h3 className='about-us__title about-us__numbers'>200+</h3>
              </div>
              <div>
                <p className="about-us__text tw-text-xl tw-text-white md:tw-text-base">Courses</p>
                <h3 className='about-us__title about-us__numbers'>500+</h3>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePageAboutUs;
