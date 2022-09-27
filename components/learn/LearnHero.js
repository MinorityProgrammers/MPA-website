import React from 'react';

const LearnHero = () => {
  function scrollToModule() {
    window.scrollTo(400, 400);
  }
  return (
    <section className="incubator-wrapper">
      <div className="mentorshipP-header">
        <div className="container tw-relative">
          <div>
            <img
              src="/assets/images/bg-shadow-circle.png"
              className="tw-absolute"
              style={{ top: '10%' }}
              alt="background"
            />
          </div>
          <div className="consultancyHero-container">
            <div>
              <h1 className="consultancyHero-title">Learn</h1>
              <p className="consultancyHero-txt">
                Learn the hottest skills in software + Web3. Earn NFT
                credentials that recruiters from the top technology companies
                will see through our decentralized talent sourcing system.
              </p>
              <div className="incubator__button">
                <div
                  className="button btn-gradient"
                  onClick={() => {
                    scrollToModule();
                  }}
                >
                  Enroll for Free
                </div>
              </div>
            </div>
            <div>
              <img src="assets/images/learn-page/learnHero.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnHero;
