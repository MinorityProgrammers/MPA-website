import { useState } from 'react';
import user from './User.json';

export var ApplyModal = function ({
  job, open, closeModal, loadingReq,
}) {
  const [uploadText, changeUploadtext] = useState('');

  const requirements = loadingReq == true && job != null && job.min_requirements ? job.min_requirements.map((skill, idx) => (
    <div className="applyModal-content-box-form-reqs-req" key={idx}>
      <label className="applyModal-content-box-form-reqs-req-label">
        How many years of experience do you have in
        {skill.skill}
        ?
      </label>
      <input className="applyModal-content-box-form-reqs-req-input" name={`years_${skill.skill}`} type="number" min="0" required />
    </div>
  )) : '';

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
              <label className="applyModal-content-box-form-name-label">Name: &nbsp;</label>
              <div className="applyModal-content-box-form-name-names">
                {user.first_name}
                {' '}
                {user.last_name}
              </div>
            </div>

            <div className="applyModal-content-box-form-reqs">
              <h4 className="applyModal-content-box-form-reqs-heading">Required Skills</h4>
              {requirements}
            </div>
            <div className="applyModal-content-box-form-resume">
              <label className="applyModal-content-box-form-resume-label" htmlFor="resume">
                <svg className="applyModal-content-box-form-resume-logo" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                  <g id="Icon_feather-upload" data-name="Icon feather-upload" transform="translate(-3 -3)">
                      <path id="Path_138" data-name="Path 138" d="M31.5,22.5v6a3,3,0,0,1-3,3H7.5a3,3,0,0,1-3-3v-6" fill="none" stroke="#151371" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                      <path id="Path_139" data-name="Path 139" d="M25.5,12,18,4.5,10.5,12" fill="none" stroke="#151371" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                      <path id="Path_140" data-name="Path 140" d="M18,4.5v18" fill="none" stroke="#151371" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    </g>
                </svg>
                Upload Resume
              </label>
              <input type="file" id="resume" style={{ display: 'none' }} onChange={(e) => makeResumeName(e)} />
              <div className="applyModal-content-box-form-resume-text">
                {uploadText}
              </div>

              <div className="applyModal-content-box-form-submit"><button type="submit" className="applyModal-content-box-form-submit-btn">Submit</button></div>
            </div>
          </form>

        </div>
      ) : ''}

    </div>
  );
};
