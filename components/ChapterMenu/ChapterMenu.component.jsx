import React from 'react';
import styles from './ChapterMenu.module.css';

const ChapterMenu = () => (
  <div className={styles.menuWrapper}>
    <div className={styles.menuContainer}>
      <section className={styles.item1}>
        <div>Chapter Checklist</div>
      </section>
      <section className={styles.item2}>
        <div className={styles.iconAndTextContainer}>
          <img
            className={styles.icon}
            src="/assets/images/check-circle-outline.svg"
            alt="globe"
            style={{ fill: 'black' }}
          />
          <div className={styles.text}>Find Advisor</div>
        </div>
        <meter className={styles.meter} value="5" min="0" max="10" />
      </section>

      <section className={styles.item3}>
        <div className={styles.iconAndTextContainer}>
          <img
            className={styles.icon}
            src="/assets/images/check-circle-outline.svg"
            alt="globe"
            style={{ fill: 'red' }}
          />
          <div className={styles.text}>Hold An Interest Meeting</div>
        </div>
        <meter className={styles.meter} value="5" min="0" max="10" />
      </section>

      <section className={styles.item4}>
        <div className={styles.iconAndTextContainer}>
          <img
            className={styles.icon}
            src="/assets/images/check-circle-outline.svg"
            alt="globe"
          />
          <div className={styles.text}>Sign Chapter Agreement Form</div>
        </div>
        <meter className={styles.meter} value="5" min="0" max="10" />
      </section>

      <section className={styles.item5}>
        <div className={styles.iconAndTextContainer}>
          <img
            className={styles.icon}
            src="/assets/images/check-circle-outline.svg"
            alt="globe"
          />
          <div className={styles.text}>Find Your Team</div>
        </div>
        <meter className={styles.meter} value="5" min="0" max="10" />
      </section>

      <section className={styles.item6}>
        <div className={styles.iconAndTextContainer}>
          <img
            className={styles.icon}
            src="/assets/images/check-circle-outline.svg"
            alt="globe"
          />
          <div className={styles.text}>Get On Technologes</div>
        </div>
        <meter className={styles.meter} value="5" min="0" max="10" />
      </section>

      <section className={styles.item7}>
        <div className={styles.iconAndTextContainer}>
          <img
            className={styles.icon}
            src="/assets/images/check-circle-outline.svg"
            alt="globe"
          />
          <div className={styles.text}>Develop Socially Impactful Project</div>
        </div>
        <meter className={styles.meter} value="5" min="0" max="10" />
      </section>

      <section className={styles.item8}>
        <div className={styles.iconAndTextContainer}>
          <img
            className={styles.icon}
            src="/assets/images/check-circle-outline.svg"
            alt="globe"
          />
          <div className={styles.text}>
            Host Meetings Workshops Carreer Development
          </div>
        </div>
        <meter className={styles.meter} value="5" min="0" max="10" />
      </section>
    </div>
  </div>
);

export default ChapterMenu;
