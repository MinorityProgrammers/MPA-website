import React, { useState, useContext, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import DropdownIndicator from './DropdownIndicator';
import {
  status,
} from '../../contexts/utils/fields';
import styles from '../../styles/settings/settingSetup.module.scss';
import { GlobalContext } from '../../contexts/provider';
import updateProfileJSON from '../../contexts/actions/profile/updateProfileJSON';

const ProfileSecondStep = ({
  data, setStep, step, setData, dates, customStyles,
}) => {
  const [schoolName, setSchoolName] = useState(data.schoolName);
  const [degree, setDegree] = useState(data.degree);
  const [studentStatus, setStudentStatus] = useState(
    { label: data.studentStatus, value: data.studentStatus },
  );
  const [enteredHighSchoolYear, setEnteredHighSchoolYear] = useState(
    dates.HighSchoolYear,
  );
  const [expectedGraduationYear, setExpectedGraduationYear] = useState(
    dates.GraduationYear,
  );
  // update userData
  const { profileDispatch } = useContext(GlobalContext);

  // Discard Changes
  const discard = () => {
    setEnteredHighSchoolYear(dates.HighSchoolYear);
    setExpectedGraduationYear(dates.GraduationYear);
    setSchoolName(data.schoolName);
    setDegree(data.degree);
    setStudentStatus({ label: data.studentStatus, value: data.studentStatus });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const inputStates = {
      schoolName,
      degree,
      enteredHighSchoolYear,
      expectedGraduationYear,
      studentStatus: studentStatus.label,
    };
      // submit data
    updateProfileJSON(
      data._id,
      JSON.stringify(inputStates),
    )(profileDispatch);
    setStep(step === 4 ? 4 : step + 1);
  };
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')).user;
    setData(userInfo);
  }, [step]);
  // Add link Dropdown options

  return (
    <>
      <div className={styles.title}>
        <h2>Education</h2>
      </div>
      <div className={`row ${styles.nameRow}`}>
        <div className="col">
          <label>Enter School Name</label>
          <input value={schoolName} placeholder="Enter School Name" onChange={(e) => setSchoolName(e.target.value)} type="text" />
        </div>
      </div>
      <div className={`row ${styles.nameRow}`}>
        <div className="col-12">
          <label>Current Status</label>
        </div>
        <div style={{ display: 'unset', padding: '0' }} className={`col ${styles.socialCol}`}>
          <Select
            styles={customStyles}
            components={{ DropdownIndicator }}
            isClearable={false}
            isSearchable
            onChange={(newValue) => setStudentStatus(newValue)}
            options={status}
            placeholder="Select Status"
            value={studentStatus}
          />
        </div>
      </div>
      <div className={`row ${styles.nameRow}`}>
        <div className="col">
          <label>Program Of Study</label>
          <input value={degree} placeholder="Enter Program" onChange={(e) => setDegree(e.target.value)} type="text" />
        </div>
      </div>
      <div className={`row ${styles.nameRow}`}>
        <div className={`col-lg-6 ${styles.DatePicker} settings-birthday-field`}>
          <label>Start Date </label>
          <DatePicker placeholderText="Select" selected={enteredHighSchoolYear} onChange={(date) => setEnteredHighSchoolYear(date)} />
        </div>
        <div className={`col-lg-6 ${styles.DatePicker} settings-birthday-field`}>
          <label>Graduation Date </label>
          <DatePicker placeholderText="Select" selected={expectedGraduationYear} onChange={(date) => setExpectedGraduationYear(date)} />
        </div>
      </div>
      <div className={`row ${styles.submitRow}`}>
        <div className="col">
          <a onClick={discard}>Discard Changes</a>
          <input onClick={submitHandler} type="submit" value="Save & Continue" />
        </div>
      </div>
    </>
  );
};

export default ProfileSecondStep;