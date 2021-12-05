import { useState } from "react";
import SkillsDiv from "./SkillsDiv";
import JobGuySvg from "./svgs/JobGuySvg.js";

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
      changeSkillsArray((prevState) => [...newSkillsArray]);
    }
  }

  const jobSkills = skillsArray.map((item, index, array) => (
    <SkillsDiv
      removeSkill={removeSkill}
      key={item.id}
      removerInd={index}
      skill_order={index + 1}
    />
  ));

  return (
    <div className="tw-relative">
      <JobGuySvg />
      <div className="jobCreation-lineArt tw-mb-1 tw-h-2 tw-bg-yellow-500 tw-w-3/5 sm:tw-w-1/2 md:tw-w-2/5 lg:tw-w-1/3 xl:tw-w-3/8 tw-mx-auto tw-rounded-md"></div>
      <form className="job-create-form tw-w-11/12 sm:tw-w-3/4 md:tw-w-3/5 lg:tw-w-1/2 xl:tw-w-5/12 tw-mx-auto tw-bg-black tw-bg-white tw-bg-opacity-25 tw-p-10 tw-rounded-3xl tw-relative tw-z-10">
        <header className="tw-text-white tw-text-center tw-text-2xl tw-font-bold tw-mb-8">
          Create a New Job
        </header>
        <div className="form-input-group tw-flex tw-flex-col tw-mb-3">
          <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">
            Job Title <span className="tw-text-xl tw-text-yellow-200">*</span>
          </label>
          <input
            name="job_title"
            required
            className="focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-text-white tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80"
            type="text"
            placeholder="Add a short, descriptive job title"
          />
        </div>
        <div className="form-input-group tw-flex tw-flex-col tw-mb-3">
          <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">
            Job Location
          </label>
          <input
            name="location"
            className="focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-text-white tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80"
            type="text"
            placeholder="Specific addresses help you reach nearby candidates"
          />
        </div>

        <div className="form-input-group tw-flex tw-flex-col tw-mb-3">
          <span className="tw-block tw-text-white lg:tw-text-lg tw-mb-1 tw-font-bold">
            Job Remote? <span className="tw-text-xl tw-text-yellow-200">*</span>
          </span>
          <div className="tw-flex tw-justify-start tw-flex-wrap">
            <label className="jobType-label tw-text-white tw-mr-5 tw-mb-0">
              <input
                name="remote"
                required
                type="radio"
                value={true}
                className="jobType-checkbox tw-mr-1"
              />
              <span className="jobType-custom-checkbox"></span>Yes
            </label>
            <label className="jobType-label tw-text-white tw-mr-5 tw-mb-0">
              <input
                name="remote"
                type="radio"
                value={false}
                className="jobType-checkbox tw-mr-1"
              />
              <span className="jobType-custom-checkbox"></span>No
            </label>
          </div>
        </div>

        <div className="tw-mb-3">
          <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">
            Industry <span className="tw-text-xl tw-text-yellow-200">*</span>
          </label>
          <div>
            <select
              name="job_industry"
              required
              className="tw-w-full tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80 tw-text-white"
            >
              <option style={{ background: "#151371" }}>Art</option>
              <option style={{ background: "#151371" }}>Automotive</option>
              <option style={{ background: "#151371" }}>Medical</option>
              <option style={{ background: "#151371" }}>Science</option>
              <option style={{ background: "#151371" }}>Technology</option>
            </select>
          </div>
        </div>

        <div className="form-input-group tw-flex tw-flex-col tw-mb-3">
          <span className="tw-block tw-text-white tw-text-lg tw-mb-1 tw-font-bold">
            Job Type <span className="tw-text-xl tw-text-yellow-200">*</span>
          </span>

          <div>
            <select
              name="job_type"
              className="tw-w-full tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80 tw-text-white"
            >
              <option style={{ background: "#151371" }}>Full-Time</option>
              <option style={{ background: "#151371" }}>Part-Time</option>
              <option style={{ background: "#151371" }}>Contract</option>
              <option style={{ background: "#151371" }}>Industry</option>
              <option style={{ background: "#151371" }}>Temporary</option>
              <option style={{ background: "#151371" }}>Seasonal</option>
              <option style={{ background: "#151371" }}>Freelance</option>
              <option style={{ background: "#151371" }}>Volunteer</option>
            </select>
          </div>
        </div>

        <div className="form-input-group tw-flex tw-flex-col">
          <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">
            Job Skills{" "}
            <span className="tw-text-sm tw-font-normal">(Max 15)</span>
          </label>

          <div className="jobSkills-input">{jobSkills}</div>
          <button
            type="button"
            className="tw-text-white tw-mb-3"
            onClick={(e) => addSkill(e)}
          >
            Add Skill
          </button>
        </div>

        <div className="tw-flex tw-flex-col tw-mb-3">
          <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">
            Job Description{" "}
            <span className="tw-text-xl tw-text-yellow-200">*</span>
          </label>
          <textarea
            name="job_description"
            required
            rows="6"
            className="tw-text-white focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80"
            placeholder="Describe the responsibilities and preferred skills for this job"
          ></textarea>
        </div>
        <div className="form-input-group tw-flex tw-flex-col tw-mb-3">
          <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">
            Fulfill Role By
          </label>
          <input
            name="fulfull_role_by"
            type="date"
            className="focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-text-white tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent"
          />
        </div>

        <div className="form-input-group tw-flex tw-flex-col tw-mb-3">
          <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">
            Salary <span className="tw-text-xl tw-text-yellow-200">*</span>
          </label>
          <input
            name="pay"
            required
            className="tw-text-white focus:tw-outline-none focus:tw-ring-2 tw-mb-1 focus:tw-ring-yellow-300 tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80"
            placeholder="Enter Annual Salary"
            type="text"
          />
          <div className="tw-flex tw-justify-start tw-flex-wrap">
            <label className="jobType-label tw-text-white tw-mr-5 tw-mb-0">
              <input
                name="pay_interval"
                required
                type="radio"
                value="annually"
                className="jobType-checkbox tw-mr-1"
              />
              <span className="jobType-custom-checkbox"></span>Annually
            </label>
            <label className="jobType-label tw-text-white tw-mr-5 tw-mb-0">
              <input
                name="pay_interval"
                type="radio"
                value="hourly"
                className="jobType-checkbox tw-mr-1"
              />
              <span className="jobType-custom-checkbox"></span>Hourly
            </label>
          </div>
        </div>

        <div className="tw-flex tw-flex-col tw-mb-3">
          <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">
            Additional Compensation
          </label>
          <textarea
            name="additional_compensation"
            rows="6"
            className="tw-text-white focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80"
            placeholder="List any additional compensation offered"
          ></textarea>
        </div>

        <div className="tw-flex tw-flex-col tw-mb-3">
          <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">
            Benefits
          </label>
          <textarea
            rows="6"
            className="tw-text-white focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80"
            placeholder="Add benefits, separated by commas"
          ></textarea>
        </div>

        <div className="form-input-group tw-flex tw-flex-col tw-mb-3">
          <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">
            Weekly Work Hours
          </label>
          <input
            className="focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-text-white tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80"
            type="number"
            min="1"
            placeholder="Enter Number of Weekly Hours"
          />
        </div>
        <input
          method="GET"
          action="/"
          className="tw-block tw-mx-auto tw-py-1 tw-px-8 tw-mt-5 tw-text-white tw-font-bold tw-tracking-wide"
          style={{ background: "#151371" }}
          type="submit"
          value="Create Job"
        />
      </form>
    </div>
  );
};

export default JobCreation;
