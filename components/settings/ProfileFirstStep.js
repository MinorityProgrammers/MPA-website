import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import PhoneInput from 'react-phone-input-2';
import Select from 'react-select';
import DropdownIndicator from './DropdownIndicator';
import {
  ethnicities,
  nationalities,
  genders,
} from '../../contexts/utils/fields';
import styles from '../../styles/settings/settingSetup.module.scss';
import { GlobalContext } from '../../contexts/provider';
import updateProfileJSON from '../../contexts/actions/profile/updateProfileJSON';

const ProfileFirstStep = ({
  data, setStep, step, dates, customStyles,
}) => {
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
  const [gender, setGender] = useState({ label: data.Gender, value: data.Gender });
  const [phoneNumber, setPhoneNumber] = useState(`+${data.phoneNumber}`);
  const [nationality, setNationality] = useState(
    { label: data.Nationality, value: data.Nationality },
  );
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
    setGender({ label: data.Gender, value: data.Gender });
    setPhoneNumber(`+${data.phoneNumber}`);
    setNationality({ label: data.Nationality, value: data.Nationality });
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
      Nationality: nationality.label,
      Gender: gender.label,
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
          <div className={`row ${styles.selectRow}`}>
            <div className="col-12">
              <label>Gender</label>
            </div>
            <div style={{ display: 'unset', padding: '0' }} className={`col ${styles.socialCol}`}>
              <Select
                styles={customStyles}
                components={{ DropdownIndicator }}
                isClearable={false}
                isSearchable
                onChange={(newValue) => setGender(newValue)}
                options={genders}
                placeholder="Select  Nationality"
                value={gender}
              />
            </div>
          </div>
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
        <div className="col-12">
          <label>Nationality </label>
        </div>
        <div style={{ display: 'unset', padding: '0' }} className={`col ${styles.socialCol}`}>
          <Select
            styles={customStyles}
            components={{ DropdownIndicator }}
            isClearable={false}
            isSearchable
            onChange={(newValue) => setNationality(newValue)}
            options={nationalities}
            placeholder="Select  Nationality"
            value={nationality}
          />
        </div>
      </div>
      <div className={`row ${styles.nameRow}`}>
        <div className="col-12">
          <label>Ethnicity </label>
        </div>
        <div style={{ display: 'unset', padding: '0' }} className={`col ${styles.socialCol}`}>
          <Select
            isMulti
            isClearable
            styles={customStyles}
            components={{ DropdownIndicator }}
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
