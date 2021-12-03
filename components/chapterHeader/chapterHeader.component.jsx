import styles from './chapterHeader.module.css';
const ChapterHeader = () => {
  return (
    <div className={`${styles.headerWrapper}`}>
      <div className={styles.headerContainer}>
        <div className={styles.textWrapper}>
          <div className={styles.textContainer}>
            <div className={styles.mainText}>START A CHAPTER</div>
            <div className={styles.subText}>Start a local Minority Programmers chapter today!</div>
          </div>
        </div>
        <img className={styles.icon} src="/assets/images/chapter-globe.svg" alt="globe" />
      </div>
    </div>
  )
}

export default ChapterHeader;



