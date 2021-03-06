import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { GlobalContext } from '../../contexts/provider';
import updateProfileJSON from '../../contexts/actions/profile/updateProfileJSON';
import all from '../../contexts/utils/settings/settingsInputFields';
import styles from '../../styles/settings/settingBodyProfileDetails.module.css';
import CreateSettingInput from './CreateSettingInput';
import CreateSettingAddition from './CreateSettingAddition';
import SettingBody from './SettingBody';
import findUserNames from '../../helpers/userNames';

const SettingBodyProfileDetails = ({ settingsPage, data, userID }) => {
  const [, setUsernames] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.BASE_URI}/user`)
      .then((response) => response.json())
      .then((_data) => {
        setUsernames(findUserNames(_data.data));
      });
  }, []);

  const inputFields = [
    all.firstNameField,
    all.lastNameField,
    all.birthdateField,
    all.genderField,
    all.phoneField,
    all.locationField,
    all.nationalityField,
    all.ethnicityField,
  ];

  const initialInputState = {};

  inputFields.forEach((field) => {
    initialInputState[field.name] = '';
  });

  const [inputStates, setInputStates] = useState(initialInputState);

  useEffect(() => {
    inputFields.forEach((field) => {
      initialInputState[field.name] = field.name === 'birthday'
        ? data?.birthday
          ? new Date(data.birthday)
          : ''
        : data?.[field.name] || '';
    });

    setInputStates(initialInputState);
  }, [data]);

  // update userData
  const { profileDispatch } = useContext(GlobalContext);

  const handleChange = (name, value) => {
    setInputStates({ ...inputStates, [name]: value });
  };

  // get value from select field within same parent and add it as an array element to state
  const handleAdd = (e, name, reset) => {
    const value = e.target.parentNode.querySelector(
      '.css-1uccc91-singleValue',
    )?.textContent;

    if (value) {
      const prevValues = inputStates[name];

      handleChange(name, [...new Set([...prevValues, value])]);

      // wrong code syntax and "addedText" is unused
      const addedText = (e.target.parentNode.querySelector(
        '.css-1uccc91-singleValue',
      ).textContent = reset);
    }
  };

  const handleSubmit = () => {
    Object.keys(inputStates).forEach((inputName) => {
      // let value;
      if (inputName === 'firstName' && inputStates[inputName] === '') {
        inputStates[inputName] = data?.firstName ? data.firstName : '';
      } else if (inputName === 'lastName' && inputStates[inputName] === '') {
        inputStates[inputName] = data?.lastName ? data.lastName : '';
      }
    });

    // submit data
    updateProfileJSON(userID, JSON.stringify(inputStates))(profileDispatch);

    const slug = data?.userName;
    if (slug) {
      router.push(`/user/${slug}`);
    }
  };

  const closeProfileSetup = () => {
    // discard changes
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
      <div className={styles.profileDetailsContent}>
        {
          // display an input component for each input field
          [
            all.firstNameField,
            all.lastNameField,
            all.birthdateField,
            all.genderField,
            all.phoneField,
            all.locationField,
            all.nationalityField,
            all.ethnicityField,
          ].map((field, key) => {
            if (field.name === 'Ethnicity') {
              return (
                <div key={`${key + 1}`}>
                  <CreateSettingInput
                    name={field.name}
                    type={field.type}
                    label={field.label}
                    options={field.options}
                    required={field.required}
                    halfWidth={field.halfWidth}
                    rightSpaced={field.rightSpaced}
                    value={inputStates[field.name]}
                  />
                  <button
                    type="button"
                    className={styles.addBtn}
                    onClick={(e) => handleAdd(e, field.name, '')}
                  >
                    Add
                  </button>
                  {inputStates?.[field.name] && (
                    <CreateSettingAddition
                      values={[...inputStates[field.name]]}
                      setValue={(value) => {
                        handleChange(field.name, value);
                      }}
                    />
                  )}
                </div>
              );
            }
            return (
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
            );
          })
        }
      </div>
    </SettingBody>
  );
};

export default SettingBodyProfileDetails;
