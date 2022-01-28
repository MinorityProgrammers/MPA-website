import React, { useState, useEffect, useContext } from 'react';
import FormData from 'form-data';
import { useRouter } from 'next/router';
import { GlobalContext } from '../../contexts/provider';
import updateProfile from '../../contexts/actions/profile/updateProfile';
import all from '../../contexts/utils/settings/settingsInputFields';
import styles from '../../styles/settings/settingBodyProfileMedia.module.css';
import CreateSettingInput from './CreateSettingInput';
import SettingBody from './SettingBody';

const SettingBodyProfileMedia = ({ settingsPage, data, userID }) => {
  const router = useRouter();

  const inputFields = [
    all.FacebookLinkField,
    all.LinkedinLinkField,
    all.GithubLinkField,
    all.GoogleLinkField,
    all.FigmaLinkField,
    all.DribbbleLinkField,
    all.ClickupLinkField,
  ];

  const initialInputState = {};

  inputFields.forEach((field) => {
    initialInputState[field.name] = '';
  });

  const [inputStates, setInputStates] = useState(initialInputState);

  useEffect(() => {
    inputFields.forEach((field) => {
      initialInputState[field.name] = data?.[field.name] || '';
    });

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
    if (slug) {
      router.push(`/user/${slug}`);
    }
  };

  const closeProfileSetup = () => {
    // discard changes
    setInputStates(initialInputState);

    const slug = data?.userName;
    if (slug) {
      router.push(`/user/${slug}`);
    }
  };

  return (
    <SettingBody
      settingsPage={settingsPage}
      data={data}
      userID={userID}
      handleSubmit={handleSubmit}
      closeProfileSetup={closeProfileSetup}
    >
      <div className={styles.mediaContent}>
        <h5>Social Media & Linked Accounts</h5>
        {
          // display an input component for each input field
          [
            all.FacebookLinkField,
            all.LinkedinLinkField,
            all.GithubLinkField,
            all.GoogleLinkField,
            all.FigmaLinkField,
            all.DribbbleLinkField,
            all.ClickupLinkField,
          ].map((field) => (
            <div className={styles.inputWrapper} key={field.name}>
              <img
                src={`../../assets/images/settings/media-${field.label
                  .split(' ')[0]
                  .toLocaleLowerCase()}.svg`}
                alt={`${field.label.split(' ')[0].toLocaleLowerCase()} icon`}
              />
              <CreateSettingInput
                name={field.name}
                type={field.type}
                label={field.label}
                options={field.options}
                required={field.required}
                halfWidth={field.halfWidth}
                rightSpaced={field.rightSpaced}
                leftSpaced={field.leftSpaced}
                value={inputStates[field.name]}
                setValue={(value) => {
                  handleChange(field.name, value);
                }}
              />
            </div>
          ))
        }
      </div>
    </SettingBody>
  );
};

export default SettingBodyProfileMedia;
