import styles from "./card.module.css";

const Card = ({ title, status, date, progress }) => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <h3>{title}</h3>
        <span>Applied ({status})</span>
      </div>
      <hr className={styles.horizontal} />
      <div className={styles.footer}>
        <span className={styles.f_span}>
          Posted: {date && date.substring(0, 10)}
        </span>
        <span className={styles.s_span}>{progress}</span>
      </div>
    </div>
  );
};

export default Card;
