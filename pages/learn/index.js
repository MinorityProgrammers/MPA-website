import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import HomepageNav from '../../components/homepage/HomepageNav';
import Footer from '../../components/Footer';
import CourseCategories from '../../components/learn/CourseCategories';
import SidebarTwo from '../../components/sidebar/SidebarTwo';
import links from '../../contexts/utils/links';
import LearnHero from '../../components/learn/LearnHero';
import LearnHeroTabs from '../../components/learn/LearnHeroTabs';
import useDetectOutsideClick from '../../components/UseDetectOutsideClick';

const LearnPage = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, false);
  const [data, setData] = useState([]);
  const [usersCourses, setUsersCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [tabsActive, setTabsActive] = useState(
    { courses: true, userCourses: false, certificates: false },
  );

  const handleClick = () => {
    setHide(!hide);
  };
  if (hide === false) {
    setTimeout(() => {
      setHide(true);
    }, 60000);
  }

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('userInfo'));
    if (userToken !== null) {
      axios
        .get(`${process.env.BASE_URI}/learn/userCourses`, {
          headers: {
            Authorization: `Bearer ${userToken.token}`,
          },
        })
        .then((res) => {
          setEnrolledCourses(res.data.data);
        });
    }
  }, [
    typeof window !== 'undefined'
      ? window.localStorage.getItem('jwtToken')
      : null,
  ]);

  useEffect(() => {
    axios.get(`${process.env.BASE_URI}/learn/`).then((res) => {
      setUsersCourses(res.data.data);
    });
  }, [
    typeof window !== 'undefined'
      ? window.localStorage.getItem('jwtToken')
      : null,
  ]);

  return (
    <Layout pageTitle="MPA - Learn">
      <HomepageNav
        open={open}
        setOpen={setOpen}
        page="learn"
        setData={setData}
      />
      <SidebarTwo
        open={open}
        setOpen={setOpen}
        links={links}
        tabsActive="Home"
        handleClick={handleClick}
      />
      <div>
        {!data && <LearnHero />}
        {data && <LearnHeroTabs tabsActive={tabsActive} setTabsActive={setTabsActive} />}

        <CourseCategories
          user={data}
          usersCourses={usersCourses}
          enrolledCourses={enrolledCourses}
          tabsActive={tabsActive}
          setTabsActive={setTabsActive}
        />
      </div>
      <Footer />
    </Layout>
  );
};

export default LearnPage;
