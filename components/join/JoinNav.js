import React from 'react';

const JoinCard =  () =>(
    <div className="join-nav-container align-items-center;
        justify-content-center"
    >
      <a href="/" className="logo d-flex">
        <img src="./assets/images/login-signup/mp-icon.png" alt="" />
        
        <span>
          Minority Programmers
          <br />
          
          Association
        </span>
      </a>
      <div className="join-nav-container-right">
        <a href="/learn">LEARN</a>
        <a href="/incubator">INCUBATOR</a>
        <a href="/mentorshipProgram">MENTORSHIP</a>
        <a href="/events">EVENTS</a>
        <a href="/careers">CAREERS</a>
        <a href="consultancy_explainer">CONSULTANCY</a>
        <a className="active" href="/join">JOIN</a>
      </div>
    </div>
  );
};

export default JoinCard;
