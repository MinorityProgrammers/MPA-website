import React, {Component} from 'react';
import Countdown from 'react-countdown';

const JoinForm = () => {

    return (
        <section className="countdown-one">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="countdown-one__content">
                            <h2 className="countdown-one__title">Join the Network Today </h2>
                            <p className="countdown-one__tag-line">Join the network, learn relevant IT skills, and get work!</p>
                            <p className="countdown-one__text">Regardless of age, or background, our international network has a place for you!</p>
                            {/* <div className="countdown-one__list list-unstyled">

                                <Countdown date={Date.now() + 5000000000} />

                            </div> */}
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="become-teacher__form">
                            <div className="become-teacher__form-top">
                                <h2 className="become-teacher__form-title">
                                    Join MPA
                                </h2>
                            </div>
                            <form action="#" method="POST" className="become-teacher__form-content contact-form-validated">
                                <input type="text" placeholder="Your Name" name="full_name" />
                                <input type="text" placeholder="Email Address" name="email" />
                                <input type="text" placeholder="Phone Number" name="phone_number" />
                                <input type="text" placeholder="Experience" name="experience" />
                                <button type="submit"
                                        className="thm-btn become-teacher__form-btn">Join The Network
                                </button>
                            </form>
                            <div className="result text-center"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default JoinForm;