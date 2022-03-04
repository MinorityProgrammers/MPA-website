import styles from './services.module.css';
import { services } from './services.script';

const Services = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Our  Services</h1>
      <p className={styles.description}>
        We are a one stop shop; we work with clients to reach optimal product market fit,
        all the while building scalable applications ready for users
        in both the traditional web2 space and the emerging web3 markets.
      </p>
      <div className={styles.cardWrapper}>
        {
          services.map((service, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardIcon}>
                <img src={service.icon} alt="" />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <div className={styles.cardList}>
                  {
                    service.list.map((item, index) => (
                      <div key={index} className={styles.cardItem}>
                        <img src='/assets/consultancy/services-icon-tick.svg' alt="" />
                        <p>{item}</p>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          ))
        }
      </div >
      <img className={styles.wave} src='/assets/consultancy/wave-bg.svg' alt="" />
      <img className={styles.elipse} src='/assets/consultancy/elipse-sm.svg' alt="" />
      <img className={styles.circle} src='/assets/consultancy/circle.svg' alt="" />
      <img className={styles.serviceBg} src='/assets/consultancy/service-bg' alt="" />
    </div >
  )
}

export default Services;