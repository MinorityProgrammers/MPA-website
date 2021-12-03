import Layout from "../components/Layout";
import NotFound from "../components/404";
import React, { useState, useRef } from "react";
import HomepageNav from "../components/HomepageNav";
import { useDetectOutsideClick } from "../components/UseDetectOutsideClick";
import Footer from "../components/Footer";
const NotFoundPage = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  let navBarRef = useRef();
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, true);

  if (hide == false) {
    setTimeout(() => {
      setHide(true);
    }, 10000);
  }

  return (
    <Layout pageTitle="MPA - Not Found">
      <div className="quickswap-wrapper tw-pt-28">
        <HomepageNav
          open={open}
          setOpen={setOpen}
          style={{
            background: `linear-gradient(
            104.61deg
            , #FF00B8 2.65%, #FF655B 51.83%, #FFC700 100%);`,
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
          }}
          navBarRef={navBarRef}
        />
        <NotFound navBarRef={navBarRef} />
      </div>
      <Footer />
    </Layout>
  );
};

export default NotFoundPage;
