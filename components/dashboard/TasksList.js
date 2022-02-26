import { AiTwotoneCalendar } from 'react-icons/ai';
import React from 'react';

const TasksList = () => (
  <div
    className="overview-courses-cards d-flex flex-column"
    style={{ width: '100%', marginTop: 'auto' }}
  >
    <TaskCard />
    <TaskCard />
  </div>
);

export default TasksList;

const TaskCard = () => (
  <div className="overview-course-card d-flex flex-row justify-content-between">
    {/* First and Second */}
    <div className="d-flex flex-row" style={{ width: '70%' }}>
      {/* First Column - logo */}
      <div
        className="overview-career-card-image d-flex justify-content-center align-items-center"
        style={{ width: '20%', height: '100%' }}
      >
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            width: '2em',
            height: '2em',
            background: '#6A0C8B',
            borderRadius: '50%',
          }}
        >
          <AiTwotoneCalendar style={{ color: 'white' }} />
        </div>
      </div>
      {/* Second Column - Task Name + Description */}
      <div
        className="overview-course-card-info d-flex flex-column justify-content-center"
        style={{ width: '68%', marginLeft: '2%', height: '100%' }}
      >
        <p className="overview-course-card-info-title">Host an Event</p>
        <p className="overview-course-card-description">
          Cool idea, host an event
        </p>
      </div>
    </div>

    {/* Third and Fourth Column */}
    <div
      className="d-flex flex-row justify-content-between"
      style={{ width: '40%' }}
    >
      {/* Third Column */}
      <div
        className="overview-course-currency d-flex justify-content-center flex-column align-items-center"
        style={{ marginRight: '2%' }}
      >
        <p style={{ fontSize: '10px' }}>
          EARN 15 $MINORITY
        </p>
      </div>
      {/* Fourth Column */}
      <div className="d-flex justify-content-center align-items-center ">
        <a href="#" target="_blank">
          <i className="far fa-arrow-alt-circle-right" />

        </a>
      </div>
    </div>
  </div>
);
