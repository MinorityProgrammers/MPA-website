import React from 'react';
import { useRouter } from 'next/router';
import styles from './intro.module.css';
import { errorToast } from '../../../contexts/utils/toasts';

const Intro = ({ active }) => {
  const router = useRouter();

  const handleStart = () => {
    if (active) {
      router.push(`${router.pathname}/start-a-chapter`);
    } else {
      errorToast('Please login to continue');
    }
  };

  return (
    <div className={`${styles.introWrapper}`}>
      <div className={`container ${styles.introContainer}`}>
        <div className={styles.contentContainer}>
          <div onClick={handleStart} className={styles.button}>
            Chapters
          </div>
          <h1 className={styles.heading}>START CHAPTER</h1>
          <p className={styles.text}>
            Start a community of diverse developers today, and get
            <span className={styles.hideText}>the support of</span>
            {' '}
            an
            international network
            <span className={styles.showText}>of support!</span>
            {' '}
            <span className={styles.hideText}>
              of diverse talent here to empower the world!
            </span>
          </p>
        </div>
        <div className={styles.globeContainer}>
          <img src="/assets/images/chapter/hero.svg" alt="map" />
        </div>
        <div className={styles.imgText}>
          <p>
            Join the Coding revolution! Learn, code, and build socially
            impactiful projects with other creative minorities
          </p>
          <div onClick={handleStart} className={styles.button}>
            Start Now
          </div>
        </div>
      </div>
      <div className={styles.bgImg}>
        <img src="/assets/images/home-page/about-us-bg.svg" alt="" />
      </div>
      <div className={styles.bgBlue} />
    </div>
  );
};

export default Intro;
