import React, { Component } from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

class DiversityTraining extends Component {
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
      <section id="training" className="cta-six thm-gray-bg">
        <img
          src="/assets/images/line-stripe-2.png"
          className="cta-six__line"
          alt=""
        />
        <div className="container-fluid clearfix">
          <div className="cta-six__left">
            <div className="cta-six__content">
              <div className="block-title text-left">
                <h2 className="block-title__title">
                  Diversity+Inclusion For Your Business
                </h2>
              </div>
              <img
                src="assets/images/inner-bg-1-1.jpg"
                width="580px"
                height="314px"
                alt=""
              />
            </div>
          </div>
          <div className="cta-six__right">
            <img
              src="/assets/images/computer2.jpg"
              className="h-screen"
              width="832px"
              height="607px"
              alt=""
            />
            <h2 className="cta-six__title">
              More than{" "}
              <span className="counter">
                <VisibilitySensor
                  onChange={this.onVisibilityChange}
                  delayedCall
                >
                  <CountUp end={this.state.startCounter ? 9 : 0} />
                </VisibilitySensor>
              </span>{" "}
              Companies trained
            </h2>
          </div>
        </div>
      </section>
    );
  }
}

export default DiversityTraining;
