import React from "react";

const CallToActionOne = () => {
  return (
    <section
      className="cta-one cta-one__home-one"
      style={{ backgroundImage: `url(assets/images/cta-bg-1-1.jpg)` }}
    >
      <div className="container">
        <h2 className="cta-one__title">
          Minority Programmers empower communities through STEM education,
          entrepnuership, and job placement.
        </h2>
        <div className="cta-one__btn-block">
          <a href="#" className="thm-btn cta-one__btn">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToActionOne;
