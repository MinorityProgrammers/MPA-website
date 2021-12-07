import React from 'react';

const Educational = function () {
  return (
    <div id="education" className="cta-two">
      <div className="container-fluid">
        <div className="row no-gutters">
          <div className="col-lg-6 thm-base-bg">
            <div className="cta-two__single">
              <div className="cta-two__icon">
                <span>
                  <i className="kipso-icon-professor" />
                </span>
              </div>
              <div className="cta-two__content">
                <h2 className="cta-two__title">Mentorship Program</h2>
                <p className="cta-two__text">
                  We develop courses, educate and help guide those intersted in
                  programming.
                  {' '}
                  <br />
                  Stay in touch with a mentor thorughout your journey.
                </p>
                <a
                  href="https://discord.gg/zGBrEd7UCn"
                  target="_blank"
                  className="thm-btn cta-two__btn"
                  rel="noreferrer"
                >
                  Volunteer Today
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-6 thm-base-bg-2">
            <div className="cta-two__single">
              <div className="cta-two__icon">
                <span>
                  <i className="kipso-icon-knowledge" />
                </span>
              </div>
              <div className="cta-two__content">
                <h2 className="cta-two__title">Education Programs</h2>
                <p className="cta-two__text">
                  From CodeCamps, and skills based training.
                  <br />
                  The Minority Programmers pedagogy is to continously learn.
                </p>
                <a href="/learn" className="thm-btn cta-two__btn">
                  Start Learning
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Educational;
