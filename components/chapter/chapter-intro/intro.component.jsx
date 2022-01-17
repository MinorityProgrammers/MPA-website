import React, { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import ModalVideo from 'react-modal-video';
import { useRouter } from 'next/router';
import styles from './intro.module.css';
import { errorToast } from '../../../contexts/utils/toasts';

const Intro = function ({ active }) {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();

  const handleStart = () => {
    if (active) {
      router.push(`${router.pathname}/start-a-chapter`);
    } else {
      errorToast('Please login to continue');
    }
  };

  return (
    <div className={styles.introWrapper}>
      <div className={styles.introContainer}>
        <div className={styles.tag}>01</div>
        <div className={styles.contentContainer}>
          <h1 className={styles.heading}>START CHAPTER</h1>
          <p className={styles.text}>
            Start a community of diverse developers today, and get
            <span className={styles.hideText}>the support of</span>
            {' '}
            an international network
            <span className={styles.showText}>of support!</span>
            {' '}
            <span className={styles.hideText}>of diverse talent here to empower the world!</span>
          </p>
          <div onClick={handleStart} className={styles.button}>Start Today</div>
        </div>
        <div className={styles.globeContainer}>
          <img src="/assets/images/chapter/world.png" alt="map" />
          <div onClick={() => setOpen(true)} className={styles.playIcon}><FaPlay /></div>
        </div>

        <ModalVideo channel="youtube" autoplay isOpen={isOpen} videoId="VZmd8EOj3UA" onClose={() => setOpen(false)} />
      </div>
    </div>
  );
};

export default Intro;
