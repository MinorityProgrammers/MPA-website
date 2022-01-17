import React, { useState, useEffect, useContext } from 'react';
import FormData from 'form-data';
import { useRouter } from 'next/router';
import { GlobalContext } from '../../contexts/provider';
import updateProfile from '../../contexts/actions/profile/updateProfile';
import all from '../../contexts/utils/settings/settingsInputFields';
import styles from '../../styles/settings/settingBodyProfileOverview.module.css';
import CreateSettingInput from './CreateSettingInput';
import SettingBody from './SettingBody';

const SettingBodyProfileOverview = function ({
  settingsPage, data, userID, setGenerateAvatarPopUp,
}) {
  const router = useRouter();

  const inputFields = [all.bioField, all.languageField];

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
    setInputStates(initialInputState);

    const slug = data?.userName;
    if (slug) { router.push(`/user/${slug}`); }
  };

  // console.log({ inputStates });
  return (
    <SettingBody
      settingsPage={settingsPage}
      data={data}
      userID={userID}
      handleSubmit={handleSubmit}
      closeProfileSetup={closeProfileSetup}
    >
      <div className={styles.userContent}>
        <div className={styles.imgDiv}>
          <img
            src={data?.profilePicture || '/assets/images/profile.png'}
            alt="avatar"
          />
          <img
            src="../../assets/images/settings/edit-avatar.svg"
            alt="edit icon"
            className={styles.editIcon}
            onClick={() => setGenerateAvatarPopUp(true)}
          />
        </div>
        <h5>
          {data?.firstName && data?.lastName
            ? `${data?.firstName} ${data?.lastName}`
            : 'no name'}
        </h5>
        <ul className={styles.userDetails}>
          <nav>
            <li>Company</li>
            <li>Role</li>
            <li>Username</li>
            <li>Email</li>
            <li>Link URL</li>
          </nav>
          <div>
            <li>Minority Programmers Assocation</li>
            <li>{data?.role || ''}</li>
            <li>{data?.userName || ''}</li>
            <li>
              {data?.email ? (
                <a href={`mailto:${data?.email}`}>{data?.email}</a>
              ) : (
                ''
              )}
            </li>
            <li>
              {data?.userName ? (
                <a
                  href={`https://minorityprogrammers.com/user/${data?.userName}`}
                >
                  {`https://minorityprogrammers.com/user/${data?.userName}`}
                </a>
              ) : (
                ''
              )}
            </li>
          </div>
        </ul>
      </div>
      {
        // display an input component for each input field
        [all.bioField, all.languageField].map((field) => (
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
    </SettingBody>
  );
};

export default SettingBodyProfileOverview;
