import styles from './chapterToolkit.module.css';
import { toolkits } from '../data/toolkits';
import ToolkitItem from '../chapter-toolkit-item/toolkit.component';

const Toolkit = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.tag}>02</div>
      <div className={styles.container}>
        <div className={styles.heading}>CHAPTER TOOLKIT</div>
        <div className={styles.text}>Check out our valuable resources to get insight on our chapters.</div>
        <div className={styles.menu}>
          {
            toolkits && toolkits.map(toolkit => (
              <ToolkitItem key={toolkit.slug} {...toolkit} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Toolkit;