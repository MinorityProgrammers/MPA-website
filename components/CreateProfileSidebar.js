import React, { useState } from "react";
import { all } from "../../contexts/utils/profileInputFields1";

const CreateProfileSidebar = ({
  state,
  stepNames,
  setStep,
  activeStep,
  setActiveStep,
}) => {
  // const step = activeStep
  // const allInputFields1 = [
  //     all.firstNameField,
  //     all.lastNameField,
  //     all.birthdateField,
  //     all.hometownField,
  //     all.primaryLanguageField
  // ];
  // const allInputFields2 = [
  //     all.educationLevelField,
  //     all.schoolNameField,
  //     all.expectedGraduationYearField,
  //     all.graduationStatusField,
  //     all.degreeField
  // ];
  // const allInputFields3 = [
  //     all.usernameField,
  //     all.passionsField,
  //     all.hardSkillsField,
  //     all.programmingLanguagesField,
  //     all.proficiencyField
  // ];
  // const allInputFields4 = [
  //     all.passionsField,
  //     all.hardSkillsField,
  //     all.programmingLanguagesField,
  //     all.proficiencyField
  // ];
  const steps = Object.keys(stepNames).map((value) => Number(value));
  // const [displayWarning, setDisplayWarning] = useState(false);
  // const toggleWarning = (on) => {
  //     if (on) {
  //         if (!displayWarning) {
  //             const warning = "<p class='cp-warning'>Fill in Required Slots</p>";
  //             document.getElementsByClassName("cp-form")[0].insertAdjacentHTML('afterbegin', warning);
  //             setDisplayWarning(true);
  //         }
  //     }
  //     else {
  //         if (displayWarning) {
  //             document.getElementsByClassName("cp-warning")[0].remove();
  //             setDisplayWarning(false);
  //         }
  //     }
  // }
  // const changeHandler = (x) => {
  //     const inputFieldNames = Object.keys(state[step]);
  //     const allRequiredFilled = inputFieldNames.every(fieldName => {
  //         if (step === 1) {
  //             const inputField = allInputFields1.find(inputField => inputField.name == fieldName);
  //             return (inputField.required && state[step][fieldName]) || !inputField.required;
  //         } else if (step === 2) {
  //             const inputField = allInputFields2.find(inputField => inputField.name == fieldName);
  //             return (inputField.required && state[step][fieldName]) || !inputField.required;
  //         } else if (step === 3) {
  //             const inputField = allInputFields3.find(inputField => inputField.name == fieldName);
  //             return (inputField.required && state[step][fieldName]) || !inputField.required;
  //         } else if (step === 4) {
  //             const inputField = allInputFields4.find(inputField => inputField.name == fieldName);
  //             return (inputField.required && state[step][fieldName]) || !inputField.required;
  //         }

  //     });
  //     if (allRequiredFilled) {
  //         setActiveStep(x)
  //         toggleWarning(false);
  //     } else {
  //         /* raise alert to fill out all required */
  //         toggleWarning(true);
  //     }
  // }
  return (
    <div className="cp-sidebar">
      <ul className="cp-stepProgress">
        {steps.map((step, key) => (
          <li className="cp-stepProgressItem" key={key}>
            <span className="cp-border"></span>
            <div
              className={`cp-dot ${step == activeStep ? "cp-dotActive" : ""}`}
            ></div>
            <p>{stepNames[step]}</p>
            {/* <p onClick={()=>changeHandler(step)}>{stepNames[step]}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateProfileSidebar;
