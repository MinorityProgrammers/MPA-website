import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import HomepageNav from '../../components/homepage/HomepageNav';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';
import Intro from '../../components/chapter/chapter-intro/intro.component';
import ChapterToolkit from '../../components/chapter/chapter-toolkit-menu/chapterToolkit.component';
import ChapterMap from '../../components/chapter/chapter-map/chapterMap.component';
import SidebarTwo from '../../components/sidebar/SidebarTwo';
import links from '../../contexts/utils/links';
import Leaderboard from '../../components/chapter/chapter-leaderboard/leaderboard.component';
import ChapterWrapper from '../../components/chapter/chapter-wrapper/ChapterWrapper.component';
import { useDetectOutsideClick } from '../../components/UseDetectOutsideClick';
import { GlobalContext } from '../../contexts/provider';

const index = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [userData, setUserData] = useState([]);
  const [token, setToken] = useState(null);

  const {
    authDispatch,
    authState: {
      auth: { loading, error, data },
    },
  } = useContext(GlobalContext);

  useEffect(() => {
    const token = window.localStorage.getItem('jwtToken');
    const userInfo = window.localStorage.getItem('userInfo');

    if (token == null || userInfo === {}) {
      setUserData(null);
      setActive(false);
    } else {
      setUserData(Object.values(JSON.parse(userInfo))[1]);
      setActive(true);
    }
  }, [data]);

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

        <ChapterMap token={token} />

        <Footer />
      </ChapterWrapper>
    </Layout>
  );
};

export default index;
