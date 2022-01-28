import React from 'react';
import Link from 'next/link';
import styles from './startups-card.module.css';
import { numFormat, percentFund } from '../../../helpers/formatIncubator';

const StartupsCard = ({ data }) => {
  const {
    startupImage, name, about, targetAmount, amount, _id,
  } = data;

  return (
    <div className={styles.container}>
      <div className={styles.name_image}>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={startupImage} alt="startup" />
        </div>
        <div className={styles.name}>{name}</div>
      </div>
      <div className={styles.about}>
        {`${about && about.substring(0, 50)}...`}
      </div>

      <div className={styles.fundContainer}>
        <div className={styles.fundTitle}>Fundraised</div>
        <div className={styles.fundRate}>
          {percentFund(targetAmount, amount)}
          % complete
        </div>
      </div>

      <div className={styles.fundRaised}>
        $
        {numFormat(amount)}
        /$
        {numFormat(targetAmount)}
      </div>
      <div className={styles.fundBar}>
        <div
          style={{ width: `${percentFund(targetAmount, amount)}%` }}
          className={styles.reading}
        />
      </div>
      <Link href={`/startup/${_id}`}>
        <a>
          <div className={styles.more}>Learn More</div>
        </a>
      </Link>
    </div>
  );
};

export default StartupsCard;
