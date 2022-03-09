import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import ComingSoon from '../../components/ComingSoon';
import Footer from '../../components/Footer';
import HomepageNav from '../../components/homepage/HomepageNav';
import Layout from '../../components/Layout';
import useDetectOutsideClick from '../../components/UseDetectOutsideClick';
import SidebarTwo from '../../components/sidebar/SidebarTwo';
import links from '../../contexts/utils/links';
import HeroSection from '../../components/chapter/view/HeroSection';
import Tabs from '../../components/chapter/view/Tabs';

const Index = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [hide, setHide] = useDetectOutsideClick(dropdownRef, false);

  const router = useRouter();
  const { id } = router.query;

  const handleClick = () => {
    setHide(!hide);
  };

  if (hide === false) {
    setTimeout(() => {
      setHide(true);
    }, 60000);
  }

  return (
    <Layout pageTitle="Chapter - MPA">
      <HomepageNav open={open} setOpen={setOpen} page="Chapter-toolkit" />
      <SidebarTwo
        open={open}
        setOpen={setOpen}
        links={links}
        active="Home"
        handleClick={handleClick}
      />
      {hide === false && <ComingSoon closeClick={handleClick} />}
      <HeroSection />
      <Tabs />
      <Footer />
    </Layout>
  );
};

export default Index;
