import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import PhoneInput from 'react-phone-input-2';
import Select from 'react-select';
import {
  ethnicities,
  nationalities,
  genders,
} from '../../contexts/utils/fields';
import styles from '../../styles/settings/settingSetup.module.scss';
import { GlobalContext } from '../../contexts/provider';
import updateProfileJSON from '../../contexts/actions/profile/updateProfileJSON';

const ProfileFirstStep = ({
  data, setStep, step, dates,
}) => {
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
  const [gender, setGender] = useState(data.Gender);
  const [phoneNumber, setPhoneNumber] = useState(`+${data.phoneNumber}`);
  const [nationality, setNationality] = useState(data.Nationality);
  const [ethnicity, setEthnicity] = useState(data.Ethnicity);
  const [startDate, setStartDate] = useState(dates.birthdayDate);
  // update userData
  const { profileDispatch } = useContext(GlobalContext);

  // ethnicity input handler
  const handleChange = (newValue) => {
    setEthnicity(newValue);
  };

  // Discard Changes
  const discard = () => {
    setStartDate(dates.birthdayDate);
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setGender(data.Gender);
    setPhoneNumber(`+${data.phoneNumber}`);
    setNationality(data.Nationality);
    setEthnicity(data.Ethnicity);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const inputStates = {
      firstName,
      lastName,
      phoneNumber,
      birthday: startDate,
      Ethnicity: ethnicity,
      Nationality: nationality,
      Gender: gender,
    };
      // submit data
    updateProfileJSON(
      data._id,
      JSON.stringify(inputStates),
    )(profileDispatch);
    setStep(step === 4 ? 4 : step + 1);
  };

  return (
    <div>
      <div className={styles.title}>
        <h2>Personal Details</h2>
      </div>
      <div className={`row ${styles.nameRow}`}>
        <div className="col-lg-6">
          <label>First Name </label>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" />
        </div>
        <div className="col-lg-6">
          <label>Last Name </label>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" />
        </div>
      </div>
      <div className={`row ${styles.nameRow}`}>
        <div className={`col-lg-6 ${styles.DatePicker} settings-birthday-field`}>
          <label>Date Of Birth </label>
          {startDate && <DatePicker placeholderText="Select" selected={startDate} onChange={(date) => setStartDate(date)} />}
        </div>
        <div className="col-lg-6">
          <label>Gender </label>
          <select placeholder="Select" value={gender} onChange={(e) => setGender(e.target.value)}>
            {genders.map((g) => (
              <option value={g.label} key={g.label}>{g.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className={`row ${styles.nameRow}`}>
        <div className="settings-phone-field col">
          <label>Phone </label>
          <PhoneInput
            country="us"
            value={phoneNumber}
            onChange={(phone) => setPhoneNumber(phone)}
            placeholder="Enter Number"
          />

        </div>
      </div>
      <div className={`row ${styles.nameRow}`}>
        <div className="settings-phone-field col">
          <label>Nationality </label>
          <select placeholder="Select  Nationality" value={nationality} onChange={(e) => setNationality(e.target.value)}>
            {nationalities.map((country) => (
              <option value={country.label} key={country.label}>{country.label}</option>
            ))}
          </select>

        </div>
      </div>
      <div className={`row ${styles.nameRow}`}>
        <div className="settings-phone-field col">
          <label>Ethnicity</label>
          <Select
            isMulti
            isClearable
            onChange={handleChange}
            options={ethnicities}
            placeholder="Select Ethnicity"
            value={ethnicity}
          />
        </div>
      </div>
      <div className={`row ${styles.submitRow}`}>
        <div className="col">
          <a onClick={discard}>Discard Changes</a>
          <input onClick={submitHandler} type="submit" value="Save & Continue" />
        </div>
      </div>

    </div>
  );
};

export default ProfileFirstStep;
