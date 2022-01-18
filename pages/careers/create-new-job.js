import React, { useRef, useState } from 'react';
import JobCreation from '../../components/career-components/JobCreation';
import ComingSoon from '../../components/ComingSoon';
import Footer from '../../components/Footer';
import HomepageNav from '../../components/homepage/HomepageNav';
import Layout from '../../components/Layout';
import SidebarTwo from '../../components/sidebar/SidebarTwo';
import { useDetectOutsideClick } from '../../components/UseDetectOutsideClick';
import links from '../../contexts/utils/links';

const CreateNewJob = () => {
  const [open, setOpen] = useState(false);
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

  function getTodaysDate() {
    const todaysDate = new Date().toString().split(' ').slice(1, 4)
      .join(' ');
    return todaysDate;
  }
  getTodaysDate();

  return (
    <div className="create-new-job">
      <Layout>
        <HomepageNav open={open} setOpen={setOpen} page="Job" />
        <SidebarTwo
          open={open}
          setOpen={setOpen}
          links={links}
          active="Home"
          handleClick={handleClick}
        />
        {hide === false && <ComingSoon closeClick={handleClick} />}
        <div className="create-new-job-page tw-pb-20 tw-pt-2.5 tw-mt-20">
          <div className="tw-container tw-mx-auto">
            <div className="tw-mt-2.5 tw-text-center sm:tw-text-right">
              <div className="tw-inline-flex tw-flex-col tw-text-white tw-border-2 tw-p-2 tw-px-8 tw-rounded-lg tw-mb-20">
                <div className="company-name tw-inline">
                  COMPANY NAME FROM EMAIL
                </div>
                <div>
                  Todays Date:
                  {' '}
                  <span className="tw-font-bold">{getTodaysDate()}</span>
                </div>
              </div>
            </div>
            <JobCreation />
          </div>
        </div>
        <Footer />
      </Layout>
    </div>
  );
};

export default CreateNewJob;
