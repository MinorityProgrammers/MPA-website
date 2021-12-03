import styles from './search.module.css';

const PopularSearch = ({ handleTags, tag, activeSearch }) => {
  return (
    <li
      onClick={() => handleTags(tag)}
      className={`${styles.tagsItem} ${activeSearch === tag ? styles.clicked : null}`}
    >{tag}</li>
  )
}

export default PopularSearch;