import React, { useState, useContext, useEffect } from 'react';
import {
  proficiencies,
  programmingLanguages, softSkills as softSkillsList,
} from '../../contexts/utils/fields';
import styles from '../../styles/settings/settingSetup.module.scss';
import { GlobalContext } from '../../contexts/provider';
import updateProfileJSON from '../../contexts/actions/profile/updateProfileJSON';

const ProfileThirdStep = ({
  data, setStep, step, setData,
}) => {
  const [passion, setPassion] = useState('');
  const [passions, setPassions] = useState(data.passions);
  const [softSkills, setSoftSkills] = useState(data.softSkills);
  const [currentSoftSkills, setCurrentSoftSkills] = useState('communication');
  const [currentSoftProficiency, setCurrentSoftProficiency] = useState('Novice Low');
  const [programmingSkills, setProgrammingSkills] = useState(data.programmingSkills);
  const [currentProgrammingSkill, setCurrentProgrammingSkill] = useState('Java');
  const [currentProgrammingProficiency, setCurrentProgrammingProficiency] = useState('Novice Low');

  // update userData
  const { profileDispatch } = useContext(GlobalContext);

  // Discard Changes
  const discard = () => {
    setSoftSkills(data.softSkills);
    setProgrammingSkills(data.programmingSkills);
    setCurrentSoftSkills('communication');
    setCurrentSoftProficiency('Novice Low');
    setCurrentProgrammingSkill('Java');
    setCurrentProgrammingProficiency('Novice Low');
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
    const result = skills.filter((skill) => (skill.split(' - ')[0] !== (softActive ? currentSoftSkills : currentProgrammingSkill)));
    if (softActive) setSoftSkills([`${currentSoftSkills} - ${currentSoftProficiency}`, ...result]);
    else setProgrammingSkills([`${currentProgrammingSkill} - ${currentProgrammingProficiency}`, ...result]);
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
        <div className="settings-phone-field col">
          <label>Skillset</label>
          <select placeholder="Select Skill" value={currentSoftSkills} onChange={(e) => setCurrentSoftSkills(e.target.value)}>
            {softSkillsList.map((s) => (
              <option value={s.label} key={s.label}>{s.label}</option>
            ))}
          </select>

        </div>
      </div>
      <div className={`row ${styles.nameRow}`}>
        <div className="col-8">
          <label>Proficiency Level</label>
          <select placeholder="Select Skill" value={currentSoftProficiency} onChange={(e) => setCurrentSoftProficiency(e.target.value)}>
            {proficiencies.map((p) => (
              <option value={p.label} key={p.label}>{p.label}</option>
            ))}
          </select>

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
        <div className="settings-phone-field col">
          <label>Programming Skills</label>
          <select placeholder="Programming skill" value={currentProgrammingSkill} onChange={(e) => setCurrentProgrammingSkill(e.target.value)}>
            {programmingLanguages.map((p) => (
              <option value={p.label} key={p.label}>{p.label}</option>
            ))}
          </select>

        </div>
      </div>
      <div className={`row ${styles.nameRow}`}>
        <div className="col-8">
          <label>Proficiency Level</label>
          <select placeholder="Select Skill" value={currentProgrammingProficiency} onChange={(e) => setCurrentProgrammingProficiency(e.target.value)}>
            {proficiencies.map((p) => (
              <option value={p.label} key={p.label}>{p.label}</option>
            ))}
          </select>

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
