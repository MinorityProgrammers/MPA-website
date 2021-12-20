import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { Alert } from 'antd';
import stylesE from '../../styles/MentorCSS/Mentor.module.css';
import styles from '../../styles/MentorCSS/Calendar.module.css';
import 'antd/lib/alert/style/index.css';

const numberValidator = (value, set) => {
  if (/^\d{1,2}(-\d{1,2})?$/.test(value)) {
    set(value);
  }
};
const dateValidator = (value, set) => {
  if (/^\d{1,4}(-\d{1,2})(-\d{1,2})?$/.test(value)) {
    set(value);
  }
};
const PopModel = ({
  events,
  setEvents,
  selectedDates,
  setSelectedDates,
  date,
  setDate,
  setModalShow,
  user_id,
  ...props
}) => {
  const [err, setErr] = useState(false);
  const [eventName, setEventName] = useState('');
  const [time, setTime] = useState('00-00');
  const [description, setDescription] = useState('');

  const user = JSON.parse(window.localStorage.getItem('userInfo'));
  // let is_mentor = user.user.is_mentor;
  let is_mentor = true;
  const onSubmit = (e) => {
    e.preventDefault();
    if (eventName == '' || description == '') {
      setErr(true);
    } else {
      const year = date.split('-')[0];
      const month = (parseInt(date.split('-')[1]) - 1).toString();
      const day = date.split('-')[2];
      const hours = time.split('-')[0];
      const minutes = time.split('-')[1];
      const newDate = new Date(year, month, day, hours, minutes);
      const token = window.localStorage.getItem('jwtToken');

      if (token != null) {
        axios
          .patch(
            `http://localhost:5000/api/v1/${is_mentor ? 'mentor' : 'mentee'}/${
              user_id._id
            }`,
            {
              calender_events: [
                ...events,
                {
                  title: eventName,
                  event_date: newDate.toDateString(),
                  description: description,
                },
              ],
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            setSelectedDates([...selectedDates, newDate]);
            setEvents(res.data.data.calender_events);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      setErr(false);
      setEventName('');
      setDate('2021-01-01');
      setTime('00-00');
      setDescription('');
      setModalShow(false);
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName={stylesE.modelDialog}
      contentClassName={stylesE.popContent}
    >
      <Modal.Header bsPrefix={stylesE.modelHead}>
        <Modal.Title
          id="contained-modal-title-vcenter"
          bsPrefix={stylesE.modelTitle}
        >
          <div>
            {err && (
              <Alert description="fill in the missing fields" type="error" />
            )}
            <div className={stylesE.modelHeader}>
              <div className={styles.createEvenTitle}>Creating Event</div>
              <img
                className={styles.eventOutIcon}
                width={30}
                height={30}
                onClick={() => setModalShow(false)}
                src="/assets/images/mentor/event-exit-icon.svg"
                alt="exit-icon"
              />
            </div>
            <div className={stylesE.line}></div>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={stylesE.model}>
        <div>
          <form onSubmit={onSubmit}>
            <div className={styles.row}>
              <div className={styles.col}>
                <label>Event Name</label>
                <input
                  onChange={(e) => setEventName(e.target.value)}
                  value={eventName}
                  type="text"
                  placeholder="What is the event name?"
                />
              </div>
            </div>
            <div className={styles.row}>
              <div
                style={{ width: '70%', marginRight: '3rem' }}
                className={styles.col}
              >
                <label>Date</label>
                <input
                  onChange={(e) => dateValidator(e.target.value, setDate)}
                  value={date}
                  type="text"
                  placeholder="DD-MM-YYYY"
                  required
                />
              </div>
              <div
                className={styles.col}
                style={{ width: '40%', marginRight: '10px' }}
              >
                <label>Time</label>
                <input
                  onChange={(e) => numberValidator(e.target.value, setTime)}
                  value={time}
                  type="text"
                  placeholder="HH-MM"
                  required
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col}>
                <label>Event Description</label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  cols="30"
                  rows="3"
                ></textarea>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col + ' ' + styles.colSubmit}>
                <input className={styles.createEventSubmit} type="submit" />
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PopModel;
