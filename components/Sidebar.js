/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { IoLogOutOutline } from 'react-icons/io5';
import { signOut } from 'next-auth/client';
import {
  AiOutlineDashboard,
  AiOutlineDown,
  AiOutlineFundProjectionScreen,
  AiOutlineMessage,
  AiOutlineUser,
} from 'react-icons/ai';
import Link from 'next/link';

import { RiAppsFill } from 'react-icons/ri';
import { FiUser } from 'react-icons/fi';
import { BiKey } from 'react-icons/bi';
import { BsChevronRight, BsEnvelope, BsFilePost } from 'react-icons/bs';
import 'react-tippy/dist/tippy.css';

import { Tooltip } from 'react-tippy';
import { MdEmail, MdWidgets } from 'react-icons/md';

import { SiUikit, SiWebauthn } from 'react-icons/si';
import SidebarList from './SidebarList';


const Sidebar = ({ dark=true, authUser, Open, user }) => {
  const [sidebar, setSidebar] = useState(false);
  const [pages, setPages] = useState(false);
  const [users, setUser] = useState(false);
  const { role } = authUser || 'student';
  const { lastName } = authUser || 'user';
  const { profileImage } = authUser || './assets/images/mpcircle.svg';
  const { firstName } = authUser || 'user';

  return (
    <div
      className={`${dark ? 'tw-bg-NavDark' : 'tw-bg-main'} ${
        Open
          ? 'tw-w-56 lg:tw-w-full tw-transition tw-duration-200 tw-ease-in-out tw-block'
          : 'tw-hidden'
      } tw-row-start-1 tw-row-end-5 tw-col-start-1 tw-col-end-3  min-h-full-h-screen tw-bg-main tw-z-20 lg:tw-block tw-text-white`}
    >
      <div
        className={`${
          dark ? 'tw-bg-profileDark' : 'tw-bg-logo'
        } tw-flex tw-items-center tw-bg-logo tw-p-1.5 tw-border-b tw-border-line`}
      >
        <div>
        <img
          src="../../assets/images/mp_asset_icon.svg"
          style={{ cursor: 'pointer' }}
          className="tw-w-10 tw-h-10 tw-rounded-full tw-my-4
          tw-bg-gradient-to-r tw-from-pink-500 tw-to-yellow-500"
          alt="logo"
        />
        </div>
        <div className="tw-text-md my-4 tw-ml-2 tw-font-bold">
          <h1>MPA learning incetivisation</h1>
        </div>
      </div>

      <div className="tw-flex tw-flex-col ">  
        <div className="tw-flex-col tw-flex  tw-items-center tw-justify-center tw-border-b tw-border-line tw-p-4">
          <div>
            <img
              src={user.profilePicture || `../../assets/images/profile.png`} 
              alt="profile"
              className="tw-w-16 tw-h-16 tw-object-cover tw-rounded-full"
            />
          </div>
          <div className="tw-w-full tw-flex tw-justify-center tw-flex-col tw-items-center ">
            <span className="tw-text-base tw-my-3">{user.firstName}{' '}{user.lastName}</span>
            <span className="tw-text-xs">{role}</span>
            <ul className="tw-flex tw-justify-around tw-mt-3 tw-w-full ">
              <li>
                <a href="#m" className="tw-text-sm">
                  <Tooltip title="User">
                    <span>
                      <FiUser />
                    </span>
                  </Tooltip>
                </a>
              </li>
              <li>
                <a href="#p" className="tw-text-xs">
                  <Tooltip title="Email">
                    <span>
                      <BsEnvelope />
                    </span>
                  </Tooltip>
                </a>
              </li>
              <li>
                <a href="#c" className="tw-text-xs">
                  <Tooltip title="Message">
                    <span>
                      <AiOutlineMessage />
                    </span>
                  </Tooltip>
                </a>
              </li>
              <li>
                <div className="tw-text-xs">
                  <Tooltip title="Logout">
                    <span className="tw-cursor-pointer" onClick={() => signOut()}>
                      <IoLogOutOutline />
                    </span>
                  </Tooltip>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <section className="tw-my-4">

          <SidebarList title='General' target="Dashboard" subTarget="dashboard" sidebar={sidebar} setSidebar={setSidebar} />
          {/* ***************************** components ****************************** */}



          <article className="tw-pl-2">
            <div className="tw-my-2 tw-mx-1 tw-font-bold">
              <span>Owner</span>
            </div>
            <div>
              <ul>
                <li>
                  <a
                    href="#link"
                    className={`${
                      user ? 'tw-bg-hover tw-transition tw-duration-500 tw-ease-in-out tw-transform' : ''
                    } tw-flex tw-justify-between ${
                      dark ? 'hover:tw-bg-hover tw-transition tw-duration-500 tw-ease-in-out tw-transform' : 'hover:tw-bg-hover tw-transition tw-duration-500 tw-ease-in-out tw-transform'
                    }  ${dark && users ? 'tw-bg-profileDark' : ''}   ${
                      !dark && users ? 'tw-bg-hover tw-transition tw-duration-500 tw-ease-in-out tw-transform' : ''
                    }   tw-p-2`}
                  >
                    <div className="tw-flex">
                      <span className="tw-mr-2">
                        <AiOutlineUser className="tw-text-base tw-mt-0.5 tw-font-bold" />
                      </span>
                      <span>User</span>
                    </div>
                    {users ? (
                      <div>
                        <AiOutlineDown
                          className={`${
                            user ? 'tw-block ' : 'tw-hidden'
                          } tw-text-sm tw-mt-1  tw-mx-2 tw-font-bold`}
                          onClick={() => setUser(!users)}
                        />
                      </div>
                    ) : (
                      <div>
                        <BsChevronRight
                          className={`${
                            users ? 'tw-hidden ' : 'tw-block'
                          } tw-text-sm tw-mt-1 tw-mx-2 tw-font-bold`}
                          onClick={() => setUser(!users)}
                        />
                      </div>
                    )}
                  </a>
                  <div className={`${!users ? 'tw-hidden ' : 'tw-block'}`}>
                    <div className="tw-flex tw-justify-between tw-my-2">
                      <a
                        href="/dashboard/user/singleProfile"
                        className="tw-flex tw-text-gray-200"
                      >
                        <div>
                          <BiKey className="tw-mt-0.5 tw-mx-3 tw-text-gray-200" />
                        </div>
                        <span className="tw-text-sm">User profile</span>
                      </a>
                      <div />
                    </div>
                    <div className="tw-flex tw-justify-between tw-my-2">
                      <a
                        href="/dashboard/user/updateProfile"
                        className="tw-flex tw-text-gray-200"
                      >
                        <div>
                          <BiKey className="tw-mt-0.5 tw-mx-3" />
                        </div>
                        <span className="tw-text-sm">Edit Profile </span>
                      </a>
                      <div />
                    </div>
                  </div>
                </li>



              </ul>
            </div>
          </article>





          <article className="tw-pl-2">
            <div className="tw-my-2 tw-mx-1 tw-font-bold">
              <span>Pages</span>
            </div>
            <div>
              <ul>
                <li>
                  <a
                    href="#link"
                    className={`${
                      pages ? 'tw-bg-hover tw-transition tw-duration-500 tw-ease-in-out tw-transform' : ''
                    } tw-flex tw-justify-between ${
                      dark ? 'tw-hover:bg-profileDark ' : 'hover:tw-bg-hover tw-transition tw-duration-500 tw-ease-in-out tw-transform'
                    }  ${dark && pages ? 'tw-bg-profileDark' : ''}   ${
                      !dark && pages ? 'tw-bg-hover tw-transition tw-duration-500 tw-ease-in-out tw-transform' : ''
                    }   tw-p-2`}
                  >
                    <div className="tw-flex ">
                      <span className="tw-mr-2">
                        <SiWebauthn className="tw-text-base tw-mt-0.5 tw-font-bold" />
                      </span>
                      <span>Auth</span>
                    </div>
                    {pages ? (
                      <div>
                        <AiOutlineDown
                          className={`${
                            pages ? 'tw-block ' : 'tw-hidden'
                          } tw-text-sm tw-mt-1  tw-mx-2 tw-font-bold`}
                          onClick={() => setPages(!pages)}
                        />
                      </div>
                    ) : (
                      <div>
                        <BsChevronRight
                          className={`${
                            pages ? 'tw-hidden ' : 'tw-block'
                          } tw-text-sm tw-mt-1 tw-mx-2 tw-font-bold`}
                          onClick={() => setPages(!pages)}
                        />
                      </div>
                    )}
                  </a>
                  <div className={`${!pages ? 'tw-hidden ' : 'tw-block'}`}>
                    <div className="tw-flex tw-justify-between tw-my-2">
                      <div  className="tw-flex tw-text-gray-200">
                        <div>
                          <BiKey className="tw-mt-0.5 tw-mx-3" />
                        </div>
                        <span className="tw-text-sm tw-cursor-pointer" onClick={() => signOut()}>Logout</span>
                      </div>

                      <div />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default Sidebar;
