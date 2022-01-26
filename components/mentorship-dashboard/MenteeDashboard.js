import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/MentorCSS/Dashboard.module.css';
import Resources from './Resources';
import CalendarEvent from './Calender';
import Evaluations from './Evaluations';
import Course from './Course';
import Event from './Event';
import Capstone from './Capstone';
import Workshop from './Workshop';
import Job from './Job';
import MenteeSprint from './MenteeSprint';
const MenteeDashboard = ({
  setData,
  setActive: setMenteeActive,
  actionActive,
  setActionActive,
  currentMentee,
  setCurrentMentee,
  mentorshipData: menteeData,
  setUpdate,
  update,
}) => {
  const [active, setActive] = useState(false);
  const [navActive, setNavActive] = useState({
    course: true,
    event: false,
    capstone: false,
    workshop: false,
    job: false,
    sprint: false,
  });
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
  const toggleHandler = () => {
    setActive(!active);
  };
  const menteeHandler = (mentee) => {
    setMenteeActive([false, true]);

    setCurrentMentee(mentee._id);
    setData(mentee);
  };
  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 950) {
        setActive(false);
      }
    });
    setCurrentMentee({});
  }, []);
  return (
    <div>
      <div className={styles.userName}>
        Welcome Back,
        {menteeData.mentorship.mentee_id.user_id.firstName}!
      </div>
      <div className={`${styles.navBar} ${styles.navBarMentee}`}>
        <FontAwesomeIcon
          onClick={toggleHandler}
          className={`${styles.navToggleMentee} ${styles.navToggle}`}
          icon={faBars}
        />
        <div className={active ? styles.display : styles.hide}>
          <div
            onClick={() => {
              setNavActive({
                course: true,
                event: false,
                capstone: false,
                workshop: false,
                job: false,
                sprint: false,
              });
              setActionActive({
                sprintsViewActive: true,
                calendarActive: false,
                eventActive: false,
                resourceActive: false,
                evaluations: false,
              });
              setActive(false);
            }}
            className={navActive.course ? styles.navActive : ''}
          >
            Courses
          </div>
          <div
            onClick={() => {
              setNavActive({
                course: false,
                event: true,
                capstone: false,
                workshop: false,
                job: false,
                sprint: false,
              });
              setActionActive({
                sprintsViewActive: true,
                calendarActive: false,
                eventActive: false,
                resourceActive: false,
                evaluations: false,
              });
              setActive(false);
            }}
            className={navActive.event ? styles.navActive : ''}
          >
            Events
          </div>
          <div
            onClick={() => {
              setNavActive({
                course: false,
                event: false,
                capstone: true,
                workshop: false,
                job: false,
                sprint: false,
              });
              setActionActive({
                sprintsViewActive: true,
                calendarActive: false,
                eventActive: false,
                resourceActive: false,
                evaluations: false,
              });
              setActive(false);
            }}
            className={navActive.capstone ? styles.navActive : ''}
          >
            Capstone
          </div>
          <div
            onClick={() => {
              setNavActive({
                course: false,
                event: false,
                capstone: false,
                workshop: true,
                job: false,
                sprint: false,
              });
              setActionActive({
                sprintsViewActive: true,
                calendarActive: false,
                eventActive: false,
                resourceActive: false,
                evaluations: false,
              });
              setActive(false);
            }}
            className={navActive.workshop ? styles.navActive : ''}
          >
            Resume Workshop
          </div>
          <div
            onClick={() => {
              setNavActive({
                course: false,
                event: false,
                capstone: false,
                workshop: false,
                job: true,
                sprint: false,
              });
              setActionActive({
                sprintsViewActive: true,
                calendarActive: false,
                eventActive: false,
                resourceActive: false,
                evaluations: false,
              });
              setActive(false);
            }}
            className={navActive.job ? styles.navActive : ''}
          >
            Job Portal
          </div>
          <div
            onClick={() => {
              setNavActive({
                course: false,
                event: false,
                capstone: false,
                workshop: false,
                job: false,
                sprint: true,
              });
              setActionActive({
                sprintsViewActive: true,
                calendarActive: false,
                eventActive: false,
                resourceActive: false,
                evaluations: false,
              });
              setActive(false);
            }}
            className={navActive.sprint ? styles.navActive : ''}
          >
            Sprint Review
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.dashleft}>
          {actionActive.evaluations && <Evaluations />}
          {actionActive.resourceActive && (
            <Resources
              resources={menteeData.resource}
              mentorship={menteeData.mentorship}
              setUpdate={setUpdate}
              update={update}
            />
          )}
          {actionActive.calendarActive && (
            <CalendarEvent
              events={menteeData.mentorship.mentee_id.calender_events}
              user_id={menteeData.mentorship.mentee_id}
              setUpdate={setUpdate}
              update={update}
            />
          )}

          {actionActive.sprintsViewActive && navActive.sprint && (
            <>
              <div className={styles.teamImg}>
                <img src="/assets/images/mentor/sprint.png" alt="sprint" />
                <p>SRPINT REVIEW</p>
              </div>
              <div className={styles.sprintsContainer}>
                {menteeData.sprint.map((sprint) => (
                  <MenteeSprint
                    key={sprint._id}
                    sprint={sprint}
                    mentor={menteeData.mentorship.mentor_id}
                    mentee={menteeData.mentorship.mentee_id}
                  />
                ))}
              </div>
            </>
          )}
          {actionActive.sprintsViewActive && navActive.course && (
            <>
              <div className={styles.teamImg}>
                <img
                  src="/assets/images/mentor/mentor-team.png"
                  alt="team-img"
                />
                <p>MY LEARNING COURSES</p>
              </div>
              <div className={styles.sprintsContainer}>
                {menteeData.mentorshipCourse.map((course) => (
                  <Course
                    course={course}
                    mentor={menteeData.mentorship.mentor_id}
                    mentee={menteeData.mentorship.mentee_id}
                    key={course._id}
                  />
                ))}
              </div>
            </>
          )}
          {actionActive.sprintsViewActive && navActive.capstone && (
            <>
              <div className={styles.teamImg}>
                <img src="/assets/images/mentor/capstone.png" alt="capstone" />
                <p>MY CAPSTONE</p>
              </div>
              <div className={styles.sprintsContainer}>
                {menteeData.capstones.map((capstone) => (
                  <Capstone
                    key={capstone._id}
                    mentor={menteeData.mentorship.mentor_id}
                    mentee={menteeData.mentorship.mentee_id}
                    capstone={capstone}
                  />
                ))}
              </div>
            </>
          )}
          {actionActive.sprintsViewActive && navActive.job && (
            <>
              <div className={styles.teamImg}>
                <img
                  src="/assets/images/mentor/job.png"
                  alt="upcoming-events"
                />
                <p>Job Portal</p>
              </div>
              <div className={styles.sprintsContainer}>
                {menteeData.mentorshipJob.map((job) => (
                  <Job key={job._id} job={job} />
                ))}
              </div>
            </>
          )}
          {actionActive.sprintsViewActive && navActive.event && (
            <>
              <div className={styles.teamImg}>
                <img
                  src="/assets/images/mentor/nav-events.png"
                  alt="upcoming-events"
                />
                <p>UPCOMING EVENTS</p>
              </div>
              <div className={styles.sprintsContainer}>
                {menteeData.mentorshipEvent.map((event) => (
                  <Event
                    key={event._id}
                    mentor={menteeData.mentorship.mentor_id}
                    mentee={menteeData.mentorship.mentee_id}
                    event={event}
                  />
                ))}
              </div>
            </>
          )}
          {actionActive.eventActive && (
            <>
              <div className={styles.teamImg}>
                <img
                  src="/assets/images/mentor/events.png"
                  alt="Group-events"
                />
                <p>GROUP EVENTS</p>
              </div>
              <div className={styles.sprintsContainer}>
                {menteeData.mentorshipEvent.map((event) => (
                  <Event
                    event={event}
                    key={event._id}
                    mentor={menteeData.mentorship.mentor_id}
                    mentee={menteeData.mentorship.mentee_id}
                  />
                ))}
              </div>
            </>
          )}
          {actionActive.sprintsViewActive && navActive.workshop && (
            <>
              <div className={styles.teamImg}>
                <img
                  style={{ width: '40px' }}
                  src="/assets/images/mentor/workshop.png"
                  alt="upcoming-events"
                />
                <p>RESUME WORKSHOP</p>
              </div>
              <div className={styles.sprintsContainer}>
                {menteeData.workshops.map((workshop) => (
                  <Workshop
                    key={workshop._id}
                    mentor={menteeData.mentorship.mentor_id}
                    mentee={menteeData.mentorship.mentee_id}
                    workshop={workshop}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div>
          <div style={{ marginBottom: '21px' }} className={styles.gridTitle}>
            <p>YOUR MENTOR</p>
          </div>
          <div className={styles.mentors}>
            <div
              className={
                menteeData.mentorship.mentor_id._id === currentMentee
                  ? styles.mentorRowE
                  : styles.mentorRow
              }
              onClick={() => menteeHandler(menteeData.mentorship.mentor_id)}
            >
              <div
                className={
                  menteeData.mentorship.mentor_id._id === currentMentee
                    ? styles.sideBar
                    : styles.hide
                }
              />

              <img
                src={menteeData.mentorship.mentor_id.user_id.profilePicture}
                alt={menteeData.mentorship.mentor_id._id}
              />
              <p>{`${menteeData.mentorship.mentor_id.user_id.firstName} ${menteeData.mentorship.mentor_id.user_id.lastName}`}</p>
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
                actionActive.eventActive ? styles.mentorRowE : styles.mentorRow
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
                actionActive.evaluations ? styles.mentorRowE : styles.mentorRow
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
  );
};

export default MenteeDashboard;
