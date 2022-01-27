import React, { useState, useEffect, useContext } from 'react';
import FormData from 'form-data';
import { useRouter } from 'next/router';
import { GlobalContext } from '../../contexts/provider';
import updateProfile from '../../contexts/actions/profile/updateProfile';
import all from '../../contexts/utils/settings/settingsInputFields';
import styles from '../../styles/settings/settingBodySecurityPrivacy.module.css';
import CreateSettingInput from './CreateSettingInput';
import SettingBody from './SettingBody';

const SettingBodySecurityPrivacy = function ({ settingsPage, data, userID }) {
  const router = useRouter();

  const inputFields = [
    all.profileVisibilityField,
    all.birthdayVisibilityField,
    all.locationVisibilityField,
    all.emailVisibilityField,
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
    formData.append(inputName, inputStates[inputName]);
  });

  const handleChange = (name, value) => {
    setInputStates({ ...inputStates, [name]: value });
  };

  const handleSubmit = () => {
    // submit data
    updateProfile(userID, formData)(profileDispatch);

    const slug = data?.userName;
    if (slug) { router.push(`/user/${slug}`); }
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
      <div className={styles.privacyContent}>
        {
          // display an input component for each input field
          [
            all.profileVisibilityField,
            all.birthdayVisibilityField,
            all.locationVisibilityField,
            all.emailVisibilityField,
          ].map((field) => (
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
              key={field.name}
            />
          ))
        }
      </div>
    </SettingBody>
  );
};

export default SettingBodySecurityPrivacy;
