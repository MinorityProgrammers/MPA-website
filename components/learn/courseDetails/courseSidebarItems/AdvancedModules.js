import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

const AdvancedModules = function ({ module, courseId, userModules }) {
  const [userModule, setUserModule] = useState([]);
  const router = useRouter();
  const { name, level, _id } = module;

  const specificUserModules = userModules.filter((module) => module.moduleId._id == _id);
  useEffect(() => {
    specificUserModules?.forEach((module) => {
      setUserModule(module);
    });
  }, [specificUserModules]);

  const handleModuleInfo = (e) => {
    const moduleDetails = `/courses/${e.target.attributes.course_id.value}/modules/${e.target.attributes.module_level.value}/module-details/${e.target.attributes.module_id.value}`;
    router.push(moduleDetails);
  };

  return (
    <div>
      <div className="mb-2">
        {userModule.completed
          ? <span className="green-check mr-2"><FontAwesomeIcon icon={faCheck} /></span>
          : <span className="white-check mr-2"><FontAwesomeIcon icon={faCheck} /></span>}
        {userModule.completed
          ? (
            <a
              className="mb-2 text-decoration-none text-white sidebar-weeks completedItem"
              course_id={courseId}
              module_level={level}
              module_id={_id}
              onClick={handleModuleInfo}
            >
              {name}
            </a>
          )
          : (
            <a className="mb-2 text-decoration-none text-white sidebar-weeks">
              {name}
            </a>
          )}
      </div>
    </div>
  );
};

export default AdvancedModules;
