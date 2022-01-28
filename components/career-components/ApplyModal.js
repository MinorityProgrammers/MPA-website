import React, { useState } from 'react';
import UploadIconSvg from './svgs/UploadIconSvg';
import user from './User.json';

const ApplyModal = ({
  job, open, closeModal, loadingReq,
}) => {
  const [uploadText, changeUploadtext] = useState('');

  const requirements = loadingReq === true && job !== null && job.min_requirements
    ? job.min_requirements.map((skill, idx) => (
      <div className="applyModal-content-box-form-reqs-req" key={`${skill.skill + idx}`}>
        <label className="applyModal-content-box-form-reqs-req-label">
          How many years of experience do you have in
          {skill.skill}
          ?
        </label>
        <input
          className="applyModal-content-box-form-reqs-req-input"
          name={`years_${skill.skill}`}
          type="number"
          min="0"
          required
        />
      </div>
    ))
    : '';

  function makeResumeName(e) {
    changeUploadtext(e.target.files[0].name);
  }

  return (
    <div
      className="applyModal"
      style={open ? { display: 'flex' } : { display: 'none' }}
      onClick={() => {
        closeModal();
        document.body.style.overflow = 'auto';
      }}
    >
      {job != null ? (
        <div className="applyModalContent">
          <div
            className="applyModalClose"
            onClick={() => {
              closeModal();
              document.body.style.overflow = 'auto';
            }}
          >
            X
          </div>

          <div className="applyModalHeader">
            <h3 className="applyModal-content-box-heading">
              <div>Application for</div>
              <div>{job.job_title}</div>
              <div>at</div>
              <div>{job.company_id}</div>
            </h3>
          </div>

          <form className="applyModal-content-box-form">
            <div className="applyModal-content-box-form-name">
              <label className="applyModal-content-box-form-name-label">
                Name: &nbsp;
              </label>
              <div className="applyModal-content-box-form-name-names">
                {user.first_name}
                {' '}
                {user.last_name}
              </div>
            </div>

            <div className="applyModal-content-box-form-reqs">
              <h4 className="applyModal-content-box-form-reqs-heading">
                Required Skills
              </h4>
              {requirements}
            </div>
            <div className="applyModal-content-box-form-resume">
              <label
                className="applyModal-content-box-form-resume-label"
                htmlFor="resume"
              >
                <UploadIconSvg />
                Upload Resume
              </label>
              <input
                type="file"
                id="resume"
                style={{ display: 'none' }}
                onChange={(e) => makeResumeName(e)}
              />
              <div className="applyModal-content-box-form-resume-text">
                {uploadText}
              </div>

              <div className="applyModal-content-box-form-submit">
                <button
                  type="submit"
                  className="applyModal-content-box-form-submit-btn"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default ApplyModal;
