import React, { useState } from 'react';
import InputGroup from './form/job-creation/InputGroup';
import Label from './form/job-creation/Label';
import RadioInput from './form/job-creation/RadioInput';
import SelectGroup from './form/job-creation/SelectGroup';
import TextAreaGroup from './form/job-creation/TextAreaGroup';
import jobIndustries from './JobIndustries.json';
import jobTypes from './JobTypes.json';
import SkillsDiv from './SkillsDiv';
import JobGuySvg from './svgs/JobGuySvg';

const JobCreation = () => {
  const [skillsArray, changeSkillsArray] = useState([]);
  const [skillsKey, changeSkillsKey] = useState(0);

  function removeSkill(i) {
    changeSkillsArray(skillsArray.filter((_, index) => i !== index));
  }

  function addSkill(e) {
    if (skillsArray.length < 15) {
      const newSkillsArray = [...skillsArray, { id: skillsKey }];
      changeSkillsKey(skillsKey + 1);
      changeSkillsArray(() => [...newSkillsArray]);
    }
  }

  const jobSkills = skillsArray.map((item, index) => (
    <SkillsDiv
      removeSkill={() => removeSkill}
      key={item.id}
      removerInd={index}
      skill_order={index + 1}
    />
  ));

  return (
    <div className="tw-relative">
      <JobGuySvg />
      <div className="jobCreation-lineArt tw-mb-1 tw-h-2 tw-bg-yellow-500 tw-w-3/5 sm:tw-w-1/2 md:tw-w-2/5 lg:tw-w-1/3 xl:tw-w-3/8 tw-mx-auto tw-rounded-md" />
      <form className="job-create-form tw-w-11/12 sm:tw-w-3/4 md:tw-w-3/5 lg:tw-w-1/2 xl:tw-w-5/12 tw-mx-auto tw-bg-black tw-bg-white tw-bg-opacity-25 tw-p-10 tw-rounded-3xl tw-relative tw-z-10">
        <header className="tw-text-white tw-text-center tw-text-2xl tw-font-bold tw-mb-8">
          Create a New Job
        </header>

        <InputGroup
          labelText="Job Title"
          inputName="job_title"
          isRequried
          className="focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-text-white tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80"
          type="text"
          placeholder="Add a short, descriptive job title"
        />

        <InputGroup
          labelText="Job Location"
          inputName="location"
          className="focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-text-white tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80"
          type="text"
          placeholder="Specific addresses help you reach nearby candidates"
        />

        <div className="form-input-group tw-flex tw-flex-col tw-mb-3">
          <Label text="Job Remote?" isRequried />

          <div className="tw-flex tw-justify-start tw-flex-wrap">
            <RadioInput
              name="remote"
              id="remote-yes"
              required
              value
              text="Yes"
            />
            <RadioInput
              name="remote"
              id="remote-no"
              value={false}
              text="No"
            />
          </div>
        </div>

        <div className="tw-mb-3">
          <SelectGroup
            isRequried
            labeText="Industry"
            name="job_industry"
            options={jobIndustries}
          />
        </div>

        <div className="form-input-group tw-flex tw-flex-col tw-mb-3">
          <SelectGroup
            isRequried
            labeText="Job Type"
            name="job_type"
            options={jobTypes}
          />
        </div>

        <div className="form-input-group tw-flex tw-flex-col">
          <Label text="Job Skills">
            <span className="tw-text-sm tw-font-normal">{' (Max 15)'}</span>
          </Label>

          <div className="jobSkills-input">{jobSkills}</div>
          <button
            type="button"
            className="tw-text-white tw-mb-3"
            onClick={(e) => addSkill(e)}
          >
            Add Skill
          </button>
        </div>

        <TextAreaGroup
          isRequried
          labelText="Job Description"
          name="job_description"
          placeholder="Describe the responsibilities and preferred skills for this job"
        />

        <InputGroup
          labelText="Fulfill Role By"
          name="fulfull_role_by"
          type="date"
          className="focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-text-white tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent"
        />

        <div className="form-input-group tw-flex tw-flex-col tw-mb-3">
          <Label text="Salary" isRequried />
          <input
            name="pay"
            required
            className="tw-text-white focus:tw-outline-none focus:tw-ring-2 tw-mb-1 focus:tw-ring-yellow-300 tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80"
            placeholder="Enter Annual Salary"
            type="text"
          />
          <div className="tw-flex tw-justify-start tw-flex-wrap">
            <RadioInput
              name="pay_interval"
              id="annually"
              required
              value="annually"
              text="Annually"
            />
            <RadioInput
              name="pay_interval"
              id="hourly"
              value="hourly"
              text="Hourly"
            />
          </div>
        </div>

        <TextAreaGroup
          labelText="Additional Compensation"
          name="additional_compensation"
          placeholder="List any additional compensation offered"
        />

        <TextAreaGroup
          labelText="Benefits"
          name="benefits"
          placeholder="Add benefits, separated by commas"
        />

        <InputGroup
          labelText="Weekly Work Hours"
          className="focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-text-white tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80"
          type="number"
          min="1"
          placeholder="Enter Number of Weekly Hours"
        />

        <input
          method="GET"
          action="/"
          className="tw-block tw-mx-auto tw-py-1 tw-px-8 tw-mt-5 tw-text-white tw-font-bold tw-tracking-wide"
          style={{ background: '#151371' }}
          type="submit"
          value="Create Job"
        />
      </form>
    </div>
  );
};

export default JobCreation;
