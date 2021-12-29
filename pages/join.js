import React, { useState, useRef } from 'react';
import Layout from '../components/Layout';
import HomepageNav from '../components/homepage/HomepageNav';
import Footer from '../components/Footer';
import SidebarTwo from '../components/SidebarTwo';
import links from '../contexts/utils/links';
import { useDetectOutsideClick } from '../components/UseDetectOutsideClick';
import JoinHerosection from '../components/join/JoinHerosection';
import MpaPrograms from '../components/join/MpaProgramsHighlight';
import JoinCard from '../components/join/JoinCard';

const JoinPage = function () {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, true);
  const handleClick = () => {
    setHide(!hide);
  };
  if (hide === false) {
    setTimeout(() => {
      setHide(true);
    }, 10000);
  }
  return (
    <Layout pageTitle="Join">
      <div id="join-page">
        <div className="container-fluid bg-dark">
          <div className="row join-hero-section align-items-end justify-content-end">
            <div className="join-navbar align-items-end justify-content-end">
              <HomepageNav open={open} setOpen={setOpen} />
              <SidebarTwo
                open={open}
                setOpen={setOpen}
                links={links}
                active="Home"
                handleClick={handleClick}
              />
            </div>
            <div className="hero-section tw-mt-4">
              <JoinHerosection />
            </div>
          </div>
          <div className="row highlight-mpa-programs bg-light text-center justify-content-center">
            <h1 className="mt-3 ">MPA Programs</h1>
            <MpaPrograms />
          </div>
          <div className="row join-mpa-programs justify-content-center">
            <JoinCard />
          </div>
        </div>
      </div>

      <Footer />
    </Layout>
  );
};

export default JoinPage;
