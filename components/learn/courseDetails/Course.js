import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import CourseSidebar from './CourseSidebar';
import MainCourseInfo from './MainCourseInfo';

const Course = function ({ userInfo, course, modules }) {
  const [userModules, setUserModules] = useState([]);
  const router = useRouter();
  const { courseId } = router.query;

  if (!courseId) {
    return null;
  }

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('userInfo')).token;
    axios.get(`${process.env.BASE_URI}/learn/${courseId}/userModules`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        setUserModules(res.data.data);
      });
  }, [courseId]);

  return (
    <div className="courses-details banner-bg">
      <div className="row" style={{ backgroundColor: '#151371' }}>
        <div className="col-12 col-md-3 pr-0 scroll-sidebar">
          <CourseSidebar course={course} courseId={courseId} modules={modules} userModules={userModules} />
        </div>
        <div className="col-12 col-md-9 pl-0">
          <MainCourseInfo courseId={courseId} userInfo={userInfo} modules={modules} userModules={userModules} />
        </div>
      </div>
    </div>
  );
};

export default Course;
