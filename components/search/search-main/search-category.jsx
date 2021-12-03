import styles from './search.module.css';

const SearchCategory = ({ category, handleCategory, activeSearch }) => {
  return (
    <li
      onClick={() => handleCategory(category)}
      className={`${styles.categoriesItem} ${category === activeSearch ? styles.clicked : null}`}
    >{category}</li>
  )
}

export default SearchCategory