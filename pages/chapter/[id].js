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

const DropdownIndicator = () => (
  <img
    style={{ maxWidth: '25px', marginRight: '10px' }}
    src="/assets/images/settings/arrow-down.svg"
    alt="link"
  />
);

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: 'white',
    border: state.isSelected ? '2px solid #6938EF' : state.isFocused ? '2px solid #6938EF' : '2px solid transparent',
    background: '#1C1D37',
    borderRadius: '8px',
    padding: 20,
    marginTop: 8,
    width: '100%',
    cursor: 'pointer',
    fontWeight: 'bold',
    ':active': {
      // ...styles[':active'],
      background: '#1C1D37',
    },
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    // width: ,
    display: 'flex',
    height: '100%',
  }),
  menu: (provided) => ({
    ...provided,
    // borderBottom: '1px dotted pink',
    background: '#1C1D37',
    padding: 5,
    border: '1px solid #6938EF',
    width: '100px',
    textAlign: 'center',
    marginLeft: '-30px',
  }),
  container: (provided, state) => ({
    ...provided,
    height: '45px',
    margin: '0 !important',
    cursor: 'pointer',
    paddingLeft: '8px',
    border: `1px solid ${state.isFocused ? '#6938EF' : ''}`,
    borderRadius: '120px',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'white',
  }),
  multiValue: (provided) => ({
    ...provided,
    border: '1px solid #6938EF',
    borderRadius: '100px',
    background: 'transparent',
    padding: '5px',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'white',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),
  singleValue: (provided) => {
    const opacity = 1;
    const color = '#fff';
    const transition = 'opacity 300ms';

    return {
      ...provided, opacity, transition, color,
    };
  },
};
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
  const [data, setData] = useState({});
  const [update, setUpdate] = useState(false);

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
    if (id) {
      axios
        .get(`http://localhost:5000/api/v1/location/${id}`)
        .then((res) => {
          const d = res.data.data;
          const newData = {
            ...d,
            date_founded: formatDate(d.date_founded),
          };
          setLocation(newData);
        })
        .catch((err) => console.error(err));
    }
  }, [update]);
  useEffect(() => {
    if (!data) {
      router.push('/');
    }
  }, [data]);
  return (
    <Layout pageTitle="Chapter - MPA">
      <HomepageNav
        open={open}
        setOpen={setOpen}
        page="Chapter"
        setData={setData}
      />
      <SidebarTwo
        open={open}
        setOpen={setOpen}
        links={links}
        active="Home"
        handleClick={handleClick}
      />
      {hide === false && <ComingSoon closeClick={handleClick} />}
      <HeroSection
        DropdownIndicator={DropdownIndicator}
        data={data}
        customStyles={customStyles}
        location={location}
        update={update}
        setUpdate={setUpdate}
        token={token}
      />
      <Tabs active={active} setActive={setActive} />
      <section className={styles.detailsSection}>
        <div className={`container ${styles.bodyContainer}`}>
          { active.overview
          && <Overview location={location} token={token} />}
          { active.events
          && <Events token={token} />}
          { active.members
          && <Members data={data} location={location} token={token} />}
          { active.resources
          && <Resources />}
          { active.governance
          && <Governance DropdownIndicator={DropdownIndicator} customStyles={customStyles} />}
        </div>
      </section>
      <Footer />
    </Layout>
  );
};

export default Index;
