import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import CourseSidebar from './CourseSidebar';
import ActivityList from './ActivityList';

const WeeklyActivities = function ({ enrolledCourses, modules, userModules }) {
  const [course, setCourse] = useState({});
  const router = useRouter();
  const { courseId, moduleLevel } = router.query;

  const singleCourse = enrolledCourses?.filter((course) => course.courseId._id === courseId);
  useEffect(() => {
    singleCourse.forEach((course) => {
      setCourse(course.courseId);
    });
  }, [singleCourse]);

  const specificModules = modules.filter((module) => module.level == moduleLevel);

  // progress
  const totalModules = specificModules.length;
  const specificUserModules = userModules && userModules.filter((eModule) => specificModules.some((module) => eModule.moduleId._id === module._id));

  let completedModules = 0;
  specificUserModules.map((module) => {
    if (module.completed) {
      completedModules++;
    }
  });

  let totalCompletionRate = 0;
  specificUserModules.forEach((module) => {
    totalCompletionRate += module.completionRate;
  });
  const totalPercentage = Math.round(totalCompletionRate / totalModules);

  // Forward button functionality
  const handleForwardLevelInfo = () => {
    if (moduleLevel === 'beginner') {
      const forwardLevelInfo = router.asPath.replace(moduleLevel, 'intermediate');
      router.push(forwardLevelInfo);
    } else if (moduleLevel === 'intermediate') {
      const forwardLevelInfo = router.asPath.replace(moduleLevel, 'advanced');
      router.push(forwardLevelInfo);
    }
  };

  return (
    <div className="courses-details banner-bg">
      <div className="row" style={{ backgroundColor: '#151371' }}>
        <div className="col-12 col-md-3 pr-0 scroll-sidebar">
          <CourseSidebar course={course} courseId={courseId} modules={modules} userModules={userModules} />
        </div>
        <div className="col-12 col-md-9 pl-0">
          <div className="activities-banner">
            <div className="pt-5 mx-5 pe-5 ps-md-5 pb-5">
              <div className="week-info mx-5 px-4">
                <h1 className="mb-4 text-capitalize">
                    {moduleLevel}
                    {' '}
                    level
</h1>
                <h5 style={{ fontWeight: '600' }}>Progress</h5>
                <p className="text-center mt-4 pt-2 mb-0">
                    {completedModules}
                    /
{totalModules}
                  </p>
                <div className="progress mt-2 mb-2">
                    <div className="progress-bar" style={{ width: `${totalPercentage}%` }} role="progressbar" aria-valuenow={totalPercentage} aria-valuemin="0" aria-valuemax="100" />
                  </div>
                <p className="text-center">
                    {!isNaN(totalPercentage)
                                        && (
                                        <span className="">
                                          {totalPercentage}
                                          % completed
                                        </span>
                                        )}
                  </p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <div className="menu-items">
              <div className="d-flex justify-content-between mx-5 nextPrev-icons">
                <button onClick={() => router.back()} className="icon">
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                {specificModules.length === specificUserModules.length && specificUserModules.length !== 0
                    ? (
                        <>
                            {specificUserModules.length === completedModules
                                            && (
                                            <>
                                              {moduleLevel !== 'advanced' && (
                                              <button onClick={handleForwardLevelInfo}>
                                                <FontAwesomeIcon icon={faArrowRight} className="icon" />
                                              </button>
                                              )}
                                            </>
                                            )}
                          </>
                    )
                    : (
                        <button disabled style={{ pointerEvents: 'none' }}>
                            <FontAwesomeIcon icon={faArrowRight} />
                          </button>
                    )}
              </div>
              {
                                specificModules && specificModules.map((module) => <ActivityList module={module} key={module._id} userModules={userModules} specificUModules={specificUserModules} />)
                            }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyActivities;
