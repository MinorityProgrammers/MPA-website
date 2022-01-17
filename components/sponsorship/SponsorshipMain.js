import React, { useState, useRef } from 'react';
import Layout from '../Layout';
import Footer from '../Footer';
import HomepageNav from '../homepage/HomepageNav';
import SidebarTwo from '../sidebar/SidebarTwo';
import links from '../../contexts/utils/links';
import useDetectOutsideClick from '../UseDetectOutsideClick';

const SponsorshipMain = function (props) {
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

  return (
    <Layout pageTitle="MPA - Sponsorship">
      <HomepageNav open={open} setOpen={setOpen} page="SponsorShip" />
      <SidebarTwo
        open={open}
        setOpen={setOpen}
        links={links}
        active="Home"
        handleClick={handleClick}
      />
      {/* {hide == false && <ComingSoon closeClick={handleClick} />} */}
      {props.children}
      <Footer />
    </Layout>
  );
};

export default SponsorshipMain;
