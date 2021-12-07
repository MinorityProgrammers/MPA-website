import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../Layout.js';
import Footer from '../Footer.js';
import ApplyModal from './QuickApplyJobApplication';
import HomepageNav from '../HomepageNav';
import SidebarTwo from '../SidebarTwo';
import links from '../../contexts/utils/links';
import ComingSoon from '../ComingSoon';
import { useDetectOutsideClick } from '../UseDetectOutsideClick';

const CareersMainComponent = function (props) {
  const [open, setOpen] = useState(false);
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
    // <Layout pageTitle="MPA - Careers">
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
      {/* <div className="careers-wrapper" style={{ position: "relative" }}>
            <div className="careers-main-container tw-mt-20">
            <div className="careers-main-container-tabs">
              <Link href="/careers/companies" as="/careers/companies">
                <button className="careers-main-container-tabs-tab">
                  Companies
                </button>
              </Link>
              <Link href="/careers">
                <button className="careers-main-container-tabs-tab">
                  Jobs
                </button>
              </Link>
            </div> */}
      <div>{props.children}</div>
      <Footer />
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default CareersMainComponent;
