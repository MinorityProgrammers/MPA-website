import React, { useState, useContext, useEffect } from 'react';
import Select from 'react-select';
import DropdownIndicator from './DropdownIndicator';
import {
  proficiencies,
  programmingLanguages, softSkills as softSkillsList,
} from '../../contexts/utils/fields';
import styles from '../../styles/settings/settingSetup.module.scss';
import { GlobalContext } from '../../contexts/provider';
import updateProfileJSON from '../../contexts/actions/profile/updateProfileJSON';

const ProfileThirdStep = ({
  data, setStep, step, setData, customStyles,
}) => {
  const [passion, setPassion] = useState('');
  const [passions, setPassions] = useState(data.passions);
  const [softSkills, setSoftSkills] = useState(data.softSkills);
  const [currentSoftSkills, setCurrentSoftSkills] = useState(softSkillsList[0]);
  const [currentSoftProficiency, setCurrentSoftProficiency] = useState(proficiencies[0]);
  const [programmingSkills, setProgrammingSkills] = useState(data.programmingSkills);
  const [currentProgrammingSkill, setCurrentProgrammingSkill] = useState(programmingLanguages[0]);
  const [currentProgrammingProficiency,
    setCurrentProgrammingProficiency] = useState(proficiencies[0]);

  // update userData
  const { profileDispatch } = useContext(GlobalContext);

  // Discard Changes
  const discard = () => {
    setSoftSkills(data.softSkills);
    setProgrammingSkills(data.programmingSkills);
    setCurrentSoftSkills(softSkillsList[0]);
    setCurrentSoftProficiency(proficiencies[0]);
    setCurrentProgrammingSkill(programmingLanguages[0]);
    setCurrentProgrammingProficiency(proficiencies[0]);
    setPassions(data.passions);
    setPassion('');
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const inputStates = {
      passions,
      softSkills,
      programmingSkills,
    };
      // submit data
    updateProfileJSON(
      data._id,
      JSON.stringify(inputStates),
    )(profileDispatch);
    setStep(step === 4 ? 4 : step + 1);
  };

  //   Skills Handlers
  const deleteHandler = (skill, skills, softActive) => {
    const result = skills.filter((softSkill) => softSkill !== skill);
    if (softActive) setSoftSkills(result);
    else setProgrammingSkills(result);
  };
  const addHandler = (skills, softActive) => {
    const result = skills.filter((skill) => (skill.split(' - ')[0] !== (softActive ? currentSoftSkills.label : currentProgrammingSkill.label)));
    if (softActive) setSoftSkills([`${currentSoftSkills.label} - ${currentSoftProficiency.label}`, ...result]);
    else setProgrammingSkills([`${currentProgrammingSkill.label} - ${currentProgrammingProficiency.label}`, ...result]);
  };
  //   Passions Handlers
  const deletePassion = (addedPassion) => {
    const result = passions.filter((p) => p !== addedPassion);
    setPassions(result);
  };
  const addPassion = () => {
    setPassions([passion, ...passions]);
    setPassion('');
  };
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')).user;
    setData(userInfo);
    // discard(userInfo);
  }, [step]);
  return (
    <>
      <div className={styles.title}>
        <h2>Background</h2>
      </div>
      <div className={`row ${styles.nameRow}`}>
        <div className="col-12">
          <label>Skillset</label>
        </div>
        <div style={{ display: 'unset', padding: '0' }} className={`col ${styles.socialCol}`}>
          <Select
            styles={customStyles}
            components={{ DropdownIndicator }}
            isClearable={false}
            isSearchable
            onChange={(newValue) => setCurrentSoftSkills(newValue)}
            options={softSkillsList}
            value={currentSoftSkills}
          />
        </div>
      </div>
      <div className={`row ${styles.nameRow}`}>
        <div className="col-8">
          <div className={`row ${styles.selectRow}`}>
            <div className="col-12">
              <label>Proficiency Level</label>
            </div>
            <div style={{ display: 'unset', padding: '0' }} className={`col ${styles.socialCol}`}>
              <Select
                styles={customStyles}
                components={{ DropdownIndicator }}
                isClearable={false}
                isSearchable
                onChange={(newValue) => setCurrentSoftProficiency(newValue)}
                options={proficiencies}
                value={currentSoftProficiency}
              />
            </div>
          </div>

        </div>
        <div className={`${styles.addButton} col-4`}>
          <a onClick={() => addHandler(softSkills, true)}>
            Add
          </a>
        </div>
      </div>
      <div className={`${styles.skillsList}`}>
        {
            softSkills.map((skill) => (
              <div key={skill}>
                {skill}
                <img
                  src="/assets/images/settings/circle-x.svg"
                  onClick={() => deleteHandler(skill, softSkills, true)}
                  alt="step"
                />
              </div>
            ))
        }
      </div>
      <div className={`row ${styles.nameRow}`}>
        <div className="col-12">
          <label>Programming Skills</label>
        </div>
        <div style={{ display: 'unset', padding: '0' }} className={`col ${styles.socialCol}`}>
          <Select
            styles={customStyles}
            components={{ DropdownIndicator }}
            isClearable={false}
            isSearchable
            onChange={(newValue) => setCurrentProgrammingSkill(newValue)}
            options={programmingLanguages}
            value={currentProgrammingSkill}
          />
        </div>
      </div>
      <div className={`row ${styles.nameRow}`}>
        <div className="col-8">
          <div className={`row ${styles.selectRow}`}>
            <div className="col-12">
              <label>Proficiency Level</label>
            </div>
            <div style={{ display: 'unset', padding: '0' }} className={`col ${styles.socialCol}`}>
              <Select
                styles={customStyles}
                components={{ DropdownIndicator }}
                isClearable={false}
                isSearchable
                onChange={(newValue) => setCurrentProgrammingProficiency(newValue)}
                options={proficiencies}
                value={currentProgrammingProficiency}
              />
            </div>
          </div>
        </div>
        <div className={`${styles.addButton} col-4`}>
          <a onClick={() => addHandler(programmingSkills, false)}>
            Add
          </a>
        </div>
      </div>
      <div className={`${styles.skillsList}`}>
        {
            programmingSkills.map((skill) => (
              <div key={skill}>
                {skill}
                <img
                  src="/assets/images/settings/circle-x.svg"
                  onClick={() => deleteHandler(skill, programmingSkills, false)}
                  alt="step"
                />
              </div>
            ))
        }
      </div>
      <div className={`row ${styles.nameRow}`}>
        <div className="col-8">
          <label>Passions</label>
          <input value={passion} placeholder="Share your passion" onChange={(e) => setPassion(e.target.value)} type="text" />

        </div>
        <div className={`${styles.addButton} col-4`}>
          <a onClick={addPassion}>
            Add
          </a>
        </div>
      </div>
      <div className={`${styles.skillsList}`}>
        {
            passions.map((skill) => (
              <div key={skill}>
                {skill}
                <img
                  src="/assets/images/settings/circle-x.svg"
                  onClick={() => deletePassion(skill)}
                  alt="step"
                />
              </div>
            ))
        }
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

export default ProfileThirdStep;
