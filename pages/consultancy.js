import React, { useState, useRef, useEffect } from 'react';
import HomepageNav from '../components/homepage/HomepageNav';
import ComingSoon from '../components/ComingSoon';
import { useDetectOutsideClick } from '../components/UseDetectOutsideClick';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import SidebarTwo from '../components/sidebar/SidebarTwo';
import links from '../contexts/utils/links';
import Consultancy from '../components/Consultancy/consultancy_Home';

const consultancy = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, false);
  const [data, setData] = useState([]);
  const [clickRegister, setClickRegister] = useState(false);
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setHide(!hide);
  };
  if (hide === false) {
    setTimeout(() => {
      setHide(true);
    }, 60000);
  }
  useEffect(() => {
    if (data === null) {
      setActive(false);
    } else {
      setActive(true);
    }
  }, [data]);
  return (
    <div>
      <Layout pageTitle="MPA - Consultancy">
        <HomepageNav
          open={open}
          setOpen={setOpen}
          setData={setData}
          page="Consultancy"
        />
        <SidebarTwo
          open={open}
          setOpen={setOpen}
          links={links}
          active="Home"
          handleClick={handleClick}
        />
        {hide === false && <ComingSoon closeClick={handleClick} />}
        <section className="home-section">
          <Consultancy
            data={data}
            setClickRegister={setClickRegister}
            active={active}
            clickRegister={clickRegister}
          />
        </section>
        <Footer />
      </Layout>
    </div>
  );
};

export default consultancy;
