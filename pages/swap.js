/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState, useRef } from 'react';
import Layout from '../components/Layout';
import HomepageNav from '../components/homepage/HomepageNav';
import useDetectOutsideClick from '../components/UseDetectOutsideClick';
import Footer from '../components/Footer';
import links from '../contexts/utils/links';
import SidebarTwo from '../components/sidebar/SidebarTwo';

const Swap = () => {
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
    <Layout pageTitle="Exchange - Minority Programmers">
      <HomepageNav open={open} setOpen={setOpen} page="Partner" />
      <SidebarTwo
        open={open}
        setOpen={setOpen}
        links={links}
        active="Home"
        handleClick={handleClick}
      />
      <div className="quickswap-wrapper tw-py-20">
        <div className="tw-mt-5" />
        <iframe
          className="quickswap-iframe"
          src="https://quickswap.exchange/#/swap?outputCurrency=0x831753dd7087cac61ab5644b308642cc1c33dc13"
          id="myId"
        />
      </div>
      <Footer />
    </Layout>
  );
};

export default Swap;
