import React from 'react';
import Link from 'next/link';
import styles from './toolkitHeader.module.css';

const ToolkitHeader = () => {
  const bgImage = {
    backgroundImage: 'url(/assets/images/chapter/toolkit.png)',
  };

  return (
    <div className={styles.wrapper}>
      <div style={bgImage} className={styles.container}>
        <div className={styles.arrowBackWrapper}>
          <Link href="/chapter">
            <a>
              <div className={styles.arrowBackContainer}>
                <i
                  className={`${styles.arrowBack} fas fa-long-arrow-alt-left`}
                />
              </div>
            </a>
          </Link>
        </div>
        <div className={styles.heading}>
          <div className={styles.title}>CHAPTER TOOLKIT</div>
          <div className={styles.text}>
            Lorem ipsum dolor sit amet consectetur
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolkitHeader;
