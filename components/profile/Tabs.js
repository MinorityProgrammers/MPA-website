import React from 'react';
import styles from './styles/tabs.module.css';

const Tabs = ({ tabsActive, setTabsActive }) => (
  <section className="incubator-wrapper">
    <div className="tw-flex tw-justify-center container">
      <div className="row tw-w-full" style={{ paddingTop: '100px' }}>

        {/* <div className="col-4" style={{ padding: '0' }}>
          <div
            className={styles.alliesHeader}
            onClick={() => setTabsActive(
              { nfts: true, badges: false, userCourses: false },
            )}
          >
            <h2 className={`${tabsActive.nfts ? '' : styles.inactive}`}>NFTs</h2>
            <div className={`${styles.line} ${tabsActive.nfts ? styles.lineActive : ''}`} />
          </div>
        </div> */}
        <div className="col-4" style={{ padding: '0' }}>
          <div
            className={styles.alliesHeader}
            onClick={() => setTabsActive(
              { nfts: false, userCourses: false, badges: true },
            )}
          >
            <h2 className={`${tabsActive.badges ? '' : styles.inactive}`}>badges</h2>
            <div className={`${styles.line} ${tabsActive.badges ? styles.lineActive : ''}`} />

          </div>

        </div>
        <div className="col-4" style={{ padding: '0' }}>
          <div
            className={styles.alliesHeader}
            onClick={() => setTabsActive(
              { nfts: false, badges: false, userCourses: true },
            )}
          >
            <h2 className={`${tabsActive.userCourses ? '' : styles.inactive}`}>Enrolled Courses</h2>
            <div className={`${styles.line} ${tabsActive.userCourses ? styles.lineActive : ''}`} />

          </div>

        </div>
      </div>
    </div>
  </section>
);

export default Tabs;
