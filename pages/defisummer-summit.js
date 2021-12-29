import React, { useState, useRef } from 'react';
import Layout from '../components/Layout';
import Defisummer from '../components/defisummer';
import HomepageNav from '../components/homepage/HomepageNav';
import { useDetectOutsideClick } from '../components/UseDetectOutsideClick';

import Footer from '../components/Footer';

const DefisummerHome = function () {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navBarRef = useRef();
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, true);

  if (hide === false) {
    setTimeout(() => {
      setHide(true);
    }, 10000);
  }

  return (
    <Layout pageTitle="MPA - Defisummer">
      <HomepageNav
        open={open}
        setOpen={setOpen}
        style={{
          background: 'var(--mpa-navy)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
        }}
        navBarRef={navBarRef}
      />
      <Defisummer navBarRef={navBarRef} />
      <Footer />
    </Layout>
  );
};

export default DefisummerHome;
