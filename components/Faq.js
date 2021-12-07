import React from 'react';

const Faq = function () {
  return (
    <section className="faq-one">
      <div className="container">
        <div className="row no-gutters">
          <div className="col-lg-6">
            <div className="faq-one__single">
              <div className="faq-one__icon">
                <span>?</span>
              </div>
              <div className="faq-one__content">
                <h2 className="faq-one__title">
                  Can I join MPA even if I am not a minority?
                </h2>
                <p className="faq-one__text">Yes, we welcome everyone.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="faq-one__single">
              <div className="faq-one__icon">
                <span>?</span>
              </div>
              <div className="faq-one__content">
                <h2 className="faq-one__title">
                  What is the easiest way to get involved?
                </h2>
                <p className="faq-one__text">
                  By signing up for our educational programs, events, or filling
                  out your information which we store in our programmers
                  database.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="faq-one__single">
              <div className="faq-one__icon">
                <span>?</span>
              </div>
              <div className="faq-one__content">
                <h2 className="faq-one__title">How should I learn to code?</h2>
                <p className="faq-one__text">
                  By signing up for our MinorityCodeCamp or taking one of our
                  modules at MinorityProgrammersUniversity.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="faq-one__single">
              <div className="faq-one__icon">
                <span>?</span>
              </div>
              <div className="faq-one__content">
                <h2 className="faq-one__title">What if I am not a student?</h2>
                <p className="faq-one__text">
                  Everyone is welcome to join and help in spreading STEM
                  education to underrepresented communities.
                </p>
              </div>
            </div>
          </div>
          <div
            className="col-lg-6"
            style={{ paddingBottom: '0px', borderBottom: '0px none' }}
          >
            <div className="faq-one__single">
              <div className="faq-one__icon">
                <span>?</span>
              </div>
              <div className="faq-one__content">
                <h2 className="faq-one__title">How can I contribute?</h2>
                <p className="faq-one__text">
                  Join an existing course, or start your own. You can include
                  your own events, content, and teach students. Build your MP
                  Community by reaching out to corporates and sponsors.
                </p>
              </div>
            </div>
          </div>
          <div
            className="col-lg-6"
            style={{ paddingBottom: '0px', borderBottom: '0px none' }}
          >
            <div className="faq-one__single">
              <div className="faq-one__icon">
                <span>?</span>
              </div>
              <div className="faq-one__content">
                <h2 className="faq-one__title">What if I don't code?</h2>
                <p className="faq-one__text">
                  You can still join, collaborate and submit your ideas. Whether
                  your a lawyer, doctor, graphic designer, or a teacher, etc,
                  everyone is welcome. Other Minority Organizations are
                  available for those not interested in programming.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
