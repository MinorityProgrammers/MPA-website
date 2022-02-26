import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const Course = ({ course, userData, token }) => {
  const [userModules, setUserModules] = useState([]);
  const [modules, setModules] = useState([]);
  useEffect(() => {
    if (course) {
      axios
        .get(`${process.env.BASE_URI}/course/${course.courseId._id}/module`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setModules(res.data.data);
        });
      axios
        .get(`${process.env.BASE_URI}/learn/${course.courseId._id}/moduleById/${userData._id}`)
        .then((res) => {
          const resModules = res.data.data;
          setUserModules(resModules);
        });
    }
  }, []);
  const totalUserModules = userModules.filter(
    (eModule) => modules.some((module) => eModule.moduleId._id === module._id),
  );
  const totalModulesLength = modules.length;

  // user progress
  let completionRate = 0;
  totalUserModules.forEach((module) => {
    completionRate += module.completionRate;
  });
  const userPercentages = Math.round(completionRate / totalModulesLength);
  return (
    <div
      key={course?.createdAt}
      className="overview-course-card d-flex flex-row justify-content-between"
    >
      {/* First and Second */}
      <div className="d-flex flex-row" style={{ width: '40%' }}>
        {/* First Column - logo */}
        <div
          className="overview-career-card-image d-flex justify-content-center align-items-center"
          style={{ paddingRight: '10px', width: '30%' }}
        >
          <img alt="company's logo" src={course?.courseId.image} />
        </div>
        {/* Second Column - Title + Description */}
        <div
          className="overview-course-card-info d-flex flex-column"
          style={{ width: '70%' }}
        >
          <p className="overview-course-card-info-title">
            {course?.courseId?.name}
          </p>
          <p className="overview-course-card-description">
            {course?.courseId?.description}
          </p>
        </div>
      </div>
      {/* Third Column */}
      <div
        className="d-flex flex-column justify-content-center"
        style={{ width: '20%', marginRight: '2%' }}
      >
        <p
          style={{
            fontSize: '12px',
            color: 'white',
            textAlign: 'center',
          }}
        >
          {userPercentages}
          % Completed
          {' '}
        </p>
        <div className="overview-wrapper">
          <div className="overview-barContainer">
            <div className="overview-filler" style={{ width: `${userPercentages}%` }} />
          </div>
        </div>
      </div>
      {/* Fourth and Fifth Column */}
      <div className="d-flex flex-row" style={{ width: '40%' }}>
        {/* Fourth Column */}
        <div
          className="overview-course-currency d-flex justify-content-center flex-column align-items-center"
          style={{ marginRight: '2%' }}
        >
          <p style={{ fontSize: '12px' }}>$MINORITY Earned</p>
          <p style={{ fontSize: '16px', fontWeight: '700' }}>
            $
            {parseInt(course.completionRate, 10) !== 100
              ? 0
              : course?.courseId?.earn}
          </p>
        </div>

        <Link href={`/courses/${course.courseId._id}`}>
          <a
            className="button-more view-course"
          >
            View Course
          </a>
        </Link>

      </div>
    </div>
  );
};

export default Course;
