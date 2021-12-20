import React, { useState, useEffect } from 'react';
import { Modal, Dropdown, Form, ListGroup } from 'react-bootstrap';
import { successToast, errorToast } from '../../contexts/utils/toasts';
import stylesE from '../../styles/MentorCSS/Mentor.module.css';
import styles from '../../styles/MentorCSS/Calendar.module.css';
import { Alert } from 'antd';
import 'antd/lib/alert/style/index.css';
import axios from 'axios';
import FormData from 'form-data';
import 'antd/lib/upload/style/index.css';
import CreatableInputOnly from './InputSelect.tsx';
import { event } from 'jquery';
import { set } from 'date-fns';

const MentorModel = ({
  setModalShow,
  edit,
  setEdit,
  currentRes,
  mentorship_id,
  update,
  setUpdate,
  currentModel,
  setCurrentModel,
  ...propsR
}) => {
  const [err, setErr] = useState(false);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [progressPercentage, setProgressPercentage] = useState('');
  const [notesValue, setNotesValue] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    const notes = notesValue.map((note) => note.value);
    const data = {
      title: title,
      description: description,
      progress_percentage: progressPercentage,
      completion_time: time,
      notes: notes,
    };
    const token = window.localStorage.getItem('jwtToken');
    if (title == '' || description == '') {
      setErr(true);
    } else {
      if (token != null && edit == false) {
        axios
          .post(
            `http://localhost:5000/api/v1/mentorship/${currentModel}/${mentorship_id}`,
            data,
            {
              headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            successToast(`${currentModel} created!`);
            setUpdate(!update);
          })
          .catch((err) => {
            errorToast('Something went wrong, please contact us.');
          });
      } else if (token != null && edit == true) {
        axios
          .patch(
            `http://localhost:5000/api/v1/mentorship/${currentModel}/${currentRes._id}`,
            data,
            {
              headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            successToast(`${currentModel} updated!`);
            console.log(res.data);
            setUpdate(!update);
          })
          .catch((err) => {
            errorToast('Something went wrong, please contact us.');
          });
      }
      setErr(false);
      setTitle('');
      setDescription('');
      setProgressPercentage('');
      setTime('');
      setModalShow(false);
      setEdit(false);
    }
  };
  useEffect(() => {
    if (edit) {
      console.log(currentRes);
      setTitle(currentRes.title);
      setDescription(currentRes.description);
      setProgressPercentage(currentRes.progress_percentage);
      setTime(currentRes.completion_time);
    } else {
      setTitle('');
      setDescription('');
      setProgressPercentage('');
      setTime('');
    }
  }, [currentRes, edit]);

  //  Sprint
  const DropDown = () => (
    <Form.Control
      onChange={(event) => {
        event.persist();
        console.log(event.target.value);
        setCurrentModel(event.target.value);
      }}
      id="controlId"
      value={currentModel}
      placeholder="Add New"
      bsPrefix={`${styles.fromControl} form-control form-control-lg`}
      as="select"
      size="lg"
    >
      <option value="sprint">Sprint</option>
      <option value="capstone">Capstone</option>
      <option value="course">Course</option>
      <option value="event">Upcoming Event</option>
    </Form.Control>
  );
  console.log(currentModel);
  return (
    <Modal
      {...propsR}
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
              <div className={styles.createEvenTitle}>
                {edit ? (
                  `Edit ${
                    currentModel.charAt(0).toUpperCase() + currentModel.slice(1)
                  }`
                ) : (
                  <DropDown />
                )}
              </div>
              <img
                className={styles.eventOutIcon}
                style={{ width: '30px', height: '30px' }}
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
                <label>Title</label>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  type="text"
                  placeholder="What is the event name?"
                />
              </div>
            </div>

            {currentModel == 'sprint' && (
              <div className={styles.row}>
                <div className={styles.col}>
                  <label>Notes</label>
                  <CreatableInputOnly setNotesValue={setNotesValue} />
                </div>
              </div>
            )}
            <div className={styles.row}>
              {currentModel != 'event' && (
                <div
                  style={{ width: '25%', marginRight: '1rem' }}
                  className={styles.col}
                >
                  <label>Progress Percentage</label>
                  <input
                    value={progressPercentage}
                    onChange={(e) => setProgressPercentage(e.target.value)}
                    type="text"
                    style={{ width: '80%' }}
                    placeholder="75%"
                    required
                  />
                </div>
              )}
              {currentModel == 'sprint' && (
                <div
                  className={styles.col}
                  style={{ width: '40%', marginRight: '10px' }}
                >
                  <label>Time to completion</label>
                  <input
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    type="text"
                    style={{ width: '40%' }}
                    placeholder="5 days"
                  />
                </div>
              )}
            </div>
            <div className={styles.row}>
              <div className={styles.col}>
                <label>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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

export default MentorModel;
