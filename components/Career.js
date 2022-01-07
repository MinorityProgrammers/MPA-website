import React from 'react';

const Career = () => (
  <section
    id="careers"
    className="cta-one cta-one__home-one"
    style={{ backgroundImage: 'url(assets/images/career.jpg)' }}
  >
    <div className="container">
      <h2 className="cta-one__title">Get A Job At MPA Today</h2>
      <div className="cta-one__btn-block">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSdmfHMGP4dS6_90RuzpenDkif7casdzLerA5pQtS_qvS9BqLQ/viewform?embedded=true"
          target="_blank"
          className="thm-btn cta-one__btn"
          rel="noreferrer"
        >
          Search Careers
        </a>
      </div>
    </div>
  </section>
);

export default Career;
