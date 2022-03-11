import React from 'react';
import styles from './chapter.module.scss';

const Members = () => {
  const searchHandler = (e) => {
    // const filterLocation = data.filter(
    //   (location) => location.location.toLowerCase().includes(e.target.value.toLowerCase())
    //   || location.LocationName.toLowerCase().includes(e.target.value.toLowerCase())
    //   ,
    // );
    // setLocations(filterLocation);
  };
  return (
    <div className={styles.members}>
      <div className={styles.titleContainer}>
        <h2>Chapter Members</h2>
        <h2 style={{ fontWeight: '500' }}>Total: 94</h2>
      </div>
      <div className={styles.serchBar}>
        <div>
          <input type="text" onChange={searchHandler} placeholder="Search by Location, School etc." />
        </div>
        <a>Search</a>
      </div>
      <div className={styles.cardContainer}>
        <div>
          <img src="/assets/images/teams/Barbara.png" alt="" />
          <h2>Officer Name</h2>
          <h3>President</h3>
          <p>Jan 2021 - Feb 2022</p>
          <div className="">
            <i className="fab fa-linkedin" />
            <i className="fab fa-twitter-square" />
            <i className="fab fa-facebook-square" />
          </div>
        </div>
        <div>
          <img src="/assets/images/teams/Barbara.png" alt="" />
          <h2>Officer Name</h2>
          <h3>President</h3>
          <p>Jan 2021 - Feb 2022</p>
          <div className="">
            <i className="fab fa-linkedin" />
            <i className="fab fa-twitter-square" />
            <i className="fab fa-facebook-square" />
          </div>
        </div>
        <div>
          <img src="/assets/images/teams/Barbara.png" alt="" />
          <h2>Officer Name</h2>
          <h3>President</h3>
          <p>Jan 2021 - Feb 2022</p>
          <div className="">
            <i className="fab fa-linkedin" />
            <i className="fab fa-twitter-square" />
            <i className="fab fa-facebook-square" />
          </div>
        </div>
        <div>
          <img src="/assets/images/teams/Barbara.png" alt="" />
          <h2>Officer Name</h2>
          <h3>President</h3>
          <p>Jan 2021 - Feb 2022</p>
          <div className="">
            <i className="fab fa-linkedin" />
            <i className="fab fa-twitter-square" />
            <i className="fab fa-facebook-square" />
          </div>
        </div>
        <div>
          <img src="/assets/images/teams/Barbara.png" alt="" />
          <h2>Officer Name</h2>
          <h3>President</h3>
          <p>Jan 2021 - Feb 2022</p>
          <div className="">
            <i className="fab fa-linkedin" />
            <i className="fab fa-twitter-square" />
            <i className="fab fa-facebook-square" />
          </div>
        </div>
        <div>
          <img src="/assets/images/teams/Barbara.png" alt="" />
          <h2>Officer Name</h2>
          <h3>President</h3>
          <p>Jan 2021 - Feb 2022</p>
          <div className="">
            <i className="fab fa-linkedin" />
            <i className="fab fa-twitter-square" />
            <i className="fab fa-facebook-square" />
          </div>
        </div>
        <div>
          <img src="/assets/images/teams/Barbara.png" alt="" />
          <h2>Officer Name</h2>
          <h3>President</h3>
          <p>Jan 2021 - Feb 2022</p>
          <div className="">
            <i className="fab fa-linkedin" />
            <i className="fab fa-twitter-square" />
            <i className="fab fa-facebook-square" />
          </div>
        </div>
        <div>
          <img src="/assets/images/teams/Barbara.png" alt="" />
          <h2>Officer Name</h2>
          <h3>President</h3>
          <p>Jan 2021 - Feb 2022</p>
          <div className="">
            <i className="fab fa-linkedin" />
            <i className="fab fa-twitter-square" />
            <i className="fab fa-facebook-square" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
