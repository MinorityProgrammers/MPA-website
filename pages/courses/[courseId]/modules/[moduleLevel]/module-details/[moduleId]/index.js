import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ActivityDetails from '../../../../../../../components/learn/courseDetails/ActivityDetails';
import Layout from '../../../../../../../components/Layout';
import HomepageNav from '../../../../../../../components/homepage/HomepageNav';
import Footer from '../../../../../../../components/Footer';
import SkeletonElement from '../../../../../../../components/learn/SkeletonElement';

export async function getServerSideProps(context) {
  return {
    props: {
      params: context.params,
    },
  };
}

const ActivityPage = function ({ params }) {
  const { courseId, moduleId } = params;
  const [data, setData] = useState([]);
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
          `https://koinstreet-learn-api.herokuapp.com/api/v1/course/${courseId}/module`,
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
          `https://koinstreet-learn-api.herokuapp.com/api/v1/learn/${courseId}/userModules`,
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

  const singleUserModule = userModules?.filter(
    (userModule) => userModule.moduleId._id === moduleId,
  );
  const singleUserModuleInfo = singleUserModule[0];

  return (
    <Layout pageTitle="Module Details - Minority Programmers Association">
      {loading === true ? (
        <>
          <HomepageNav page="learn-page" setData={setData} />
          <SkeletonElement />
        </>
      ) : (
        <>
          <HomepageNav page="learn-page" setData={setData} />
          <ActivityDetails
            userInfo={data}
            enrolledCourses={enrolledCourses}
            modules={modules}
            singleUserModuleInfo={singleUserModuleInfo}
            userModules={userModules}
          />
          <Footer />
        </>
      )}
    </Layout>
  );
};

export default ActivityPage;
