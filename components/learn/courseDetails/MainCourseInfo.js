import React from 'react';
import CourseWeeksList from './CourseWeeksList';
import UserBanner from './UserBanner';

const MainCourseInfo = ({
  courseId, userInfo, modules, userModules,
}) => {
  const beginnerModules = modules.filter(
    (module) => module.level === 'beginner',
  );
  const intermediateModules = modules.filter(
    (module) => module.level === 'intermediate',
  );
  const advancedModules = modules.filter(
    (module) => module.level === 'advanced',
  );

  const totalBeginnerLength = beginnerModules.length;
  const totalIntermediateLength = intermediateModules.length;
  const totalAdvancedLength = advancedModules.length;

  const specificUBeginnerModules = userModules.filter(
    (eModule) => beginnerModules.some((module) => eModule.moduleId._id === module._id),
  );
  const specificUIntermediateModules = userModules.filter(
    (eModule) => intermediateModules.some((module) => eModule.moduleId._id === module._id),
  );
  const specificUAdvancedModules = userModules.filter(
    (eModule) => advancedModules.some((module) => eModule.moduleId._id === module._id),
  );

  // Beginner level progress
  let beginnerCompletionRate = 0;
  specificUBeginnerModules.forEach((module) => {
    beginnerCompletionRate += module.completionRate;
  });
  const totalBeginnerPercentage = Math.round(
    beginnerCompletionRate / totalBeginnerLength,
  );

  // Intermediate level progress
  let intermediateCompletionRate = 0;
  specificUIntermediateModules.forEach((module) => {
    intermediateCompletionRate += module.completionRate;
  });
  const totalIntermediatePercentage = Math.round(
    intermediateCompletionRate / totalIntermediateLength,
  );

  // Advanced level progress
  let advancedCompletionRate = 0;
  specificUAdvancedModules.forEach((module) => {
    advancedCompletionRate += module.completionRate;
  });
  const totalAdvancedPercentage = Math.round(
    advancedCompletionRate / totalAdvancedLength,
  );

  // User progress
  const totalCompletionRate = beginnerCompletionRate
    + intermediateCompletionRate
    + advancedCompletionRate;
  const totalModulesLength = totalBeginnerLength + totalIntermediateLength + totalAdvancedLength;
  const userPercentages = Math.round(totalCompletionRate / totalModulesLength);

  return (
    <>
      <div className="modules-details">
        <div className="user-bannerBG">
          <UserBanner userInfo={userInfo} userPercentages={userPercentages} />
        </div>
        <div className="menu-items d-md-flex ml-5 pl-3">
          <ul>
            <li>
              <a className="course-item-active" style={{ fontWeight: 'bold' }}>
                Modules
              </a>
            </li>
          </ul>
        </div>

        <CourseWeeksList
          courseId={courseId}
          beginnerPercentage={totalBeginnerPercentage}
          intermediatePercentage={totalIntermediatePercentage}
          advancedPercentage={totalAdvancedPercentage}
          specificUBeginnerModules={specificUBeginnerModules}
          specificUIntermediateModules={specificUIntermediateModules}
          specificUAdvancedModules={specificUAdvancedModules}
          beginnerLength={totalBeginnerLength}
          intermediateLength={totalIntermediateLength}
          advancedLength={totalAdvancedLength}
        />
      </div>
    </>
  );
};

export default MainCourseInfo;
