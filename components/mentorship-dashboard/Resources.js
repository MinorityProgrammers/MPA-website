import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import ResourcesModel from './ResourcesModel';
import styles from '../../styles/MentorCSS/Resources.module.css';
import { successToast, errorToast } from '../../contexts/utils/toasts';

const Resources = ({ resources, mentorship, setUpdate, update }) => {
  const [modalShow, setModalShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [currentRes, setCurrentRes] = useState({});

  // checking if the user is a menotr
  const user = JSON.parse(window.localStorage.getItem('userInfo'));
  let is_mentor = user.user.is_mentor;
  // delete and update element
  const Edit = ({ id, res }) => (
    <div>
      <FontAwesomeIcon
        onClick={() => DeleteHandler(id)}
        className={styles.deleteIcon}
        icon={faTrashAlt}
      />
      <FontAwesomeIcon
        onClick={() => {
          setEdit(true);
          setModalShow(true);
          setCurrentRes(res);
        }}
        className={styles.editIcon}
        icon={faEdit}
      />
    </div>
  );

  // Delete Req
  const DeleteHandler = (id) => {
    const token = window.localStorage.getItem('jwtToken');

    if (token != null) {
      axios
        .delete(`http://localhost:5000/api/v1/mentorship/resource/${id}`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          successToast('Resource Deleted successfully!');
          setUpdate(!update);
        })
        .catch((err) => {
          errorToast('Something went wrong, please contact us.');
        });
    }
  };
  return (
    <div>
      <div>
        <div className={styles.teamImg}>
          <img src="/assets/images/mentor/calendarIcon.png" alt="calendar" />
          <p>RESOURCES</p>
        </div>
        <ResourcesModel
          show={modalShow}
          onHide={() => setModalShow(false)}
          setModalShow={setModalShow}
          edit={edit}
          setEdit={setEdit}
          currentRes={currentRes}
          mentorship_id={resources[0].mentorship_id}
          update={update}
          setUpdate={setUpdate}
        />
        {is_mentor && (
          <div>
            <Button
              onClick={() => {
                setModalShow(true);
                setEdit(false);
              }}
              variant="secondary"
              size="sm"
            >
              add new
            </Button>
          </div>
        )}
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.row}>
          {resources.map((res) => (
            <div key={res._id} className={styles.card}>
              <img src={res.icon} alt="communication-icon" />
              <div className={styles.cardTitle}>{res.title}</div>
              <div className={styles.cardbody}>{res.description}</div>
              {is_mentor && <Edit res={res} id={res._id} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
