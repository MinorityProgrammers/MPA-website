import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import CourseSidebar from "./CourseSidebar";
import ActivityList from "./ActivityList";

const WeeklyActivities = ({ enrolledCourses, modules, userModules }) => {
  const [course, setCourse] = useState({});
  const router = useRouter();
  const { courseId, moduleLevel } = router.query;

  const singleCourse = enrolledCourses?.filter(
    (_course) => _course.courseId._id === courseId
  );
  useEffect(() => {
    singleCourse.forEach((_course) => {
      setCourse(_course.courseId);
    });
  }, [singleCourse]);

  const specificModules = modules.filter(
    (module) => module.level === moduleLevel
  );

  const totalModules = specificModules.length;
  const specificUserModules =
    userModules &&
    userModules.filter((eModule) =>
      specificModules.some((module) => eModule.moduleId._id === module._id)
    );

  let completedModules = 0;
  specificUserModules.forEach((module) => {
    if (module.completed) {
      completedModules += 1;
    }
  });

  let totalCompletionRate = 0;
  specificUserModules.forEach((module) => {
    totalCompletionRate += module.completionRate;
  });
  const totalPercentage = Math.round(totalCompletionRate / totalModules);

  const handleForwardLevelInfo = () => {
    if (moduleLevel === "beginner") {
      const forwardLevelInfo = router.asPath.replace(
        moduleLevel,
        "intermediate"
      );
      router.push(forwardLevelInfo);
    } else if (moduleLevel === "intermediate") {
      const forwardLevelInfo = router.asPath.replace(moduleLevel, "advanced");
      router.push(forwardLevelInfo);
    }
  };

  return (
    <div className="courses-details banner-bg">
      <div className="row week-row" style={{ backgroundColor: "#14152b" }}>
        <div className="col-12 course-sidebar-width col-md-3 pr-0 scroll-sidebar">
          <CourseSidebar
            course={course}
            courseId={courseId}
            modules={modules}
            userModules={userModules}
          />
        </div>
        <div className="col-12 week-sidebar-width tw-ml-4 col-md-7 pl-0">
          <div className="pt-10 week-width">
            <div className="module-menu-items tw-flex tw-flex-col tw-justify-center">
              <div className="activities-banner px-md-1 mb-2">
                <div className="pt-5 mx-2  ps-md-2 pb-2">
                  <div className="week-info">
                    <h1 className="mb-4 text-capitalize">Welcome, {}</h1>
                    <h5 style={{ fontWeight: "600" }}>Progress</h5>
                    <p className="text-center mt-4 pt-2 mb-0">
                      {completedModules}/{totalModules}
                    </p>
                    <div className="progress mt-2 mb-2">
                      <div
                        className="progress-bar"
                        style={{ width: `${totalPercentage}%` }}
                        role="progressbar"
                        aria-valuenow={totalPercentage}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                    <p className="text-center">
                      {!Number.isNaN(totalPercentage) && (
                        <span className="">{totalPercentage}% completed</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between mx-5 nextPrev-icons">
                {specificModules.length === specificUserModules.length &&
                specificUserModules.length !== 0 ? (
                  <>
                    {specificUserModules.length === completedModules && (
                      <>
                        {moduleLevel !== "advanced" && (
                          <button
                            type="button"
                            onClick={handleForwardLevelInfo}
                          >
                            <FontAwesomeIcon
                              icon={faArrowRight}
                              className="icon"
                            />
                          </button>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <button
                    type="button"
                    disabled
                    style={{ pointerEvents: "none" }}
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                )}
              </div>
              <div>
                {" "}
                <h1 className="tw-text-white tw-text-2xl tw-px-3 tw-font-semibold tw-py-4">
                  Resume Learning
                </h1>
              </div>
              {specificModules &&
                specificModules.map((module) => (
                  <ActivityList
                    module={module}
                    key={module._id}
                    userModules={userModules}
                    specificUModules={specificUserModules}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyActivities;
