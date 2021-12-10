import React, { useRef, useState } from 'react';
import Footer from '../Footer';
import { useDetectOutsideClick } from '../UseDetectOutsideClick';
import ApplyModal from './QuickApplyJobApplication';

const CareersMainComponent = (props) => {
  const [data, setData] = useState([]);
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
      {props.jobsOn && (
        <ApplyModal
          data={data}
          open={props.open}
          job={props.job}
          onClick={handleClick}
          closeModal={props.closeModal}
          getAppliedJobs={props.getAppliedJobs}
        />
      )}
      <div>{props.children}</div>
      <Footer />
    </div>
  );
};

export default CareersMainComponent;
