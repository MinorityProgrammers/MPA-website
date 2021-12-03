import { useState, useRef } from "react";
import Layout from "../Layout.js";
import Footer from "../Footer.js";
import HomepageNav from "../HomepageNav";
import SidebarTwo from "../SidebarTwo";
import links from "../../contexts/utils/links";
import ComingSoon from "../ComingSoon";
import { useDetectOutsideClick } from "../UseDetectOutsideClick";

const SponsorshipMain = (props) => {
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
    <Layout pageTitle="MPA - Sponsorship">
      <HomepageNav open={open} setOpen={setOpen} page={"SponsorShip"} />
      <SidebarTwo
        open={open}
        setOpen={setOpen}
        links={links}
        active={"Home"}
        handleClick={handleClick}
      />
      {/* {hide == false && <ComingSoon closeClick={handleClick} />} */}
      {props.children}
      <Footer />
    </Layout>
  );
};

export default SponsorshipMain;
