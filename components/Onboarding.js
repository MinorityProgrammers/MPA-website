import React from 'react';

const Onboarding = () => {
    return (
        <section id="onboarding" className="pricing-one pricing-page ">
            <div className="container">
                <div className="block-title text-center">
                    <h2 className="block-title__title">We recruit diverse talent, train and onboard them for your company</h2>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="pricing-one__single">
                            <div className="pricing-one__inner">
                                <h2 className="pricing-one__price">Recruit </h2>
                                <p className="pricing-one__name">Across global chapters</p>
                                <ul className="pricing-one__list list-unstyled">
                                    <li>School students</li>
                                    <li>University graduates</li>
                                    <li>Professional networks</li>
                                    <li>Worldwide chapters</li>
                                </ul>
                                {/* <a href="#" className="thm-btn pricing-one__btn">Recruit Today</a> */}
                                <p className="pricing-one__tag-line">A pipeline to skilled IT workers</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="pricing-one__single">
                            <div className="pricing-one__inner">
                                <h2 className="pricing-one__price">Train </h2>
                                <p className="pricing-one__name">through specialized, hands-on skills training</p>
                                <ul className="pricing-one__list list-unstyled">
                                    <li>Highly ranked CodeCamp</li>
                                    <li>Skills Based Courses</li>
                                    <li>Project-Based Learning</li>
                                </ul>
                                {/* <a href="#" className="thm-btn pricing-one__btn">Train Today</a> */}
                                <p className="pricing-one__tag-line">Train with passionate developers in a diverse community</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="pricing-one__single">
                            <div className="pricing-one__inner">
                                <h2 className="pricing-one__price">Onboard </h2>
                                <p className="pricing-one__name">We specialize in onboarding for corporations</p>
                                <ul className="pricing-one__list list-unstyled">
                                    <li>Specialized Training</li>
                                    <li>Corporate Sponsorship</li>
                                    <li>Diverse Talent</li>
                                </ul>
                                {/* <a href="#" className="thm-btn pricing-one__btn">Save Today</a> */}
                                <p className="pricing-one__tag-line">We equip our developers with skills that fit right into your company!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Onboarding;
