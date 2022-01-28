import React, { useEffect, useState, createContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { useRouter } from 'next/router';
import ReactPlayer from 'react-player';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import QuizModal from '../quizActivity/QuizModal';
import CourseSidebar from './CourseSidebar';
import 'react-circular-progressbar/dist/styles.css';

export const QuizContext = createContext();

const ActivityDetails = function ({
  userInfo, enrolledCourses, modules, singleUserModuleInfo, userModules,
}) {
  if (!singleUserModuleInfo) {
    return null;
  }

  const [course, setCourse] = useState({});
  const [watched, setWatched] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [disable, setDisable] = useState(false);
  const router = useRouter();
  const { courseId, moduleLevel, moduleId } = router.query;
  const {
    completionStatus, completionRate, completed, _id,
  } = singleUserModuleInfo;

  useEffect(() => {
    const singleCourse = enrolledCourses?.filter((course) => course.courseId._id === courseId);
    singleCourse.forEach((course) => {
      setCourse(course?.courseId);
    });
  }, [courseId]);

  const specificModules = modules.filter((module) => module.level == moduleLevel);
  for (let i = 0; i < specificModules.length; i++) {
    specificModules[i].elementKey = i;
  }

  const moduleInfo = specificModules.find((module) => module._id == moduleId);
  if (!moduleInfo) {
    return null;
  }

  const specificUserModules = userModules && userModules.filter((eModule) => specificModules.some((module) => eModule.moduleId._id === module._id));

  const userModulesId = [];
  specificUserModules.forEach((module) => {
    userModulesId.push(module.moduleId._id);
  });

  const onStart = () => {
    if (completionRate < 50) {
      const userToken = JSON.parse(localStorage.getItem('userInfo')).token;
      fetch(`${process.env.BASE_URI}/learn/${courseId}/${moduleId}/${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          completionRate: 50,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            // console.log(data);
          }
        });
    }
  };

  // For forward module functionality
  const nextElementKey = moduleInfo.elementKey + 1;
  const nextModuleDetails = specificModules?.find((module) => module.elementKey == nextElementKey);

  const forwardInfo = () => {
    const nextModuleId = nextModuleDetails._id;
    const nextModuleInfo = `/courses/${courseId}/modules/${moduleLevel}/module-details/${nextModuleId}`;

    if (userModulesId.includes(nextModuleId)) {
      router.push(nextModuleInfo);
    } else {
      const userToken = JSON.parse(localStorage.getItem('userInfo')).token;
      fetch(`${process.env.BASE_URI}/learn/${courseId}/module`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          moduleId: nextModuleId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            // console.log(data);
            setDisable(true);
            setTimeout(() => {
              window.location.href = nextModuleInfo;
            }, 1000);
          }
        });
    }
    setWatched(false);
    setIsOpen(false);
  };

  // quiz functionality
  const handleWatch = () => {
    setWatched(true);
    setIsOpen(true);
  };

  // for congrats button
  const advancedModules = modules.filter((module) => module.level == 'advanced');
  const lastAdvancedModules = advancedModules[advancedModules.length - 1];

  return (
    <div className="banner-bg activity-pad">
      <div className="row activity-styles" style={{ backgroundColor: '#474BFF' }}>
        <div className="col-12 col-md-3 pr-0 scroll-sidebar">
          <CourseSidebar course={course} courseId={courseId} modules={modules} userModules={userModules} />
        </div>
        <div className="col-12 col-md-9 pl-0">
          <div className="banner-bg">
            <div className="player-wrapper">
              <ReactPlayer
                url={moduleInfo.url}
                width="100%"
                style={{ height: '420px' }}
                controls
                onStart={onStart}
                onEnded={handleWatch}
              />
              {watched && isOpen
                                    && (
                                    <>
                                      {completed !== true && (
                                      <QuizContext.Provider
                                        value={{
                                          isOpen,
                                          setIsOpen,
                                          setWatched,
                                          singleUserModuleInfo,
                                          forwardInfo,
                                          course,
                                          lastAdvancedModules,
                                        }}
                                      >
                                        <QuizModal />
                                      </QuizContext.Provider>
                                      )}
                                    </>
                                    )}
            </div>
          </div>

          <div className="pt-4">
            <div className="menu-items">
              <div className="d-flex justify-content-between mx-5 nextPrev-icons">
                <button onClick={() => router.back()}>
                  <FontAwesomeIcon icon={faArrowLeft} className="icon" />
                </button>
                {moduleInfo.elementKey !== specificModules.length - 1
                                        && (
                                        <>
                                          {completed === false
                                            ? (
                                              <button disabled style={{ pointerEvents: 'none' }}>
                                                <FontAwesomeIcon icon={faArrowRight} />
                                              </button>
                                            )
                                            : (
                                              <button disabled={disable} data-toggle="modal" data-target="#exampleModal">
                                                <FontAwesomeIcon icon={faArrowRight} className="icon" />
                                              </button>
                                            )}
                                        </>
                                        )}
              </div>

              <div className="px-md-5 mx-md-5 tw-py-5">
                <div className="course-weeks px-3 mb-4 mx-2 activityDetails">
                  <div className="pt-3"><p className={completionStatus === 'completed' ? 'green-activityStatus ml-auto' : 'red-activityStatus ml-auto'}><span>{completionStatus}</span></p></div>
                  <div className="ml-4 text-white activity-details">
                    <div className="d-pb-1">
                      <h3 className="mt-3 mb-2 tw-text-white">{moduleInfo.name}</h3>
                    </div>
                    <div className="duration mt-3">
                      <span><FontAwesomeIcon icon={faClock} /></span>
                      <span className="ml-2">{moduleInfo.duration}</span>
                    </div>
                    <div className="mt-5">
                      <h4 className="pb-2 tw-text-white">Header</h4>
                      <p>{moduleInfo.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade opacity-modal" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog activity-modal" role="document">
            <div className="modal-content">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h5 className="mt-4 pb-3" id="exampleModalLabel" style={{ fontSize: '25px', fontWeight: '600' }}>Module Completed!</h5>
                <div style={{ width: 230, height: 230 }}>
                  <CircularProgressbarWithChildren
                    value={completionRate}
                    strokeWidth={4}
                    styles={buildStyles({
                      pathColor: '#ffc700',
                      trailColor: '#B9BCC1',
                      strokeLinecap: 'butt',
                      rotation: 0.25,
                      transition: 'stroke-dashoffset 0.5s ease 0s',
                    })}
                  >
                    {userInfo != null && userInfo.profilePicture
                      ? <img src={userInfo.profilePicture} className="img-fluid progress-circle" alt="user-image" />
                      : <img src="/assets/images/profile.png" className="img-fluid progress-circle" alt="user-image" />}
                  </CircularProgressbarWithChildren>
                  ;
                </div>
                <p className="mt-3 mb-4 pb-1" style={{ fontWeight: '500' }}>
                  <span className="">
                    {completionRate}
                    % Completed
                  </span>
                </p>
                <h6 className="pb-2" style={{ fontSize: '18px', fontWeight: '500' }}>You just completed</h6>
                <h5 style={{ fontSize: '1.25rem', fontWeight: '700' }}>{moduleInfo.name}</h5>
                <button onClick={forwardInfo} data-dismiss="modal" aria-label="Close" className="btn px-5 py-3 banner-btn mt-4 pt-2 font-weight-bold mb-2" style={{ fontSize: '22px' }}>
                  Go to Next Lesson
                </button>
                <p className="pb-4 pt-2" data-dismiss="modal" aria-label="Close" style={{ cursor: 'pointer' }}>Cancel</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ActivityDetails;