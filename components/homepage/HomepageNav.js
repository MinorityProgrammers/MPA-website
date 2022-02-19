import Portis from '@portis/web3';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Fortmatic from 'fortmatic';
import decode from 'jwt-decode';
import { signOut } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';
import { useMoralis } from 'react-moralis';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import { LOGOUT_USER } from '../../contexts/actions/actionTypes';
import getProfile from '../../contexts/actions/profile/getProfile';
import { GlobalContext } from '../../contexts/provider';
import Account from '../Account';
import useDetectOutsideClick from '../UseDetectOutsideClick';
import HomepageNavLoggedin from './HomepageNavLoggedin';
import HomepageNavLogin from './HomepageNavLogin';

// the main stylesheet
import styles from '../module-css/header/home_page_nav.module.css';

// tw-flex tw-flex-row tw-justify-around tw-w-1/4 tw-my-8 navbar__right md:tw-hidden

let web3Modal;
let selectedAccount = null; // address the use of this variable
let provider;

/* // address the use of this function
function copyWalletAddress(text) {
  const copyText = document.createElement('textarea');
  document.body.appendChild(copyText);
  copyText.value = text;
  copyText.select();
  document.execCommand('copy');
  document.body.removeChild(copyText);
} */

async function fetchAccountData() {
  // Get a Web3 instance for the wallet
  const web3 = new Web3(provider);

  // Get list of accounts of the connected wallet
  const accounts = await web3.eth.getAccounts();

  // MetaMask does not give you all accounts, only the selected account
  selectedAccount = accounts[0]; // address the use of this variable
}

/**
 * Fetch account data for UI when
 * - User switches accounts in wallet
 * - User switches networks in wallet
 * - User connects wallet initially
 */
async function refreshAccountData() {
  await fetchAccountData(provider);
}

/**
 * Connect wallet button pressed.
 */
async function onConnect() {
  const providerOptions = {
    portis: {
      package: Portis, // required
      options: {
        id: 'PORTIS_ID', // required
      },
    },
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: 'INFURA_ID', // required
      },
    },
    fortmatic: {
      package: Fortmatic, // required
      options: {
        key: 'FORTMATIC_KEY', // required
      },
    },
  };

  web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    providerOptions, // required
    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
  });

  try {
    provider = await web3Modal.connect();
  } catch (e) {
    console.log('Could not get a wallet connection', e);
    return;
  }

  // Subscribe to accounts change
  provider.on('accountsChanged', (/* accounts */) => {
    fetchAccountData();
  });

  // Subscribe to chainId change
  provider.on('chainChanged', (/* chainId */) => {
    fetchAccountData();
  });

  // Subscribe to networkId change
  provider.on('networkChanged', (/* networkId */) => {
    fetchAccountData();
  });

  await refreshAccountData();
}

async function onDisconnect() {
  // TODO: Which providers have close method?
  if (provider.close) {
    await provider.close();

    // If the cached provider is not cleared,
    // WalletConnect will default to the existing session
    // and does not allow to re-scan the QR code with a new wallet.
    // Depending on your use case you may want or want not his behavir.
    await web3Modal.clearCachedProvider();
    provider = null;
  }

  selectedAccount = null; // address the use of this variable
}

const HomepageNav = ({
  setToken, setData, page, open, setOpen = () => {},
}) => {
  const dropdownRef = useRef(null);
  const dropdownMobileRef = useRef(null);
  const searchMobileRef = useRef(null);
  const [userData, setUserData] = useState([]);
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
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

  const {
    isWeb3Enabled, /* enableWeb3, */ isAuthenticated, isWeb3EnableLoading,
  } = useMoralis();

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

  /*  // this function is not used check if it is needed before removing it
  const handleConnect = () => {
    enableWeb3();
  }; */

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
        || page === 'learn-page'
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
      // setUserData(Object.values(JSON.parse(userInfo))[1])
      getProfile(setUserData)(profileDispatch);
      if (
        page === 'MentorshipProgram'
        || page === 'Consultancy'
        || page === 'About'
        || page === 'Careers'
        || page === 'learn-page'
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
    // window.location.href = "/";
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

  const onMouseEnter = () => {
    setDropdown(true);
  };

  const onMouseLeave = () => {
    setDropdown(false);
  };

  const extendEle = () => (dropdown ? setDropdown(false) : setDropdown(true));

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
        <a href="/learn-page" onClick={closeMobileMenu}>
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
        <a href="/mentorshipProgram" onClick={closeMobileMenu}>
          <li className="nav-item">
            <div className="nav__mobile-link">
              Mentorship
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
        <a href="/consultancy" onClick={extendEle}>
          <li
            className="nav-item"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <div className="nav__mobile-link">
              Consultancy
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
          {/* <a href="#" onClick={closeMobileMenu}>
            <li className="nav-item">
              <div className="nav__mobile-link">
                Messages
                <p className="mobile__social msg">2</p>
              </div>
            </li>
          </a>
          <a href="#" onClick={closeMobileMenu}>
            <li className="nav-item">
              <div className="nav__mobile-link">
                Notifications
                <p className="mobile__social notification">3</p>
              </div>
            </li>
          </a> */}
        </ul>
      ) : (
        ''
      )}
      <Account />
    </div>
  );

  return (
    <header
      className={styles.header}
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
            <div className={styles.navbar_logo_format}>
              <Link href="/" onClick={closeMobileMenu}>
                <img src="/assets/images/mpicon.svg" alt="" className={styles.main_logo} />
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
                  router.pathname === '/learn-page'
                    ? 'nav-item active-link tw-cursor-pointer'
                    : 'nav-item'
                }
              >
                <Link
                  href="/learn-page"
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
                  router.pathname === '/mentorshipProgram'
                    ? 'nav-item active-link'
                    : 'nav-item'
                }
              >
                <Link
                  href="/mentorshipProgram"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <a>MENTORSHIP</a>
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
                                router.pathname === '/consultancy_explainer'
                                ? 'nav-item active-link'
                                : 'nav-item'
                        }
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                >
                        <Link
                                href="/consultancy_explainer"
                                className="nav-links"
                                onClick={extendEle}
                        >
                        <a>CONSULTANCY</a>
                        </Link>
                </li> 

              {/*
              <li
                className={
                  router.pathname === 'https://snapshot.org/#/minorityprogrammers.eth'
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
               */}
            </ul>
            {/** added an inline style because tailwing configuration is 25% */}
            <ul className="tw-flex tw-flex-row tw-justify-around tw-w-1/4 tw-my-8 navbar__right md:tw-hidden" style={{width: '18%'}}>
               {/**  ** SEARCH FUNCTIONALITY IS COMMENTED
              <li>
                <div className="tw-flex tw-flex-row tw-w-full tw-border tw-border-gray-700 tw-rounded-md tw-px-1 tw-text-gray-500">
                  <input
                    onChange={handleSearch}
                    value={searchValue}
                    className="searchInput tw-bg-transparent tw-border-0 tw-text-gray-500 tw-py-1 xl:tw-w-10/12 tw-w-full tw-outline-none focus:tw-outline-none"
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
              */}
              <li>
                <div className="tw-w-full tw-mx-2 tw-cursor-pointer">
                  <Account />
                </div>
              </li>
              {userData !== null && userData !== undefined ? (
                <div className="tw-mx-2">
                  {/* <li>
                        <a href="/chat">
                          <i className="fas fa-envelope NavIcon tw-mt-2" />
                        </a>
                      </li> */}
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
                    style={{margin: 0 }}
                    onClick={onClick}
                  />
                  {isActive ? (
                    <HomepageNavLogin onCloseMobileMenu={onClick} />
                  ) : (
                    ''
                  )}
                </li>
              )}
              {/* <li>
              <NativeBalance /> 
            </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HomepageNav;
