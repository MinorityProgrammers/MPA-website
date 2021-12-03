import React, { Component } from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

export default class MembersWorldwide extends Component {
  constructor() {
    super();
    this.state = {
      startCounter: false,
    };
  }

  onVisibilityChange = (isVisible) => {
    if (isVisible) {
      this.setState({ startCounter: true });
    }
  };

  render() {
    return (
      <section id="about-two" className="about-two">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="about-two__content">
                <div className="block-title text-left">
                  <h2 className="block-title__title">
                    An international <br /> network of programmers
                  </h2>
                </div>
                <p className="about-two__text">
                  {" "}
                  Teaching, mentoring, learning STEM education
                </p>
                <div className="about-two__single-wrap">
                  <div className="about-two__single">
                    <div className="about-two__single-icon">
                      <i className="kipso-icon-web-programming"></i>
                    </div>
                    <div className="about-two__single-content">
                      <p className="about-two__single-text">
                        Learn to code
                      </p>
                    </div>
                  </div>
                  <div className="about-two__single">
                    <div className="about-two__single-icon">
                      <i className="kipso-icon-knowledge"></i>
                    </div>
                    <div className="about-two__single-content">
                      <p className="about-two__single-text">
                        Grow your skills
                      </p>
                    </div>
                  </div>
                </div>
                <a href="/join" className="thm-btn">
                  Grow Today
                </a>
              </div>
            </div>
            <div className="col-xl-6 d-flex justify-content-xl-end justify-content-sm-center">
              <div className="about-two__image">
                <span className="about-two__image-dots"></span>
                <img src="/assets/images/about-1-1.jpg" alt="" />
                <div className="about-two__count">
                  <div className="about-two__count-text">
                    Members Worldwide
                    <span className="counter">
                      <VisibilitySensor
                        onChange={this.onVisibilityChange}
                        offset={{ top: 10 }}
                        delayedCall
                      >
                        <CountUp end={this.state.startCounter ? 723 : 0} />
                      </VisibilitySensor>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
