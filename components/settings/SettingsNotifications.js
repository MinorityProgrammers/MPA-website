import React, { useState, useContext } from 'react';
import styles from '../../styles/settings/settingBodyNotificationsNotifications.module.css';
import { GlobalContext } from '../../contexts/provider';
import updateProfileJSON from '../../contexts/actions/profile/updateProfileJSON';

const SettingsNotifications = ({ data }) => {
  const [message, setMessage] = useState(
    data.notifyMessages || false,
  );
  const [job, setJob] = useState(
    data.notifyJobAlerts || false,
  );
  const [events, setEvents] = useState(
    data.notifyEvents || false,
  );
  const [activity, setActivity] = useState(
    data.notifyAccountActivity || false,
  );

  // update userData
  const { profileDispatch } = useContext(GlobalContext);
  const updateHandler = () => {
    const inputStates = {
      notifyMessages: message,
      notifyJobAlerts: job,
      notifyEvents: events,
      notifyAccountActivity: activity,
    };
    // submit data
    updateProfileJSON(
      data._id,
      JSON.stringify(inputStates),
    )(profileDispatch);
  };
  return (
    <div className={styles.notificationsContent}>
      <h2>
        Notification Settings
      </h2>
      <h3>Please Tick the Notifications you will like to recieve</h3>
      <div className={`${styles.checkInput} ${message ? styles.active : ''}`}>
        <div onClick={() => setMessage(!message)}><i className="fas fa-check" /></div>
        <p>Message</p>
      </div>
      <div className={`${styles.checkInput} ${activity ? styles.active : ''}`}>
        <div onClick={() => setActivity(!activity)}><i className="fas fa-check" /></div>
        <p>Account Activity</p>
      </div>
      <div className={`${styles.checkInput} ${job ? styles.active : ''}`}>
        <div onClick={() => setJob(!job)}><i className="fas fa-check" /></div>
        <p>Job Alerts</p>
      </div>
      <div className={`${styles.checkInput} ${events ? styles.active : ''}`}>
        <div onClick={() => setEvents(!events)}><i className="fas fa-check" /></div>
        <p>Events</p>

      </div>
      <div className={styles.saveBtn}>
        <a onClick={updateHandler}>save</a>
      </div>
    </div>
  );
};

export default SettingsNotifications;
