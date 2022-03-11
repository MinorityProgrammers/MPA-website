import React from 'react';
import styles from './chapter.module.scss';

const Overview = () => (

  <div className={styles.overviewSection}>
    <h2>About Chapter</h2>
    <p>
      James Madison University aims to buid upon the founding principles
      of Minority Programmers and uplift and encourage
      diverse students of STEM. We welcome all STEM
      students actively pursuing a degree at our campus.
    </p>
    <h2>Mission</h2>
    <p>
      We are an international network of developers
      unifying together to build socially impactful
      projects & spread STEM education to marginalized
      communities. MPA Miami Chapter was created to Empowering
      all young people, who need us most, to reach their full
      potential as caring, productive, and  responsible citizens.
    </p>
    <h2>Chapter Officers</h2>
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
    </div>
  </div>

);

export default Overview;
