import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeeklyActivities from '../../../../../components/learn/courseDetails/WeeklyActivities';
import Layout from '../../../../../components/Layout';
import HomepageNav from '../../../../../components/homepage/HomepageNav';
import Footer from '../../../../../components/Footer';
import SkeletonElement from '../../../../../components/learn/SkeletonElement';

export async function getServerSideProps(context) {
  return {
    props: {
      params: context.params,
    },
  };
}

const WeekPage = function ({ params }) {
  const { courseId } = params;
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [userModules, setUserModules] = useState([]);
  const [loading, setLoading] = useState(true);

  const redirect = () => {
    window.location.href = '/learn-page';
  };

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const userInfo = localStorage.getItem('userInfo');

    if (token === null || userInfo === {}) {
      redirect();
    }
    if (modules.length == 0) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('userInfo'));
    if (userToken != null) {
      axios
        .get(
          `${process.env.BASE_URI}/learn/userCourses`,
          {
            headers: {
              Authorization: `Bearer ${userToken.token}`,
            },
          },
        )
        .then((res) => {
          if (res.data.data.length > 0) {
            setEnrolledCourses(res.data.data);
          } else {
            redirect();
          }
        });
    }
  }, []);

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('userInfo'));
    if (userToken !== null) {
      axios
        .get(
          `${process.env.BASE_URI}/course/${courseId}/module`,
          {
            headers: {
              Authorization: `Bearer ${userToken.token}`,
            },
          },
        )
        .then((res) => {
          setModules(res.data.data);
        });
    }
  }, [courseId]);

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('userInfo'));
    if (userToken !== null) {
      axios
        .get(
          `${process.env.BASE_URI}/learn/${courseId}/userModules`,
          {
            headers: {
              Authorization: `Bearer ${userToken.token}`,
            },
          },
        )
        .then((res) => {
          setUserModules(res.data.data);
        });
    }
  }, [courseId]);

  return (
    <Layout pageTitle="Modules - Minority Programmers Association">
      {loading === true ? (
        <>
          <HomepageNav />
          <SkeletonElement />
        </>
      ) : (
        <>
          <HomepageNav />
          <WeeklyActivities
            enrolledCourses={enrolledCourses}
            modules={modules}
            userModules={userModules}
          />
          <Footer />
        </>
      )}
    </Layout>
  );
};

export default WeekPage;
