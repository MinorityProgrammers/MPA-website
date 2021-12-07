import styles from './candidate_card.module.css';

const CandidateCard = function ({ name, description, image }) {
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <h1>{name}</h1>
        <span>{description}</span>
        <h5 className={styles.new}>New</h5>
      </div>
      <div className={styles.side_image}>
        <img
          className={styles.image}
          src={image || '/assets/images/profile.jpg'}
          alt={name}
        />
      </div>
    </div>
  );
};

export default CandidateCard;
