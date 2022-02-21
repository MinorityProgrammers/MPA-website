import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const UserCoursesList = ({ enrolledCourse, userInfo }) => {
  const [modules, setModules] = useState([]);
  const [userModules, setUserModules] = useState([]);
  const {
    name, description, earn, _id, tags,
  } = enrolledCourse.courseId;

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('userInfo'))?.token;
    axios
      .get(`${process.env.BASE_URI}/course/${_id}/module`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        setModules(res.data.data);
      });
  }, [_id]);

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('userInfo')).token;
    axios
      .get(`${process.env.BASE_URI}/learn/${_id}/moduleById/${userInfo._id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        setUserModules(res.data.data);
      });
  }, [_id]);

  const totalUserModules = userModules.filter((eModule) => modules.some((module) => eModule.moduleId._id === module._id));
  const totalModulesLength = modules.length;

  // user progress
  let completionRate = 0;
  let completedModules = 0;
  totalUserModules.forEach((module) => {
    completionRate += module.completionRate;
    if (module.completed) {
      completedModules += 1;
    }
  });
  const userPercentages = Math.round(completionRate / totalModulesLength);

  return (
    <div className="courses-items px-3 mx-2 mb-4 pt-1 tw-shadow-lg">
      <div className="d-pb-1 ml-2 tw-mt-3 tw-flex tw-justify-between tw-items-center">
        <h3 className="course-name mb-0">{name}</h3>
        <span className="course-earn-style tw-font-semibold tw-text-base">
          <span className="mr-1"> Earn</span>
          {earn}
        </span>
      </div>
      <p className="course-des ml-2">{description}</p>
      <p className="tw-flex tw-flex-row tw-mt-2">
        {tags.map((tag) => (
          <p className="tw-mr-2 course-tag-style">{tag}</p>
        ))}
      </p>
      <div className="text-center  tw-flex tw-flex-row tw-items-center tw-justify-between tw-mt-4">
        {!Number.isNaN(userPercentages) && (
          <p
            className="text-center pb-1"
            style={{ fontSize: '18px', fontWeight: '600' }}
          >
            {userPercentages}
            % Completed
          </p>
        )}
        <Link href={`/courses/${_id}`}>
          <button type="button" className="btn px-3 banner-btn mt-3">
            Learn
            {' '}
            <span className="tw-ml-2"> &#8594;</span>
          </button>
        </Link>
      </div>

      <div>
        <div className="progress tw-mt-6">
          <div
            className="progress-bar"
            style={{ width: `${userPercentages}%` }}
            role="progressbar"
            aria-valuenow={userPercentages}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
      </div>
    </div>
  );
};

export default UserCoursesList;
