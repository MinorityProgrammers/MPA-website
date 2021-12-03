import styles from './ChapterWrapper.module.css';

const ChapterWrapper = ({children}) => {
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    )
}

export default ChapterWrapper;