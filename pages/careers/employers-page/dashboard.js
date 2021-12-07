import React, { useState, useRef, Fragment } from 'react';
import PageHeader from '../../../components/PageHeader';
import SidebarTwo from '../../../components/SidebarTwo';
import links from '../../../contexts/utils/links';
import { useDetectOutsideClick } from '../../../components/UseDetectOutsideClick';
import ComingSoon from '../../../components/ComingSoon';
// components
import HomepageNav from '../../../components/HomepageNav';
import Layout from '../../../components/Layout';
import Content from '../../../components/employers-page/sidenav';
import Header from '../../../components/employers-page/home/header/Header';
import EmployerContent from '../../../components/employers-page/home/content';

const EmployersDashboard = function () {
  const [open, setOpen] = useState(false);
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
    <>
      {/** Header Navigation */}
      <Layout pageTitle="Employers Page">
        <HomepageNav open={open} setOpen={setOpen} page="Employers Page" />
        <SidebarTwo
          open={open}
          setOpen={setOpen}
          links={links}
          active="Home"
          handleClick={handleClick}
        />
        {hide == false && <ComingSoon closeClick={handleClick} />}
        <div id="join">
          <div className="container tw-mt-1" />
        </div>
      </Layout>
      <main>
        {/** Content Renders Body Side Navigation && Main Body */}
        <Content>
          <Header />
          <EmployerContent />
        </Content>
      </main>
    </>
  );
};

export default EmployersDashboard;
