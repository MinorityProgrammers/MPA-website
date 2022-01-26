import React from 'react';
import stylesD from '../../styles/MentorCSS/Dashboard.module.css';
import styles from '../../styles/MentorCSS/Course.module.css';

const Evaluations = () => (

  <div>
    <div className={stylesD.teamImg}>
      <img src="/assets/images/mentor/sprint.png" alt="sprint" />
      <p>EVALUATIONS</p>
    </div>
    <div className={stylesD.sprintsContainer}>
      <div
        className={
            0 % 2 === 0
              ? styles.evaluationItem
              : `${styles.evaluationItem} ${styles.oddItem}`
          }
      >
        <div
          className={
              0 % 2 === 0
                ? styles.userIcon
                : `${styles.userIcon} ${styles.oddImg}`
            }
        >
          <img src="/assets/images/mentor/Ellipse 430.png" alt="userIcon" />
        </div>
        <div className={`${styles.container} ${styles.containerE}`}>
          <div
            className={
                0 % 2 === 0
                  ? `${styles.grid} ${styles.gridE}`
                  : `${styles.grid} ${styles.gridE} ${styles.oddGrid}`
              }
          >
            <div
              className={0 % 2 === 0 ? '' : styles.oddDate}
              style={{ position: 'relative' }}
            >
              <div className={styles.postedDate}>
                <span>Posted:</span>
                {' '}
                Aug 16 2021 at 1:30pm EST
              </div>
            </div>

            <div
              className={
                  0 % 2 === 0
                    ? `${styles.courseDescription} ${styles.messageDescription}`
                    : `${styles.courseDescription} ${styles.messageDescription} ${styles.oddDescription}`
                }
            >
              <div className={styles.colTitle}>Mentor’s Introduction </div>
              <div>
                <div className={styles.event}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                  ullamco laboris Lorem ipsum dolor sit amet, consectetur
                  adipiscing el Lorem ipsum dolor sit amet, consectetur
                  adipiscing el Lorem ipsum dolor sit amet, consectetur
                  adipiscing el
                </div>
              </div>
              <div className={styles.colTitle}>3-Month Goal </div>
              <div>
                <div className={styles.event}>
                  <ul>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipiscing el
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipiscing el
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipiscing el
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
            1 % 2 === 0
              ? styles.evaluationItem
              : `${styles.evaluationItem} ${styles.oddItem}`
          }
      >
        <div
          className={
              1 % 2 === 0
                ? styles.userIcon
                : `${styles.userIcon} ${styles.oddImg}`
            }
        >
          <img src="/assets/images/mentor/Ellipse 430.png" alt="userIcon" />
        </div>
        <div className={`${styles.container} ${styles.containerE}`}>
          <div
            className={
                1 % 2 === 0
                  ? `${styles.grid} ${styles.gridE}`
                  : `${styles.grid} ${styles.gridE} ${styles.oddGrid}`
              }
          >
            <div
              className={1 % 2 === 0 ? '' : styles.oddDate}
              style={{ position: 'relative' }}
            >
              <div className={styles.postedDate}>
                <span>Posted:</span>
                {' '}
                Aug 16 2021 at 1:30pm EST
              </div>
            </div>

            <div
              className={
                  1 % 2 === 0
                    ? `${styles.courseDescription} ${styles.messageDescription}`
                    : `${styles.courseDescription} ${styles.messageDescription} ${styles.oddDescription}`
                }
            >
              <div className={styles.colTitle}>Mentor’s Introduction </div>
              <div>
                <div className={styles.event}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                  ullamco laboris Lorem ipsum dolor sit amet, consectetur
                  adipiscing el Lorem ipsum dolor sit amet, consectetur
                  adipiscing el Lorem ipsum dolor sit amet, consectetur
                  adipiscing el
                </div>
              </div>
              <div className={styles.colTitle}>3-Month Goal </div>
              <div>
                <div className={styles.event}>
                  <ul>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipiscing el
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipiscing el
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipiscing el
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={styles.buttonEvaluation}>
      <button type="button">Reply to Message</button>
    </div>
  </div>
);
export default Evaluations;
