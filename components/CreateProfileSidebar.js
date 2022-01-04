import React from 'react';

const CreateProfileSidebar = ({ stepNames, activeStep }) => {
  const steps = Object.keys(stepNames).map((value) => Number(value));

  return (
    <div className="cp-sidebar">
      <ul className="cp-stepProgress">
        {steps.map((step, key) => (
          <li className="cp-stepProgressItem" key={key}>
            <span className="cp-border" />
            <div
              className={`cp-dot ${step == activeStep ? 'cp-dotActive' : ''}`}
            />
            <p>{stepNames[step]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateProfileSidebar;
