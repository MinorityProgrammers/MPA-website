import React from 'react';

const ConsultancyHero = () => (
  <section className="incubator-wrapper">
    <div className="mentorshipP-header">
      <div className="container ">
        <div className="consultancyHero-container">
          <div>
            <h1 className="consultancyHero-title">Consultancy</h1>
            <p className="consultancyHero-txt">
              Get your idea turned into a complete web application ready for
              market with our transparent task-based escrow system that gives
              you as client, the control over how your product is being built.
              {' '}
            </p>
            <div className="incubator__button">
              <div className="button btn-gradient">Get Quote</div>
            </div>
          </div>
          <div>
            <img
              src="assets/images/consultancy/consultancyHero.png"
              alt="hero-img"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ConsultancyHero;
