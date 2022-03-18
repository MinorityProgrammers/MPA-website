import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
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

function formatDate(dateStr) {
  const MONTHS = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const month = MONTHS[d.getMonth()];
  const date = d.getDate();

  return `${month} ${date} ${year}`;
}
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
  const [token, setToken] = useState(null);
  const [location, setLocation] = useState({});

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
  useEffect(() => {
    const userToken = window.localStorage.getItem('jwtToken');
    setToken(userToken);
    console.log(id);
    if (id) {
      axios
        .get(`http://localhost:5000/api/v1/location/${id}`)
        .then((res) => {
          const d = res.data.data;
          const newData = {
            ...d,
            date_founded: formatDate(d.date_founded),
          };
          console.log(newData);
          setLocation(newData);
        })
        .catch((err) => console.error(err));
    }
  }, []);
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
          && <Overview location={location} token={token} />}
          { active.events
          && <Events />}
          { active.members
          && <Members location={location} token={token} />}
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
