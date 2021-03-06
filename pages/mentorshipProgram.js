import React, { useEffect, useRef, useState } from 'react';
import ComingSoon from '../components/ComingSoon';
import Footer from '../components/Footer';
import HomepageNav from '../components/homepage/HomepageNav';
import Layout from '../components/Layout';
import SidebarTwo from '../components/sidebar/SidebarTwo';
import links from '../contexts/utils/links';
import useDetectOutsideClick from '../components/UseDetectOutsideClick';
import MentorshipProgramHero from '../components/mentorship/MentorshipProgramHero';
import MentorshipProgramHome from '../components/mentorship/MentorshipProgramHome';

const mentorshipProgram = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const dropdownRef = useRef(null);
  const [clickRegister, setClickRegister] = useState(false);
  const [active, setActive] = useState(false);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, false);
  const handleClick = () => {
    setHide(!hide);
  };
  if (hide === false) {
    setTimeout(() => {
      setHide(true);
    }, 60000);
  }

  useEffect(() => {
    let userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
    if (userInfo) {
      userInfo = userInfo.user;
      if (userInfo.has_mentorship) {
        window.location.href = userInfo.is_mentor
          ? 'mentorship/mentor'
          : 'mentorship/mentee';
      }
    }
    if (data === null) {
      setActive(false);
    } else {
      setActive(true);
    }
  }, []);
  return (
    <Layout pageTitle="MPA - Mentorship SignUp">
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
      {hide === false && <ComingSoon closeClick={handleClick} />}
      <MentorshipProgramHero />
      <section className="section__mentorshipProgram">
        <MentorshipProgramHome
          data={data}
          setClickRegister={setClickRegister}
          active={active}
          clickRegister={clickRegister}
        />
      </section>
      <Footer />
    </Layout>
  );
};

export default mentorshipProgram;
