import React, { useEffect } from "react";
import styles from "../../styles/settings/settingSetup.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-input-2/lib/material.css";
import ProfileFirstStep from "./ProfileFirstStep";
import ProfileSecondStep from "./ProfileSecondStep";
import ProfileThirdStep from "./ProfileThirdStep";
import ProfileFourthStep from "./ProfileFourthStep";

const SettingSetup = ({ data, setData, step, setStep, completeStep }) => {
  const dates = {
    HighSchoolYear: data?.enteredHighSchoolYear
      ? new Date(data.enteredHighSchoolYear)
      : new Date(),
    birthdayDate: data?.birthday ? new Date(data.birthday) : new Date(),
    GraduationYear: data?.expectedGraduationYear
      ? new Date(data.expectedGraduationYear)
      : new Date(),
  };
  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem("jwtToken")
        : null;
    if (token) {
      setData(JSON.parse(localStorage.getItem("userInfo")).user);
    }
  }, [step]);
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      // borderBottom: '1px dotted pink',
      color: "white",
      border: state.isSelected
        ? "2px solid #6938EF"
        : state.isFocused
        ? "2px solid #6938EF"
        : "2px solid transparent",
      background: "var(--div-background-color)",
      borderRadius: "8px",
      padding: 20,
      marginTop: 8,
      width: "100%",
      cursor: "pointer",
      fontWeight: "bold",
      ":active": {
        ...styles[":active"],
        background: "var(--div-background-color)",
      },
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      // width: ,
      display: "flex",
      height: "100%",
    }),
    menu: (provided) => ({
      ...provided,
      // borderBottom: '1px dotted pink',
      background: "var(--div-background-color)",
      padding: 5,
      border: "1px solid #6938EF",
    }),
    container: (provided) => ({
      ...provided,
      height: "100%",
      margin: "0 !important",
      cursor: "pointer",
      paddingLeft: "8px",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    singleValue: (provided) => {
      const opacity = 1;
      const color = "#fff";
      const transition = "opacity 300ms";

      return {
        ...provided,
        opacity,
        transition,
        color,
      };
    },
  };
  return (
    <div className={styles.setupContainer}>
      <div className={styles.stepperWrapper}>
        <div
          className={`${styles.stepperItem} ${step === 1 && styles.active} ${
            step > 1 && styles.completed
          }`}
        >
          {step === 1 && (
            <div onClick={() => setStep(1)} className={styles.stepCounter}>
              <img src="/assets/images/settings/profile-step1.svg" alt="step" />
            </div>
          )}
          {step > 1 && (
            <div onClick={() => setStep(1)} className={styles.stepCounter}>
              <img src="/assets/images/settings/check.svg" alt="step" />
            </div>
          )}
          <div className={styles.stepName}>1</div>
        </div>
        <div
          className={`${styles.stepperItem} ${step === 2 && styles.active} ${
            step > 2 && styles.completed
          }`}
        >
          {step === 2 && (
            <div onClick={() => setStep(2)} className={styles.stepCounter}>
              <img src="/assets/images/settings/profile-step1.svg" alt="step" />
            </div>
          )}
          {step > 2 && (
            <div onClick={() => setStep(2)} className={styles.stepCounter}>
              <img src="/assets/images/settings/check.svg" alt="step" />
            </div>
          )}
          {step < 2 && (
            <div onClick={() => setStep(2)} className={styles.stepCounter}>
              . . .
            </div>
          )}
          <div className={styles.stepNameEven}>2</div>
        </div>
        <div
          className={`${styles.stepperItem} ${step === 3 && styles.active} ${
            step > 3 && styles.completed
          }`}
        >
          {step === 3 && (
            <div onClick={() => setStep(3)} className={styles.stepCounter}>
              <img src="/assets/images/settings/profile-step1.svg" alt="step" />
            </div>
          )}
          {step > 3 && (
            <div onClick={() => setStep(3)} className={styles.stepCounter}>
              <img src="/assets/images/settings/check.svg" alt="step" />
            </div>
          )}
          {step < 3 && (
            <div onClick={() => setStep(3)} className={styles.stepCounter}>
              . . .
            </div>
          )}
          <div className={styles.stepName}>3</div>
        </div>
        <div
          className={`${styles.stepperItem} ${step === 4 && styles.active} ${
            step > 4 && styles.completed
          }`}
        >
          {step === 4 && (
            <div onClick={() => setStep(4)} className={styles.stepCounter}>
              <img src="/assets/images/settings/profile-step1.svg" alt="step" />
            </div>
          )}
          {step > 4 && (
            <div onClick={() => setStep(4)} className={styles.stepCounter}>
              <img src="/assets/images/settings/check.svg" alt="step" />
            </div>
          )}
          {step < 4 && (
            <div onClick={() => setStep(4)} className={styles.stepCounter}>
              . . .
            </div>
          )}
          <div className={styles.stepNameEven}>4</div>
        </div>
      </div>
      {step === 1 && (
        <ProfileFirstStep
          setData={setData}
          data={data}
          step={step}
          setStep={setStep}
          dates={dates}
          completeStep={completeStep}
          customStyles={customStyles}
        />
      )}
      {step === 2 && (
        <ProfileSecondStep
          setData={setData}
          data={data}
          step={step}
          setStep={setStep}
          dates={dates}
          customStyles={customStyles}
        />
      )}
      {step === 3 && (
        <ProfileThirdStep
          setData={setData}
          data={data}
          step={step}
          setStep={setStep}
          customStyles={customStyles}
        />
      )}
      {step === 4 && (
        <ProfileFourthStep
          setData={setData}
          data={data}
          step={step}
          setStep={setStep}
        />
      )}
    </div>
  );
};

export default SettingSetup;
