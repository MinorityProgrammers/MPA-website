import React from 'react';

const MPU = () => {
    return (
        <section id="mpu" className="meeting-one">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="meeting-one__image">
                            <img src="/assets/images/computer.jpg" className="h-screen" alt="Awesome Image" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="meeting-one__content">
                            <div className="block-title text-left">
                                <h2 className="block-title__title">Minority Programmers<br />
                                    University</h2>
                            </div>
                            <p className="meeting-one__block-text">Our extensive online education library designed to teach students how to code.</p>
                            <div className="meeting-one__box-wrap">
                                <div className="meeting-one__box">
                                    <div className="meeting-one__bubble">I want to learn to code without going to college</div>
                                    <img src="/assets/images/sarah.jpg"  width='84px' alt="Awesome Image" />
                                    <h3 className="meeting-one__title">Sarah Khan</h3>
                                    <p className="meeting-one__text">Student</p>
                                </div>
                                <div className="meeting-one__box">
                                    <div className="meeting-one__bubble">MPU is the place for you!</div>
                                    <img src="/assets/images/shadman.jpg" width='84px' alt="Awesome Image" />
                                    <h3 className="meeting-one__title">Shadman Hossain</h3>
                                    <p className="meeting-one__text">Instructor</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MPU;
