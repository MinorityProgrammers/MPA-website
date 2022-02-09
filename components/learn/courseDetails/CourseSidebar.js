import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import BeginnerModules from "./courseSidebarItems/BeginnerModules";
import IntermediateModules from "./courseSidebarItems/IntermediateModules";
import AdvancedModules from "./courseSidebarItems/AdvancedModules";

const CourseSidebar = ({ course, modules, courseId, userModules }) => {
  const router = useRouter();

  const beginnerModules = modules.filter(
    (module) => module.level === "beginner"
  );
  const intermediateModules = modules.filter(
    (module) => module.level === "intermediate"
  );
  const advancedModules = modules.filter(
    (module) => module.level === "advanced"
  );

  return (
    <div className="course-sidebar pt-5">
      <div className="ml-md-4 back-course mb-3">
        <div onClick={() => router.push("/learn")}>
          <FontAwesomeIcon icon={faChevronLeft} />
          <span className="ml-2">Courses</span>
        </div>
      </div>

      <div className="weeks-info px-md-5">
        <h5>{course.name}</h5>
        <div className="mt-4 pt-3">
          <h5 className="mb-3 week-name text-capitalize">Beginner Level</h5>
          {beginnerModules &&
            beginnerModules.map((module) => (
              <BeginnerModules
                module={module}
                key={module._id}
                courseId={courseId}
                userModules={userModules}
              />
            ))}
        </div>

        <div className="mt-4 pt-3">
          <h5 className="mb-3 week-name text-capitalize">Intermediate Level</h5>
          {intermediateModules &&
            intermediateModules.map((module) => (
              <IntermediateModules
                module={module}
                key={module._id}
                courseId={courseId}
                userModules={userModules}
              />
            ))}
        </div>

        <div className="mt-4 pt-3">
          <h5 className="mb-3 week-name text-capitalize">Advanced Level</h5>
          {advancedModules &&
            advancedModules.map((module) => (
              <AdvancedModules
                module={module}
                key={module._id}
                courseId={courseId}
                userModules={userModules}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CourseSidebar;
