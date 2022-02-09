import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const ActivityList = ({ module, userModules, specificUModules }) => {
  const [userModule, setUserModule] = useState([]);
  const { name, image, _id } = module;
  const router = useRouter();
  const { courseId, moduleLevel } = router.query;

  const specificUserModules = userModules.filter(
    (_module) => _module.moduleId._id === _id
  );
  useEffect(() => {
    specificUserModules.forEach((_module) => {
      setUserModule(_module);
    });
  }, [specificUserModules]);

  const userModulesId = [];
  specificUModules.forEach((_module) => {
    userModulesId.push(_module.moduleId._id);
  });

  const handleModuleInfo = () => {
    const moduleDetails = `/courses/${courseId}/modules/${moduleLevel}/module-details/${_id}`;

    if (userModulesId.includes(_id)) {
      router.push(moduleDetails);
    } else {
      const userToken = JSON.parse(localStorage.getItem("userInfo")).token;
      fetch(`${process.env.BASE_URI}/learn/${courseId}/module`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          moduleId: _id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setTimeout(() => {
              router.push(moduleDetails);
            }, 1000);
          }
        });
    }
  };

  return (
    <a onClick={handleModuleInfo} className="text-decoration-none">
      <div className="">
        <h1 className="tw-text-white tw-text-2xl">Resume Learning</h1>
        <div className="course-weeks px-5 mb-4 mx-2">
          <div className="row">
            <div className="col-md-4 mb-2" style={{ marginTop: "0.8rem" }}>
              <img src={image} className="img-fluid" alt="" />
            </div>
            <div className="col-md-5 d-flex align-items-center ml-3">
              <div className="d-pb-1">
                <h4
                  className="mt-3 mb-2 text-white"
                  style={{ fontSize: "1.5rem" }}
                >
                  {name}
                </h4>
              </div>
            </div>
            <div className="col-md-2">
              <div className="pt-3 pl-4 ml-4 activityStatus">
                {userModule.completionStatus === "uncompleted" ? (
                  <p className="red-status ml-auto">uncompleted</p>
                ) : userModule.completionStatus === "completed" ? (
                  <p className="green-status ml-auto">completed</p>
                ) : (
                  <p className="white-status ml-auto">start</p>
                )}
              </div>
            </div>
            <div className="col-md-1" />
          </div>
        </div>
      </div>
    </a>
  );
};

export default ActivityList;
