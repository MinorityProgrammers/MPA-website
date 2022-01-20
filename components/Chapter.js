import React from 'react';

const Chapter = () => (
  <div id="chapter" className="cta-two">
    <div className="container-fluid">
      <div className="row no-gutters">
        <div className="col-lg-6 thm-base-bg-2">
          <div className="cta-two__single">
            <div className="cta-two__icon">
              <span>
                <i className="kipso-icon-placeholder" />
              </span>
            </div>
            <div className="cta-two__content">
              <h2 className="cta-two__title">Join a Course</h2>
              <p className="cta-two__text">
                Join an existing Minority Programmers course in your school,
                state, or country.
              </p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdmfHMGP4dS6_90RuzpenDkif7casdzLerA5pQtS_qvS9BqLQ/viewform?embedded=true"
                target="_blank"
                className="thm-btn cta-two__btn"
                rel="noreferrer"
              >
                Find a Course
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-6 thm-base-bg">
          <div className="cta-two__single">
            <div className="cta-two__icon">
              <span>
                <i className="kipso-icon-human-resources" />
              </span>
            </div>
            <div className="cta-two__content">
              <h2 className="cta-two__title">Start Your Own Course</h2>
              <p className="cta-two__text">
                Can&apos;t find a course to join in your area? Make your own and
                represent MPA as a community leader!
              </p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdmfHMGP4dS6_90RuzpenDkif7casdzLerA5pQtS_qvS9BqLQ/viewform?embedded=true"
                target="_blank"
                className="thm-btn cta-two__btn"
                rel="noreferrer"
              >
                Next Steps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Chapter;
