import React, { useState, useEffect, useContext } from 'react';
import styles from '../../styles/settings/settingBodySecurityLogin.module.css';
import findUserNames from '../../helpers/userNames';
import findUserEmails from '../../helpers/userEmails';
import { GlobalContext } from '../../contexts/provider';
import updateProfile from '../../contexts/actions/profile/updateProfile';
import SettingBodySecurityManagementModal from './SettingBodySecurityManagementModal';
import updateProfileJSON from '../../contexts/actions/profile/updateProfileJSON';

const bcrypt = require('bcryptjs');

const SettingsSecurity = ({ data, setData }) => {
  const [email, setEmail] = useState(data?.email || '');
  const [userName, setUserName] = useState(data?.userName || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmtPassword, setConfirmPassword] = useState('');
  const [usernames, setUsernames] = useState([]);
  const [emails, setEmails] = useState([]);
  const [userNameWarning, setUserNameWarning] = useState('');
  const [emailWarning, setEmailWarning] = useState('');
  const [currentPasswordWarning, setCurrentPasswordWarning] = useState('');
  const [newPasswordWarning, setNewPasswordWarning] = useState('');
  const [confirmPasswordWarning, setConfirmPasswordWarning] = useState('');
  const [tabsActive, setTabsActive] = useState({
    login: true,
    management: false,
    privacy: false,
  });
  // Account Management
  const [modal, openModal] = useState('');
  // Privacy
  const [profileVisibility, setProfileVisibility] = useState(data?.profileVisibility);
  const [locationVisibility, setLocationVisibility] = useState(data?.locationVisibility);
  const [birthdayVisibility, setBirthdayVisibility] = useState(data?.birthdayVisibility);
  const [emailVisibility, setEmailVisibility] = useState(data?.emailVisibility);
  // update profile
  const { profileDispatch } = useContext(GlobalContext);

  useEffect(() => {
    fetch(`${process.env.BASE_URI}/user`)
      .then((response) => response.json())
      .then((_data) => {
        setUsernames(findUserNames(_data.data));
        setEmails(findUserEmails(_data.data));
      });
  }, []);

  const updateUserName = (e) => {
    // eslint-disable-next-line no-useless-escape
    if (/(^$)|(^[0-9A-Za-z\-]+$)/.test(e.target.value)) {
      setUserName(e.target.value);
      setUserNameWarning('');
    }
  };
  const updateEmail = (e) => {
    if (/^\S*$/.test(e.target.value)) {
      setEmail(e.target.value);
      setEmailWarning('');
    }
  };
  const updateHandler = () => {
    // username check
    let userWarning = userNameWarning;
    if (userName.length < 4) {
      userWarning = true;
      setUserNameWarning('Min length of 3 characters.');
    } else if (userName === data.userName) {
      userWarning = false;
      setUserNameWarning('');
    } else if (usernames.includes(userName)) {
      userWarning = true;
      setUserNameWarning('Username already exists.');
    }

    // email check
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let emWarning = emailWarning;
    if (!emailPattern.test(email)) {
      emWarning = true;
      setEmailWarning('Please enter a valid email address.');
    } else if (email === data.email) {
      emWarning = false;
      setEmailWarning('');
    } else if (emails.includes(email)) {
      emWarning = true;
      setEmailWarning('This email address is already being used.');
    }

    const checkBcrypt = async () => {
      if (data.password) {
        const check = await bcrypt.compare(currentPassword || '', data.password || '');
        return check;
      }

      return true;
    };

    // password check
    let passWarning = currentPasswordWarning;
    checkBcrypt().then((res) => {
      setCurrentPasswordWarning(res ? '' : 'Password incorrect');
      passWarning = !res;

      // new password check
      let newWarning = newPasswordWarning;
      let confirmWarning = confirmPasswordWarning;
      if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(newPassword)) {
        setNewPasswordWarning('');
        newWarning = false;
        if (newPassword === confirmtPassword) {
          confirmWarning = false;
          setConfirmPasswordWarning('');
        } else {
          confirmWarning = true;
          setConfirmPasswordWarning('Passwords do not match.');
        }
      } else {
        newWarning = true;
        setNewPasswordWarning('Password does not meet these requirements.');
      }
      if (!userWarning
       && !passWarning
       && !confirmWarning
       && !newWarning
   && !emWarning) {
        // submit data
        const formData = new FormData();
        const hashPass = bcrypt.hashSync(newPassword, 12);
        formData.append('userName', userName);
        formData.append('email', email);
        formData.append('password', hashPass);
        const updatedUser = updateProfile(data._id, formData)(profileDispatch);
        updatedUser.then((userInfo) => setData(userInfo));
        setNewPassword('');
        setConfirmPassword('');
        setCurrentPassword('');
      }
    });
  };

  // Account Management
  const goBack = () => {
    openModal(false);
  };
  const deactivateAccount = () => {
    openModal(false);
  };
  const deleteAccount = () => {
    openModal(false);
  };
  // Privacy
  const privacyUpdateHandler = () => {
    const inputStates = {
      profileVisibility,
      locationVisibility,
      birthdayVisibility,
      emailVisibility,
    };
    // submit data
    const updatedUser = updateProfileJSON(
      data._id,
      JSON.stringify(inputStates),
    )(profileDispatch);
    updatedUser.then((res) => setData(res));
  };
  return (
    <div className="tw-w-full">
      <div className={styles.sectionHeader}>
        <div
          onClick={() => setTabsActive({
            login: true,
            management: false,
            privacy: false,
          })}
          className={tabsActive.login ? styles.active : ''}
        >
          Account  Login

        </div>
        <div
          onClick={() => setTabsActive({
            login: false,
            management: true,
            privacy: false,
          })}
          className={tabsActive.management ? styles.active : ''}
        >
          Account Management

        </div>
        <div
          onClick={() => setTabsActive({
            login: false,
            management: false,
            privacy: true,
          })}
          className={tabsActive.privacy ? styles.active : ''}
        >
          Privacy

        </div>
      </div>
      <div className={styles.line} />
      {tabsActive.login
      && (
      <div className={styles.login}>
        <h2>Update Account Login</h2>
        <label>Email</label>
        <input value={email} onChange={updateEmail} placeholder="sopard20@gmail.com" type="text" />
        {emailWarning.length > 0 && (
        <p className={styles.warning}>
          <i className="fas fa-exclamation-triangle" />
          {' '}
          {emailWarning}
        </p>
        )}
        <label>Username</label>
        <div className={styles.passwordDes}>
          <h3>Usernames can contain letters (a-z), numbers (0-9), and hyphens (-).</h3>
        </div>
        <input value={userName} onChange={updateUserName} max={5} placeholder="Buchi05" type="text" />
        {userNameWarning.length > 0 && (
        <p className={styles.warning}>
          <i className="fas fa-exclamation-triangle" />
          {' '}
          {userNameWarning}
        </p>
        )}
        <label>Change Password</label>
        <div className={styles.passwordDes}>
          <h3>Password must be at least 8 characters and include at least one:</h3>
          <div>
            <div>
              <p>
                - Lowercase letter
              </p>
              <p>- Uppercase letter</p>
            </div>
            <div>
              <p>
                - Number
              </p>
              <p>- Special character</p>
            </div>
          </div>
        </div>
        <label>Old Password</label>
        <input value={currentPassword} onChange={(e) => { setCurrentPassword(e.target.value); setConfirmPasswordWarning(''); }} type="password" />
        {currentPasswordWarning.length > 0 && (
        <p className={styles.warning}>
          <i className="fas fa-exclamation-triangle" />
          {' '}
          {currentPasswordWarning}
        </p>
        )}
        <label>New Password</label>
        <input value={newPassword} onChange={(e) => { setNewPassword(e.target.value); setNewPasswordWarning(''); }} type="password" />
        {newPasswordWarning.length > 0 && (
        <p className={styles.warning}>
          <i className="fas fa-exclamation-triangle" />
          {' '}
          {newPasswordWarning}
        </p>
        )}
        <label>Confirm new Password</label>
        <input value={confirmtPassword} onChange={(e) => { setConfirmPassword(e.target.value); setConfirmPasswordWarning(''); }} type="password" />
        {confirmPasswordWarning.length > 0 && (
        <p className={styles.warning}>
          <i className="fas fa-exclamation-triangle" />
          {' '}
          {confirmPasswordWarning}
        </p>
        )}
        <div className={styles.saveBtn}>
          <a onClick={updateHandler}>save</a>
        </div>
      </div>
      )}
      {tabsActive.management
      && (
      <div className={styles.login}>
        {(modal === 'deactivate' || modal === 'delete') && (
        <SettingBodySecurityManagementModal
          modal={modal}
          goBack={goBack}
          deactivateAccount={deactivateAccount}
          deleteAccount={deleteAccount}
        />
        )}
        <h2>Update Account Login</h2>
        <div className={styles.deactivatetBtn}>
          <a onClick={() => openModal('delete')}>Deactivate Account</a>
          <p>*Temporarily deactivates your account. Must be reactivated by MPA.</p>
        </div>
        <div className={styles.deleteBtn}>
          <a onClick={() => openModal('deactivate')}>Delete Account</a>
          <p>
            *Permanently deletes your account, cannot be reactivated.
          </p>
        </div>
      </div>
      )}
      {tabsActive.privacy
      && (
        <div className={styles.notificationsContent}>
          <h2>
            Profile Visibility
          </h2>
          <div className="tw-flex tw-my-4">
            <div style={{ marginRight: '20%' }} className={`${styles.checkInput} ${profileVisibility ? styles.active : ''}`}>
              <div onClick={() => setProfileVisibility(true)}><i className="fas fa-check" /></div>
              <p>Public</p>
            </div>
            <div className={`${styles.checkInput} ${!profileVisibility ? styles.active : ''}`}>
              <div onClick={() => setProfileVisibility(false)}><i className="fas fa-check" /></div>
              <p>Private</p>
            </div>
          </div>
          <h2>
            Email Visibility
          </h2>
          <div className="tw-flex tw-my-4">
            <div style={{ marginRight: '20%' }} className={`${styles.checkInput} ${emailVisibility ? styles.active : ''}`}>
              <div onClick={() => setEmailVisibility(true)}><i className="fas fa-check" /></div>
              <p>Public</p>
            </div>
            <div className={`${styles.checkInput} ${!emailVisibility ? styles.active : ''}`}>
              <div onClick={() => setEmailVisibility(false)}><i className="fas fa-check" /></div>
              <p>Private</p>
            </div>
          </div>
          <h2>
            Location Visibility
          </h2>
          <div className="tw-flex tw-my-4">
            <div style={{ marginRight: '20%' }} className={`${styles.checkInput} ${locationVisibility ? styles.active : ''}`}>
              <div onClick={() => setLocationVisibility(true)}><i className="fas fa-check" /></div>
              <p>Public</p>
            </div>
            <div className={`${styles.checkInput} ${!locationVisibility ? styles.active : ''}`}>
              <div onClick={() => setLocationVisibility(false)}><i className="fas fa-check" /></div>
              <p>Private</p>
            </div>
          </div>
          <h2>
            Birthday Visability
          </h2>
          <div className="tw-flex tw-my-4">
            <div style={{ marginRight: '20%' }} className={`${styles.checkInput} ${birthdayVisibility ? styles.active : ''}`}>
              <div onClick={() => setBirthdayVisibility(true)}><i className="fas fa-check" /></div>
              <p>Public</p>
            </div>
            <div className={`${styles.checkInput} ${!birthdayVisibility ? styles.active : ''}`}>
              <div onClick={() => setBirthdayVisibility(false)}><i className="fas fa-check" /></div>
              <p>Private</p>
            </div>
          </div>

          <div className={styles.saveBtn}>
            <a onClick={privacyUpdateHandler}>save</a>
          </div>
        </div>

      )}
    </div>
  );
};

export default SettingsSecurity;
