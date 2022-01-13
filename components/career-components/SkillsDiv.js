import React from 'react';

const jobSkills = {
  html: 'HTML',
  css: 'CSS',
  javascript: 'Javascript',
  react: 'React',
  redux: 'Redux',
};

const SkillsDiv = ({
  id, skill_order, removerInd, removeSkill,
}) => (
  <div className="job-skill tw-flex tw-mb-3" key={id}>
    <span className="tw-block tw-w-7 tw-text-white">
      {skill_order}
      .
    </span>
    <div className="tw-w-full tw-grid tw-grid-cols-2 tw-gap-x-4 tw-mr-2">
      <div className="tw-w-full tw-flex tw-flex-col tw-justify-center tw-mr-2">
        <span className="tw-block tw-text-white">Skill</span>
        <select
          name={`job_skill-${skill_order}`}
          required
          className="tw-block tw-h-9 tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80 tw-text-white"
        >
          {
           Object.keys(jobSkills).map((key) => (
             <option key={key} value={key} style={{ background: '#151371' }}>
               {jobSkills[key]}
             </option>
           ))
         }
        </select>
      </div>
      <div className="tw-w-full tw-flex tw-flex-col tw-justify-center">
        <span className="tw-block tw-text-white">Years</span>
        <input
          name={`job_years-${skill_order}`}
          required
          className="tw-h-9 tw-block focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-text-white tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80"
          type="number"
          min="1"
          max="100"
        />
      </div>
    </div>
    <button
      type="button"
      className="tw-block tw-w-4 tw-h-100 tw-ml-2 tw-text-yellow-300"
      onClick={() => removeSkill(removerInd)}
    >
      X
    </button>
  </div>
);

export default SkillsDiv;
