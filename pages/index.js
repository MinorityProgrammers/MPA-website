import React, { useEffect, useRef, useState } from 'react';
import ComingSoon from '../components/ComingSoon';
import Footer from '../components/Footer';
import HomepageAbout from '../components/homepage/HomepageAbout';
import HomepageApp from '../components/homepage/HomepageApp';
import HomepageCore from '../components/homepage/HomepageCore';
import HomepageDonate from '../components/homepage/HomepageDonate';
import HomepageNav from '../components/homepage/HomepageNav';
import HomePageNewTopSection from '../components/homepage/HomePageNewTopSection';
import HomepageTeam from '../components/homepage/HomepageTeam';
import HomepageTestimonials from '../components/homepage/HomepageTestimonials';
import HomepageWave from '../components/homepage/HomepageWave';
import Layout from '../components/Layout';
import MpaBuilder from '../components/mpa-builder/builder';
import SidebarTwo from '../components/sidebar/SidebarTwo';
import { useDetectOutsideClick } from '../components/UseDetectOutsideClick';
import links from '../contexts/utils/links';

const HomepageFour = function () {
  const [open, setOpen] = useState(false);
  const [builder, setBuilder] = useState(true);
  const [mount, setMount] = useState(false);
  const [showWelcomeScreen, setScreen] = useState('false');

  useEffect(() => {
    const timerId = setTimeout(() => {
      setBuilder(false);
    }, 5000);
    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    setMount(true);
    setScreen(window.sessionStorage.showWelcomeScreen);
    window.sessionStorage.showWelcomeScreen = 'false';
  }, []);

  const dropdownRef = useRef(null);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, true);

  const handleClick = () => {
    setHide(!hide);
  };
  if (hide === false) {
    setTimeout(() => {
      setHide(true);
    }, 10000);
  }
  return (
    <Layout pageTitle="MPA | Home">
      {mount && (
        <div>
          {builder && showWelcomeScreen !== 'false' ? (
            <MpaBuilder />
          ) : (
            <>
              <HomepageNav open={open} setOpen={setOpen} page="Home" />
              <SidebarTwo
                open={open}
                setOpen={setOpen}
                links={links}
                active="Home"
                handleClick={handleClick}
              />
              {hide === false && <ComingSoon closeClick={handleClick} />}
              <HomePageNewTopSection />
              <HomepageAbout />
              <HomepageApp />
              <HomepageCore />
              <HomepageWave />
              <HomepageTeam />
              <HomepageTestimonials />
              <HomepageDonate />
              <Footer />
            </>
          )}
        </div>
      )}
    </Layout>
  );
};

export default HomepageFour;
