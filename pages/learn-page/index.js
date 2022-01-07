import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import HomepageNav from '../../components/homepage/HomepageNav';
import Footer from '../../components/Footer';
import CourseCategories from '../../components/learn/CourseCategories';
import SidebarTwo from '../../components/sidebar/SidebarTwo';
import links from '../../contexts/utils/links';
<<<<<<< HEAD
import ComingSoon from '../../components/ComingSoon';
import LearnHero from '../../components/learn/learnHero'
=======
import LearnHero from '../../components/learn/LearnHero';
>>>>>>> fbc5b618e8cceb01e3722acf7655973c4a28b5e2
import { useDetectOutsideClick } from '../../components/UseDetectOutsideClick';

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
  }, []);

  useEffect(() => {
    axios.get(`${process.env.BASE_URI}/learn/`).then((res) => {
      setUsersCourses(res.data.data);
    });
  }, [typeof window !== 'undefined'
    ? window.localStorage.getItem('jwtToken')
    : null]);

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
<<<<<<< HEAD
      {hide === false && <ComingSoon closeClick={handleClick} />}
      <div >
        <LearnHero/>
=======
      <div className="tw-pt-20">
        <LearnHero />
>>>>>>> fbc5b618e8cceb01e3722acf7655973c4a28b5e2
        <CourseCategories
          user={data}
          usersCourses={usersCourses}
          enrolledCourses={enrolledCourses}
        />
      </div>
      <Footer />
    </Layout>
  );
};

export default LearnPage;
