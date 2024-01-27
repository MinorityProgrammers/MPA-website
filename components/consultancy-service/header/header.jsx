import styles from './header.module.css';

const Header = () => {
  return (
    <div
      style={{ backgroundImage: 'url(/assets/consultancy/star-bg.svg)' }}
      className={styles.container}
    >
      <div className={styles.content}>
        <h1>
          {' '}
          We build Web2 & Web3 businesses from ideation to MVP to Production,
          FAST!
        </h1>
        <p>
          A one stop shop; we work with clients to reach optimal product market
          fit, all the while building scalable applications ready for users in
          both the traditional Web2 space and the emerging Web3 markets. A
          diversity focused organization; we build sustainably w/wellness
          ingrained into our company culture.
        </p>
        <a className={styles.link} href="/partner">
          Set partnership meeting
        </a>
      </div>
      <img
        className={styles.banner}
        src="/assets/consultancy/consultancy-banner.svg"
        alt=""
      />
      <img
        className={styles.elipse}
        src="/assets/consultancy/elipse-lg.svg"
        alt=""
      />
    </div>
  );
};

export default Header;
