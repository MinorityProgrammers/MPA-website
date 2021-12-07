import React, { useState, useRef, useEffect } from "react";
import HomepageNav from "../components/homepage/HomepageNav";
import { useDetectOutsideClick } from "../components/UseDetectOutsideClick";
import Layout from "../components/Layout";
import Testimonial from "../components/Internship/Testimonial";
import SidebarTwo from "../components/SidebarTwo";
import links from "../contexts/utils/links";
import InternshipHero from "../components/Internship/InternshipHero";
import InternshipHome from "../components/Internship/InternshipHome";
import Footer from "../components/Footer";

function consultancy() {
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
      <Layout pageTitle="MPA - Internship">
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
        <InternshipHero />
        <section className="section__internship">
          <InternshipHome
            data={data}
            setClickRegister={setClickRegister}
            active={active}
            clickRegister={clickRegister}
          />
          <section className="testimonail__page">
            <Testimonial />
          </section>
        </section>
        <Footer />
      </Layout>
    </div>
  );
}

export default consultancy;
