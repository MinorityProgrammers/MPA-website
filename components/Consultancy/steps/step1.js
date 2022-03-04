import React from 'react';

const Page1 = ({ setstep, setClickRegister, data }) => (
  <div className="service_container" id="title">
    <div className="service_icon">
      <span>
        <img src="/assets/images/Idea_icon.png" alt="service-icon" />
      </span>
    </div>
    <div className="service_block">
      <h1>Want to hire us for your project?</h1>
      <h5>
        Get The world&apos;s leading team of builders to develop your product
        with our transparent task-based escrow system
      </h5>
      <button
        type="button"
        onClick={() => {
          if (data === null) {
            // setClickRegister(true);
          } else {
            setstep(1);
          }
        }}
      >
        TELL US ABOUT YOUR IDEA
      </button>
      <br />
    </div>
  </div>
);

export default Page1;
