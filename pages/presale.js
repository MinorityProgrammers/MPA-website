import React, { useState, useRef } from 'react';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import SidebarTwo from '../components/SidebarTwo';
import HomepageNav from '../components/homepage/HomepageNav';
import links from '../contexts/utils/links';
import ComingSoon from '../components/ComingSoon';
import { useDetectOutsideClick } from '../components/UseDetectOutsideClick';
import PresaleCountDown from '../components/presale/presaleCountDown';
import PresaleAmount from '../components/presale/presaleAmount';
import PresaleHeroSection from '../components/presale/presaleHeroSection';
import PresalePreorder from '../components/presale/presalePreorder';

const Presale = function () {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, true);
  const handleClick = () => {
    setHide(!hide);
  };
  if (hide == false) {
    setTimeout(() => {
      setHide(true);
    }, 10000);
  }
  return (
    <div className="background-layout">
      <Layout pageTitle="Presale">
        <HomepageNav open={open} setOpen={setOpen} page="Learn" />
        <SidebarTwo
          open={open}
          setOpen={setOpen}
          links={links}
          active="Home"
          handleClick={handleClick}
        />
        {hide == false && <ComingSoon closeClick={handleClick} />}
        <div className="presale-page">
          <PresaleHeroSection />
          <PresaleCountDown />
          <PresaleAmount />
          <PresalePreorder />
        </div>
        <Footer />
      </Layout>
    </div>
  );
};

export default Presale;
