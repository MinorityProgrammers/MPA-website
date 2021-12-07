import React, { useState, useEffect, useContext } from 'react';
import FormData from 'form-data';
import { useRouter } from 'next/router';
import { GlobalContext } from '../../contexts/provider';
import { updateProfile } from '../../contexts/actions/profile/updateProfile';
import { all } from '../../contexts/utils/settings/settingsInputFields';
import styles from '../../styles/settings/settingBodyNotificationsNotifications.module.css';
import CreateSettingInput from './CreateSettingInput';
import SettingBody from './SettingBody';

const SettingBodyNotificationsNotifications = function ({ settingsPage, data, userID }) {
  const router = useRouter();

  const inputFields = [
    all.notifyMessagesField,
    all.notifyAccountActivityField,
    all.notifyJobAlertsField,
    all.notifyEventsField,
  ];

  const initialInputState = {};

  inputFields.forEach(
    (field) => (initialInputState[field.name] = ''),
    // ex. {someInputFieldName: "inputFieldValue", ...}
  );

  const [inputStates, setInputStates] = useState(initialInputState);

  useEffect(() => {
    inputFields.forEach(
      (field) => (initialInputState[field.name] = data?.[field.name] || false),
    );

    setInputStates(initialInputState);
  }, [data]);

  const {
    profileDispatch,
    profileState: {
      profile: {
        profileLoading, profileError, profileData, profileIsUpdated,
      },
    },
  } = useContext(GlobalContext);

  const formData = new FormData();
  Object.keys(inputStates).forEach((inputName) => {
    formData.append(inputName, inputStates[inputName]);
  });

  const handleChange = (name, value) => {
    setInputStates({ ...inputStates, [name]: value });
  };

  const handleSubmit = (e) => {
    // submit data
    updateProfile(userID, formData)(profileDispatch);

    const slug = data?.userName;
    slug && router.push(`/user/${slug}`);
  };

  const closeProfileSetup = (e) => {
    setInputStates(initialInputState);

    const slug = data?.userName;
    slug && router.push(`/user/${slug}`);
  };
  return (
    <SettingBody
      settingsPage={settingsPage}
      data={data}
      userID={userID}
      handleSubmit={handleSubmit}
      closeProfileSetup={closeProfileSetup}
    >
      <div className={styles.notificationsContent}>
        <h5>Delivery</h5>
        <div className={styles.MPAInbox}>
          <h6>MPA Inbox</h6>
          {
            // display an input component for each input field
            [
              all.notifyMessagesField,
              all.notifyAccountActivityField,
              all.notifyJobAlertsField,
              all.notifyEventsField,
            ].map((field, key) => (
              <CreateSettingInput
                name={field.name}
                type={field.type}
                label={field.label}
                options={field.options}
                required={field.required}
                value={inputStates[field.name]}
                setValue={(value) => {
                  handleChange(field.name, value);
                }}
                key={key}
              />
            ))
          }
        </div>
      </div>
    </SettingBody>
  );
};

export default SettingBodyNotificationsNotifications;
