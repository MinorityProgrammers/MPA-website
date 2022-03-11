import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import ComingSoon from '../../components/ComingSoon';
import Footer from '../../components/Footer';
import HomepageNav from '../../components/homepage/HomepageNav';
import Layout from '../../components/Layout';
import useDetectOutsideClick from '../../components/UseDetectOutsideClick';
import SidebarTwo from '../../components/sidebar/SidebarTwo';
import links from '../../contexts/utils/links';
import HeroSection from '../../components/chapter/view/HeroSection';
import Tabs from '../../components/chapter/view/Tabs';
import Overview from '../../components/chapter/view/Overview';
import Events from '../../components/chapter/view/Events';
import Members from '../../components/chapter/view/Members';
import Resources from '../../components/chapter/view/Resources';
import Governance from '../../components/chapter/view/Governance';
import styles from '../../components/chapter/view/chapter.module.scss';

const Index = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [active, setActive] = useState({
    overview: true,
    events: false,
    governance: false,
    members: false,
    resources: false,
  });
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, false);

  const router = useRouter();
  const { id } = router.query;

  const handleClick = () => {
    setHide(!hide);
  };

  if (hide === false) {
    setTimeout(() => {
      setHide(true);
    }, 60000);
  }

  return (
    <Layout pageTitle="Chapter - MPA">
      <HomepageNav open={open} setOpen={setOpen} page="Chapter-toolkit" />
      <SidebarTwo
        open={open}
        setOpen={setOpen}
        links={links}
        active="Home"
        handleClick={handleClick}
      />
      {hide === false && <ComingSoon closeClick={handleClick} />}
      <HeroSection />
      <Tabs active={active} setActive={setActive} />
      <section>
        <div className={`container ${styles.bodyContainer}`}>
          { active.overview
          && <Overview />}
          { active.events
          && <Events />}
          { active.members
          && <Members />}
          { active.resources
          && <Resources />}
          { active.governance
          && <Governance />}
        </div>
      </section>
      <Footer />
    </Layout>
  );
};

export default Index;
