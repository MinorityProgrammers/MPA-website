import React from 'react';
import styles from './chapter.module.scss';

const Resources = () => {
  const searchHandler = (e) => {
    // const filterLocation = data.filter(
    //   (location) => location.location.toLowerCase().includes(e.target.value.toLowerCase())
    //   || location.LocationName.toLowerCase().includes(e.target.value.toLowerCase())
    //   ,
    // );
    // setLocations(filterLocation);
  };
  return (
    <div className={styles.resources}>
      <h2>Resource Center</h2>
      <div className={styles.serchBar}>
        <div>
          <input type="text" onChange={searchHandler} placeholder="Search by Location, School etc." />
        </div>
        <a>Search</a>
      </div>
      <div className={styles.grid}>
        <div className={styles.left}>
          <div>
            Chapter Documents
          </div>
          <div>
            Chapter Constitution
          </div>
          <div>
            Meetings Minutes
          </div>
          <div>
            Chapter Documents
          </div>
        </div>
        <div className={styles.right}>
          <div>
            <img src="/assets/images/chapter/mpa-logo.png" alt="MPA Logo" />
            <div className={styles.detail}>
              <h2>First MPA Constitution Amendment</h2>
              <p>01 Jan 2017</p>
            </div>
          </div>
          <div>
            <img src="/assets/images/chapter/mpa-logo.png" alt="MPA Logo" />
            <div className={styles.detail}>
              <h2>First MPA Constitution Amendment</h2>
              <p>01 Jan 2017</p>
            </div>
          </div>
          <div>
            <img src="/assets/images/chapter/mpa-logo.png" alt="MPA Logo" />
            <div className={styles.detail}>
              <h2>First MPA Constitution Amendment</h2>
              <p>01 Jan 2017</p>
            </div>
          </div>
          <div>
            <img src="/assets/images/chapter/mpa-logo.png" alt="MPA Logo" />
            <div className={styles.detail}>
              <h2>First MPA Constitution Amendment</h2>
              <p>01 Jan 2017</p>
            </div>
          </div>
          <div>
            <img src="/assets/images/chapter/mpa-logo.png" alt="MPA Logo" />
            <div className={styles.detail}>
              <h2>First MPA Constitution Amendment</h2>
              <p>01 Jan 2017</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
