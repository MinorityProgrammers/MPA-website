import React, { useRef, useState } from 'react';
import Link from 'next/link';
import styles from './toolkitContent.module.css';
import Document from '../chapter-document/document.component';

const ToolkitContent = ({ data, links }) => {
  const { name, subtitle, description, documents, slug } = data;
  const [scrollPos, setScrollPos] = useState(0);
  const menuRef = useRef(null);

  const linkBg = (link) => ({
    background: link === slug ? '#151371' : '#c9c5c5',
  });

  const linkColor = (link) => ({
    color: link === slug ? 'white' : 'gray',
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.linkContainer}>
          <div
            onClick={() => {
              menuRef.current.scrollLeft = scrollPos - 300;
            }}
            className={styles.arrowLeft}
          >
            {' '}
            <img
              className={styles.arrow}
              src="/assets/images/chapter/arrow-double-left.png"
              alt="arrow-left"
            />{' '}
          </div>
          <div
            className={styles.links}
            onScroll={() => setScrollPos(menuRef.current.scrollLeft)}
            ref={menuRef}
          >
            {links.map(({ link, link_name }, idx) => (
              <div
                key={`${idx + 1}`}
                className={styles.link}
                style={linkBg(link)}
              >
                <Link href={`/chaptertoolkit/${link}`}>
                  <a>
                    <div style={linkColor(link)}>{link_name}</div>
                  </a>
                </Link>
              </div>
            ))}
          </div>
          <div
            onClick={() => {
              menuRef.current.scrollLeft = scrollPos + 300;
            }}
            className={styles.arrowRight}
          >
            {' '}
            <img
              className={styles.arrow}
              src="/assets/images/chapter/arrow-double-right.png"
              alt="arrow-right"
            />{' '}
          </div>
        </div>

        <div className={styles.title}>{name}</div>
        <div className={styles.subtitle}>{subtitle}</div>
        <div className={styles.description}>{description}</div>
        <div className={styles.menu}>
          <div className={styles.info}>Documents and Downlaods</div>
          {documents.map((document, idx) => (
            <Document key={`${idx + 1}`} {...document} id={idx + 1} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolkitContent;
