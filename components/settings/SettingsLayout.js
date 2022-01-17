import React, {
  useEffect, useState, useContext, useRef,
} from 'react';
import { useRouter } from 'next/router';
import decode from 'jwt-decode';
import Layout from '../Layout';
import HomepageNav from '../homepage/HomepageNav';
import SidebarTwo from '../sidebar/SidebarTwo';
import { GlobalContext } from '../../contexts/provider';
import { LOGOUT_USER } from '../../contexts/actions/actionTypes';
import getProfile from '../../contexts/actions/profile/getProfile';
import links from '../../contexts/utils/links';
import Footer from '../Footer';
import ComingSoon from '../ComingSoon';
import useDetectOutsideClick from '../UseDetectOutsideClick';
import styles from '../../styles/settings/settingsLayout.module.css';

const SettingsLayout = function ({ setData, children, settingsPage }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, false);
  const [userData, setUserData] = useState({});
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [ownsProfile, setOwnsProfile] = useState(false);

  const router = useRouter();

  const handleClick = () => {
    setHide(!hide);
  };

  // states from global context
  const {
    profileDispatch,
    authDispatch,
  } = useContext(GlobalContext);

  // grab a token from local storage so as user info
  useEffect(() => {
    // console.log(window.localStorage.getItem("jwtToken"));
    if (window.localStorage.getItem('jwtToken')) {
      getProfile(setUserData)(profileDispatch);
    }
  }, []);

  // // grab a user info from local storage
  //   useEffect(() => {
  //     if (window.localStorage.getItem("userInfo")) {
  //       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //     //   console.log(userInfo.user)
  //     }
  //   }, []);

  useEffect(() => {
    const token = window.localStorage.getItem('jwtToken');
    const userInfo = window.localStorage.getItem('userInfo');

    if (token == null || userInfo === {}) {
      router.push('/auth');
    }
  }, [userData]);

  if (hide === false) {
    setTimeout(() => {
      setHide(true);
    }, 60000);
  }

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('jwtToken');
    authDispatch({
      type: LOGOUT_USER,
    });
    window.location.href = '/';
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

  const toTitleCase = (str) => str?.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );

  // console.log(userData);
  // console.log(children);
  return (
    <Layout pageTitle={`Settings: ${toTitleCase(settingsPage)}`}>
      <HomepageNav
        setData={setData}
        open={open}
        setOpen={setOpen}
        page={`settings-${settingsPage}`}
      />
      <SidebarTwo
        open={open}
        setOpen={setOpen}
        links={links}
        active="Home"
        handleClick={handleClick}
      />
      {hide === false && <ComingSoon closeClick={handleClick} />}
      <div className={styles.settingsContainer}>
        <div className={styles.accountSettings}>
          <div className={styles.settingsNavigation}>
            <div className={styles.userDataHeader}>
              <div className={styles.imgDiv}>
                <img
                  src={userData?.profilePicture || '/assets/images/profile.png'}
                  alt="avatar"
                  onClick={() => router.push(`/user/${userData?.userName}`)}
                />
              </div>
              <div className={styles.textDiv}>
                <h3>
                  {userData?.firstName && userData?.lastName
                    ? `${userData?.firstName} ${userData?.lastName}`
                    : 'no name'}
                </h3>
                <h4>
                  {userData?.userName
                    ? `@${userData?.userName}`
                    : 'no username'}
                </h4>
                <p>
                  <span onClick={() => handleLogout()}>Logout</span>
                </p>
              </div>
            </div>
            <nav>
              <div className={styles.navHeader}>
                <h1
                  style={
                    settingsPage === 'overview' ? { borderBottom: 'none' } : {}
                  }
                >
                  Account Settings
                </h1>
              </div>
              <ul>
                <li
                  className={`${styles.navHeader} ${
                    settingsPage === 'overview' && styles.activeLi
                  }`}
                >
                  <h2
                    style={{
                      borderBottom: settingsPage === 'profile' && 'none',
                    }}
                  >
                    <div className={styles.icon}>
                      <img
                        src="../../assets/images/settings/overview.svg"
                        alt="overview icon"
                        onClick={() => router.push('/settings/overview')}
                      />
                    </div>
                    <span onClick={() => router.push('/settings/overview')}>
                      Settings Overview
                    </span>
                    <div className={styles.arrow}>
                      <img
                        src={
                          settingsPage === 'overview'
                            ? '../../assets/images/settings/arrow-white.svg'
                            : '../../assets/images/settings/arrow.svg'
                        }
                        alt="arrow icon"
                        onClick={() => router.push('/settings/overview')}
                      />
                    </div>
                  </h2>
                </li>
                <li
                  className={`${styles.navHeader} ${
                    settingsPage === 'profile' && styles.activeLi
                  }`}
                >
                  <h2>
                    <div className={styles.icon}>
                      <img
                        src="../../assets/images/settings/profile.svg"
                        alt="profile icon"
                        onClick={() => router.push('/settings/profile/details')}
                      />
                    </div>
                    <span
                      onClick={() => router.push('/settings/profile/details')}
                    >
                      Profile
                    </span>
                    <div className={styles.arrow}>
                      <img
                        src={
                          settingsPage === 'profile'
                            ? '../../assets/images/settings/arrow-white.svg'
                            : '../../assets/images/settings/arrow.svg'
                        }
                        alt="arrow icon"
                        onClick={() => router.push('/settings/profile/details')}
                      />
                    </div>
                  </h2>
                </li>
                <li
                  className={`${styles.navHeader} ${
                    settingsPage === 'security' && styles.activeLi
                  }`}
                >
                  <h2
                    style={{
                      borderTop: settingsPage === 'profile' && 'none',
                      borderBottom: settingsPage === 'wallet' && 'none',
                    }}
                  >
                    <div className={styles.icon}>
                      <img
                        src="../../assets/images/settings/security.svg"
                        alt="security icon"
                        onClick={() => router.push('/settings/security/login')}
                      />
                    </div>
                    <span
                      onClick={() => router.push('/settings/security/login')}
                    >
                      Security & Login
                    </span>
                    <div className={styles.arrow}>
                      <img
                        src={
                          settingsPage === 'security'
                            ? '../../assets/images/settings/arrow-white.svg'
                            : '../../assets/images/settings/arrow.svg'
                        }
                        alt="arrow icon"
                        onClick={() => router.push('/settings/security/login')}
                      />
                    </div>
                  </h2>
                </li>
                <li
                  className={`${styles.navHeader} ${
                    settingsPage === 'wallet' && styles.activeLi
                  }`}
                >
                  <h2>
                    <div className={styles.icon}>
                      <img
                        src="../../assets/images/settings/wallet.svg"
                        alt="wallet icon"
                        onClick={() => router.push('/settings/wallet/my-wallet')}
                      />
                    </div>
                    <span
                      onClick={() => router.push('/settings/wallet/my-wallet')}
                    >
                      Wallet
                    </span>
                    <div className={styles.arrow}>
                      <img
                        src={
                          settingsPage === 'wallet'
                            ? '../../assets/images/settings/arrow-white.svg'
                            : '../../assets/images/settings/arrow.svg'
                        }
                        alt="arrow icon"
                        onClick={() => router.push('/settings/wallet/my-wallet')}
                      />
                    </div>
                  </h2>
                </li>
                <li
                  className={`${styles.navHeader} ${
                    settingsPage === 'notifications' && styles.activeLi
                  }`}
                >
                  <h2
                    style={{ borderTop: settingsPage === 'wallet' && 'none' }}
                  >
                    <div className={styles.icon}>
                      <img
                        src="../../assets/images/settings/notifications.svg"
                        alt="notifications icon"
                        onClick={() => router.push('/settings/notifications/notifications')}
                      />
                    </div>
                    <span
                      onClick={() => router.push('/settings/notifications/notifications')}
                    >
                      Notifications
                    </span>
                    <div className={styles.arrow}>
                      <img
                        src={
                          settingsPage === 'notifications'
                            ? '../../assets/images/settings/arrow-white.svg'
                            : '../../assets/images/settings/arrow.svg'
                        }
                        alt="arrow icon"
                        onClick={() => router.push('/settings/notifications/notifications')}
                      />
                    </div>
                  </h2>
                </li>
              </ul>
            </nav>
          </div>
          <div className={styles.specificSettings}>
            {settingsPage === 'overview'
              ? children
              : [children && children[0], children && children[1]]}
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default SettingsLayout;
