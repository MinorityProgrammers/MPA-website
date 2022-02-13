import React, { useState, useEffect } from 'react';
import styles from '../../styles/settings/settingSetup.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-phone-input-2/lib/material.css';
import ProfileFirstStep from './ProfileFirstStep';
import ProfileSecondStep from './ProfileSecondStep';
import ProfileThirdStep from './ProfileThirdStep';
import ProfileFourthStep from './ProfileFourthStep';

const SettingSetup = ({ data, setData }) => {
  const [step, setStep] = useState(1);
  const [initValues, setinitValues] = useState({
    firstName: data.firstName,
    birthday: new Date(data.birthday ? data.birthday : ''),
    Ethnicity: data.Ethnicity,
    Nationality: data.Nationality,
    Gender: data.Gender,
    phoneNumber: data.phoneNumber,
  });
  useEffect(() => {
    // const userInfo = JSON.parse(localStorage.getItem('userInfo')).user;
    setData(JSON.parse(localStorage.getItem('userInfo')).user);
  }, [step]);
  return (
    <div className={styles.setupContainer}>
      <div className={styles.stepperWrapper}>
        <div className={`${styles.stepperItem} ${step === 1 && styles.active} ${step > 1 && styles.completed}`}>

          {step === 1 && (
            <div onClick={() => setStep(1)} className={styles.stepCounter}>
              <img
                src="/assets/images/settings/profile-step1.svg"
                alt="step"
              />
            </div>
          )}
          {step > 1 && (
            <div onClick={() => setStep(1)} className={styles.stepCounter}>
              <img
                src="/assets/images/settings/check.svg"
                alt="step"
              />
            </div>
          )}
          <div className={styles.stepName}>1</div>
        </div>
        <div className={`${styles.stepperItem} ${step === 2 && styles.active} ${step > 2 && styles.completed}`}>
          {step === 2 && (
          <div onClick={() => setStep(2)} className={styles.stepCounter}>
            <img
              src="/assets/images/settings/profile-step1.svg"
              alt="step"
            />
          </div>
          )}
          {step > 2 && (
            <div onClick={() => setStep(2)} className={styles.stepCounter}>
              <img
                src="/assets/images/settings/check.svg"
                alt="step"
              />
            </div>
          )}
          {step < 2 && (
            <div onClick={() => setStep(2)} className={styles.stepCounter}>. . .</div>
          )}
          <div className={styles.stepNameEven}>2</div>
        </div>
        <div className={`${styles.stepperItem} ${step === 3 && styles.active} ${step > 3 && styles.completed}`}>
          {step === 3 && (
          <div onClick={() => setStep(3)} className={styles.stepCounter}>
            <img
              src="/assets/images/settings/profile-step1.svg"
              alt="step"
            />
          </div>
          )}
          {step > 3 && (
            <div onClick={() => setStep(3)} className={styles.stepCounter}>
              <img
                src="/assets/images/settings/check.svg"
                alt="step"
              />
            </div>
          )}
          {step < 3 && (
            <div onClick={() => setStep(3)} className={styles.stepCounter}>. . .</div>
          )}
          <div className={styles.stepName}>3</div>
        </div>
        <div className={`${styles.stepperItem} ${step === 4 && styles.active} ${step > 4 && styles.completed}`}>
          {step === 4 && (
          <div onClick={() => setStep(4)} className={styles.stepCounter}>
            <img
              src="/assets/images/settings/profile-step1.svg"
              alt="step"
            />
          </div>
          )}
          {step > 4 && (
            <div onClick={() => setStep(4)} className={styles.stepCounter}>
              <img
                src="/assets/images/settings/check.svg"
                alt="step"
              />
            </div>
          )}
          {step < 4 && (
            <div onClick={() => setStep(4)} className={styles.stepCounter}>. . .</div>
          )}
          <div className={styles.stepNameEven}>4</div>
        </div>
      </div>
      {step === 1
      && (
      <ProfileFirstStep
        initValues={initValues}
        setData={setData}
        data={data}
        step={step}
        setStep={setStep}
      />
      )}
      {step === 2
      && (
      <ProfileSecondStep
        setData={setData}
        data={data}
        step={step}
        setStep={setStep}
      />
      )}
      {step === 3
      && (
      <ProfileThirdStep
        setData={setData}
        data={data}
        step={step}
        setStep={setStep}
      />
      )}
      {step === 4
      && (
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
