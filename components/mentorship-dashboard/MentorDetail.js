import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../styles/MentorCSS/Dashboard.module.css';
import stylesE from '../../styles/MentorCSS/Mentor.module.css';
import VerticalModel from './VerticalModel';

const MentorDetail = ({
  menteeData,
  setData,
  setActive,
  actionActive,
  setActionActive,
  currentMentee,
  setCurrentMentee,
  mentee,
}) => {
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    setActionActive({
      sprintsViewActive: false,
      calendarActive: false,
      eventActive: false,
      resourceActive: false,
      evaluations: false,
    });
  }, []);

  const menteeHandler = (_mentee) => {
    setActive([false, true]);

    setCurrentMentee(_mentee._id);
    setData(_mentee);
  };
  const activeHandler = () => {
    setActive([true, false]);
  };
  const calendarHandler = () => {
    setActionActive({
      sprintsViewActive: false,
      calendarActive: true,
      eventActive: false,
      resourceActive: false,
      evaluations: false,
    });
  };
  const sprintHandler = () => {
    setActionActive({
      sprintsViewActive: true,
      calendarActive: false,
      eventActive: false,
      resourceActive: false,
      evaluations: false,
    });
  };
  return (
    <div>
      <VerticalModel
        menteeData={menteeData}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <div className={stylesE.userName}>
        Meet Your Mentor,
        {` ${menteeData.user_id.firstName} ${menteeData.user_id.lastName}`}!
      </div>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.dashleft}>
            <div className={styles.teamImg}>
              <p> Mentor</p>
            </div>
            <div className={stylesE.menteeDeatil}>
              <div className={stylesE.menteeAvatar}>
                <img
                  src={
                    menteeData.user_id.profilePicture
                      ? menteeData.user_id.profilePicture
                      : '/assets/images/mentor/unknown-pic.jfif'
                  }
                  alt="mentee-avatar"
                />
              </div>
              <div className={stylesE.menteeHeader}>
                <div className={stylesE.menteePersonalInfo}>
                  <div className={stylesE.menteeName}>
                    {menteeData.user_id.userName}
                  </div>
                  <div className={stylesE.menteeSocial}>
                    <div>
                      @{menteeData.user_id.GithubLink.split('/')[3]}
                      <img
                        className={stylesE.qrCode}
                        onClick={() => setModalShow(true)}
                        src="/assets/images/mentor/QR-code.png"
                        alt="mentee-qr-code"
                      />
                    </div>
                    <div className={stylesE.socialIcon}>
                      <Link href={menteeData.user_id.FacebookLink}>
                        <a target="_blank">
                          <img
                            src="/assets/images/mentor/Facebook.svg"
                            alt="facebook"
                          />
                        </a>
                      </Link>
                      <Link href={menteeData.user_id.LinkedinLink}>
                        <a target="_blank">
                          <img
                            src="/assets/images/mentor/Linkedin.svg"
                            alt="facebook"
                          />
                        </a>
                      </Link>
                      <img
                        src="/assets/images/mentor/Twitter.svg"
                        alt="facebook"
                      />
                      <img
                        src="/assets/images/mentor/Twitch.svg"
                        alt="facebook"
                      />
                    </div>
                  </div>
                </div>
                <div className={stylesE.ResidentLocation}>
                  Minority Programmer Mentor
                </div>
                <div className={stylesE.role}>
                  Been with MPA:
                  {menteeData.duration}
                </div>
                <div className={stylesE.tags}>
                  {menteeData.user_id.programmingSkills.map((tag) => (
                    <div key={tag}>
                      <a>{tag}</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={stylesE.menteeSectionTitle}>
              {menteeData.user_id.firstName}
              ’s Mentees
            </div>
            <div className={stylesE.menteeSection}>
              <div>
                <div key={mentee._id} className={stylesE.menteeRow}>
                  <img
                    style={{ marginRight: '6px' }}
                    src={
                      mentee.user_id.profilePicture
                        ? mentee.user_id.profilePicture
                        : '/assets/images/mentor/unknown-pic.jfif'
                    }
                    alt="userAvatar"
                  />
                  <p>
                    {`${mentee.user_id.firstName} ${mentee.user_id.lastName}`}
                  </p>
                </div>
              </div>
              <div className={stylesE.rightMenteeSection}>.....</div>
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '21px' }} className={styles.gridTitle}>
              <p>YOUR MENTOR</p>
            </div>
            <div className={styles.mentors}>
              <div
                className={
                  menteeData._id === currentMentee
                    ? styles.mentorRowE
                    : styles.mentorRow
                }
                onClick={() => menteeHandler(menteeData)}
              >
                <div
                  className={
                    menteeData._id === currentMentee
                      ? styles.sideBar
                      : styles.hide
                  }
                />

                <img
                  src={menteeData.user_id.profilePicture}
                  alt={menteeData.user_id.firstName}
                />
                <p>{`${menteeData.user_id.firstName} ${menteeData.user_id.lastName}`}</p>
              </div>
            </div>

            <div className={styles.gridTitle}>
              <p>ACTIONS</p>
            </div>
            <div onClick={activeHandler} className={styles.mentors}>
              <div
                onClick={sprintHandler}
                className={
                  actionActive.sprintsViewActive
                    ? styles.mentorRowE
                    : styles.mentorRow
                }
              >
                <div
                  className={
                    actionActive.sprintsViewActive
                      ? styles.sideBar
                      : styles.hide
                  }
                />
                <img src="/assets/images/mentor/Rectangle 1971.png" alt="" />
                <p>Communication</p>
              </div>
              <div
                onClick={() =>
                  setActionActive({
                    sprintsViewActive: false,
                    calendarActive: false,
                    eventActive: false,
                    resourceActive: true,
                    evaluations: false,
                  })
                }
                className={
                  actionActive.resourceActive
                    ? styles.mentorRowE
                    : styles.mentorRow
                }
              >
                <div
                  className={
                    actionActive.resourceActive ? styles.sideBar : styles.hide
                  }
                />
                <img src="/assets/images/mentor/resources.png" alt="" />
                <p>Resources</p>
              </div>

              <div
                onClick={() =>
                  setActionActive({
                    sprintsViewActive: false,
                    calendarActive: false,
                    eventActive: true,
                    resourceActive: false,
                    evaluations: false,
                  })
                }
                className={
                  actionActive.eventActive
                    ? styles.mentorRowE
                    : styles.mentorRow
                }
              >
                <div
                  className={
                    actionActive.eventActive ? styles.sideBar : styles.hide
                  }
                />
                <img src="/assets/images/mentor/events.png" alt="" />
                <p>Group Events</p>
              </div>
              <div
                onClick={calendarHandler}
                className={
                  actionActive.calendarActive
                    ? styles.mentorRowE
                    : styles.mentorRow
                }
              >
                <div
                  className={
                    actionActive.calendarActive ? styles.sideBar : styles.hide
                  }
                />
                <img src="/assets/images/mentor/calendarIcon.png" alt="" />
                <p>Calender/Bi-Weekly</p>
              </div>
              <div
                onClick={() =>
                  setActionActive({
                    sprintsViewActive: false,
                    calendarActive: false,
                    eventActive: false,
                    resourceActive: false,
                    evaluations: true,
                  })
                }
                style={{ borderRadius: '0px 0 30px 0px' }}
                className={
                  actionActive.evaluations
                    ? styles.mentorRowE
                    : styles.mentorRow
                }
              >
                <div
                  className={
                    actionActive.evaluations ? styles.sideBar : styles.hide
                  }
                />
                <img src="/assets/images/mentor/Rectangle 1977.png" alt="" />
                <p>Evaluations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDetail;
