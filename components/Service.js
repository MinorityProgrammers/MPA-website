import React, { useState } from "react";

const Service = () => {
  const [step, setstep] = useState(0);

  const plus = () => {
    if (step < 7) {
      setstep(step + 1);
    }
  };

  const minus = () => {
    if (step > 0) {
      setstep(step - 1);
    }
  };

  const page1 = () => {
    return (
      <div className="service_container" id="title">
        <div className="service_icon">
          <span>
            <img src="/assets/images/Idea_icon.png" />
          </span>
        </div>

        <div className="service_block">
          <h1>Got any interesting project ideas?</h1>
          <h5>
            Submit any interesting project ideas you think is worth building and
            we would support you
          </h5>
          <button
            onClick={() => {
              plus();
            }}
          >
            TELL US ABOUT YOUR IDEA
          </button>
          <br />
        </div>
      </div>
    );
  };

  const page2 = () => {
    return (
      <div className="service_container">
        <div className="service_question1-1" id="first">
          <h1>Tell us about your idea</h1>
          <div className="service_sub">
            <h6 id="nomarg">Project name</h6>
            <h6>1/7</h6>
          </div>
          <input
            type="text"
            placeholder="What's the title of this project?"
            className="service_input"
          />
          <br />
          {buttons()}
        </div>
      </div>
    );
  };

  const page3 = () => {
    return (
      <div className="service_question1" id="second">
        <div className="service_sub">
          <h6>Industry</h6>
          <h6>2/7</h6>
        </div>
        <input
          type="text"
          placeholder="What industry will this project operate in?"
          className="service_input"
        />
        <br />
        {buttons()}
      </div>
    );
  };

  const page4 = () => {
    return (
      <div className="service_question1" id="third">
        <div className="service_sub">
          <h6>Funding ask</h6>
          <h6>3/7</h6>
        </div>
        <input
          type="text"
          placeholder="How much will cost to fund this project?"
          className="service_input"
        />
        <br />
        {buttons()}
      </div>
    );
  };

  const page5 = () => {
    return (
      <div className="service_question1" id="forth">
        <div className="service_sub">
          <h6>Project details</h6>
          <h6>4/7</h6>
        </div>
        <input
          type="text"
          placeholder="Tell us a little bit of this project?"
          className="service_input"
        />
        <br />
        {buttons()}
      </div>
    );
  };
  const page6 = () => {
    return (
      <div className="service_question1" id="fifth">
        <div className="service_sub">
          <h6>Size of team</h6>
          <h6>5/7</h6>
        </div>
        <input
          type="text"
          placeholder="How many people will be working on this project?"
          className="service_input"
        />
        <br />
        {buttons()}
      </div>
    );
  };

  const page7 = () => {
    return (
      <div className="service_question1" id="sixth">
        <div className="service_sub">
          <h6>Launch date</h6>
          <h6>6/7</h6>
        </div>
        <input
          type="text"
          placeholder="When are you likely to launch?"
          className="service_input"
        />
        <br />
        {buttons()}
      </div>
    );
  };
  const page8 = () => {
    return (
      <div className="service_question1" id="seventh">
        <div className="service_sub">
          <h6>Contact detail</h6>
          <h6>7/7</h6>
        </div>
        <input
          type="email"
          placeholder="What's your email address?"
          className="service_input"
        />
        <br />
        <button className="service_leftbutton" onClick={() => minus()}>
          <span>&#8592;</span>
        </button>
        <button className="service_submitbutton" onClick={() => plus()}>
          Submit
        </button>
      </div>
    );
  };

  const buttons = () => {
    return (
      <div>
        <button className="service_leftbutton" onClick={() => minus()}>
          <span>&#8592;</span>
        </button>
        <button className="service_rightbutton" onClick={() => plus()}>
          <span>&#8594;</span>
        </button>
      </div>
    );
  };

  return (
    <div className="service">
      {step == 0 && page1()}
      {step == 1 && page2()}

      <div className="service_container">
        <div className="service_question_block">
          {step == 2 && page3()}
          {step == 3 && page4()}
          {step == 4 && page5()}
          {step == 5 && page6()}
          {step == 6 && page7()}
          {step == 7 && page8()}
        </div>
      </div>
    </div>
  );
};

export default Service;
