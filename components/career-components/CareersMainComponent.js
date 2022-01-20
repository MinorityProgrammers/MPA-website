import React, { useRef, useState } from 'react';
import Footer from '../Footer';
import useDetectOutsideClick from '../UseDetectOutsideClick';
import ApplyModal from './QuickApplyJobApplication';

const CareersMainComponent = (props) => {
  const {
    jobsOn, open, job, closeModal, getAppliedJobs, children,
  } = props;

  const [data] = useState([]);
  const dropdownRef = useRef(null);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, false);

  const handleClick = () => {
    setHide(!hide);
  };

  if (hide === false) {
    setTimeout(() => {
      setHide(true);
    }, 60000);
  }

  return (
    <div>
      {jobsOn && (
        <ApplyModal
          data={data}
          open={open}
          job={job}
          onClick={handleClick}
          closeModal={closeModal}
          getAppliedJobs={getAppliedJobs}
        />
      )}
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default CareersMainComponent;
