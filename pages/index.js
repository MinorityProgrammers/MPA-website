import React, { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import HomepageNav from '../components/HomepageNav';
import Footer from '../components/Footer';
import HomePageNewTopSection from '../components/HomePageNewTopSection';
import HomepageAbout from '../components/HomepageAbout';
import HomepageApp from '../components/HomepageApp';
import HomepageCore from '../components/HomepageCore';
import HomepageWave from '../components/HomepageWave';
import HomepageTeam from '../components/HomepageTeam';
import HomepageTestimonials from '../components/HomepageTestimonials';
import HomepageDonate from '../components/HomepageDonate';
import SidebarTwo from '../components/SidebarTwo';
import links from '../contexts/utils/links';
import ComingSoon from '../components/ComingSoon';
import { useDetectOutsideClick } from '../components/UseDetectOutsideClick';
import MpaBuilder from '../components/mpa-builder/builder';

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
  if (hide == false) {
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
              {hide == false && <ComingSoon closeClick={handleClick} />}
              <HomePageNewTopSection />
              <HomepageAbout />
              {/* <HomepageBuyMinority /> */}
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
