import React from 'react';
import Link from 'next/link';
import styles from './toolkit.module.css';

const ToolkitItem = ({ name, image, slug }) => (
  <div className={styles.container}>
    <Link
      href={{
        pathname: '/chaptertoolkit/[slug]',
        query: { slug },
      }}
    >
      <a>
        <div className={styles.overlay} />
        <img src={image} alt="icon" />
        <div className={styles.name}>{name}</div>
      </a>
    </Link>
  </div>
);

export default ToolkitItem;
