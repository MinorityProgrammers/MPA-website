import React from 'react';

const PrincipleSoftware = () => (
  <section>
    <img
      src="assets/images/circle-stripe-1.png"
      className="cta-four__stripe"
      alt=""
    />
    <img
      src="assets/images/line-stripe-1.png"
      className="cta-four__line"
      alt=""
    />
    <div className="container text-center">
      <div className="diversity-title">
        <br />
        <h2 className="block-title__title">Software Engineer</h2>
      </div>
      <section id="training" className="cta-six thm-gray-bg">
        <div className="container-fluid clearfix">
          <div className="cta-six__left">
            <div className="cta-six__content">
              <img
                src="assets/images/software-engineer-1.jpg"
                width="580px"
                height="380px"
                alt=""
              />
            </div>
          </div>
          <div className="cta-six__right">
            <img
              src="/assets/images/software-engineer-2.jpg"
              width="580px"
              height="500px"
              alt=""
            />
          </div>
        </div>
      </section>
    </div>

    <section
      className="cta-one__home-one"
      style={{ backgroundImage: 'url(assets/images/consult.jpg)' }}
    >
      <div className="container">
        <h2 className="diversity-statement__text">
          Minority Programmers specializes in emerging technologies. Our
          Software Engineers curriculum is full of courseware and experienced
          instructors who will mentor you throughout your journey.
        </h2>
      </div>
      <section id="training" className="cta-six thm-gray-bg">
        <div className="container-fluid clearfix">
          <div className="cta-six__left">
            <div className="cta-six__content">
              <img
                src="assets/images/software-engineer-3.jpg"
                width="580px"
                height="400px"
                alt="globe"
              />
            </div>
          </div>
          <div className="cta-six__right">
            <h2 className="global-statement__text">
              We offer a Code-Camp that will further enhance your education in
              software eingeering where you will learn about the latest
              tech-stack..
            </h2>
          </div>
        </div>
      </section>
      <div className="container text-center">
        <h2 className="cta-five__title">
          Join the International Network Today
        </h2>
        <p className="cta-five__text">
          Only network where you feel like family and get the opportunity to
          support yours through STEM
        </p>
        <a href="/auth" className="thm-btn banner-two__btn">
          Join Today
        </a>
      </div>
    </section>
  </section>
);

export default PrincipleSoftware;
