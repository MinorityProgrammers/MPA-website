import React from 'react';

const LearnHero = function () {
<<<<<<< HEAD
=======
  function scrollToModule() {
    window.scrollTo(400, 400);
  }
>>>>>>> fbc5b618e8cceb01e3722acf7655973c4a28b5e2
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
<<<<<<< HEAD
                <div  className="button btn-gradient">
                  Enroll for Free 
=======
                <div className="button btn-gradient" onClick={() => { scrollToModule(); }}>
                  Enroll for Free
>>>>>>> fbc5b618e8cceb01e3722acf7655973c4a28b5e2
                </div>
              </div>
            </div>
            <div>
<<<<<<< HEAD
              <img src = 'assets/images/learn-page/learnHero.png'/>
=======
              <img src="assets/images/learn-page/learnHero.png" alt="" />
>>>>>>> fbc5b618e8cceb01e3722acf7655973c4a28b5e2
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

<<<<<<< HEAD
export default LearnHero;
=======
export default LearnHero;
>>>>>>> fbc5b618e8cceb01e3722acf7655973c4a28b5e2
