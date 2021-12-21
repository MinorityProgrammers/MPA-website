import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ComingSoon from '../components/ComingSoon';
import LoginPage from '../components/Consultancy/helperFiles/LoginPage';
import FeaturedAdvice from '../components/featured/FeaturedAdvice';
import FeaturedMyStartup from '../components/featured/FeaturedMyStartup';
import FeaturedMyStartupSkeleton from '../components/featured/FeaturedMyStartupSkeleton';
import FeaturedStartups from '../components/featured/FeaturedStartups';
// Skeletons
import FeaturedStartupsSkeleton from '../components/featured/FeaturedStartupsSkeleton';
import FeaturedUpcoming from '../components/featured/FeaturedUpcoming';
import FeaturedUpcomingSkeleton from '../components/featured/FeaturedUpcomingSkeleton';
import Footer from '../components/Footer';
import HomepageNav from '../components/homepage/HomepageNav';
import IncubatorHero from '../components/IncubatorHero';
import Layout from '../components/Layout';
import SidebarTwo from '../components/sidebar/SidebarTwo';
import { useDetectOutsideClick } from '../components/UseDetectOutsideClick';
import links from '../contexts/utils/links';

const IncubatorPage = function () {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, false);
  const [token, setToken] = useState(null);
  const [userData, setData] = useState([]);
  const [clickRegister, setClickRegister] = useState(false);
  const [funded, setFunded] = useState([]);

  const handleClick = () => {
    setHide(!hide);
  };
  if (hide == false) {
    setTimeout(() => {
      setHide(true);
    }, 60000);
  }

  const allfunded = [];

  funded.map((all) => {
    allfunded.push(all.startup_id._id);
  });

  useEffect(() => {
    const token = window.localStorage.getItem('jwtToken');
    axios
      .get(`${process.env.BASE_URI}/startup/`)
      .then((res) => {
        setStartups(res.data.data);
      })
      .then((res) => {
        if (token) {
          return axios
            .get(`${process.env.BASE_URI}/funded/userFunded`, {
              headers: {
                Authorization: `Bearer ${token || ''}`,
              },
            })
            .then((response) => {
              setFunded(response.data.data);
              setTimeout(setLoading(false), 3000);
            });
        }
        setTimeout(setLoading(false), 3000);
      })
      .catch((err) => {
        console.log('error fetching startup data', err);
      });
  }, []);

  return (
    <Layout pageTitle="MPA - Incubator">
      <HomepageNav
        open={open}
        setOpen={setOpen}
        setToken={setToken}
        setData={setData}
        page="Incubator"
      />
      <SidebarTwo
        open={open}
        setOpen={setOpen}
        links={links}
        active="Home"
        handleClick={handleClick}
      />
      {hide == false && <ComingSoon closeClick={handleClick} />}
      <IncubatorHero />
      {loading ? (
        <section className="section__incubator">
          <FeaturedMyStartupSkeleton />
          <FeaturedStartupsSkeleton />
          <FeaturedAdvice />
          <FeaturedUpcomingSkeleton />
        </section>
      ) : (
        <section className="section__incubator">
          {/* Loading Skeleton for FeaturedMyStartup Here */}
          <FeaturedMyStartup
            data={funded}
            userData={userData}
            token={token}
            setClickRegister={setClickRegister}
          />
          {/* Loading Skeleton Here */}
          <FeaturedStartups
            data={startups}
            userData={userData}
            token={token}
            setClickRegister={setClickRegister}
            allfunded={allfunded}
          />
          {/* advice a startup */}
          <FeaturedAdvice />
          {/* Loading Skeleton Here */}
          <FeaturedUpcoming
            userData={userData}
            data={startups}
            setClickRegister={setClickRegister}
            allfunded={allfunded}
          />
        </section>
      )}
      <LoginPage
        clickRegister={clickRegister}
        setClickRegister={setClickRegister}
      />
      <Footer />
    </Layout>
  );
};
export default IncubatorPage;
