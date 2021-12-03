import React, { Component } from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

class CodeCamp extends Component {
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
      <section id="codecamp" className="about-one ">
        <img
          src="assets/images/circle-stripe.png"
          className="about-one__circle"
          alt=""
        />
        <div className="container text-center">
          <div className="block-title text-center">
            <h2 className="block-title__title">
              Minority
              <br />
              CodeCamp
            </h2>
          </div>
          <div className="about-one__img">
            <div className="row">
              <div className="col-lg-6">
                <img
                  src="assets/images/kushtv.jpg"
                  width="570px"
                  height="298px"
                  alt=""
                />
              </div>
              <div className="col-lg-6">
                <img
                  src="assets/images/mcweadon.png"
                  width="570px"
                  height="298px"
                  alt=""
                />
              </div>
            </div>
            <div className="about-one__review">
              <p className="about-one__review-count counter">
                <VisibilitySensor
                  onChange={this.onVisibilityChange}
                  offset={{ top: 10 }}
                  delayedCall
                >
                  <CountUp end={this.state.startCounter ? 126 : 0} />
                </VisibilitySensor>
              </p>
              <div className="about-one__review-stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="about-one__review-text">students love us</p>
            </div>
          </div>
          <p className="about-one__text">
            At our world class Minority Code Camp we teach leading industry
            skills (Web Dev, Blockchain, AI, Full Stack, etc) in a 12 week
            intensive coding bootcamp, which will help place you in a job upon
            completion.
          </p>
          <a href="#mpu" className="thm-btn about-one__btn">
            Start Learning Now
          </a>
        </div>
      </section>
    );
  }
}

export default CodeCamp;
