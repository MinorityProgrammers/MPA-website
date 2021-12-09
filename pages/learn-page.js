import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import HomepageNav from '../components/homepage/HomepageNav';
import Footer from '../components/Footer';
import LearnBanner from '../components/learn/LearnBanner';
import CourseCategories from '../components/learn/CourseCategories';
import SidebarTwo from '../components/SidebarTwo';
import links from '../contexts/utils/links';
import ComingSoon from '../components/ComingSoon';
import { useDetectOutsideClick } from '../components/UseDetectOutsideClick';

const LearnPage = function () {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [hide, setHide] = useDetectOutsideClick(dropdownRef, false);
  const [data, setData] = useState([]);
  const [usersCourses, setUsersCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const handleClick = () => {
    setHide(!hide);
  };
  if (hide == false) {
    setTimeout(() => {
      setHide(true);
    }, 60000);
  }

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('userInfo'));
    if (userToken !== null) {
      axios
        .get(
          'https://koinstreet-learn-api.herokuapp.com/api/v1/learn/userCourses',
          {
            headers: {
              Authorization: `Bearer ${userToken.token}`,
            },
          },
        )
        .then((res) => {
          setEnrolledCourses(res.data.data);
        });
    }
  }, []);

  useEffect(() => {
    axios
      .get('https://koinstreet-learn-api.herokuapp.com/api/v1/learn/')
      .then((res) => {
        setUsersCourses(res.data.data);
      });
  }, []);

  return (
    <Layout pageTitle="Learn Page - Minority Programmers Association">
      <HomepageNav
        open={open}
        setOpen={setOpen}
        page="learn-page"
        setData={setData}
      />
      <SidebarTwo
        open={open}
        setOpen={setOpen}
        links={links}
        active="Home"
        handleClick={handleClick}
      />
      {hide == false && <ComingSoon closeClick={handleClick} />}
      <LearnBanner />
      <CourseCategories
        user={data}
        usersCourses={usersCourses}
        enrolledCourses={enrolledCourses}
      />
      <Footer />
    </Layout>
  );
};

export default LearnPage;
