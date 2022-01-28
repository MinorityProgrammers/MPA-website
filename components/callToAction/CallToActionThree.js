import React from 'react';

const CallToActionThree = () => (
  <section className="cta-three">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 clearfix">
          <img
            src="/assets/images/cta-1.jpg"
            height="600px"
            className="cta-three__image"
            alt=""
          />
        </div>
        <div className="col-lg-6">
          <div className="cta-three__content">
            <div className="block-title text-left">
              <h2 className="block-title__title">Our Services</h2>
            </div>
            <p className="cta-three__text">
              We mentor, teach, train, and develop opportunities for
              underrepresented communities
            </p>
            <div className="cta-three__single-wrap">
              <div className="cta-three__single">
                <i className="kipso-icon-strategy" />
                <p className="cta-three__single-text">
                  Professional Courses
                </p>
              </div>
              <div className="cta-three__single">
                <i className="kipso-icon-human-resources" />
                <p className="cta-three__single-text">Expert Teachers</p>
              </div>
              <div className="cta-three__single">
                <i className="kipso-icon-training" />
                <p className="cta-three__single-text">
                  Onboarding/Training
                </p>
              </div>
            </div>
            <a href="/services" className="thm-btn">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CallToActionThree;
