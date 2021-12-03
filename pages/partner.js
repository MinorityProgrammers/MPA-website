import Layout from "../components/Layout";
import React, { useState, useRef } from "react";
import HomepageNav from "../components/HomepageNav";
import { useDetectOutsideClick } from "../components/UseDetectOutsideClick";
import Footer from "../components/Footer";
import links from "../contexts/utils/links";
import { InlineWidget } from "react-calendly";
import SidebarTwo from "../components/SidebarTwo";

const Partner = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, true);
  const handleClick = () => {
    setHide(!hide);
  };
  if (hide == false) {
    setTimeout(() => {
      setHide(true);
    }, 10000);
  }
  return (
    <Layout pageTitle="MPA - Partner">
      <HomepageNav open={open} setOpen={setOpen} page={"Partner"} />
      <SidebarTwo
        open={open}
        setOpen={setOpen}
        links={links}
        active={"Home"}
        handleClick={handleClick}
      />
      <div class="calendly-wrapper tw-py-20">
        <div className="tw-mt-5"></div>
        <InlineWidget url="https://calendly.com/minorityprogrammers/partnership" />
      </div>
      <Footer />
    </Layout>
  );
};

export default Partner;
