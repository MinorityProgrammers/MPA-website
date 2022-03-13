import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import axios from 'axios';
import HomepageNav from '../../components/homepage/HomepageNav';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';
import Intro from '../../components/chapter/chapter-intro/intro.component';
import ChapterToolkit from '../../components/chapter/chapter-toolkit-menu/chapterToolkit.component';
import ChapterSlider from '../../components/chapter/chapter-slider/ChapterSlider';
import ChapterMap from '../../components/chapter/chapter-map/chapterMap.component';
import SidebarTwo from '../../components/sidebar/SidebarTwo';
import links from '../../contexts/utils/links';
import Leaderboard from '../../components/chapter/chapter-leaderboard/leaderboard.component';
import ChapterWrapper from '../../components/chapter/chapter-wrapper/ChapterWrapper.component';
import useDetectOutsideClick from '../../components/UseDetectOutsideClick';
import { GlobalContext } from '../../contexts/provider';

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

const index = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [userData, setUserData] = useState([]);
  const [token, setToken] = useState(null);
  // map
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);

  const {
    authState: {
      auth: { data },
    },
  } = useContext(GlobalContext);

  useEffect(() => {
    const userToken = window.localStorage.getItem('jwtToken');
    const userInfo = window.localStorage.getItem('userInfo');

    if (userToken == null || userInfo === {}) {
      setUserData(null);
      setActive(false);
    } else {
      setUserData(Object.values(JSON.parse(userInfo))[1]);
      setActive(true);
    }
  }, [data]);

  useEffect(() => {
    axios
      .get(`${process.env.BASE_URI}/location`)
      .then((res) => res.data)
      .then((msg) => msg.data)
      .then((res) => {
        const newData = res.map((d) => ({
          ...d,
          date_founded: formatDate(d.date_founded),
        }));
        console.log(newData);
        setLocations(newData);
        setFilteredLocations(newData);
      })
      .catch((err) => console.error(err));
    const userToken = typeof window !== 'undefined'
      ? window.localStorage.getItem('jwtToken')
      : null;
    setToken(userToken);
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
    <Layout pageTitle="Chapter">
      <HomepageNav
        open={open}
        setOpen={setOpen}
        page="Chapter"
        setToken={setToken}
      />
      <SidebarTwo
        open={open}
        setOpen={setOpen}
        links={links}
        active="Home"
        handleClick={handleClick}
      />
      <ChapterWrapper>
        <Intro userData={userData} active={active} />

        <ChapterToolkit />

        <Leaderboard />

        <ChapterSlider token={token} locations={locations} />

        <ChapterMap filteredLocations={filteredLocations} locations={locations} token={token} />

        <Footer />
      </ChapterWrapper>
    </Layout>
  );
};

export default index;
