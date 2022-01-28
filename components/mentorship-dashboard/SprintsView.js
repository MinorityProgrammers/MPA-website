import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import styles from '../../styles/MentorCSS/Dashboard.module.css';
import Sprint from './Sprint';
import MentorModel from './MentorModel';

const SprintsView = ({
  sprints,
  courses,
  capstones,
  events,
  mentor,
  mentee,
  update,
  setUpdate,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [currentRes, setCurrentRes] = useState({});
  const [currentModel, setCurrentModel] = useState('sprint');
  return (
    <>
      <div
        style={{ justifyContent: 'space-between' }}
        className={styles.teamImg}
      >
        <div style={{ display: 'flex' }}>
          <img src="/assets/images/mentor/mentor-team.png" alt="team" />
          <p>TEAM SPRINTS</p>
        </div>
        <div style={{ marginTop: '3px' }}>
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
      </div>
      <MentorModel
        currentModel={currentModel}
        setCurrentModel={setCurrentModel}
        show={modalShow}
        onHide={() => setModalShow(false)}
        setModalShow={setModalShow}
        edit={edit}
        setEdit={setEdit}
        currentRes={currentRes}
        mentorship_id={sprints[0].mentorship_id}
        setUpdate={setUpdate}
        update={update}
      />
      <div className={styles.sprintsContainer}>
        {sprints.map((sprint) => (
          <Sprint
            currentModel={currentModel}
            setCurrentModel={setCurrentModel}
            sprint={sprint}
            courses={courses}
            capstones={capstones}
            events={events}
            mentor={mentor}
            mentee={mentee}
            key={sprint._id}
            setCurrentRes={setCurrentRes}
            setEdit={setEdit}
            setModalShow={setModalShow}
            setUpdate={setUpdate}
            update={update}
          />
        ))}
      </div>
    </>
  );
};

export default SprintsView;
