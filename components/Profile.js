/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDateRange, MdEmail, MdPermContactCalendar } from 'react-icons/md';
import { GrFacebookOption } from 'react-icons/gr';
import { FiInstagram, FiTwitter } from 'react-icons/fi';
import { IoLocationOutline } from 'react-icons/io5';
import { useHistory } from 'react-router';
import { AiFillHome } from 'react-icons/ai';

const Profile = ({ setOpen, setNotice, setLog,user}) => {


  return (
    <div
      className={`tw-bg-surface tw-text-gray-800 tw-col-end-13 tw-col-start-1 lg:tw-col-start-3 tw-p-2   tw-row-start-2  tw-row-end-4 p-3`}
      onClick={() => setOpen(false)}
    >
      <div className="tw-flex tw-justify-between">
        <div className="tw-m-4">
          <h2 className="tw-font-bold tw-text-primary-200 tw-text-xl">User Profile</h2>
          <span className="tw-text-xs ">Student admin panel</span>
        </div>
        <div className="tw-flex tw-m-4">
          <span>
            <AiFillHome className="tw-text-primary-200 tw-mr-1 mt-1 " />
          </span>
          /<span className="tw-mx-1">user</span>/
          <span className="tw-mx-1">Profile</span>
        </div>
      </div>
      <div
        className={`tw-bg-white tw-shadow-md  tw-rounded-md `}
      >
        <ToastContainer autoClose={2000} />
        <div className="">
          <div className="tw-relative">
            <img src='../../assets/images/back.jpg' alt="Profile background" className="tw-w-full tw-h-60 tw-rounded-t-md" />
            <div className="tw-absolute tw-bottom-8 tw-inset-x-1/3 sm:tw-inset-x-1/3 md:tw-inset-x-2/4">
              <img
                src={user.profilePicture || `../../assets/images/profile.png`} 
                alt="profile"
                className=" tw-h-24 tw-w-24 md:tw-h-28 md:tw-w-28  tw-ml-4  tw-object-cover tw-rounded-full  tw-border-surface tw-border-8
                "
              />
            </div>
          </div>
          <div className=" tw-border-b tw-grid  tw-m-2 md:tw-m-4 tw-p-4 md:tw-p-8 tw-grid-cols-1 md:tw-grid-cols-3 tw-border-gray-200">
            <div className="  tw-flex tw-flex-col-reverse tw-items-center tw-justify-center md:tw-grid tw-col-span-2  md:tw-grid-cols-3 ">
              <div className="tw-flex-col tw-flex tw-items-center tw-justify-center md:tw-justify-start  md:tw-items-start tw-my-2 tw-ml-3">
                <div className="tw-flex tw-my-3">
                  <span>
                    <MdEmail className="tw-text-primary-200" />
                  </span>
                  <span className="tw-text-xs tw-text-primary-200 tw-ml-3">Email</span>
                </div>
                <span className="tw-text-gray-500 tw-text-sm md:tw-w-5/12 ">
                  {user.email}
                </span>
              </div>
              <div className="tw-flex-col tw-flex tw-mt-2 tw-items-center tw-justify-center md:tw-justify-start  md:tw-items-start md:tw-my-2  ">
                <div className="tw-flex tw-my-3">
                  <span>
                    <MdDateRange className="tw-text-primary-200"/>
                  </span>
                  <span className="tw-text-xs tw-text-primary-200 tw-ml-3">Birth date</span>
                </div>
                <span className="tw-text-gray-500 tw-w-full md:tw-w-5/6 ">{user.birthday || "N/A"}</span>
              </div>
              <div className="tw-flex-col tw-flex tw-justify-center tw-items-center tw-mt-3 md:tw-justify-start md:tw-items-start  md:tw-relative  ">
                <div className="tw-flex ">
                  <span className="md:tw-text-2xl md:tw-absolute tw-text-gray-600  tw--left-2 tw-bottom-2 tw-pr-4 ">
                    {user.firstName}{' '}{user.lastName}
                  </span>
                </div>
                <span className="tw-text-primary-200 md:tw-left-3  md:tw-absolute tw-mr-4 md:tw-mr-0 md:tw-ml-5">
                  Student
                </span>
              </div>
            </div>
            <div className="tw-flex tw-items-center tw-justify-center tw-flex-col-reverse md:tw-grid  md:tw-grid-cols-2 tw-col-span-1">
              <div className="tw-flex-col tw-flex tw-items-center tw-justify-center md:tw-justify-start  md:tw-items-start tw-my-2">
                <div className="tw-flex tw-my-3">
                  <span>
                    <MdPermContactCalendar className="tw-text-primary-200"/>
                  </span>
                  <span className="tw-text-xs tw-text-primary-200 tw-ml-3">Contact</span>
                </div>
                <span className="tw-text-gray-500 tw-w-full md:tw-w-5/6 ">
                  {user.phoneNumber || "N/A"}
                </span>
              </div>{' '}
              <div className="tw-flex-col tw-flex tw-items-center tw-justify-center md:tw-justify-start  md:tw-items-start tw-my-2">
                <div className="tw-flex tw-my-3">
                  <span>
                    <IoLocationOutline className="tw-text-primary-200"/>
                  </span>
                  <span className="tw-text-xs tw-text-primary-200 tw-ml-3">Location</span>
                </div>
                <span className=" tw-text-gray-500  tw-w-full md:tw-w-5/6  ">
                  {user.location || "N/A"} / {user.Nationality || "N/A"}
                </span>
              </div>
            </div>
          </div>
          <div className="tw-py-8">
            <ul className="tw-flex tw-justify-center ">
              <li>
                <a href="#fb">
                  <GrFacebookOption className="hover:tw-text-primary-200 tw-text-xl" />
                </a>
              </li>
              <li className="tw-ml-8">
                <a href="#fb">
                  <FiTwitter className="hover:tw-text-primary-200 tw-text-xl" />
                </a>
              </li>{' '}
              <li className="tw-ml-8">
                <a href="#fb">
                  <FiInstagram className="hover:tw-text-primary-200 tw-text-xl" />
                </a>
              </li>
            </ul>
          </div>
          <div className="tw-flex tw-items-center tw-justify-center tw-pb-4">
            <a href="/dashboard/user/updateProfile">
              <button
                type="button"
                className="tw-bg-main hover:tw-bg-hover tw-rounded-md tw-text-white tw-py-1.5 tw-mb-4 tw-px-8"
              >
                {' '}
                Update
              </button>
            </a>
          </div>
        </div>
      </div>

      <div
        className={`tw-bg-white tw-rounded-md tw-shadow-md tw-mt-4 `}
      >
        <div className="tw-m-4 tw-py-4 tw-border-b  tw-flex tw-items-center tw-border-gray-200 ">
          <img
            src={user.profilePicture || `../../assets/images/profile.png`} 
            alt="profile"
            className="tw-h-20   tw-object-cover tw-rounded-full tw-w-20 tw-border-surface tw-border-8"
          />
          <span className="tw-ml-2 tw-text-sm">{user.firstName}{' '}{user.lastName}</span>
        </div>
        <div className="tw-m-4 tw-py-4">
          <h1 className="tw-text-main tw-py-4 ">Bio</h1>
          <p className="tw-text-sm tw-leading-6 tw-w-11/12">{user.bio || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
