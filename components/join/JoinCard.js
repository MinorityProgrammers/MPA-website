import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { errorToast } from '../../contexts/utils/toasts';
import { GlobalContext } from '../../contexts/provider';

const JoinCard = () => {
  const router = useRouter();
  const [active, setActive] = useState('');
  const [, setUserData] = useState([]);

  const {
    authState: {
      auth: { data },
    },
  } = useContext(GlobalContext);

  useEffect(() => {
    const token = window.localStorage.getItem('jwtToken');
    const userInfo = window.localStorage.getItem('userInfo');

    if (token == null || userInfo === {}) {
      setUserData(null);
      setActive(false);
    } else {
      setUserData(Object.values(JSON.parse(userInfo))[1]);
      setActive(true);
    }
    return () => {
      setUserData(null);
      setActive(false);
    };
  }, [data]);

  const handleStart = () => {
    if (active) {
      router.push('chapter/start-a-chapter');
    } else {
      errorToast('Please login to continue');
    }
  };
  return (
    <>
      <div
        className="card m-5 justify-content-between"
        style={{ width: '19rem' }}
      >
        <img
          src="./assets/images/join/mpa-chapter.png"
          className="card-img-top"
          alt="..."
        />

        <div className="card-body text-center justify-content-center">
          <h4 className="card-title">MPA Chapters</h4>
          <p className="card-text">
            Start or join a chapter of Minority Programmers Association and get
            rewarded today.
          </p>
        </div>
      </div>

      <div
        className="card m-5 align-items-center tw-shadow-xl tw-cursor-pointer"
        style={{ width: '19rem' }}
      >
        <img
          src="./assets/images/join/mpa-startup.png"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h4 className="card-title">Build A Startup</h4>
          <p className="card-text">
            Get funding for your minority startup today
          </p>
        </div>
        <Link href="/incubator">
          <button
            type="button"
            className="mpa-joinpage-btns hover:tw-shadow-xl"
          >
            Get Funding
          </button>
        </Link>
      </div>

      <div
        className="card m-5 align-items-center tw-shadow-xl tw-cursor-pointer"
        style={{ width: '19rem' }}
      >
        <img
          src="./assets/images/join/mpa-intern.png"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h4 className="card-title">MPA Internships</h4>
          <p className="card-text">
            Apply for a world class internship with MPA today.
          </p>
        </div>
        <Link href="/careers">
          <button
            type="button"
            className="mpa-joinpage-btns hover:tw-shadow-xl"
          >
            View Internships
          </button>
        </Link>
      </div>
      <div
        className="card m-5 align-items-center tw-shadow-xl tw-cursor-pointer"
        style={{ width: '19rem' }}
      >
        <img
          src="./assets/images/join/mpa-mentor.png"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h4 className="card-title">Mentorships</h4>
          <p className="card-text">
            Become a mentor to minority students looking to get into the STEM
            industry
          </p>
        </div>
        <Link href="/mentorshipProgram">
          <button
            type="button"
            className="mpa-joinpage-btns hover:tw-shadow-xl"
          >
            Become a Mentor
          </button>
        </Link>
      </div>
      <div
        className="card m-5 align-items-center tw-shadow-xl tw-cursor-pointer"
        style={{ width: '19rem' }}
      >
        <img
          src="./assets/images/join/meet-president.png"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h4 className="card-title">Meet the President</h4>
          <p className="card-text">
            {' '}
            Unsure how to get involved? Schedule a one-on-one video chat with
            the MPA President & learn how to get started.
            {' '}
          </p>
        </div>
        <Link href="https://calendly.com/minorityprogrammers/join?month=2021-09">
          <a target="_blank">
            <button
              type="button"
              className="mpa-joinpage-btns hover:tw-shadow-xl"
            >
              Schedule Meeting
            </button>
          </a>
        </Link>
      </div>
      <div
        className="card m-5 align-items-center tw-shadow-xl tw-cursor-pointer"
        style={{ width: '19rem' }}
      >
        <img
          src="./assets/images/join/mpa-discord.png"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h4 className="card-title">MPA Discord</h4>
          <p className="card-text">
            Let???s meet, code and share resources. Connect with us on Discord
            now.
          </p>
        </div>
        <Link href="https://discord.com/invite/NhCq4Y6AQV">
          <a target="_blank">
            <button
              type="button"
              className="mpa-joinpage-btns hover:tw-shadow-xl"
            >
              Join us on Discord
            </button>
          </a>
        </Link>
      </div>
    </>
  );
};

export default JoinCard;
