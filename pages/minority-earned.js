import React, { useRef, useState } from 'react';
import HomepageNav from '../components/HomepageNav';
import Layout from '../components/Layout';
import SidebarTwo from '../components/SidebarTwo';
import links from '../contexts/utils/links';
import ComingSoon from '../components/ComingSoon';
import { useDetectOutsideClick } from '../components/UseDetectOutsideClick';
import MinorityEarned from '../components/$-minority-earned/MinorityEarned';
import Footer from '../components/Footer';

const MinorityEarnedPage = function () {
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
    <Layout pageTitle="$ Minority Earned">
      <HomepageNav
        open={open}
        setOpen={setOpen}
        setData={setData}
        page="Minority-earned"
      />
      <SidebarTwo
        open={open}
        setOpen={setOpen}
        links={links}
        active="Home"
        handleClick={handleClick}
      />
      {hide == false && <ComingSoon closeClick={handleClick} />}
      <MinorityEarned />

      <Footer />
    </Layout>
  );
};

export default MinorityEarnedPage;
