import { signOut } from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { LOGOUT_USER } from '../../contexts/actions/actionTypes';
import { GlobalContext } from '../../contexts/provider';

const HomepageNavLoggedin = function ({ onCloseMobileMenu, userInfo }) {
  const { authDispatch } = useContext(GlobalContext);
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('jwtToken');
    authDispatch({
      type: LOGOUT_USER,
    });
    signOut();
  };

  return (
    <div className={click ? 'dropdown-login clicked' : 'dropdown-login right'}>
      <button type="button" className="dropdown-login-btn-close" onClick={onCloseMobileMenu}>
        <i className="fas fa-times" />
      </button>
      <p className="mb-3">
        Welcome back,
        {userInfo ? userInfo.firstName : ''}
      </p>
      <div className="dropdown-login-img">
        <img
          src={
            userInfo.profilePicture
              ? userInfo.profilePicture
              : '/assets/images/profile.png'
          }
          alt="profile"
          className="rounded-circle mb-3"
        />
      </div>
      <div className="login-options mb-3 tw-cursor-pointer">
        <a
          href={`${
            userInfo.userName ? `/user/${userInfo.userName}` : '/create-profile'
          }`}
          onClick={handleClick}
        >
          <p className="login-options-profile">Profile</p>
        </a>
        <a href="/settings/overview" onClick={() => handleClick()}>
          <p className="login-options-setting">Settings</p>
        </a>
      </div>
      <div className="dropdown-login-button">
        <button
          type="button"
          className="btn btn-warning btn-dropdown-filled"
          onClick={() => {
            handleLogout();
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default HomepageNavLoggedin;
