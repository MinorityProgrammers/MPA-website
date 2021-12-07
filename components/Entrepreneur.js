import React from 'react';
import Program from './Program';

const Entrepreneur = function () {
  return (
    <section id="onboarding" className="pricing-one pricing-page ">
      <div className="container">
        <div className="block-title text-center">
          <h2 className="block-title__title">
            From idea to unicorn, we teach minorities to be world leaders in
            tech
          </h2>
        </div>
        <div className="row">
          <Program
            imgLink="/assets/images/mtt.png"
            link="https://www.minoritythinktank.org"
            description="12 week intensive research fellowship with world class scholars, intellectuals, policy makers, researchers, and innovators."
          />
          <Program
            imgLink="/assets/images/mincubator.png"
            link="https://www.minoritythinktank.org"
            description="12 week intensive program for budding entreprenuers from ideation, to development of MVP. With world class business mentors, branding, development, marketing, and sales teams"
          />
          <Program
            imgLink="/assets/images/ma.png"
            link="https://www.minorityaccelerator.com"
            description="Scale your startup, learn to run a world class business, onboard skilled employees, and find investors who care"
          />
          <Program
            imgLink="/assets/images/mvc.png"
            link="https://www.minorityventure.com"
            description="Building diverse businesses through mentorship and access to capital"
          />
        </div>
      </div>
    </section>
  );
};

export default Entrepreneur;
