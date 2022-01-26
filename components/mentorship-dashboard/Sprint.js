import React from 'react';
import axios from 'axios';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { successToast, errorToast } from '../../contexts/utils/toasts';
import styles from '../../styles/MentorCSS/Dashboard.module.css';

const Sprint = ({
  sprint,
  courses,
  capstones,
  events,
  mentee,
  setCurrentRes,
  setEdit,
  setModalShow,
  currentModel,
  setCurrentModel,
  setUpdate,
  update,
}) => {
  const Edit = ({ id, res, currentModel }) => (
    <div className={styles.actionIcons}>
      <FontAwesomeIcon
        onClick={() => {
          DeleteHandler(id, currentModel);
          setCurrentModel(currentModel);
        }}
        className={styles.deleteIcon}
        icon={faTrashAlt}
      />
      <FontAwesomeIcon
        onClick={() => {
          setCurrentRes(res);
          setEdit(true);
          setModalShow(true);
          setCurrentModel(currentModel);
        }}
        className={styles.editIcon}
        icon={faEdit}
      />
    </div>
  );
  const DeleteHandler = (id, currentModel) => {
    const token = window.localStorage.getItem('jwtToken');

    if (token != null) {
      axios
        .delete(`${process.env.BASE_URI}/mentorship/${currentModel}/${id}`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          successToast(`${currentModel} Deleted successfully!`);
          setUpdate(!update);
          console.log(res.data);
        })
        .catch((err) => {
          errorToast('Something went wrong, please contact us.');
          console.log(err);
        });
    }
  };
  return (
    <div className={styles.sprint}>
      <div
        style={{ display: 'flex', justifyContent: 'space-between' }}
        className={styles.sprintTitle}
      >
        <div>{sprint.title}</div>
        <Edit res={sprint} id={sprint._id} currentModel="sprint" />
      </div>
      <div className={styles.line} />
      <div className={styles.row}>
        <div>
          <div className={styles.colTitle}>Mentees</div>
          <div className={styles.menteesIcon}>
            <OverlayTrigger
              overlay={
                <Tooltip>
                  {`${mentee.user_id.firstName} ${mentee.user_id.lastName}`}
                </Tooltip>
              }
            >
              <img
                style={{ height: '35px', width: '35px', borderRadius: '50px' }}
                src={
                  mentee.user_id.profilePicture
                    ? mentee.user_id.profilePicture
                    : '/assets/images/mentor/unknown-pic.jfif'
                }
                alt={mentee.user_id.lastName}
              />
            </OverlayTrigger>
          </div>
        </div>

        <div>
          <div className={styles.colTitle}>Upcoming Events</div>
          <div>
            {events.map((event) => (
              <div style={{ display: 'flex' }}>
                <div className={styles.event} key={event._id}>
                  <img
                    src="/assets/images/mentor/Rectangle 2000.png"
                    alt="event"
                  />
                  <div className={styles.eventDetail} key={event._id}>
                    <p>{event.title}</p>
                    <p>{event.createdAt.split('T')[0]}</p>
                  </div>
                </div>
                <Edit res={event} id={event._id} currentModel="event" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className={styles.colTitle}>Courses</div>
          <div>
            {courses.map((course) => (
              <div style={{ display: 'flex' }}>
                <div className={styles.event} key={course._id}>
                  <img
                    style={{ background: '#F09330' }}
                    src="/assets/images/mentor/Rectangle 2000-1.png"
                    alt="course"
                  />
                  <div className={styles.eventDetail} key={course._id}>
                    <p>{course.title}</p>
                    <p>{course.createdAt.split('T')[0]}</p>
                  </div>
                </div>
                <Edit res={course} id={course._id} currentModel="course" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className={styles.colTitle}>Capstone</div>
          <div>
            {capstones.map((capstone) => (
              <div style={{ display: 'flex' }}>
                <div className={styles.event} key={capstone._id}>
                  <img
                    style={{ background: '#393B97' }}
                    src="/assets/images/mentor/Rectangle 2000-2.png"
                    alt="capstone"
                  />
                  <div className={styles.eventDetail} key={capstone._id}>
                    <p>{capstone.title}</p>
                    <p>{capstone.createdAt.split('T')[0]}</p>
                  </div>
                </div>
                <Edit
                  res={capstone}
                  id={capstone._id}
                  currentModel="capstone"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sprint;
