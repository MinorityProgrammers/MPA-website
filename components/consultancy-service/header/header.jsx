import styles from './header.module.css';

const Header = () => {
  return (
    <div style={{ backgroundImage: 'url(/assets/consultancy/star-bg.svg)' }} className={styles.container}>
      <div className={styles.content}>
        <h1> We build Web2 & Web3 businesses from ideation to MVP to Production, FAST!</h1>
        <p>Get your idea turned into a complete web application ready for market with
          our transparent task-based escrow system that gives you as client,
          the control over how your product is being built.
        </p>
        <a className={styles.link} href="/partner">
          Set partnership meeting
        </a>
      </div>
      <img className={styles.banner} src='/assets/consultancy/consultancy-banner.svg' alt="" />
      <img className={styles.elipse} src='/assets/consultancy/elipse-lg.svg' alt="" />
    </div>
  )
}

export default Header;