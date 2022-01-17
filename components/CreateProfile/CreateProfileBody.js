import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import CreateProfileQuestions1 from './CreateProfileForm1';
import CreateProfileQuestions2 from './CreateProfileForm2';
import CreateProfileQuestions3 from './CreateProfileForm3';
import CreateProfileQuestions4 from './CreateProfileForm4';
import CreateProfileQuestions5 from './CreateProfileForm5';
import CreateProfileDone from './CreateProfileDone';

const CreateProfileBody = function ({
  state,
  setState,
  activeStep,
  setActiveStep,
  handleSubmit,
  handleUsernameSubmit,
  inputStates,
  closeProfileSetup,
  userData,
}) {
  // displays body based on active step
  const step = activeStep;
  switch (step) {
    case 1:
      return (
        <CreateProfileQuestions1
          userData={userData}
          state={state}
          setState={setState}
          step={step}
          setStep={setActiveStep}
          inputStates={inputStates}
          closeProfileSetup={closeProfileSetup}
        />
      );
    case 2:
      return (
        <CreateProfileQuestions2
          state={state}
          setState={setState}
          step={step}
          setStep={setActiveStep}
          inputStates={inputStates}
          closeProfileSetup={closeProfileSetup}
        />
      );
    case 3:
      return (
        <CreateProfileQuestions3
          state={state}
          setState={setState}
          step={step}
          setStep={setActiveStep}
          inputStates={inputStates}
          closeProfileSetup={closeProfileSetup}
          handleUsernameSubmit={handleUsernameSubmit}
        />
      );
    case 4:
      return (
        <CreateProfileQuestions4
          state={state}
          setState={setState}
          step={step}
          setStep={setActiveStep}
          inputStates={inputStates}
          closeProfileSetup={closeProfileSetup}
        />
      );
    case 5:
      return (
        <CreateProfileQuestions5
          state={state}
          setState={setState}
          step={step}
          setStep={setActiveStep}
          inputStates={inputStates}
          closeProfileSetup={closeProfileSetup}
          handleSubmit={handleSubmit}
        />
      );
    case 6:
      return (
        <CreateProfileDone
          state={state}
          setState={setState}
          step={step}
          setStep={setActiveStep}
          inputStates={inputStates}
          closeProfileSetup={closeProfileSetup}
        />
      );
    default:
      return (
        <div className="cp-body">
          <AiFillCloseCircle className="cp-close" onClick={closeProfileSetup} style={{ cursor: 'pointer' }} />
          <div className="cp-top cp-top-border">
            <h1>Default Page</h1>
          </div>
        </div>
      );
  }
};

export default CreateProfileBody;
