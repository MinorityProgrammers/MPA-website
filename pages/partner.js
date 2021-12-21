import React, { useState, useRef } from 'react';
import { InlineWidget } from 'react-calendly';
import Layout from '../components/Layout';
import HomepageNav from '../components/homepage/HomepageNav';
import { useDetectOutsideClick } from '../components/UseDetectOutsideClick';
import Footer from '../components/Footer';
import links from '../contexts/utils/links';
import SidebarTwo from '../components/sidebar/SidebarTwo';

const Partner = function () {
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
    <Layout pageTitle="MPA - Partner">
      <HomepageNav open={open} setOpen={setOpen} page="Partner" />
      <SidebarTwo
        open={open}
        setOpen={setOpen}
        links={links}
        active="Home"
        handleClick={handleClick}
      />
      <div className="calendly-wrapper tw-py-20">
        <div className="tw-mt-5" />
        <InlineWidget url="https://calendly.com/minorityprogrammers/partnership" />
      </div>
      <Footer />
    </Layout>
  );
};

export default Partner;
