import React from 'react';

const LearnHero = function () {
  return (
    <section className="incubator-wrapper">
      <div className="mentorshipP-header">
        <div className="container ">
          <div className="consultancyHero-container">
            <div>
              <h1 className="consultancyHero-title">
                Learn
              </h1>
              <p className="consultancyHero-txt">Learn the hottest skills in blockchain, earn NFT credentials that recruiters from the top technology companies will see through our decentralized talent sourcing system.</p>
              <div className="incubator__button">
                <div  className="button btn-gradient">
                  Enroll for Free 
                </div>
              </div>
            </div>
            <div>
              <img src = 'assets/images/learn-page/learnHero.png'/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnHero;