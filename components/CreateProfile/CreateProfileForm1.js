import React, { useState, useEffect } from 'react';
import { AiFillCloseCircle, AiOutlineArrowRight } from 'react-icons/ai';
import findUserNames from '../../helpers/userNames';
import CreateProfileForm from './CreateProfileForm';
import CreateProfileInput from './CreateProfileInput';
import {
  usernameField,
} from '../../contexts/utils/profileInputFields';
import Account from '../Account';

const CreateProfileQuestions1 = function ({
  state, setState, step, setStep, inputStates, handleUsernameSubmit, closeProfileSetup, userData,
}) {
  const [usernames, setUsernames] = useState([]);
  const [suggestedNames, setSuggestedNames] = useState([]);
  const [usernameWarning, setUsernameWarning] = useState(false);
  const [wrongUsernameWarning, setWrongUsernameWarning] = useState(false);

  useEffect(() => {
    fetch(`${process.env.BASE_URI}/user`).then((response) => response.json()).then((data) => {
      setUsernames(findUserNames(data.data));
    });
  }, []);

  const toggleUsernameWarning = (on) => {
    if (on) {
      if (!usernameWarning) {
        const warning = "<p class='cp-warning'>username unavailable</p>";
        document.getElementsByClassName('cp-input')[0].insertAdjacentHTML('afterend', warning);
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
        document.getElementsByClassName('cp-input')[0].insertAdjacentHTML('afterend', warning);
        setWrongUsernameWarning(true);
      }
    } else if (wrongUsernameWarning) {
      document.getElementsByClassName('cp-warning')[0].remove();
      setWrongUsernameWarning(false);
    }
  };

  const handleChange = (name, value) => {
    // compare value with all usernames
    if (usernames.includes(value) && !(value === '')) {
      // display username
      toggleUsernameWarning(true);
    } else {
      toggleUsernameWarning(false);
    }

    if (/[^\w\-]/.test(state[step].userName)) {
      // display username
      toggleWrongUsernameWarning(true);
    } else {
      toggleWrongUsernameWarning(false);
    }

    setState({ ...state, [step]: { ...state[step], [name]: value.toLowerCase() } });
  };

  const setUsername = (value) => {
    toggleUsernameWarning(false);
    toggleWrongUsernameWarning(false);
    setState({ ...state, [step]: { ...state[step], userName: value.toLowerCase() } });
  };

  const allInputFields = [usernameField];

  const [displayWarning, setDisplayWarning] = useState(false);
  const toggleWarning = (on) => {
    if (on) {
      if (!displayWarning) {
        const warning = "<p class='cp-warning'>Fill in Required Slots</p>";
        document.getElementsByClassName('cp-form')[0].insertAdjacentHTML('afterbegin', warning);
        setDisplayWarning(true);
      }
    } else if (displayWarning) {
      document.getElementsByClassName('cp-warning')[0].remove();
      setDisplayWarning(false);
    }
  };

  // go back one step
  const handlePrev = () => {
    if (usernames.includes(state[step].userName)) {
      toggleUsernameWarning(true);
    } else if (/[^\w\-]/.test(state[step].userName)) {
      toggleWrongUsernameWarning(true);
    } else {
      const inputFieldNames = Object.keys(state[step]);
      const allRequiredFilled = inputFieldNames.every((fieldName) => {
        const inputField = allInputFields.find((_inputField) => _inputField.name === fieldName);
        return (inputField.required && state[step][fieldName]) || !inputField.required;
      });
      if (allRequiredFilled && !usernameWarning && !wrongUsernameWarning || (state[step].userName === '')) {
        setStep(step - 1);
        toggleWarning(false);
        localStorage.setItem('datas', JSON.stringify(inputStates));
        localStorage.setItem('activeStep', step);
      } else {
        /* raise alert to fill out all required */
        toggleWarning(true);
      }
    }
  };

  // go forward one step
  const handleNext = () => {
    if (usernames.includes(state[step].userName)) {
      toggleUsernameWarning(true);
    } else if (/[^\w\-]/.test(state[step].userName)) {
      toggleWrongUsernameWarning(true);
    } else {
      const inputFieldNames = Object.keys(state[step]);
      const allRequiredFilled = inputFieldNames.every((fieldName) => {
        const inputField = allInputFields.find((_inputField) => _inputField.name === fieldName);
        return (inputField.required && state[step][fieldName]) || !inputField.required;
      });
      if (allRequiredFilled && !usernameWarning && !wrongUsernameWarning) {
        setStep(step + 1);
        toggleWarning(false);
        localStorage.setItem('datas', JSON.stringify(inputStates));
        localStorage.setItem('activeStep', step);
      } else if (usernameWarning) {
        // pass
      } else {
        /* raise alert to fill out all required */
        toggleWarning(true);
      }
    }
  };
  const handleUsername = () => {
    if (!usernameWarning) {
      // setUsername
      handleUsernameSubmit();
    }
  };
  const getUsernameSuggestions = () => {
    const firstName = userData?.firstName;
    const lastName = userData?.lastName;
    const numbers = [1, 2, 3, 4].map(() => Math.floor(Math.random() * 10000));
    setSuggestedNames(numbers.filter(
      (num) => !usernames.includes(firstName + lastName + num.toString()),
    ).map((num) => firstName + lastName + num.toString()));
  };
  // if Username has not been picked yet
  if (true) {
    return (
      <div className="cp-body">
        <AiFillCloseCircle className="cp-close" onClick={closeProfileSetup} style={{ cursor: 'pointer' }} />
        <div className="cp-top">
          <h1>Setup Profile Page</h1>
          <h2>It&apos;s quick and easy!</h2>
        </div>
        <CreateProfileForm grid={false}>
          <div className="cp-formFlex">
            <h2>Create Username</h2>
            <CreateProfileInput
              name={usernameField.name}
              type={usernameField.type}
              label={usernameField.label}
              options={usernameField.options}
              required={usernameField.required}
              value={state[step][usernameField.name]}
              setValue={(value) => { handleChange(usernameField.name, value); }}
              className="cp-username"
            />
            <button type="button" onClick={getUsernameSuggestions}>Username Suggestions</button>
            <div className="cp-usernameSuggestions">
              {
                  suggestedNames.map((name, key) => (
                    <p className="tw-cursor-pointer hover:tw-to-gray-500" key={`${name + key}`} onClick={() => setUsername(name)}>{name}</p>
                  ))
              }
            </div>
            <div className="tw-mt-8 tw-flex tw-flex-col tw-w-80 tw-pl-4 tw-justify-center tw-text-center">
              <h2>Connect Wallet</h2>
              <Account />
            </div>
          </div>
        </CreateProfileForm>
        <div className="cp-navButtonsContainer">
          <button type="button" className="cp-navButton" onClick={handleNext}><AiOutlineArrowRight /></button>
        </div>
      </div>
    );
  }
  return (
    <div className="cp-body">
      <div className="cp-top">
        <h1>Congratulations</h1>
        <h2>Your username is ...</h2>
      </div>
    </div>
  );
};

export default CreateProfileQuestions1;
