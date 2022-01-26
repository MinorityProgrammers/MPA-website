import React, { useState } from 'react';
import Link from 'next/link';
import ModalVideo from 'react-modal-video';
import datas from './data.json';
import InternshipModal from './InternshipModal';
import Card from '../login-signup/card';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 999999,
  },
};
const InternshipHome = ({ data, active, clickRegister, setClickRegister }) => {
  const [isOpen, setOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState('1');
  const [toggle, setToggle] = useState('2');
  const [myData] = useState(datas);

  function openModal(x, y) {
    setIsOpen(true);
    setShow(x);
    setToggle(y);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const showHandler = (index) => {
    setShow(index);
  };
  const toggleHandler = (index) => {
    setToggle(index);
  };

  return (
    <section>
      <div className="internship__intro pl-5 pr-5">
        <div className="internship__info p-2">
          <p>
            Students across the world are given hands-on experience working with
            corporate teams (15-20 hours weekly). Implementing Agile SCRUM
            methodologies, interns use the leading project management tool
            ClickUp, have tri-weekly daily standups, bi-monthly sprint review,
            retrospective, and backlog grooming sessions with 24/7 support from
            mentors and other developers.
          </p>
          <p>
            {' '}
            Interns are assigned to complete a 3-month roadmap and SMART goal
            for their internship after which the hiring team evaluates to best
            place the intern in teams and project tasks that give the most
            exposure to what that intern wants to learn. After this tailored
            experience, interns will have a portfolio or relevant projects and
            industry knowledge that will prepare them for the workforce.
          </p>
        </div>
        <div className="internship__info--img">
          <img src="/assets/images/internshipIntro.png" alt="" />
        </div>
      </div>

      <div className="internship__categories  pt-4 pb-4">
        <div className="container">
          <h1 className="card-title">Do you want to be ...?</h1>
          <div className="row justify-content-md-center card__wrapper">
            <div className="col-lg-3 text-center intern__type--card">
              <div className="type__logo--image">
                <img src="/assets/images/Internship/graduate.png" alt="" />
              </div>
              <h1>Intern</h1>
              <p>Gain working experience on STEM field</p>
              {data ? (
                <Link href="/careers_explainer">
                  <button type="button" className="btn btn-orange">
                    {' '}
                    <span>Apply</span>
                    <i className="fas fa-angle-right" />
                  </button>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setClickRegister(true);
                  }}
                  className="btn btn-orange tw-cursor-pointer"
                >
                  <span>Apply</span>
                  <i className="fas fa-angle-right" />
                </button>
              )}
            </div>
            <div className="col-lg-3 text-center intern__type--card">
              <div className="type__logo--image">
                <img src="/assets/images/Internship/users.png" alt="" />
              </div>
              <h1>Supervisor</h1>
              <p>Gain working experience on STEM field</p>
              {data ? (
                <Link href="/volunteer">
                  <button type="button" className="btn btn-orange">
                    <span>Build</span> <i className="fas fa-angle-right" />
                  </button>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setClickRegister(true);
                  }}
                  className="btn btn-orange tw-cursor-pointer"
                >
                  <span>Build</span> <i className="fas fa-angle-right" />
                </button>
              )}
            </div>
            <div className="col-lg-3 text-center intern__type--card">
              <div className="type__logo--image">
                <img src="/assets/images/Internship/user.png" alt="" />
              </div>
              <h1>Hiring Partner</h1>
              <p>Gain working experience on STEM field</p>
              {data ? (
                <Link href="/partner">
                  <button type="button" className="btn btn-orange">
                    <span>Hire</span> <i className="fas fa-angle-right" />
                  </button>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setClickRegister(true);
                  }}
                  className="btn btn-orange tw-cursor-pointer"
                >
                  <span>Hire</span> <i className="fas fa-angle-right" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* internship track */}
      <div className="internship__tracks">
        <h1 className="intern-title">Internship Tracks</h1>
        <div className="intern__cards">
          <div className="intern__speciality--cards">
            <div className="intern__speciality--card">
              <h1>Software Engineering</h1>
              <div
                onClick={() => openModal('1', '2')}
                className="img-banner-app"
              >
                <img
                  src="/assets/images/Internship/computer.png"
                  alt=""
                  className="card-img-top rounded-0"
                />
              </div>
              <InternshipModal
                myData={myData}
                closeModal={closeModal}
                modalIsOpen={modalIsOpen}
                customStyles={customStyles}
                toggle={toggle}
                show={show}
                showHandler={showHandler}
                toggleHandler={toggleHandler}
                data={data}
              />
            </div>
            <div className="intern__speciality--card">
              <h1>UI/UX Design</h1>
              <div
                onClick={() => openModal('2', '6')}
                className="img-banner-app"
              >
                <img
                  src="/assets/images/Internship/ui-ux.png"
                  alt=""
                  className="card-img-top rounded-0"
                />
              </div>
              <InternshipModal
                myData={myData}
                closeModal={closeModal}
                modalIsOpen={modalIsOpen}
                customStyles={customStyles}
                toggle={toggle}
                show={show}
                showHandler={showHandler}
                toggleHandler={toggleHandler}
                data={data}
              />
            </div>
            <div className="intern__speciality--card">
              <h1>Business Marketing</h1>
              <div
                onClick={() => openModal('3', '14')}
                className="img-banner-app"
              >
                <img
                  src="/assets/images/Internship/marketing.png"
                  alt=""
                  className="card-img-top rounded-0"
                />
              </div>
              <InternshipModal
                myData={myData}
                closeModal={closeModal}
                modalIsOpen={modalIsOpen}
                customStyles={customStyles}
                toggle={toggle}
                show={show}
                showHandler={showHandler}
                toggleHandler={toggleHandler}
                data={data}
              />
            </div>
            <div className="intern__speciality--card">
              <h1>Cryptocurrency/Blockchain</h1>
              <div
                onClick={() => openModal('4', '18')}
                className="img-banner-app"
              >
                <img
                  src="/assets/images/Internship/blokchain.png"
                  alt=""
                  className="card-img-top rounded-0"
                />
              </div>
              <InternshipModal
                myData={myData}
                closeModal={closeModal}
                modalIsOpen={modalIsOpen}
                customStyles={customStyles}
                toggle={toggle}
                show={show}
                showHandler={showHandler}
                toggleHandler={toggleHandler}
                data={data}
              />
            </div>
          </div>
          <div className="intern__more">
            <div className="download__app">
              <p>Learn, earn, certification with our</p>
<<<<<<< HEAD
              <Link href="/learn-page" target="_blank">
                <button type="button" className="btn-download">
                  Learning dApp
                </button>
=======
              <Link href="/learn" target="_blank">
                <button type="button" className="btn-download">Learning dApp</button>
>>>>>>> 8750ad6 (add tweets)
              </Link>
            </div>
            <div className="about__internship">
              <p>Minority Programers Internship Experience </p>
              <div className="img-banner-app">
                <img
                  src="/assets/images/Internship/videoback.png"
                  className="heading__img card-img-top rounded-0"
                  alt=""
                />
                <button
                  type="button"
                  name="play"
                  onClick={() => setOpen(true)}
                />
              </div>
              <ModalVideo
                channel="youtube"
                isOpen={isOpen}
                videoId="VZmd8EOj3UA"
                onClose={() => setOpen(false)}
              />
            </div>
            <div className="mentorship__card">
              <p>Fast track your career with our</p>
              <Link href="/mentorship" target="_blank">
                <button type="button" className="btn-download">
                  Mentorship Program
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* internship track */}
      <div className="intern__built">
        <h1 className="intern__built-title">See what our Interns Built </h1>
        <div className="intern__cards built__cards">
          <div className="intern__built--cards">
            <div className="intern__speciality--card">
              <h1>MPA - Website</h1>
              <div className="about__internship intern__built--video">
                <div className="img-banner-app">
                  <img
                    src="/assets/images/Internship/mpa.png"
                    className="heading__img card-img-top rounded-0"
                    alt=""
                  />
                  <button
                    type="button"
                    name="play"
                    onClick={() => setOpen(true)}
                  />
                </div>
                <ModalVideo
                  channel="youtube"
                  isOpen={isOpen}
                  videoId="VZmd8EOj3UA"
                  onClose={() => setOpen(false)}
                />
              </div>
            </div>
            <div className="intern__speciality--card">
              <Link href="https://medium.com/minority-programmers/the-history-of-defi-summer-92b6ef6736bd">
                <h1>Defi Summer - Research</h1>
              </Link>
              <div className="about__internship intern__built--video">
                <div className="img-banner-app">
                  <img
                    src="/assets/images/Internship/defisummer.png"
                    alt=""
                    className=" heading__img card-img-top rounded-0"
                  />
                </div>
              </div>
            </div>
            <div className="intern__speciality--card">
              <h1>Global Outsourcing - Research </h1>
              <div className="about__internship intern__built--video">
                <div className="img-banner-app">
                  <img
                    src="/assets/images/Internship/global.png"
                    alt=""
                    className="heading__img card-img-top rounded-0"
                  />
                </div>
              </div>
            </div>
            <div className="intern__speciality--card">
              <h1>DefiSummer - Website</h1>
              <div className="about__internship intern__built--video">
                <div className="img-banner-app">
                  <img
                    src="/assets/images/Internship/defi.png"
                    className="heading__img card-img-top rounded-0"
                    alt=""
                  />
                  <button
                    type="button"
                    name="play"
                    onClick={() => setOpen(true)}
                  />
                </div>
                <ModalVideo
                  channel="youtube"
                  isOpen={isOpen}
                  videoId="VZmd8EOj3UA"
                  onClose={() => setOpen(false)}
                />
              </div>
            </div>
            <div className="intern__speciality--card">
              <h1>Coding</h1>
              <div className="about__internship intern__built--video">
                <div className="img-banner-app">
                  <img
                    src="/assets/images/Internship/coding.png"
                    className="heading__img card-img-top rounded-0"
                    alt=""
                  />
                  <button
                    type="button"
                    name="play"
                    onClick={() => setOpen(true)}
                  />
                </div>
                <ModalVideo
                  channel="youtube"
                  isOpen={isOpen}
                  videoId="VZmd8EOj3UA"
                  onClose={() => setOpen(false)}
                />
              </div>
            </div>
            <div className="intern__speciality--card">
              <h1>UX Design</h1>
              <div className="about__internship intern__built--video">
                <div className="img-banner-app">
                  <img
                    src="/assets/images/Internship/ui-uxdesign.png"
                    className="heading__img card-img-top rounded-0"
                    alt=""
                  />
                  <button
                    type="button"
                    name="play"
                    onClick={() => setOpen(true)}
                  />
                </div>
                <ModalVideo
                  channel="youtube"
                  isOpen={isOpen}
                  videoId="VZmd8EOj3UA"
                  onClose={() => setOpen(false)}
                />
              </div>
            </div>
          </div>
          <div className="intern__more">
            <div className="event">
              <img src="/assets/images/Internship/defisummer.png" alt="" />
              <h1>The History of Defi Summer- Yudhisitra Fitriansyah</h1>
              <p>
                “DeFiSummer” came to life during the summer of 2020 after the
                crypto space saw a huge advantage with liquidity mining and how
                it brought monetary value and some governance control. The hype
                created major buzz and everyone was getting into it.
              </p>
            </div>
          </div>
        </div>
      </div>

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
            className="close_icon fas fa-times close-icon tw-text-white"
            onClick={() => {
              setClickRegister(false);
            }}
          />
        </div>
      ) : (
        ''
      )}
    </section>
  );
};

export default InternshipHome;
