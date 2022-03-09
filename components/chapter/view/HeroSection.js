import React from 'react';
import styles from './chapter.module.scss';

const HeroSection = () => {
  const r = 0;
  return (
    <section>
      <div style={{ paddingTop: '10rem' }} className="container">
        <div className={`${styles.HeroContanier}`}>
          <div className={styles.left}>
            <div className={styles.title}>
              <img src="/assets/images/chapter/mpa-logo.png" alt="logo" />
              <div>
                <h2>James Madison University Chapter</h2>
                <div className={styles.location}>
                  <i className="fas fa-map-marked-alt" />
                  <h2>Main St, Harrisonburg, US</h2>
                </div>
              </div>

            </div>

          </div>
          <div className={styles.right}>
            <p>Advisor:Billy Campbell</p>
            <p>Type::National</p>
            <a>Join Chapter</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
