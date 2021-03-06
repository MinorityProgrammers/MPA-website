/* eslint-disable max-len */
import React from 'react';
import Link from 'next/link';
import Card from '../login-signup/card';

const ConsultancyHomeExplainer = ({
  data,
  active,
  clickRegister,
  setClickRegister,
}) => (
  <section>
    <div className="container">
      <div className="login__reg flex d-flex justify-content-end mb-5 mt-2 pr-5">
        <div>
          {data === null ? (
            <a
              onClick={() => {
                setClickRegister(true);
              }}
              className="btn consultancyBTN--Login tw-cursor-pointer"
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
                src="/assets/images/consultancy/1.png"
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
              <h1> Make Account</h1>
              <li> REGISTER for a Minority Programmers Association account.</li>
              <li> Go to CONSULTANCY page and submit your project idea.</li>
              <li>
                Get all the resources to BUILD a Large Scale Tech Business.
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
              <h1>Submit Your Idea</h1>
              <li>
                Submit your PROJECT PROPOSAL directly to a project manager.
              </li>
              <li>
                A MPA project manager will translate you requirements to a
                PROJECT QUOTE (budget, staffing, timeline, with a complete task
                break down and vesting schedule)
              </li>
              <li> You would be charge for a fee to project quotes. </li>
            </ul>
          </div>
          <div className="col-lg-4">
            <div className="mentorship__SUP">
              <img
                className="mentorship__SUPIMG"
                src="/assets/images/consultancy/2.png"
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
                src="/assets/images/consultancy/3.png"
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
              <h1>Approve Quote</h1>
              <li> CHECK the quote propused by the project manager</li>
              <li>
                Stake your PAYMENT in $MINORITY tokens, to be paid out
                automatically based on completion of tasks.
              </li>
              <li>
                Wait for QUALIFIED TEAM members to take your task and submit
                tasks for review.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="start__matching">
        <div className="row">
          <div className="col-lg-8 d-flex align-items-center mshipProgram__b_list">
            <ul className="">
              <h1>Approve Tasks</h1>
              <li>
                Based on the DEFINITION OF DONE for complete tasks, approve them
                or submit them for review.
              </li>
              <li>
                Approval allows builders to directly get part of the budget PAID
                in $MINORITY. Do this until project is delivered. FINAL REVIEW
              </li>
              <li>
                If any disputes occur the Board of Project Managers settle it
                based on deliverables vs Definition of Done.
              </li>
            </ul>
          </div>
          <div className="col-lg-4">
            <div className="mentorship__SUP">
              <img
                className="mentorship__SUPIMG"
                src="/assets/images/consultancy/4.png"
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
      <div className="mentorshipP__login d-flex justify-content-between mt-4 mb-3">
        {data ? (
          <>
            <Link href="/consultancy">
              <button
                type="button"
                className="font-weight-bold h3 myButton mb-5 w-100 mr-1 btn--go"
              >
                Submit Proposal
              </button>
            </Link>
            <Link href="/consultancy_dashboard">
              <button
                type="button"
                className="font-weight-bold h3 myButton mb-5 w-100 ml-1 btn--go"
              >
                Go to Projects
              </button>
            </Link>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                setClickRegister(true);
              }}
              className="font-weight-bold h3 myButton mb-5 w-100 mr-1 btn--go tw-cursor-pointer"
            >
              Submit Proposal
            </button>
            <button
              type="button"
              onClick={() => {
                setClickRegister(true);
              }}
              className="font-weight-bold h3 myButton mb-5 w-100 ml-1 btn--go"
            >
              Go to Projects
            </button>
          </>
        )}
      </div>

      {data === null ? (
        ''
      ) : (
        <div className="mentorshipP__login d-flex justify-content-center mt-4 mb-3">
          <Link href="/consultancy">
            <button
              type="button"
              className="font-weight-bold h3 myButton mb-5 w-30 mr-1 btn--go"
            >
              Apply Now
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
            <Card setClickRegister={setClickRegister} />
          </div>
          <i
            className="close_icon fas fa-times close-icon tw-text-white"
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

export default ConsultancyHomeExplainer;
