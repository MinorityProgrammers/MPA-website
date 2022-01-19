import React, { useRef, useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import styles from './Reset.module.scss';
import Layout from '../../components/Layout';
import HomepageNav from '../../components/homepage/HomepageNav';
import Footer from '../../components/Footer';
import SidebarTwo from '../../components/sidebar/SidebarTwo';
import links from '../../contexts/utils/links';
import ComingSoon from '../../components/ComingSoon';
import { useDetectOutsideClick } from '../../components/UseDetectOutsideClick';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, true);
  const [data, setData] = useState([]);
  const handleClick = () => {
    setHide(!hide);
  };
  if (hide === false) {
    setTimeout(() => {
      setHide(true);
    }, 10000);
  }

  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <Layout pageTitle='MPA - Password'>
        <HomepageNav
          open={open}
          setData={setData}
          setOpen={setOpen}
          page='auth'
        />
        <SidebarTwo open={open} setOpen={setOpen} links={links} active='Home' />
        <>
          {hide === false && <ComingSoon closeClick={handleClick} />}
          <div
            style={{ marginTop: '0' }}
            className='tw-mx-24 tw-my-32 md:tw-mx-4'
          >
            <div className={styles.cardContainer}>
              <ToastContainer limit={3} />
              <div className={`${styles.cardLeft} tw-mt-40`}>
                <div className={styles.contentContainer}>
                  <div className={styles.cardLeftLogo}>
                    <img
                      src='./assets/images/mpicon.svg'
                      alt='icon'
                      className={styles.logo}
                    />
                  </div>
                  <div className={styles.innerText}>
                    <h1>WELCOME BACK</h1>
                    <span>
                      To keep connecting with us please
                      <br />
                      register with your personal info.
                    </span>
                  </div>
                </div>
              </div>
              <div className={`${styles.cardRight} tw-mt-40`}>
                <div className={styles.cardRightText}>
                  <h2>SET NEW PASSWORD</h2>
                </div>
                <div>
                  <form>
                    <div className='mb-3'>
                      <span className={`${styles.inputLabel} form-label`}>
                        New Password
                      </span>
                      <input
                        style={{
                          backgroundImage:
                            "url('./assets/images/lock-icon.svg')",
                        }}
                        minLength={8}
                        maxLength={128}
                        type='password'
                        className={styles.passInput}
                        placeholder='Password'
                      />
                    </div>
                    <div className='mb-3'>
                      <span className={`${styles.inputLabel} form-label`}>
                        Confirm Password
                      </span>

                      <input
                        style={{
                          backgroundImage:
                            "url('./assets/images/lock-icon.svg')",
                        }}
                        minLength={8}
                        maxLength={128}
                        type='password'
                        className={styles.passInput}
                        placeholder='Password'
                      />
                    </div>
                  </form>
                </div>
                <div>
                  <input
                    className={styles.submit}
                    type='submit'
                    value='Reset Password'
                  />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      </Layout>
    </div>
  );
};

export default Index;
