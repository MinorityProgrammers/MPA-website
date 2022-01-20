import React, { useState, useEffect, useContext } from 'react';
import FormData from 'form-data';
import { useRouter } from 'next/router';
import { GlobalContext } from '../../contexts/provider';
import updateProfile from '../../contexts/actions/profile/updateProfile';
import all from '../../contexts/utils/settings/settingsInputFields';
import styles from '../../styles/settings/settingBodySecurityLogin.module.css';
import CreateSettingInput from './CreateSettingInput';
import SettingBody from './SettingBody';
import { uprContext } from '../../contexts/settingsPagesProvider/settingsPagesProvider';
import findUserNames from '../../helpers/userNames';
import findUserEmails from '../../helpers/userEmails';

const SettingBodySecurityLogin = function ({ settingsPage, data, userID }) {
  const router = useRouter();
  const [changePassword, setChangePassword] = useState(false);
  const [usernames, setUsernames] = useState([]);
  const [emails, setEmails] = useState([]);
  const [usernameWarning, setUsernameWarning] = useState(false);
  const [wrongUsernameWarning, setWrongUsernameWarning] = useState(false);
  const [emailWarning, setEmailWarning] = useState(false);
  const [wrongEmailWarning, setWrongEmailWarning] = useState(false);

  const { updatePasswordRedirection, setUpdatePasswordRedirection } = useContext(uprContext);
  useEffect(() => {
    if (updatePasswordRedirection) { setChangePassword(true); }
  }, []);

  useEffect(() => {
    fetch(`${process.env.BASE_URI}/user`)
      .then((response) => response.json())
      .then((_data) => {
        setUsernames(findUserNames(_data.data));
        setEmails(findUserEmails(_data.data));
      });
  }, []);

  const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const inputFields = [
    all.emailField,
    all.usernameField,
    all.currentPasswordField,
    all.newPasswordField,
    all.confirmNewPasswordField,
  ];

  const initialInputState = {};

  inputFields.forEach(
    (field) => { initialInputState[field.name] = ''; },
    // ex. {someInputFieldName: "inputFieldValue", ...}
  );

  const [inputStates, setInputStates] = useState(initialInputState);

  useEffect(() => {
    inputFields.forEach(
      (field) => { initialInputState[field.name] = data?.[field.name] || ''; },
    );

    setInputStates(initialInputState);
  }, [data]);

  // update userData
  const { profileDispatch } = useContext(GlobalContext);

  const formData = new FormData();
  Object.keys(inputStates).forEach((inputName) => {
    let value;
    if (inputName === 'email' && inputStates[inputName] === '') {
      value = data?.email ? data.email : '';
    } else if (inputName === 'userName' && inputStates[inputName] === '') {
      value = data?.email ? data.email : '';
    } else {
      value = inputStates[inputName];
    }

    formData.append(inputName, value);
  });

  const toggleUsernameWarning = (on) => {
    if (on) {
      if (!usernameWarning) {
        const warning = "<p class='cp-warning'>Username unavailable</p>";
        document
          .getElementsByClassName('securityLoginPasswordInput')[0]
          .insertAdjacentHTML('afterend', warning);
        setUsernameWarning(true);
      }
    } else if (usernameWarning) {
      document.getElementsByClassName('cp-warning')[0].remove();
      setUsernameWarning(false);
    }
  };

  const toggleWrongUsernameWarning = (on) => {
    if (on) {
      if (!wrongUsernameWarning) {
        const warning = "<p class='cp-warning'>Wrong username, allowed: letters, numbers and dashes</p>";
        document
          .getElementsByClassName('securityLoginPasswordInput')[0]
          .insertAdjacentHTML('afterend', warning);
        setWrongUsernameWarning(true);
      }
    } else if (wrongUsernameWarning) {
      document.getElementsByClassName('cp-warning')[0].remove();
      setWrongUsernameWarning(false);
    }
  };

  const toggleEmailWarning = (on) => {
    if (on) {
      if (!emailWarning) {
        const warning = "<p class='cp-warning'>Email unavailable</p>";
        document
          .getElementsByClassName('securityEmailInput')[0]
          .insertAdjacentHTML('afterend', warning);
        setEmailWarning(true);
      }
    } else if (emailWarning) {
      document.getElementsByClassName('cp-warning')[0].remove();
      setEmailWarning(false);
    }
  };

  const toggleWrongEmailWarning = (on) => {
    if (on) {
      if (!wrongEmailWarning) {
        const warning = "<p class='cp-warning'>Email is invalid</p>";
        document
          .getElementsByClassName('securityEmailInput')[0]
          .insertAdjacentHTML('afterend', warning);
        setWrongEmailWarning(true);
      }
    } else if (wrongEmailWarning) {
      document.getElementsByClassName('cp-warning')[0].remove();
      setWrongEmailWarning(false);
    }
  };

  const handleChange = (name, value) => {
    if (
      name === 'userName'
      && usernames.includes(value)
      && data?.userName !== value
      && !(value === '')
    ) {
      toggleUsernameWarning(true);
    } else {
      toggleUsernameWarning(false);
    }

    if (name === 'userName' && /[^\w\-]/.test(value)) {
      toggleWrongUsernameWarning(true);
    } else {
      toggleWrongUsernameWarning(false);
    }

    if (
      name === 'email'
      && emails.includes(value)
      && data?.email !== value
      && !(value === '')
    ) {
      toggleEmailWarning(true);
    } else {
      toggleEmailWarning(false);
    }

    if (
      name === 'email'
      && (value.trim().length < 5
        || (value.trim().length >= 5 && !regEmail.test(value.trim())))
    ) {
      toggleWrongEmailWarning(true);
    } else {
      toggleWrongEmailWarning(false);
    }

    setInputStates({ ...inputStates, [name]: value.toLowerCase() });
  };

  const handleSubmit = () => {
    if (
      // email already exists
      emails.includes(inputStates?.email)
      && data?.email !== inputStates?.email
      && !(inputStates?.email === '')
    ) {
      toggleEmailWarning(true);
    } else if (
      inputStates?.email.trim().length < 5
      || (inputStates?.email.trim().length >= 5
        && !regEmail.test(inputStates?.email.trim()))
    ) {
      // email format is wrong
      toggleWrongEmailWarning(true);
    } else if (
      // username already exists
      usernames.includes(inputStates?.userName)
      && data?.userName !== inputStates?.userName
      && !(inputStates?.userName === '')
    ) {
      toggleUsernameWarning(true);
    } else if (/[^\w\-]/.test(inputStates?.userName)) {
      // username contains symbols
      toggleWrongUsernameWarning(true);
    } else if (
      data?.email === inputStates?.email
      && data?.userName === inputStates?.userName
    ) {
      // email and username remains unchanged
      const warning = "<p class='cp-warning'>No changes made to save</p>";
      if (!document.getElementsByClassName('cp-warning').length) {
        document
          .getElementsByClassName('securityEmailAndUserNameInput')[0]
          .insertAdjacentHTML('afterend', warning);

        setTimeout(() => {
          document.getElementsByClassName('cp-warning')[0].remove();
        }, 3000);
      }
    } else {
      // submit data
      updateProfile(userID, formData)(profileDispatch);

      if (data?.userName === inputStates?.userName) {
        const slug = data?.userName;
        if (slug) { router.push(`/user/${slug}`); }
      } else {
        // wait until username updates to generate new route for user profile page
        setTimeout(() => {
          const slug = inputStates?.userName;
          if (slug) { router.push(`/user/${slug}`); }
        }, 3000);
      }
    }
  };

  const closeProfileSetup = () => {
    // discard changes
    const slug = data?.userName;
    if (slug) { router.push(`/user/${slug}`); }
  };

  return (
    <SettingBody
      settingsPage={settingsPage}
      data={data}
      userID={userID}
      handleSubmit={handleSubmit}
      closeProfileSetup={closeProfileSetup}
    >
      <div className={styles.loginContent}>
        <div className={`${styles.ualWrap} securityEmailAndUserNameInput`}>
          <h5>Update Account Login</h5>
          {
            // display an input component for each input field
            [all.emailField, all.usernameField].map((field) => (
              <CreateSettingInput
                name={field.name}
                type={field.type}
                label={field.label}
                options={field.options}
                required={field.required}
                halfWidth={field.halfWidth}
                rightSpaced={field.rightSpaced}
                value={inputStates[field.name]}
                setValue={(value) => {
                  handleChange(field.name, value);
                }}
                key={field.name}
              />
            ))
          }
        </div>
        <div className={styles.cpWrap}>
          <h5>
            <span
              onClick={() => {
                if (updatePasswordRedirection) { setUpdatePasswordRedirection(false); }
                setChangePassword((state) => !state);
              }}
            >
              Change Password
            </span>
          </h5>
          {changePassword
            // display an input component for each input field
            && [
              all.currentPasswordField,
              all.newPasswordField,
              all.confirmNewPasswordField,
            ].map((field) => (
              <CreateSettingInput
                name={field.name}
                type={field.type}
                label={field.label}
                options={field.options}
                required={field.required}
                halfWidth={field.halfWidth}
                rightSpaced={field.rightSpaced}
                value={inputStates[field.name]}
                setValue={(value) => {
                  handleChange(field.name, value);
                }}
                key={field.name}
              />
            ))}
        </div>
      </div>
    </SettingBody>
  );
};

export default SettingBodySecurityLogin;
