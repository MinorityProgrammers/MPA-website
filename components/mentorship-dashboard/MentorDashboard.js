import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/MentorCSS/Dashboard.module.css';
import CalendarEvent from './Calender';
import Evaluations from './Evaluations';
import SprintsView from './SprintsView';
import Resources from './Resources';

const MentorDashboard = ({
  setData,
  setActive: setMenteeActive,
  actionActive,
  setActionActive,
  currentMentor,
  setCurrentMentor,
  mentorshipData,
  update,
  setUpdate,
}) => {
  const [active, setActive] = useState(false);

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
  const toggleHandler = () => {
    setActive(!active);
  };

  const menteeHandler = (mentee) => {
    setMenteeActive([false, true]);

    setCurrentMentor(mentee._id);
    setData(mentee);
  };
  useEffect(() => {
    window.addEventListener('resize', () => {
      if ($(window).width() >= 650) {
        setActive(false);
      }
    });
    setCurrentMentor({});
  }, []);
  return (
    <div>
      <div className={styles.userName}>
        Welcome Back, Mentor
        {' '}
        {mentorshipData.mentorship.mentor_id.user_id.firstName}
        !
      </div>
      <div className={styles.navBar}>
        <FontAwesomeIcon
          onClick={toggleHandler}
          className={styles.navToggle}
          icon={faBars}
        />
        <div className={active ? styles.display : styles.hide}>
          <div>Events</div>
          <div>Courses</div>
          <div>Capstone</div>
          <div>Mentor/Mentee Meetings</div>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.dashleft}>
          {actionActive.calendarActive && (
            <CalendarEvent
              events={mentorshipData.mentorship.mentor_id.calender_events}
              user_id={mentorshipData.mentorship.mentor_id}
            />
          )}

          {actionActive.sprintsViewActive && (
            <SprintsView
              sprints={mentorshipData.sprint}
              courses={mentorshipData.mentorshipCourse}
              capstones={mentorshipData.capstones}
              events={mentorshipData.mentorshipEvent}
              mentor={mentorshipData.mentorship.mentor_id}
              mentee={mentorshipData.mentorship.mentee_id}
              setUpdate={setUpdate}
              update={update}
            />
          )}
          {actionActive.evaluationActive && <Evaluations />}
          {actionActive.resourceActive && (
            <Resources
              resources={mentorshipData.resource}
              mentorship={mentorshipData.mentorship}
              setUpdate={setUpdate}
              update={update}
            />
          )}
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
              onClick={() => menteeHandler(mentorshipData.mentorship.mentee_id)}
            >
              <div
                className={
                  mentorshipData.mentorship.mentee_id._id === currentMentor
                    ? styles.sideBar
                    : styles.hide
                }
              />

              <img
                src={mentorshipData.mentorship.mentee_id.user_id.profilePicture}
                alt={mentorshipData.mentorship.mentee_id._id}
              />
              <p>{`${mentorshipData.mentorship.mentee_id.user_id.firstName} ${mentorshipData.mentorship.mentee_id.user_id.lastName}`}</p>
            </div>
          </div>

          <div className={styles.gridTitle}>
            <p>ACTIONS</p>
          </div>
          <div className={styles.mentors}>
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
                  actionActive.sprintsViewActive ? styles.sideBar : styles.hide
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
              onClick={() => setActionActive({
                resourceActive: false,
                sprintsViewActive: false,
                calendarActive: false,
                evaluationActive: true,
              })}
              className={
                actionActive.evaluationActive
                  ? styles.mentorRowE
                  : styles.mentorRow
              }
            >
              <div
                className={
                  actionActive.evaluationActive ? styles.sideBar : styles.hide
                }
              />
              <img src="/assets/images/mentor/Rectangle 1977.png" alt="" />
              <p>Evaluations</p>
            </div>
            <div
              style={{ borderRadius: '0px 0 30px 0px' }}
              onClick={() => setActionActive({
                sprintsViewActive: false,
                calendarActive: false,
                evaluationActive: false,
                resourceActive: true,
              })}
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
  );
};

export default MentorDashboard;
