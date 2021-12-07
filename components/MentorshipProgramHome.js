import React, {
  useEffect, useContext, useRef, useState,
} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDetectOutsideClick } from './UseDetectOutsideClick';
import HomepageNavLogin from './HomepageNavLogin';
import Card from './login-signup/card';
import { GlobalContext } from '../contexts/provider';

const MentorshipProgramHome = function ({
  data,
  onCloseMobileMenu,
  active,
  clickRegister,
  setClickRegister,
}) {
  const router = useRouter();

  // const {
  //     authDispatch,
  //     authState: {
  //         auth: { loading, error, data },
  //     },
  // } = useContext(GlobalContext)
  // console.log('data is here: ', data);

  const [click, setClick] = useState(false);
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);

  return (
    <section>
      <div className="container">
        <div className="login__reg flex d-flex justify-content-end mb-5 mt-2 pr-5">
          <div>
            {data === null ? (
              <a
                onClick={() => {
                  setClickRegister(true);
                }}
                className="btn mentorshipBTN"
              >
                Register
              </a>
            ) : (
              ' '
            )}
          </div>
        </div>

        <div className="signup__program">
          <div className="row">
            <div className="col-lg-4">
              <div className="mentorship__SUP">
                <img
                  className="mentorship__SUPIMG"
                  src="/assets/images/mentorSUP1.png"
                  alt="mentorSUP"
                />
              </div>
              <div className="msnum">
                <img
                  className="msnumIMG"
                  src="/assets/images/num1.png"
                  alt="num1"
                />
              </div>
            </div>
            <div className="col-lg-8 d-flex align-items-center mshipProgram__w_list">
              <ul className="">
                <h1> - Sign Up Program</h1>
                <li>
                  {' '}
                  - REGISTER for a Minority Programmers Association account.
                </li>
                <li>
                  {' '}
                  - SIGN UP, have access to training and growth opportunities.
                </li>
                <li>
                  {' '}
                  - Being part of the Mentorship Program offers guidance to
                  SUCCESS
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* start matching */}
        <div className="start__matching">
          <div className="row">
            <div className="col-lg-8 d-flex align-items-center mshipProgram__b_list">
              <ul className="">
                <h1>Start Matching</h1>
                <li> - Tell us about your GOALS and needs.</li>
                <li>
                  {' '}
                  - CHOOSE from the mentoring suggestions made by machine
                  learning.
                </li>
                <li>
                  {' '}
                  - Choose a mentorship track & start CHAT with your match.
                  {' '}
                </li>
              </ul>
            </div>
            <div className="col-lg-4">
              <div className="mentorship__SUP">
                <img
                  className="mentorship__SUPIMG"
                  src="/assets/images/mentorSUP2.png"
                  alt="mentorSUP"
                />
              </div>
              <div className="msnum">
                <img
                  className="msnumIMG"
                  src="/assets/images/num2.png"
                  alt="num1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* start Program */}
        <div className="signup__program">
          <div className="row">
            <div className="col-lg-4">
              <div className="mentorship__SUP">
                <img
                  className="mentorship__SUPIMG"
                  src="/assets/images/mentorSUP3.png"
                  alt="mentorSUP"
                />
              </div>
              <div className="msnum">
                <img
                  className="msnumIMG"
                  src="/assets/images/num3.png"
                  alt="num1"
                />
              </div>
            </div>
            <div className="col-lg-8 d-flex align-items-center mshipProgram__w_list">
              <ul className="">
                <h1>Start Program</h1>
                <li>
                  {' '}
                  - Define ACTIVITIES and schedule with your mentor or mentee
                </li>
                <li> - You can use the LEARNING resources</li>
                <li> - COUNSELING one - one</li>
              </ul>
            </div>
          </div>
        </div>

        {/* gain */}
        <div className="start__matching">
          <div className="row">
            <div className="col-lg-8 d-flex align-items-center mshipProgram__b_list">
              <ul className="">
                <h1>Gain $MINORITY</h1>

                <li>
                  {' '}
                  - Mentor and mentee will receive REWARDS based on successful
                  homework completion.
                </li>
                <li>
                  {' '}
                  - An evaluation will be carried out by both parties on the
                  COMMITMENT of their counterparts, during and after the task.
                </li>
                <li> - Earn $MINORITY tokens for completing tasks.</li>
              </ul>
            </div>
            <div className="col-lg-4">
              <div className="mentorship__SUP">
                <img
                  className="mentorship__SUPIMG"
                  src="/assets/images/mentorSUP4.png"
                  alt="mentorSUP"
                />
              </div>
              <div className="msnum">
                <img
                  className="msnumIMG"
                  src="/assets/images/num4.png"
                  alt="num1"
                />
              </div>
            </div>
          </div>
        </div>

        {/*  */}
        {data === null ? (
          <div>
            <div className="mentor__mentee mt-5">
              <div className="row">
                <div className="col-lg-6 d-flex justify-content-center">
                  <button
                    onClick={() => {
                      setClickRegister(true);
                    }}
                    className="btn mentorshipBTN btn-block mb-2"
                  >
                    Be a Mentor
                  </button>
                </div>
                <div className="col-lg-6 d-flex justify-content-center">
                  <button
                    onClick={() => {
                      setClickRegister(true);
                    }}
                    className="btn mentorshipBTN btn-block mb-2"
                  >
                    Be a Mentee
                  </button>
                </div>
              </div>
            </div>
            <div className="mentorshipP__login d-flex justify-content-center mt-4">
              <li className="text-light font-weight-bold h4">
                <a
                  onClick={() => {
                    setClickRegister(true);
                  }}
                  className="text-light hover:tw-text-white font-weight-bold h4 tw-cursor-pointer"
                >
                  Register
                </a>
              </li>
            </div>
            <div className="d-flex justify-content-center mt-4 mb-5">
              <p className="text-light">
                You Must Be Logged Into MPA for Mentorship Program
              </p>
            </div>
          </div>
        ) : (
          <div className="mentorshipP__login d-flex justify-content-center mt-4 mb-5">
            <Link href="/mentorship">
              <button className="font-weight-bold h3 myButton mb-5">
                Get Started
              </button>
            </Link>
          </div>
        )}

        {clickRegister && active ? (
          <div className="create_event">
            <div
              className="create_event-shadow"
              onClick={() => {
                setClickRegister(false);
              }}
            />
            <div id="create_event-container" className="create_event-container">
              <Card />
            </div>
            <i
              className="close_icon fas fa-times close-icon"
              onClick={() => {
                setClickRegister(false);
              }}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    </section>
  );
};

export default MentorshipProgramHome;
