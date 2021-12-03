import React from 'react';

const Mentorship = () => {
    return (
        <div id="mentoring" className="cta-two">
            <div className="container-fluid">
                <div className="row no-gutters">
                <div className="col-lg-6 thm-base-bg">
                        <div className="cta-two__single">
                            <div className="cta-two__icon">
                                <span><i className="kipso-icon-professor"></i></span>
                            </div>
                            <div className="cta-two__content">
                                <h2 className="cta-two__title">Become a Mentor</h2>
                                <p className="cta-two__text">Help aspiring programmers in their career path.</p>
                                <a href="https://discord.gg/zGBrEd7UCn" target="_blank" className="thm-btn cta-two__btn">Sign Up</a>
                            </div>
                        </div>
                    </div>
                <div className="col-lg-6 thm-base-bg-2">
                        <div className="cta-two__single">
                            <div className="cta-two__icon">
                                <span><i className="kipso-icon-training"></i></span>
                            </div>
                            <div className="cta-two__content">
                                <h2 className="cta-two__title">Become a Mentee</h2>
                                <p className="cta-two__text">Get guidance from a MinorityProgrammer in your career.</p>
                                <a href="https://discord.gg/zGBrEd7UCn" target="_blank" className="thm-btn cta-two__btn">Sign Up</a>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Mentorship;
