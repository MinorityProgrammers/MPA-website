import { useState, useRef } from "react";
import Footer from "../Footer.js";
import ApplyModal from "./QuickApplyJobApplication";
import { useDetectOutsideClick } from "../UseDetectOutsideClick";

const CareersMainComponent = (props) => {
  const [data, setData] = useState([]);
  const dropdownRef = useRef(null);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, false);

  const handleClick = () => {
    setHide(!hide);
  };

  if (hide == false) {
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
