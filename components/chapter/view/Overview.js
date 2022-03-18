import React from 'react';
import styles from './chapter.module.scss';

const Overview = ({ location }) => {
  const dataFormat = (joinDate) => {
    const date = new Date(joinDate);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'short' });
    return `${month} ${year}`;
  };
  return (

    <div className={styles.overviewSection}>
      <h2>About Chapter</h2>
      <p>
        {location.description}
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
          <img src={location.added_by?.profilePicture} alt="" />
          <h2>{`${location.added_by?.firstName} ${location.added_by?.lastName}`}</h2>
          <h3>President</h3>
          <p>
            {dataFormat(location.createdAt)}
            {' '}
            -
            {' '}
            {dataFormat(new Date().toString())}
          </p>
          <div className="">
            <a href={location.added_by?.LinkedinLink}>
              <i className="fab fa-linkedin" />
            </a>
            <a href={location.added_by?.FacebookLink}>
              <i className="fab fa-facebook-square" />
            </a>

          </div>
        </div>
      </div>
    </div>

  );
};

export default Overview;
