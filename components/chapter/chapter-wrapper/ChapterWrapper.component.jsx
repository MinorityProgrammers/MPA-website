import React from 'react';
import styles from './ChapterWrapper.module.css';

const ChapterWrapper = ({ children }) => (
  <div className={styles.wrapper}>{children}</div>
);

export default ChapterWrapper;
