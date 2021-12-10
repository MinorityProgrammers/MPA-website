import React, { useState, useRef, useEffect } from 'react';
import HomepageNav from '../components/homepage/HomepageNav';
import Footer from '../components/Footer';
import { useDetectOutsideClick } from '../components/UseDetectOutsideClick';
import Layout from '../components/Layout';
import SidebarTwo from '../components/SidebarTwo';
import links from '../contexts/utils/links';
import CareerExplainer from '../components/career-components/CareerExplainer';

const Career = function () {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const dropdownRef = useRef(null);
  const [clickRegister, setClickRegister] = useState(false);
  const [active, setActive] = useState(false);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, false);
  const navBarRef = useRef();
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
  }, [data]);
  return (
    <div>
      <Layout pageTitle="MPA - Career">
        <HomepageNav
          open={open}
          setOpen={setOpen}
          setData={setData}
          page="CareerPage"
          navBarRef={navBarRef}
        />
        <SidebarTwo
          open={open}
          setOpen={setOpen}
          links={links}
          active="Home"
          handleClick={handleClick}
        />
        <section
          className="section__mentorshipProgram"
          style={{ paddingTop: 0, paddingBottom: 0 }}
        >
          <CareerExplainer
            data={data}
            setClickRegister={setClickRegister}
            active={active}
            clickRegister={clickRegister}
            navBarRef={navBarRef}
          />
        </section>
        <Footer />
      </Layout>
    </div>
  );
};

export default Career;
