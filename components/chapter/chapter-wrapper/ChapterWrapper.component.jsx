import styles from './ChapterWrapper.module.css';

const ChapterWrapper = function ({ children }) {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  );
};

export default ChapterWrapper;
