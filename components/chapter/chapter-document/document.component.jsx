import React, { useState, useEffect } from 'react';
import styles from './documents.module.css';

const Document = ({ title, subtitle, download_link, id }) => {
  const [blob, setBlob] = useState(null);

  useEffect(() => {
    if (!download_link) return;
    fetch(download_link, {
      method: 'GET',
    })
      .then((res) => res.blob())
      .then((blobRes) => URL.createObjectURL(blobRes))
      .then((blobUrl) => setBlob(blobUrl));
  }, [download_link]);

  const isEven = () => {
    if (parseInt(id) % 2 === 0) return true;
    return false;
  };

  return (
    <div
      className={`${styles.container} ${isEven() ? styles.even : styles.odd}`}
    >
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
      <a href={blob} className={styles.downloadButton} download={title}>
        <div>Download</div>
      </a>
    </div>
  );
};

export default Document;
