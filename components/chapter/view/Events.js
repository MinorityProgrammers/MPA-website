import React from 'react';
import styles from './chapter.module.scss';

const Events = () => (
  <div className={styles.events}>
    <div className="tw-flex tw-justify-between">
      <h2>Chapter Events</h2>
      <div className={styles.topPartBtns}>
        <p>Upcoming</p>
        <a>Past Events</a>
      </div>
    </div>
    <div className={styles.eventsCard}>
      <div>
        <img src="/assets/images/mcweadon.png" alt="event cover" />
        <div className={styles.detail}>
          <h2>
            GovTech Virtual & Hybrid Hackathon 2022
          </h2>
          <p>
            Empowering all young people, who need us most,
            to react their full potential as caring, productive, and responsible citizens.

          </p>
          <div className={styles.date}>
            <div>
              (EST 6:00 pm - 9:00 pm)
            </div>
            <p>
              Sat,Mar 16,2022
            </p>
          </div>
          <div className={styles.btnContainer}>
            <p>Pre Register</p>
            <a>More Info</a>
          </div>
        </div>
      </div>
      <div>
        <img src="/assets/images/mcweadon.png" alt="event cover" />
        <div className={styles.detail}>
          <h2>
            GovTech Virtual & Hybrid Hackathon 2022
          </h2>
          <p>
            Empowering all young people, who need us most,
            to react their full potential as caring, productive, and responsible citizens.

          </p>
          <div className={styles.date}>
            <div>
              (EST 6:00 pm - 9:00 pm)
            </div>
            <p>
              Sat,Mar 16,2022
            </p>
          </div>
          <div className={styles.btnContainer}>
            <p>Pre Register</p>
            <a>More Info</a>
          </div>
        </div>
      </div>
      <div>
        <img src="/assets/images/mcweadon.png" alt="event cover" />
        <div className={styles.detail}>
          <h2>
            GovTech Virtual & Hybrid Hackathon 2022
          </h2>
          <p>
            Empowering all young people, who need us most,
            to react their full potential as caring, productive, and responsible citizens.

          </p>
          <div className={styles.date}>
            <div>
              (EST 6:00 pm - 9:00 pm)
            </div>
            <p>
              Sat,Mar 16,2022
            </p>
          </div>
          <div className={styles.btnContainer}>
            <p>Pre Register</p>
            <a>More Info</a>
          </div>
        </div>
      </div>
      <div>
        <img src="/assets/images/mcweadon.png" alt="event cover" />
        <div className={styles.detail}>
          <h2>
            GovTech Virtual & Hybrid Hackathon 2022
          </h2>
          <p>
            Empowering all young people, who need us most,
            to react their full potential as caring, productive, and responsible citizens.

          </p>
          <div className={styles.date}>
            <div>
              (EST 6:00 pm - 9:00 pm)
            </div>
            <p>
              Sat,Mar 16,2022
            </p>
          </div>
          <div className={styles.btnContainer}>
            <p>Pre Register</p>
            <a>More Info</a>
          </div>
        </div>
      </div>
    </div>

  </div>
);

export default Events;
