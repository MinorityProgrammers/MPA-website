import React, { useState, useEffect } from 'react';
import classes from '../public/assets/css/defisummer.module.css';

const Defisummer = ({ navBarRef }) => {
  const { day, month, date, startTime, endTime } = {
    day: 'Thursday',
    month: 'August',
    date: 26,
    startTime: '11am',
    endTime: '4pm',
  };
  const [margin, setMargin] = useState(0);
  useEffect(() => {
    if (navBarRef.current) {
      setMargin(parseInt(window.getComputedStyle(navBarRef.current).height));
    }
  }, [navBarRef]);
  const keynotes = (big_header, small_header, time) => (
    <div className={classes.keynotes}>
      <div className={classes.keynotes_section_1}>
        <div className={classes.section_1_line_1}>{big_header}</div>
        <div className={classes.section_1_line_2}>{small_header}</div>
      </div>
      <div className={classes.keynotes_section_2}>
        <div className={classes.section_2_line_1}>{time}</div>
        <div className={classes.section_2_line_2}>EST</div>
      </div>
    </div>
  );
  return (
    <div className={classes.body} style={{ marginTop: margin }}>
      <div className={classes.oceanImage} />
      <div className={classes.imagewrap}>
        <img
          src="/assets/images/icons/defisummer/AbdelRahman1.png"
          alt="large-bkg"
        />
        <div className={classes.dateText}>
          <div>{`${day} - ${month} ${date}`}</div>
        </div>
        <article className={classes.article}>
          <div className={classes.wrapArticle}>
            <section className={classes.containHeader}>
              {/* header */}
              <img
                src="/assets/images/icons/defisummer/Banner.png"
                alt="header"
              />
              <div>Summit</div>
              {/* bottom text */}
              <section className={classes.containBottomText}>
                <span>{`${day} - ${month} ${date}`}</span>
                <span>{`${startTime} - ${endTime}`}</span>
              </section>
            </section>
            {/* all btns */}
            <section className={classes.allBtns}>
              <a
                href="https://forms.gle/P9acazhZEzGh3apDA"
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noreferrer"
              >
                <button>Signup as a speaker</button>
              </a>

              <a
                href="https://forms.gle/P9acazhZEzGh3apDA"
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noreferrer"
              >
                <button>Pre-Register</button>
              </a>

              <a
                href="https://forms.gle/P9acazhZEzGh3apDA"
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noreferrer"
              >
                <button>Go to live - event</button>
              </a>
            </section>
            {/* first section */}
            <div className={classes.wrapItem}>
              <div className={classes.wrapHeader}>
                <h3>Tentative Schedule</h3>
                <div className={classes.left}>
                  <div>EST Time GMT -4</div>
                </div>
              </div>
              <div className={classes.wrapSeminarItems}>
                <div className={classes.seminarItem}>
                  11:00AM - Opening Talk
                </div>
              </div>
            </div>
            {/* second section */}
            <div className={classes.wrapItem}>
              <div className={classes.wrapHeader}>
                <div className={classes.right} />
                <h3 className={classes.smallerHeader}>[Panels]</h3>
                <div className={classes.left} />
              </div>
              <div className={classes.wrapSeminarItems}>
                <div className={classes.seminarItem}>
                  11:20AM - DAOs + Governance
                </div>
                <div className={classes.seminarItem}>
                  11:50AM - dApp Infrastructure
                </div>
                <div className={classes.seminarItem}>
                  12:20PM - Blockchain Education
                </div>
                <div className={classes.seminarItem}>
                  12:50PM - Community Building
                </div>
                <div className={classes.seminarItem}>1:20PM - NFTs</div>
                <div className={classes.seminarItem}>
                  1:50PM - Institutional Adoption
                </div>
                <div className={classes.seminarItem}>
                  2:20PM - Rise of Degens
                </div>
              </div>
            </div>
            {/* third section */}
            <div className={classes.wrapItem}>
              <div className={classes.wrapHeader}>
                <div className={classes.right} />
                <h3>Keynotes</h3>
              </div>

              {keynotes(
                'Future of Asset Management',
                'w/ Founder of Enzyme, Finance Mona El Isa',
                '3:00PM'
              )}

              {keynotes(
                'Future of Yield Maximizing',
                'w/ Founder of Idle, Finance',
                '3:20PM'
              )}
              {keynotes(
                'Future of Global Banking',
                'w/ Founder of Steller Development Foundation',
                '3:40PM'
              )}
            </div>
            <div className={classes.wrapSponsorsSection}>
              <div className={classes.sponsorWrap}>
                <h3>Brought to you by - </h3>
                <div>
                  <div>
                    <img
                      src="/assets/images/icons/defisummer/Stellar_Development_Foundation.svg"
                      alt="stellar development foundation"
                    />
                    <img
                      src="/assets/images/icons/defisummer/enzyme.svg"
                      alt="enzyme"
                    />
                    <img
                      src="/assets/images/icons/defisummer/idle.svg"
                      alt="idle"
                    />
                    <img
                      src="/assets/images/icons/defisummer/pluto pepe.png"
                      alt="pluto pepe"
                    />
                    <img
                      src="/assets/images/icons/defisummer/tokamak.png"
                      alt="tokamak"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div className={classes.oceanImage} />
    </div>
  );
};

export default Defisummer;
