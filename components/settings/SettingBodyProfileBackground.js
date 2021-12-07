import React, { useState, useEffect, useContext } from 'react';
import FormData from 'form-data';
import { useRouter } from 'next/router';
import { GlobalContext } from '../../contexts/provider';
import { updateProfile } from '../../contexts/actions/profile/updateProfile';
import { all } from '../../contexts/utils/settings/settingsInputFields';
import styles from '../../styles/settings/SettingBodyProfileBackground.module.css';
import CreateSettingInput from './CreateSettingInput';
import CreateSettingAddition from './CreateSettingAddition';
import SettingBody from './SettingBody';

const SettingBodyProfileBackground = function ({ settingsPage, data, userID }) {
  const router = useRouter();

  const inputFields = [
    all.softSkillsField,
    all.proficiencyField,
    all.programmingLanguagesField,
    all.proficiencyField,
    all.passionsField,
  ];

  const initialInputState = {};

  inputFields.forEach(
    (field) => (initialInputState[field.name] = ''),
    // ex. {someInputFieldName: "inputFieldValue", ...}
  );

  const [inputStates, setInputStates] = useState(initialInputState);

  useEffect(() => {
    inputFields.forEach(
      (field) => (initialInputState[field.name] = data?.[field.name] || ''),
    );

    setInputStates(initialInputState);
  }, [data]);

  // update userData
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
    Array.isArray(inputStates[inputName])
      && inputStates[inputName].map((item) => formData.append(inputName, item));
  });

  const handleChange = (name, value) => {
    setInputStates({ ...inputStates, [name]: value.length ? value : [''] });
  };

  // Get multiple values from multiple input fields within the same parent element
  const getFieldValues = (element, names) => names.map((name) => element.parentNode.parentNode.parentNode.querySelector(
    `input[name='${name}']`,
  ));
  // get values from input fields within same parent and add it as an array element to state
  const handleAdd = (e, names, reset) => {
    const fieldValues = getFieldValues(e.target, names);
    const name = names[0];
    const prevValues = inputStates[name];
    const value = Array.from(fieldValues)
      .map((fieldValue) => fieldValue.value)
      .join(' - ');
    value !== ' - ' && !/^[ \- ]/.test(value) && !/[ \- ]$/.test(value) && handleChange(name, [...new Set([...prevValues, value])]);
    const addedText = document.querySelectorAll('.css-1uccc91-singleValue');
    addedText.forEach((singleText) => {
      singleText.textContent = reset;
    });
    fieldValues.forEach((element) => {
      element.value = reset;
    });
    // fieldValues[0].value = reset;
  };

  const handleSubmit = () => {
    // submit data
    updateProfile(userID, formData)(profileDispatch);

    const slug = data?.userName;
    slug && router.push(`/user/${slug}`);
  };

  const closeProfileSetup = () => {
    // discard changes
    const slug = data?.userName;
    slug && router.push(`/user/${slug}`);
  };
  // console.log(inputStates);
  return (
    <SettingBody
      settingsPage={settingsPage}
      data={data}
      userID={userID}
      handleSubmit={handleSubmit}
      closeProfileSetup={closeProfileSetup}
    >
      <div className={styles.backgroundContent}>
        <h5>Skillsets</h5>
        <div>
          <h6>{all.softSkillsField.label}</h6>
          <div className={styles.sMultiInputContainer}>
            <div className={styles.sMultiInput}>
              <CreateSettingInput
                name={all.softSkillsField.name}
                type={all.softSkillsField.type}
                label={all.softSkillsField.label}
                options={all.softSkillsField.options}
                required={all.softSkillsField.required}
                placeholder={all.softSkillsField.placeholder}
                halfWidth={all.softSkillsField.halfWidth}
                rightSpaced={all.softSkillsField.rightSpaced}
              />
              <div className={styles.mIAdds}>
                <CreateSettingInput
                  name={all.proficiencyField.name}
                  type={all.proficiencyField.type}
                  label={all.proficiencyField.label}
                  options={all.proficiencyField.options}
                  required={all.proficiencyField.required}
                  placeholder={all.proficiencyField.placeholder}
                  halfWidth={all.proficiencyField.halfWidth}
                  rightSpaced={all.proficiencyField.rightSpaced}
                />
                <div className={styles.btnWrap}>
                  <div
                    className={styles.addBtn}
                    onClick={(e) => handleAdd(
                      e,
                      [all.softSkillsField.name, all.proficiencyField.name],
                      '',
                    )}
                  >
                    Add
                  </div>
                </div>
              </div>
            </div>
            {inputStates?.softSkills && (
              <CreateSettingAddition
                values={[...inputStates.softSkills]}
                setValue={(value) => {
                  handleChange(all.softSkillsField.name, value);
                }}
              />
            )}
          </div>
        </div>
        <div>
          <h6>{all.programmingLanguagesField.label}</h6>
          <div className={styles.sMultiInputContainer}>
            <div className={styles.sMultiInput}>
              <CreateSettingInput
                name={all.programmingLanguagesField.name}
                type={all.programmingLanguagesField.type}
                label={all.programmingLanguagesField.label}
                options={all.programmingLanguagesField.options}
                required={all.programmingLanguagesField.required}
                placeholder={all.programmingLanguagesField.placeholder}
                halfWidth={all.programmingLanguagesField.halfWidth}
                rightSpaced={all.programmingLanguagesField.rightSpaced}
              />
              <div className={styles.mIAdds}>
                <CreateSettingInput
                  name={all.proficiencyField.name}
                  type={all.proficiencyField.type}
                  label={all.proficiencyField.label}
                  options={all.proficiencyField.options}
                  required={all.proficiencyField.required}
                  placeholder={all.proficiencyField.placeholder}
                  halfWidth={all.proficiencyField.halfWidth}
                  rightSpaced={all.proficiencyField.rightSpaced}
                />
                <div className={styles.btnWrap}>
                  <div
                    className={styles.addBtn}
                    onClick={(e) => handleAdd(
                      e,
                      [
                        all.programmingLanguagesField.name,
                        all.proficiencyField.name,
                      ],
                      '',
                    )}
                  >
                    Add
                  </div>
                </div>
              </div>
            </div>
            {inputStates?.programmingSkills && (
              <CreateSettingAddition
                values={[...inputStates.programmingSkills]}
                setValue={(value) => {
                  handleChange(all.programmingLanguagesField.name, value);
                }}
              />
            )}
          </div>
        </div>
        <div>
          <h6>{all.passionsField.label}</h6>
          <div className={styles.sMultiInputContainer}>
            <div className={styles.sMultiInput}>
              <div className={styles.mIAdds}>
                <CreateSettingInput
                  name={all.passionsField.name}
                  type={all.passionsField.type}
                  label={all.passionsField.label}
                  options={all.passionsField.options}
                  required={all.passionsField.required}
                  placeholder={all.passionsField.placeholder}
                  halfWidth={all.passionsField.halfWidth}
                  rightSpaced={all.passionsField.rightSpaced}
                />
                <div className={styles.btnWrap}>
                  <div
                    className={styles.addBtn}
                    onClick={(e) => handleAdd(e, [all.passionsField.name], '')}
                  >
                    Add
                  </div>
                </div>
              </div>
            </div>
            {inputStates?.passions && (
              <CreateSettingAddition
                values={[...inputStates.passions]}
                setValue={(value) => {
                  handleChange(all.passionsField.name, value);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </SettingBody>
  );
};

export default SettingBodyProfileBackground;
