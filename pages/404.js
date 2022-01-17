import React, { useState, useRef } from 'react';
import Layout from '../components/Layout';
import NotFound from '../components/404';
import HomepageNav from '../components/homepage/HomepageNav';
import useDetectOutsideClick from '../components/UseDetectOutsideClick';
import Footer from '../components/Footer';

const NotFoundPage = function () {
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
    <Layout pageTitle="MPA - Not Found">
      <div className="quickswap-wrapper tw-pt-28">
        <HomepageNav
          open={open}
          setOpen={setOpen}
          navBarRef={navBarRef}
        />
        <NotFound navBarRef={navBarRef} />
      </div>
      <Footer />
    </Layout>
  );
};

export default NotFoundPage;
