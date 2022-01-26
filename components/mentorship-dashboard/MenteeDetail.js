import React, { useState, useEffect } from 'react';
import styles from '../../styles/MentorCSS/Dashboard.module.css';
import stylesE from '../../styles/MentorCSS/Mentor.module.css';
import VerticalModel from './VerticalModel';

const MenteeDetail = ({
  menteeData,
  setData,
  setActive,
  actionActive,
  setActionActive,
  currentMentor,
  setCurrentMentor,
  mentorshipData,
  sprints,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [updatedSprints, setUpdatedSprints] = useState([]);
  const [progressPrecentage, setProgressPrecentage] = useState('0%');

  const menteeHandler = (mentee) => {
    setActive([false, true]);

    setCurrentMentor(mentee._id);
    setData(mentee);
  };
  const activeHandler = () => {
    setActive([true, false]);
  };
  const calendarHandler = () => {
    setActionActive({
      resourceActive: false,
      sprintsViewActive: false,
      calendarActive: true,
      evaluationActive: false,
    });
  };
  const sprintHandler = () => {
    setActionActive({
      resourceActive: false,
      sprintsViewActive: true,
      calendarActive: false,
      evaluationActive: false,
    });
  };

  useEffect(() => {
    setActionActive({
      resourceActive: false,
      sprintsViewActive: false,
      calendarActive: false,
      evaluationActive: false,
    });
    const num = sprints.length;
    let prec = 100;
    sprints.forEach((sprint) => {
      prec += parseInt(sprint.progress_percentage.split('%')[0]);
    });

    prec /= 4;
    setProgressPrecentage(`${prec}%`);
    if (num === 0) {
      setUpdatedSprints([
        {
          title: '-',
          description: '-',
          notes: ['-'],
        },
        {
          _id: '1',
          title: '-',
          description: '-',
          notes: ['-'],
        },
        {
          _id: '2',
          title: '-',
          description: '-',
          notes: ['-'],
        },
      ]);
    } else if (num === 1) {
      setUpdatedSprints([
        {
          _id: '0',
          title: '-',
          description: '-',
          notes: ['-'],
        },
        {
          _id: '1',
          title: '-',
          description: '-',
          notes: ['-'],
        },
        ...sprints,
      ]);
    } else if (num === 2) {
      setUpdatedSprints([
        {
          _id: '0',
          title: '-',
          description: '-',
          notes: ['-'],
        },
        ...sprints,
      ]);
    } else if (num === 3) {
      setUpdatedSprints(sprints);
    }
  }, [sprints]);
  console.log(sprints);
  return (
    <div>
      <VerticalModel
        menteeData={menteeData}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <div className={stylesE.userName}>
        {` ${menteeData.user_id.firstName} ${menteeData.user_id.lastName}`}
      </div>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.dashleft}>
            <div className={styles.teamImg}>
              <p> Mentee</p>
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
                      <a target="_blank">
                        <img
                          src="/assets/images/mentor/Facebook.svg"
                          alt="facebook"
                        />
                      </a>

                      <a target="_blank">
                        <img
                          src="/assets/images/mentor/Linkedin.svg"
                          alt="Linkedin"
                        />
                      </a>
                      <img
                        src="/assets/images/mentor/Twitter.svg"
                        alt="Twitter"
                      />
                      <img
                        src="/assets/images/mentor/Twitch.svg"
                        alt="Twitch"
                      />
                    </div>
                  </div>
                </div>
                <div className={stylesE.ResidentLocation}>
                  {menteeData.user_id.location}
                </div>
                <div className={stylesE.role}>{menteeData.user_id.role}</div>
                <div className={stylesE.tags}>
                  {menteeData.user_id.programmingSkills.map((tag) => (
                    <div key={tag}>
                      <a> {tag}</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={stylesE.progressName}>
              {menteeData.user_id.firstName}
              ’s Progress
            </div>
            <div className={stylesE.progress}>
              <div className={stylesE.grid}>
                <div>
                  <img
                    className={stylesE.pointer}
                    style={{ left: progressPrecentage }}
                    src="/assets/images/mentor/pointer.png"
                    alt="pointer"
                  />
                  <div className={stylesE.progressBar}>
                    <div
                      style={{ width: progressPrecentage }}
                      className={stylesE.bar}
                    />
                  </div>
                  <div className={stylesE.progressInfo}>
                    <div className={stylesE.sprintCol}>
                      <div className={stylesE.vertivalBar} />
                      <div className={stylesE.sprintInfo}>
                        <div> Start Internship</div>
                      </div>
                    </div>
                    {updatedSprints
                      .slice(0, 3)
                      .reverse()
                      .map((sprint) => (
                        <div key={sprint._id} className={stylesE.sprintCol}>
                          <div className={stylesE.vertivalBar} />
                          <div className={stylesE.sprintInfo}>
                            <div>{sprint.title}</div>
                            <div style={{ color: '#40BF7B', fontSize: '14px' }}>
                              Completion time:{' '}
                              {sprint.completion_time
                                ? sprint.completion_time
                                : '-'}
                            </div>
                            <div style={{ marginTop: '6px' }}>
                              <img
                                className={stylesE.notesIcon}
                                src="/assets/images/mentor/mentor-notes-icon.png"
                                alt="pointer"
                              />
                              Notes by Mentor:
                              <ul className={stylesE.notesList}>
                                {sprint.notes.map((note) => (
                                  <li key={note}> {note}</li>
                                ))}
                                {!sprint.notes.length && <li>-</li>}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}

                    <div className={stylesE.sprintCol}>
                      <div className={stylesE.vertivalBar} />
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: '2rem' }}>
                  <div className={stylesE.lastSprintInfo}>
                    <div style={{ whiteSpace: 'initial' }}>
                      Internship Finished
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '21px' }} className={styles.gridTitle}>
              <p>MENTEES</p>
            </div>
            <div className={styles.mentors}>
              <div
                className={
                  mentorshipData.mentorship.mentee_id._id === currentMentor
                    ? styles.mentorRowE
                    : styles.mentorRow
                }
                onClick={() =>
                  menteeHandler(mentorshipData.mentorship.mentee_id)
                }
              >
                <div
                  className={
                    mentorshipData.mentorship.mentee_id._id === currentMentor
                      ? styles.sideBar
                      : styles.hide
                  }
                />

                <img
                  src={
                    mentorshipData.mentorship.mentee_id.user_id.profilePicture
                  }
                  alt={mentorshipData.mentorship.mentee_id._id}
                />
                <p>{`${mentorshipData.mentorship.mentee_id.user_id.firstName} ${mentorshipData.mentorship.mentee_id.user_id.lastName}`}</p>
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
                <p>Messages</p>
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
                <p>Calender/Events</p>
              </div>
              <div
                onClick={() =>
                  setActionActive({
                    resourceActive: false,
                    sprintsViewActive: false,
                    calendarActive: false,
                    evaluationActive: true,
                  })
                }
                className={styles.mentorRow}
              >
                <img src="/assets/images/mentor/Rectangle 1977.png" alt="" />
                <p>Evaluations</p>
              </div>
              <div
                onClick={() =>
                  setActionActive({
                    sprintsViewActive: false,
                    calendarActive: false,
                    evaluationActive: false,
                    resourceActive: true,
                  })
                }
                style={{ borderRadius: '0px 0 30px 0px' }}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenteeDetail;
