import React, { useState, useRef } from "react";
import HomepageNav from "../components/homepage/HomepageNav";
import ConsultancyHero from "../components/Consultancy/ConsultancyHero";
import ConsultancyDashboard from "../components/Consultancy/ConsultancyDashboard";
import { useDetectOutsideClick } from "../components/UseDetectOutsideClick";
import Layout from "../components/Layout";
import SidebarTwo from "../components/SidebarTwo";
import links from "../contexts/utils/links";
import Footer from "../components/Footer";

const consultancy = () => {
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
          <ConsultancyDashboard data={data} />
        </section>
        <Footer />
      </Layout>
    </div>
  );
};

export default consultancy;
