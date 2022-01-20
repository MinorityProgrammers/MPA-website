import decode from 'jwt-decode';
import { signOut } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';
import { useMoralis } from 'react-moralis';
import { LOGOUT_USER } from '../../contexts/actions/actionTypes';
import getProfile from '../../contexts/actions/profile/getProfile';
import { GlobalContext } from '../../contexts/provider';
import Account from '../Account';
import useDetectOutsideClick from '../UseDetectOutsideClick';
import HomepageNavLoggedin from './HomepageNavLoggedin';
import HomepageNavLogin from './HomepageNavLogin';

const HomepageNav = ({
  setToken, setData, page, open, setOpen = () => {},
}) => {
  const dropdownRef = useRef(null);
  const dropdownMobileRef = useRef(null);
  const searchMobileRef = useRef(null);
  const [userData, setUserData] = useState([]);
  const [click, setClick] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [searchValue, setSearch] = useState('');
  const [isActiveMobile, setIsActiveMobile] = useDetectOutsideClick(
    dropdownMobileRef,
    false,
  );
  const [isActiveSearch, setIsActiveSearch] = useDetectOutsideClick(
    searchMobileRef,
    false,
  );
  const [, setConnect] = useState(false);

  const { isWeb3Enabled, isAuthenticated, isWeb3EnableLoading } = useMoralis();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) {
      setConnect(true);
    }
  }, [isAuthenticated, isWeb3Enabled]);

  const handleSearch = (e) => {
    const regex = /\b\w+/;
    if (!regex.test(e.target.value) && e.target.value !== '') return;
    setSearch(e.target.value);
    router.push({
      pathname: router.pathname,
      query: { _q: encodeURI(e.target.value) },
    });
  };

  const handleSubmit = () => {
    const regex = /\b\w+/;
    if (!regex.test(searchValue)) return;
    setSearch('');
    router.push({
      pathname: '/search',
      query: { _q: searchValue },
    });
  };

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const onClick = () => {
    setIsActive(!isActive);
  };
  const onClickMobile = () => setIsActiveMobile(!isActiveMobile);
  const onClickSearch = () => {
    setIsActiveSearch(!isActiveSearch);
    if (searchValue) handleSubmit();
  };

  const {
    profileDispatch,
    authDispatch,
    authState: {
      auth: { data },
    },
  } = useContext(GlobalContext || {});

  useEffect(() => {
    const token = typeof window !== 'undefined'
      ? window.localStorage.getItem('jwtToken')
      : null;
    const userInfo = typeof window !== 'undefined'
      ? window.localStorage.getItem('userInfo')
      : null;

    if (token === null || userInfo === {}) {
      setUserData(null);
      if (
        page === 'MentorshipProgram'
        || page === 'Consultancy'
        || page === 'learn'
        || page === 'About'
        || page === 'Careers'
        || page === 'auth'
        || page === 'Incubator'
        || page === 'Chat'
        || page === 'CreateProfile'
        || page === 'user'
        || page === 'settings-overview'
        || page === 'settings-profile'
        || page === 'settings-security'
        || page === 'settings-wallet'
        || page === 'settings-notifications'
      ) {
        setData(null);
      }
    } else {
      getProfile(setUserData)(profileDispatch);
      if (
        page === 'MentorshipProgram'
        || page === 'Consultancy'
        || page === 'About'
        || page === 'Careers'
        || page === 'learn'
        || page === 'auth'
        || page === 'Incubator'
        || page === 'Chat'
        || page === 'CreateProfile'
        || page === 'user'
        || page === 'settings-overview'
        || page === 'settings-profile'
        || page === 'settings-security'
        || page === 'settings-wallet'
        || page === 'settings-notifications'
      ) {
        getProfile(setData)(profileDispatch);
      }
      if (page === 'Events') {
        setToken(token);
      }
    }
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setSticky(true);
      } else if (window.scrollY < 70) {
        setSticky(false);
      }
    };
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('jwtToken');
    authDispatch({
      type: LOGOUT_USER,
    });
    signOut();
  };

  useEffect(() => {
    const token = typeof window !== 'undefined'
      ? window.localStorage.getItem('jwtToken')
      : null;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
    }
  }, []);

  const showSearchIconMobile = () => (
    <div
      className={`nav__mobile-search ${sticky ? 'sticky' : ''}`}
      ref={searchMobileRef}
    >
      <div className="mobile-searchBox">
        <input
          onChange={handleSearch}
          value={searchValue}
          className="mobile-searchInput"
          type="text"
          name=""
          placeholder="Search"
        />
        <button
          type="button"
          className="mobile-searchButton"
          href="#"
          onClick={onClickSearch}
        >
          <i className="fas fa-search" />
        </button>
      </div>
    </div>
  );

  const menuMobile = () => (
    <div
      className={`nav__mobile ${sticky ? 'sticky' : ''}`}
      ref={dropdownMobileRef}
    >
      {userData !== null && userData !== undefined ? (
        <div className="nav__mobile-profile tw:z-10">
          <div className="nav__mobile-img">
            <img
              src={
                userData.profilePicture
                  ? userData.profilePicture
                  : '/assets/images/profile.png'
              }
              alt="profile"
              className="rounded-circle mb-3"
            />
            <p>
              Welcome back,
              {userData.firstName}
            </p>
          </div>
          <button
            type="button"
            className="btn btn-warning btn-dropdown-filled tw-cursor-pointer"
            onClick={() => {
              handleLogout();
            }}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="mobile__register">
          <a href="/auth">
            <button
              type="button"
              className="btn btn-pink mr-3 ml-3"
              onClick={handleClick}
            >
              Sign in
            </button>
          </a>
          <p className="mr-3 ml-3">OR</p>
          <a href="/auth">
            <button
              type="button"
              className="btn btn-yellow mr-3 ml-3"
              onClick={handleClick}
            >
              Register
            </button>
          </a>
        </div>
      )}

      <ul className="nav__mobile-items">
        <a href="/learn" onClick={closeMobileMenu}>
          <li className="nav-item">
            <div className="nav__mobile-link">
              <p>Learn</p>
              <i className="fas fa-chevron-right mobile-arrow" />
            </div>
          </li>
        </a>
        <a href="/incubator" onClick={closeMobileMenu}>
          <li className="nav-item ">
            <div className="nav__mobile-link">
              Incubator
              <i className="fas fa-chevron-right mobile-arrow" />
            </div>
          </li>
        </a>
        <a href="/events" onClick={closeMobileMenu}>
          <li className="nav-item">
            <div className="nav__mobile-link">
              Events
              <i className="fas fa-chevron-right mobile-arrow" />
            </div>
          </li>
        </a>
        <a href="/careers" onClick={closeMobileMenu}>
          <li className="nav-item">
            <div className="nav__mobile-link">
              Careers
              <i className="fas fa-chevron-right mobile-arrow" />
            </div>
          </li>
        </a>
      </ul>
      {userData !== null && userData !== undefined ? (
        <ul className="nav__mobile-items">
          <a
            href={`${
              userData.userName
                ? `/user/${userData.userName}`
                : '/create-profile'
            }`}
            onClick={closeMobileMenu}
          >
            <li className="nav-item">
              <div className="nav__mobile-link">Profile</div>
            </li>
          </a>
        </ul>
      ) : (
        ''
      )}
      <Account />
    </div>
  );

  return (
    <header
      className="homepage__header"
      style={
        router.pathname === '/auth'
          ? { top: '0rem', paddingBottom: '28px' }
          : {}
      }
    >
      <nav
        className={` ${
          sticky
            ? 'sticky-menu tw-flex tw-flex-row tw-justify-between tw-w-full'
            : 'tw-flex tw-flex-row tw-justify-between tw-w-full'
        }`}
      >
        {isLogin === true && (
          <div
            className="hamburger-icon tw-cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <BiMenuAltLeft />
          </div>
        )}

        <div className="tw-flex tw-flex-row tw-justify-between tw-w-full">
          <div className="3xl:tw-block md:tw-block">
            <div className="navbar-logo">
              <Link href="/" onClick={closeMobileMenu}>
                <img src="/assets/images/mpicon.svg" alt="" />
              </Link>
            </div>
          </div>

          <div className="tw-flex tw-flex-row tw-justify-around md:tw-justify-end tw-w-full">
            <div className="mobile-icon tw-my-4 tw-justify-items-end tw-mx-2">
              <ul className="topbar__mobile">
                <li>
                  <i
                    className="fas fa-search tw-text-blue-700"
                    onClick={onClickSearch}
                  />
                </li>
                {userData !== null && userData !== undefined ? (
                  <li onClick={() => setOpen(!open)}>
                    <span
                      className="tw-cursor-pointer tw-text-blue-700"
                      style={{ fontSize: '1.8rem' }}
                    >
                      <BiMenuAltLeft />
                    </span>
                  </li>
                ) : (
                  ''
                )}

                <li onClick={onClickMobile}>
                  <i
                    className={
                      isActiveMobile
                        ? 'fas fa-times tw-text-blue-700'
                        : 'fas fa-bars tw-text-blue-700'
                    }
                  />
                </li>
              </ul>
            </div>
            {isActiveMobile ? menuMobile() : ''}
            {isActiveSearch ? showSearchIconMobile() : ''}

            <ul className="nav-menu tw-py-0 md:tw-py-4">
              {userData !== null && userData !== undefined ? (
                <li
                  className={open ? 'nav-item active-link' : 'nav-item'}
                  onClick={() => setOpen(!open)}
                >
                  <div
                    className="tw-cursor-pointer"
                    style={{ display: 'flex' }}
                  >
                    <BiMenuAltLeft />
                    <a>All</a>
                  </div>
                </li>
              ) : (
                ''
              )}
              <li
                className={
                  router.pathname === '/learn'
                    ? 'nav-item active-link tw-cursor-pointer'
                    : 'nav-item'
                }
              >
                <Link
                  href="/learn"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <a>LEARN</a>
                </Link>
              </li>
              <li
                className={
                  router.pathname === '/incubator'
                    ? 'nav-item active-link'
                    : 'nav-item'
                }
              >
                <Link
                  href="/incubator"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <a>INCUBATOR</a>
                </Link>
              </li>

              <li
                className={
                  router.pathname === '/events'
                    ? 'nav-item active-link'
                    : 'nav-item'
                }
              >
                <Link
                  href="/events"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <a>EVENTS</a>
                </Link>
              </li>
              <li
                className={
                  router.pathname === '/careers'
                    ? 'nav-item active-link'
                    : 'nav-item'
                }
              >
                <Link
                  href="/careers"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <a>CAREERS</a>
                </Link>
              </li>

              <li
                className={
                  router.pathname
                  === 'https://snapshot.org/#/minorityprogrammers.eth'
                    ? 'nav-item active-link'
                    : 'nav-item'
                }
              >
                <Link
                  href="https://snapshot.org/#/minorityprogrammers.eth"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <a>JOIN</a>
                </Link>
              </li>
            </ul>
            <ul className="tw-flex tw-flex-row tw-justify-around tw-w-1/4 tw-my-8 navbar__right md:tw-hidden">
              <li>
                <div className="navbar__search tw-flex tw-flex-row tw-w-full tw-border tw-border-white tw-rounded-md tw-px-1 tw-text-white">
                  <input
                    onChange={handleSearch}
                    value={searchValue}
                    className="searchInput tw-bg-transparent tw-border-0 tw-text-white tw-py-1 xl:tw-w-10/12 tw-w-full tw-outline-none focus:tw-outline-none"
                    // ${
                    //   searchValue ? "expand" : ""
                    // }`}
                    type="text"
                    name=""
                    placeholder="Search..."
                  />
                  <button type="submit" onClick={handleSubmit}>
                    <i className="fas fa-search" />
                  </button>
                </div>
              </li>
              <li>
                <div className="tw-w-full tw-mx-2 tw-cursor-pointer">
                  <Account />
                </div>
              </li>
              {userData !== null && userData !== undefined ? (
                <div className="tw-mx-2">
                  <li>
                    <i
                      className="fas fa-user-circle tw-content-center tw-text-center NavIcon tw-cursor-pointer tw-mt-2"
                      onClick={onClick}
                    />

                    {isActive ? (
                      <HomepageNavLoggedin
                        onCloseMobileMenu={onClick}
                        userInfo={userData}
                      />
                    ) : (
                      ''
                    )}
                  </li>
                </div>
              ) : (
                <li className="">
                  <i
                    aria-hidden
                    className="fas fa-user-circle tw-content-center tw-text-center NavIcon tw-cursor-pointer tw-mt-2"
                    onClick={onClick}
                  />
                  {isActive ? (
                    <HomepageNavLogin onCloseMobileMenu={onClick} />
                  ) : (
                    ''
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HomepageNav;
