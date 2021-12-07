import React, { useState, useEffect } from 'react';
import { all } from '../../contexts/utils/profileInputFields1';
import { findUserNames } from '../../helpers/userNames';

const CreateProfileSidebar = function ({
  state,
  stepNames,
  setStep,
  activeStep,
  setActiveStep,
}) {
  const step = activeStep;
  const allInputFields1 = [
    all.usernameField,
  ];
  const allInputFields2 = [
    all.educationLevelField,
    all.schoolNameField,
    all.expectedGraduationYearField,
    all.graduationStatusField,
    all.degreeField,
  ];
  const allInputFields3 = [
    all.firstNameField,
    all.lastNameField,
    all.birthdateField,
    all.hometownField,
    all.primaryLanguageField,
  ];
  const allInputFields4 = [
    all.passionsField,
    all.softSkillsField,
    all.programmingLanguagesField,
    all.proficiencyField,
  ];
  const [usernames, setUsernames] = useState([]);
  const steps = Object.keys(stepNames).map((value) => Number(value));
  const [displayWarning, setDisplayWarning] = useState(false);

  useEffect(() => {
    fetch('https://koinstreet-learn-api.herokuapp.com/api/v1/user').then((response) => response.json()).then((data) => {
      setUsernames(findUserNames(data.data));
    });
  }, []);

  const toggleWarning = (on) => {
    if (on) {
      if (!displayWarning) {
        const warning = "<p class='cp-warning'>Fill in Required Slots</p>";
        document.getElementsByClassName('cp-form')[0].insertAdjacentHTML('afterbegin', warning);
        setDisplayWarning(true);
      }
    } else if (displayWarning) {
      document.getElementsByClassName('cp-warning')[0]?.remove();
      setDisplayWarning(false);
    }
  };
  const changeHandler = (x) => {
    if (x !== 6) {
      if ((step === 1 && usernames.includes(state[step].userName)) || (step === 1 && /[^\w\-]/.test(state[step].userName))) {
        toggleWarning(true);
        console.log('HAVE USER');
      } else {
        const inputFieldNames = Object.keys(state[step]);
        const allRequiredFilled = inputFieldNames.every((fieldName) => {
          if (step === 1) {
            const inputField = allInputFields1.find((inputField) => inputField.name == fieldName);
            return (inputField.required && state[step][fieldName]) || !inputField.required;
          } if (step === 2) {
            const inputField = allInputFields2.find((inputField) => inputField.name == fieldName);
            return (inputField.required && state[step][fieldName]) || !inputField.required;
          } if (step === 3) {
            const inputField = allInputFields3.find((inputField) => inputField.name == fieldName);
            return ((inputField.required && state[step][fieldName]) && !/[^\w\-]/.test(state[step].userName) || (!inputField.required && !/[^\w\-]/.test(state[step].userName)));
          } if (step === 4) {
            const inputField = allInputFields4.find((inputField) => inputField.name == fieldName);
            return (inputField.required && state[step][fieldName]) || !inputField.required;
          } if (step === 5) {
            return true;
          }
        });
        if (allRequiredFilled) {
          setActiveStep(x);
          toggleWarning(false);
        } else {
          /* raise alert to fill out all required */
          toggleWarning(true);
        }
      }
    }
  };
  return (
    <div className="cp-sidebar">
      <ul className="cp-stepProgress">
        <li className="cp-stepProgressItem head-li">
          <p>MPA Profile Setup</p>
        </li>
        {steps.map((step, key) => (
          <li className="cp-stepProgressItem" key={key}>
            <span className="cp-border" style={step === 1 ? { height: '50%', bottom: '0' } : {}} />
            <div
              className={`cp-dot ${step == activeStep ? 'cp-dotActive' : ''}`}
            />
            <p onClick={() => changeHandler(step)}>{stepNames[step]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateProfileSidebar;
