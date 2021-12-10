import React, {
  useState, useEffect, useRef, useContext,
} from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import Portis from '@portis/web3';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Fortmatic from 'fortmatic';
import decode from 'jwt-decode';
import { useMoralis } from 'react-moralis';
import { BiMenuAltLeft } from 'react-icons/bi';
import { GlobalContext } from '../../contexts/provider';
import { LOGOUT_USER } from '../../contexts/actions/actionTypes';
import { getProfile } from '../../contexts/actions/profile/getProfile';
import HomepageNavLoggedin from './HomepageNavLoggedin';
import HomepageNavLogin from './HomepageNavLogin';
import NativeBalance from '../NativeBalance';
import Account from '../Account';
import { useDetectOutsideClick } from '../UseDetectOutsideClick';

let web3Modal;
let selectedAccount = null;
let provider;

function copyWalletAddress(text) {
  const copyText = document.createElement('textarea');
  document.body.appendChild(copyText);
  copyText.value = text;
  copyText.select();
  document.execCommand('copy');
  document.body.removeChild(copyText);
}

async function fetchAccountData() {
  // Get a Web3 instance for the wallet
  const web3 = new Web3(provider);

  console.log('Web3 instance is', web3);

  // Get list of accounts of the connected wallet
  const accounts = await web3.eth.getAccounts();

  // MetaMask does not give you all accounts, only the selected account
  console.log('Got accounts', accounts);
  selectedAccount = accounts[0];
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

  console.log('Web3Modal instance is', web3Modal);

  console.log('Opening a dialog', web3Modal);
  try {
    provider = await web3Modal.connect();
  } catch (e) {
    console.log('Could not get a wallet connection', e);
    return;
  }

  // Subscribe to accounts change
  provider.on('accountsChanged', (accounts) => {
    fetchAccountData();
    console.log(selectedAccount);
  });

  // Subscribe to chainId change
  provider.on('chainChanged', (chainId) => {
    fetchAccountData();
    console.log(selectedAccount);
  });

  // Subscribe to networkId change
  provider.on('networkChanged', (networkId) => {
    fetchAccountData();
    console.log(selectedAccount);
  });

  await refreshAccountData();
}

async function onDisconnect() {
  console.log('Killing the wallet connection', provider);

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

  selectedAccount = null;
}

const HomepageNav = function ({
  setToken,
  setData,
  page,
  open,
  setOpen = () => {},
}) {
  const dropdownRef = useRef(null);
  const dropdownMobileRef = useRef(null);
  const searchMobileRef = useRef(null);
  const [userData, setUserData] = useState([]);
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const session = useSession();
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
  const [connect, setConnect] = useState(false);

  const {
    isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading,
  } = useMoralis();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) {
      setConnect(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  console.log(session);

  const handleConnect = () => {
    enableWeb3();
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
      auth: { loading, error, data },
    },
  } = useContext(GlobalContext);

  useEffect(() => {
    const token = typeof window !== 'undefined'
      ? window.localStorage.getItem('jwtToken')
      : null;
    const userInfo = typeof window !== 'undefined'
      ? window.localStorage.getItem('userInfo')
      : null;

    if (token == null || userInfo == {}) {
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

  const extendEle = () => {
    dropdown ? setDropdown(false) : setDropdown(true);
  };

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
            <button className="btn btn-pink mr-3 ml-3" onClick={handleClick}>
              Sign in
            </button>
          </a>
          <p className="mr-3 ml-3">OR</p>
          <a href="/auth">
            <button className="btn btn-yellow mr-3 ml-3" onClick={handleClick}>
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
              {/* {dropdown ? <i className="fas fa-chevron-down mobile-arrow"></i> : <i className="fas fa-chevron-right mobile-arrow"></i>} */}
              {/* dropdown option */}
              {/* {dropdown && <HomepageNavDropdown onCloseMobileMenu={closeMobileMenu} />} */}
            </div>
          </li>
        </a>
      </ul>
      {userData !== null && userData !== undefined ? (
        <ul className="nav__mobile-items">
          <a href="/dashboard" onClick={closeMobileMenu}>
            <li className="nav-item">
              <div className="nav__mobile-link">Profile</div>
            </li>
          </a>
          <a href="#" onClick={closeMobileMenu}>
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
          </a>
        </ul>
      ) : (
        ''
      )}
      <div className="mobile__vote">
        <div className="mobile__wallet-link" onClick={onClickMobile}>
          {selectedAccount === null ? (
            <a href="#" className="tw-text-white" onClick={onConnect}>
              Connect Wallet
            </a>
          ) : (
            <div>
              <a href="#" className="topbar__connected">
                <img src="/assets/images/greendot.svg" className="green__dot" />
                <p> </p>
                {selectedAccount}
              </a>
              <a
                href="#"
                className="copy__box"
                onClick={copyWalletAddress(selectedAccount)}
              >
                🗐
              </a>
            </div>
          )}
        </div>
        <div className="mobile__vote-link">
          <a href="/vote" className="">
            <i className="far fa-check-circle" />
            Vote
          </a>
        </div>
      </div>
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
      {/* immediate solution fix for only /auth page header style */}
      {/* <header className="homepage__header"> */}
      <div className="homepage__topbar">
        <div className="container">
          <ul className="topbar__right">
            <li>
              <div className="searchBox tw-text-white">
                <input
                  onChange={handleSearch}
                  value={searchValue}
                  className={`searchInput tw-text-white ${
                    searchValue ? 'expand' : ''
                  }`}
                  type="text"
                  name=""
                  placeholder="Search"
                />
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className={`searchButton ${searchValue ? 'scale' : ''}`}
                >
                  <i className="fas fa-search" />
                </button>
              </div>
            </li>
            {userData !== null && userData !== undefined ? (
              <>
                <li>
                  <a href="/chat">
                    <i className="fas fa-envelope" />
                  </a>
                </li>
                <li>
                  <i className="fas fa-user" onClick={onClick} />
                  {isActive ? (
                    <HomepageNavLoggedin
                      onCloseMobileMenu={onClick}
                      userInfo={userData}
                    />
                  ) : (
                    ''
                  )}
                </li>
              </>
            ) : (
              <li className="topbar__login">
                <i aria-hidden className="fas fa-user" onClick={onClick} />
                {isActive ? (
                  <HomepageNavLogin onCloseMobileMenu={onClick} />
                ) : (
                  ''
                )}
              </li>
            )}
            <li>
              <NativeBalance />
            </li>
            <li>
              <div className="headerRight">
                <Account />
              </div>
            </li>
            <li>
              <a
                href="https://snapshot.org/#/minorityprogrammers.eth"
                target="_blank"
                className="topbar__vote "
                rel="noreferrer"
              >
                <i className="far fa-check-circle" />
                Vote
              </a>
            </li>
          </ul>
        </div>
      </div>
      <nav className={` ${sticky ? 'sticky-menu' : ''}`}>
        {isLogin === true && (
          <div
            className="hamburger-icon tw-cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <BiMenuAltLeft />
          </div>
        )}

        <div className="container homepage__navbar">
          <div className="navbar-logo">
            <Link href="/" onClick={closeMobileMenu}>
              <img src="/assets/images/mpicon.svg" />
            </Link>
          </div>
          <div className="mobile-icon">
            <ul className="topbar__mobile">
              <li>
                <i className="fas fa-search" onClick={onClickSearch} />
              </li>
              {userData !== null && userData !== undefined ? (
                <li onClick={() => setOpen(!open)}>
                  <span
                    className="tw-cursor-pointer"
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
                  className={isActiveMobile ? 'fas fa-times' : 'fas fa-bars'}
                />
              </li>
            </ul>
          </div>
          {isActiveMobile ? menuMobile() : ''}
          {isActiveSearch ? showSearchIconMobile() : ''}

          <ul className="nav-menu">
            {userData !== null && userData !== undefined ? (
              <li
                className={open ? 'nav-item active-link' : 'nav-item'}
                onClick={() => setOpen(!open)}
              >
                <div className="tw-cursor-pointer" style={{ display: 'flex' }}>
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
                  ? 'nav-item active-link'
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
            <li
              className={
                router.pathname === '/join'
                  ? 'nav-item active-link'
                  : 'nav-item'
              }
            >
              <Link
                href="/join"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                <a>JOIN</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default HomepageNav;