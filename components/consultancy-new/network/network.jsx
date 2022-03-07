import styles from "./network.module.css";

const Connect = () => {
  return (
    <div style={{backgroundImage: 'url(/assets/consultancy/grid-bg.svg)'}} className={styles.container}>
      <div className={styles.icon}>
        <img src='/assets/consultancy/connect-icon.svg' alt="" />
      </div>
      <div className={styles.content}>
        <h3>Get in Touch </h3>
        <p>Let’s help you build  a digital solution that is scalable </p>
        <button>Set Partnership Meeting</button>
      </div>
    </div>
  )
}

export default Connect;