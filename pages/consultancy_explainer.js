import React, { useState, useRef, useEffect } from 'react';
import HomepageNav from '../components/homepage/HomepageNav';
import ConsultancyHero from '../components/Consultancy/ConsultancyHero';
import ConsultancyHomeExplainer from '../components/Consultancy/ConsultancyHomeExplainer';
import Footer from '../components/Footer';
import { useDetectOutsideClick } from '../components/UseDetectOutsideClick';
import Layout from '../components/Layout';
import SidebarTwo from '../components/SidebarTwo';
import links from '../contexts/utils/links';

const consultancy = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const dropdownRef = useRef(null);
  const [clickRegister, setClickRegister] = useState(false);
  const [active, setActive] = useState(false);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, false);
  const handleClick = () => {
    setHide(!hide);
  };
  if (hide == false) {
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
  }, []);
  return (
    <div>
      <Layout pageTitle="MPA - Consultancy">
        <HomepageNav
          open={open}
          setOpen={setOpen}
          setData={setData}
          page="MentorshipProgram"
        />
        <SidebarTwo
          open={open}
          setOpen={setOpen}
          links={links}
          active="Home"
          handleClick={handleClick}
        />
        <ConsultancyHero />
        <section className="section__mentorshipProgram">
          <ConsultancyHomeExplainer
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
