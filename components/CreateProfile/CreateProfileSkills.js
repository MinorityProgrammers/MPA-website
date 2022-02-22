import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';

const CreateProfileSkills = function ({ values, setValue }) {
  const deleteValue = (delValue) => {
    setValue(values.filter((value) => value !== delValue));
  };

  return (
    <div className="cp-skillsContainer">
      {
        values.map((value) => value !== '' && (
        <span className="cp-skill" key={value}>
          {value}
          <AiFillCloseCircle className="delete-skill" onClick={() => deleteValue(value)} />
        </span>
        ))
      }
    </div>
  );
};

export default CreateProfileSkills;
