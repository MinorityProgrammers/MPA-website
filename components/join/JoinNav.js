import React from 'react';

function JoinCard(props) {

    return (
        <div class="join-nav-container align-items-center;
        justify-content-center">
            <a href="/" class="logo d-flex">
                <img src="./assets/images/login-signup/mp-icon.png" alt="" />  <span>Minority Programmers<br /> Association</span></a>
            <div class="join-nav-container-right">
                <a href="/learn-page">LEARN</a>
                <a href="/incubator">INCUBATOR</a>
                <a href="/mentorshipProgram">MENTORSHIP</a>
                <a href="/events">EVENTS</a>
                <a href="/careers">CAREERS</a>
                <a href="consultancy_explainer">CONSULTANCY</a>
                <a class="active" href="/join">JOIN</a>
            </div>
        </div>
    )
};

export default JoinCard;