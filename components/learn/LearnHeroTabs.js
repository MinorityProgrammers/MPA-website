import React from 'react';
import styles from './learn-css/LearnHeroTabs.module.css';

const LearnHeroTabs = ({ tabsActive, setTabsActive }) => (
  <section className="incubator-wrapper">
    <div className="tw-flex tw-justify-center container">
      <div className="row tw-w-full" style={{ paddingTop: '100px' }}>
        <div className="col-4" style={{ padding: '0' }}>
          <div
            className={styles.alliesHeader}
            onClick={() => setTabsActive(
              { courses: true, certificates: false, userCourses: false },
            )}
          >
            <h2 className={`${tabsActive.courses ? '' : styles.inactive}`}>Browse Courses</h2>
            <div className={`${styles.line} ${tabsActive.courses ? styles.lineActive : ''}`} />
          </div>
        </div>
        <div className="col-4" style={{ padding: '0' }}>
          <div
            className={styles.alliesHeader}
            onClick={() => setTabsActive(
              { courses: false, certificates: false, userCourses: true },
            )}
          >
            <h2 className={`${tabsActive.userCourses ? '' : styles.inactive}`}>My Courses</h2>
            <div className={`${styles.line} ${tabsActive.userCourses ? styles.lineActive : ''}`} />

          </div>

        </div>
        <div className="col-4" style={{ padding: '0' }}>
          <div
            className={styles.alliesHeader}
            onClick={() => setTabsActive(
              { courses: false, userCourses: false, certificates: true },
            )}
          >
            <h2 className={`${tabsActive.certificates ? '' : styles.inactive}`}>Certificates</h2>
            <div className={`${styles.line} ${tabsActive.certificates ? styles.lineActive : ''}`} />

          </div>

        </div>
      </div>
    </div>
  </section>
);

export default LearnHeroTabs;
