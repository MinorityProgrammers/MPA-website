import React from 'react';
import styles from './search.module.css';

const SearchCategory = ({ category, handleCategory, activeSearch }) => (
  <li
    onClick={() => handleCategory(category)}
    className={`${styles.categoriesItem} ${
      category === activeSearch ? styles.clicked : null
    }`}
  >
    {category}
  </li>
);

export default SearchCategory;
