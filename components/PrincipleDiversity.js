import React from 'react';

const PrincipleDiversity = () => {
    return (
        <section>
            <img src="assets/images/circle-stripe-1.png" className="cta-four__stripe" alt="" />
            <img src="assets/images/line-stripe-1.png" className="cta-four__line" alt="" />
            <div className="container text-center">
                        <div className="diversity-title">
                            <br />
                    <h2 className="block-title__title">Diversity in STEM</h2>
                </div>
            <section id="training" className="cta-six thm-gray-bg">
                <img src="/assets/images/line-stripe-2.png" className="cta-six__line" alt="" />
                    <div className="container-fluid clearfix">
                        <div className="cta-six__left">
                            <div className="cta-six__content">
                                <img src="assets/images/diversity-stem.jpg" width="580px" height="314px" alt="" />
                            </div>
                        </div>
                        <div className="cta-six__right">
                            <img src="/assets/images/diversity-stem-2.jpg" width="580px" height="500px" alt="" />
                        </div>
                    </div>
            </section>
            </div>        
        
            <section
      className="diversity-one__home-one"
      style={{ backgroundImage: `url(assets/images/consult.jpg)` }}
    >
      <div className="container">
        <h2 className="diversity-statement__text">
          Here at Minority Programmers, diversity is our primary focus. It does not matter what race and ethncitiy you belong to. We believe eveyrone should have an
          equal opportunity in learning STEM. When you enroll, Minority Programmer will fit you right in amongst our diversed background of students.
        </h2>
      </div>
               <section id="training" className="cta-six thm-gray-bg">
                <img src="/assets/images/line-stripe-2.png" className="cta-six__line" alt="" />
                    <div className="container-fluid clearfix">
                        <div className="cta-six__left">
                            <div className="cta-six__content">
                                <img src="assets/images/globe.jpg" width="580px" height="400px" alt="globe" />
                            </div>
                        </div>
                        <div className="cta-six__right">
                        <h2 className="global-statement__text">
                            We have a global network of STEM learning consisting of different countries throughout the world. Countries such as Nigeria, China, and Ukraine. Be the first to join from your country today.
                            </h2>
                        </div>
                    </div>
            </section>
            <div class="container text-center"><h2 class="cta-five__title">Join the International Network Today</h2><p class="cta-five__text">Only network where you feel like family and get the opportunity to support yours through STEM</p><a href="/auth" class="thm-btn cta-five__btn">Join Today</a></div>
    </section>
    </section>
        
    );
};

export default PrincipleDiversity;
