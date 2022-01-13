import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmptyOverviewComponent from './EmptyOverviewComponent';
import TasksList from './TasksList';

const OverviewMentor = (props) => {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('overview');
  const [mentorInfo, setMentorInfo] = useState();
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    if (props.token != null) {
      axios.get(' https://koinstreet-learn-api.herokuapp.com/api/v1/mentor/', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type',
          Authorization: `Bearer ${props.token}`,
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        const tempMentors = res?.data?.data;
        console.log('Mentors: ', tempMentors);
        // console.log(userEventsData);
        setMentors(tempMentors);
        if (tempMentors?.length > 0) {
          setMentorInfo(tempMentors[0]);
          console.log('Mentor: ', tempMentors[0]?.user_id);
        }
        return true;
      }).then((res) => {
        setLoading(false);
      }).catch((error) => {
        if (error?.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error?.response?.data);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error?.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
        setMentorInfo([]);
        setLoading(true);
      });
    }
  }, []);

  const OverviewComponent = () => (
    <div className="d-flex flex-column align-items-start justify-content-between" style={{ width: '100%', height: '100%' }}>
      {/* 3 rows: profile + name - meeting date + mentorship start date + number of mentees - button */}
      {/* first row */}
      <div className="d-flex flex-row align-items-center justify-content-start" style={{ width: '100%' }}>
        <img
          style={{
            width: '60px', height: '60px', borderRadius: '50%', marginBottom: '2%', marginRight: '4%',
          }}
          src={mentorInfo?.user_id?.profilePicture || '/assets/images/profile.png'}
          alt="avatar"
        />
        <div className="d-flex flex-column">
          <p style={{
            fontSize: '14px', fontWeight: 700, color: 'black', marginBottom: '2%',
          }}
          >
            {mentorInfo?.user_id?.firstName}
            {' '}
            {mentorInfo?.user_id?.lastName}
          </p>
          <p style={{
            fontSize: '12px', fontWeight: 400, color: 'black', marginBottom: '2%',
          }}
          >
            Position
          </p>
        </div>
      </div>
      {/* second row */}
      <div className="d-flex flex-row justify-content-between">
        <div className="d-flex flex-column ">
          <p style={{
            fontSize: '12px', fontWeight: 400, color: 'black', marginBottom: '2%',
          }}
          >
            <strong>Last Meeting: </strong>
            19th Jun, 2021 @ 11:00am
          </p>
          <p style={{
            fontSize: '12px', fontWeight: 400, color: 'black', marginBottom: '2%',
          }}
          >
            <strong>Mentorship Start Date: </strong>
            3rd March, 2021
          </p>
          <p style={{
            fontSize: '12px', fontWeight: 400, color: 'black', marginBottom: '2%',
          }}
          >
            <strong>Number of Mentees: </strong>
            4
          </p>
        </div>

      </div>
      {/* third row */}
      <div className="d-flex flex-row justify-content-end" style={{ width: '100%' }}>
        <button className="btn btn-primary" style={{ background: '#151371', fontSize: '12px' }}>
          Message
          {mentorInfo?.user_id?.firstName}
        </button>
      </div>
    </div>
  );

  return (
    <div className="d-flex flex-column justify-content-between " style={{ height: '100%', width: '100%' }}>
      {/* First row */}
      <div className="d-flex flex-row justify-content-between align-items-center" style={{ height: '13%', width: '100%', marginBottom: '2%' }}>
        <p style={{
          fontSize: '18px', fontWeight: '700', color: 'black', margin: 0,
        }}
        >
          Mentor
        </p>
        <div className="overview-courses-list d-flex flex-row justify-content-between align-items-center" style={{ maxWidth: '80%' }}>
          <div className="d-flex flex-row justify-content-between" style={{ height: '25px' }}>
            <div
              className={currentView === 'overview' ? 'overview-career-button selected' : 'overview-career-button'}
              onClick={() => { setCurrentView('overview'); }}
              style={{ marginRight: '2%' }}
            >
              <p>Overview</p>
            </div>

            <div
              className={currentView === 'Tasks' ? 'overview-career-button selected' : 'overview-career-button'}
              onClick={() => { setCurrentView('Tasks'); }}
            >
              <p>Tasks</p>
            </div>
          </div>
        </div>
      </div>
      <div className="" style={{ height: '85%' }}>

        {loading
          ? (
            <EmptyOverviewComponent
              imgURL="https://s3-alpha-sig.figma.com/img/c57e/17ea/eb507081228d5162cdda273edf35170d?Expires=1638748800&Signature=EQS3119ucAld6O05oWqzuNT6Kv2zVucef1f2yHThNWc7t6gfBxVNozW4wgclXWIAkAqrmq3r8-iPDDeYxEJF1c1Oj2SD5xW0mMNhdxdchh-X-W2zxto2c9yqG6HVcdO2s7MXHZ0pJZPKE8sp0t9sum2T29yuXvaS-Yh8i8ycIvF7rYWxmhRypnfuOEJkzciRkCtFoht3CHdapT2yk4N77ptYD-N1DRYt9ZDUgroIVRI8BgYaiAXDkUHoZOhQkv2nxhilIkqb8BMoQDsdySXQ7A-ERrxiVKUOA8CZH5GlO3iLhetpq03Fvr~W8N-UYKRR-5YW29IBKOTIBvWYSu-ZjA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
              description="Oops, You don’t have a Mentor yet. Would you like to be assigned to one?."
              btnText="Yes, I want a Mentor"
              btnFunction={() => { setLoading(false); }}
            />
          )
          : currentView === 'overview'
            ? <OverviewComponent />
            : <TasksList />}
      </div>
    </div>
  );
};

export default OverviewMentor;
