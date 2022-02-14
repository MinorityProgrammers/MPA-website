import React, {
  useEffect, useState, useContext, useRef, useCallback,
} from 'react';
import { useRouter } from 'next/router';
import decode from 'jwt-decode';
import { Modal } from 'antd';
import Layout from '../Layout';
import HomepageNav from '../homepage/HomepageNav';
import SidebarTwo from '../sidebar/SidebarTwo';
import ProfileTwoGenerateAvatarPopUp from '../ProfileTwoGenerateAvatarPopUp';
import { GlobalContext } from '../../contexts/provider';
import { LOGOUT_USER } from '../../contexts/actions/actionTypes';
import getProfile from '../../contexts/actions/profile/getProfile';
import links from '../../contexts/utils/links';
import Footer from '../Footer';
import useDetectOutsideClick from '../UseDetectOutsideClick';
import getProgressPercentage from '../../contexts/utils/settings/getProgressPercentage';
import styles from '../../styles/settings/settingsLayout.module.scss';

const SettingsLayout = ({
  setData, children, settingsPage, setTabsActive, tabsActive,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, false);
  const [userData, setUserData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [generateAvatarPopUp, setGenerateAvatarPopUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [changeInProfile, setChangeInProfile] = useState(false);

  const router = useRouter();
  const handleClick = () => {
    setHide(!hide);
  };

  // states from global context
  const { profileDispatch, authDispatch } = useContext(GlobalContext);

  // grab a token from local storage so as user info
  useEffect(() => {
    if (window.localStorage.getItem('jwtToken')) {
      getProfile(setUserData)(profileDispatch);
    }
  }, []);
  useEffect(() => {
    if (!isLoggedIn) {
      setGenerateAvatarPopUp(false);
    }
  }, [isLoggedIn]);
  const clickOutsideAvatarPopup = useCallback((e) => {
    if (e.target.className === 'avatar-popup-wrap') {
      setGenerateAvatarPopUp(false);
      window.removeEventListener('click', clickOutsideAvatarPopup);
    }
  }, []);
  useEffect(() => {
    if (generateAvatarPopUp) {
      window.addEventListener('click', clickOutsideAvatarPopup);
    } else {
      window.removeEventListener('click', clickOutsideAvatarPopup);
    }
  }, [generateAvatarPopUp]);

  useEffect(() => {
    const token = window.localStorage.getItem('jwtToken');
    const userInfo = window.localStorage.getItem('userInfo');

    if (token == null || userInfo === {}) {
      router.push('/auth');
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [userData]);

  useEffect(() => {
    if (window.localStorage.getItem('jwtToken')) {
      getProfile(setUserData)(profileDispatch);
    }
  }, [changeInProfile]);

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

  const returnHandler = () => {
    const slug = userData?.userName;
    if (slug) {
      router.push(`/user/${slug}`);
    }
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
    // Model
  const showModal = () => {
    if (userData.profilePicture) {
      setIsModalVisible(true);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // Progress bar
  const getProgressBar = () => {
    const prg = getProgressPercentage(userData);
    let barPrg1 = 0;
    let barPrg2 = 0;
    if (prg <= 50) {
      barPrg1 = (prg / 100) * 185;
    }
    if (prg > 50) {
      barPrg1 = 185;
      barPrg2 = ((prg - 50) / 100) * 360;
    }
    return { barPrg1, barPrg2 };
  };
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
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        closable={false}
        // width="fit-contnet"
        style={{ width: 'fit-contnet' }}
        wrapClassName="setting__profile-img-model"
      >
        <img
          src={userData?.profilePicture || '/assets/images/profile.png'}
          alt="avatar"
        />
      </Modal>
      <div className={styles.settingsContainer}>
        {generateAvatarPopUp && (
        <div className="avatar-popup-wrap">
          <div className="profile-two-generate-avatar-popup">
            <ProfileTwoGenerateAvatarPopUp
              loggedInUserData={userData}
              userID={userData._id}
              setGenerateAvatarPopUp={setGenerateAvatarPopUp}
              setChangeInProfile={setChangeInProfile}
            />
          </div>
        </div>
        )}
        <div className="container tw-flex-col tw-justify-center">
          <div className={`tw-relative ${styles.backgroundShdow}`}>
            <div />
            <img src="/assets/images/home-page/about-title-icon.svg" alt="bg" />
          </div>
          <div className={styles.headerSection}>
            <img src="/assets/images/arrow-left-circle.svg" alt="complete" onClick={returnHandler} />
            <p>Complete Setup</p>
          </div>
          <div className={`${styles.accountSettings}`}>
            <div className={styles.settingsNavigation}>
              <div className={`${styles.navContainer} ${tabsActive.profile ? '' : styles.navProfile}`}>
                <div className={`tw-w-full ${tabsActive.profile ? '' : 'm-auto'}`}>
                  <div className={styles.userDataHeader}>
                    <div className={styles.imgDiv}>
                      <img
                        src={userData?.profilePicture || '/assets/images/profile.png'}
                        className={styles.profileImg}
                        onClick={showModal}
                        alt="avatar"
                      />
                      <img
                        src="../../assets/images/settings/camera-icon.svg"
                        alt="change avater"
                        onClick={() => { setIsModalVisible(false); setGenerateAvatarPopUp(true); }}
                        className={styles.editIcon}
                      />
                      <div onClick={showModal}>View</div>
                    </div>
                    <div className={styles.textDiv}>
                      <p>
                        <span>{userData.email}</span>
                      </p>
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
                    </div>
                  </div>
                  <nav>
                    <ul>
                      <li
                        className={`${styles.navHeader} ${
                          tabsActive.overview && styles.activeLi
                        }`}
                      >
                        <h2
                          onClick={() => setTabsActive({ overview: true, profile: false })}
                        >
                          <div className={styles.icon}>
                            <img
                              src="../../assets/images/settings/overview.svg"
                              alt="overview icon"
                            />
                          </div>
                          <span>
                            Settings Overview
                          </span>
                        </h2>
                      </li>
                      <li
                        className={`${styles.navHeader} ${
                          tabsActive.profile && styles.activeLi
                        }`}
                      >
                        <h2
                          onClick={() => setTabsActive({ overview: false, profile: true })}
                        >
                          <div
                            className={styles.icon}
                          >
                            <img
                              src="../../assets/images/settings/profile.svg"
                              alt="profile icon"
                            />
                          </div>
                          <span>
                            Profile
                          </span>
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
                        </h2>
                      </li>
                    </ul>
                    <div className={styles.lineContainer}>
                      <div className={styles.line} />
                    </div>
                    <div className="tw-flex tw-justify-center">
                      <p className={styles.btnSignOut} onClick={() => handleLogout()}>Sign out</p>
                    </div>
                  </nav>
                </div>
              </div>
              {tabsActive.profile
              && (
              <div className={styles.layoutProgress}>
                <div className={`${styles.progress} ${styles.blue}`}>
                  <span className={styles.progressLeft}>
                    <span style={{ transform: `rotate(${getProgressBar().barPrg2}deg)` }} className={styles.progressBar} />
                  </span>
                  <span className={styles.progressRight}>
                    <span style={{ transform: `rotate(${getProgressBar().barPrg1}deg)` }} className={styles.progressBar} />
                  </span>
                  <div className={styles.progressValue}>
                    <p>
                      {getProgressPercentage(userData)}
                      <span>%</span>

                    </p>
                  </div>
                </div>
                {getProgressPercentage(userData) === 100 && <p>Completed</p>}
              </div>
              )}

            </div>

            <div className={styles.specificSettings}>
              {settingsPage === 'overview'
                ? children
                : [children && children[0], children && children[1]]}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default SettingsLayout;
