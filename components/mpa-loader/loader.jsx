import styles from './loader.module.css';

const MpaLoader = ({ style }) => {
  let newStyle = null;

  if (style) {
    const { background, fontSize } = style;
    newStyle = { background: background && background, fontSize: fontSize && fontSize }
  }
  return (
    <div className={styles.loaderContainer}>
      <div style={newStyle} className={styles.loader}></div>
      <div style={newStyle} className={styles.loader}></div>
      <div style={newStyle} className={styles.loader}></div>
    </div>
  )
}

export default MpaLoader;

