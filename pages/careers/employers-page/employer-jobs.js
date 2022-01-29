import React, { useRef, useState } from 'react';
import ComingSoon from '../../../components/ComingSoon';
import Content from '../../../components/employers-page/sidenav';
import HomepageNav from '../../../components/homepage/HomepageNav';
import Layout from '../../../components/Layout';
import SidebarTwo from '../../../components/sidebar/SidebarTwo';
import useDetectOutsideClick from '../../../components/UseDetectOutsideClick';
import links from '../../../contexts/utils/links';

const EmployersDashboard = () => {
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
    <>
      <Layout pageTitle="Employers Page">
        <HomepageNav open={open} setOpen={setOpen} page="Employers Page" />
        <SidebarTwo
          open={open}
          setOpen={setOpen}
          links={links}
          active="Home"
          handleClick={handleClick}
        />
        <div id="join">
          <div className="container tw-mt-1" />
        </div>
        {hide === false && <ComingSoon closeClick={handleClick} />}
      </Layout>
      <main className="max-h-screen flex flex-row">
        <Content>
          <h1>Employers Job</h1>
        </Content>
      </main>
    </>
  );
};

export default EmployersDashboard;
