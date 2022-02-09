import React, {
  useEffect, useState, useContext, useRef,
} from 'react';
import { useRouter } from 'next/router';
import decode from 'jwt-decode';
import { Modal } from 'antd';
import Layout from '../Layout';
import HomepageNav from '../homepage/HomepageNav';
import SidebarTwo from '../sidebar/SidebarTwo';
import { GlobalContext } from '../../contexts/provider';
import { LOGOUT_USER } from '../../contexts/actions/actionTypes';
import getProfile from '../../contexts/actions/profile/getProfile';
import links from '../../contexts/utils/links';
import Footer from '../Footer';
import useDetectOutsideClick from '../UseDetectOutsideClick';
import styles from '../../styles/settings/settingsLayout.module.scss';

const SettingsLayout = ({ setData, children, settingsPage }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, false);
  const [userData, setUserData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    // Model
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
        <div className="container tw-flex-col tw-justify-center">
          <div className={styles.headerSection}>
            <img src="/assets/images/arrow-left-circle.svg" alt="complete" />
            <p>Complete Setup</p>
          </div>
          <div className={`${styles.accountSettings}`}>
            <div className={styles.settingsNavigation}>
              <div className={styles.navContainer}>
                <div className={styles.userDataHeader}>
                  <div className={styles.imgDiv} onClick={showModal}>
                    <img
                      src={userData?.profilePicture || '/assets/images/profile.png'}
                      className={styles.profileImg}
                      alt="avatar"
                    />
                    <img
                      src="../../assets/images/settings/camera-icon.svg"
                      alt="change avater"
                      className={styles.editIcon}
                    />
                    <div>View</div>
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
                        settingsPage === 'overview' && styles.activeLi
                      }`}
                    >
                      <h2>
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
