/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect, useState, createContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { useRouter } from 'next/router';
import ReactPlayer from 'react-player';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import QuizModal from '../quizActivity/QuizModal';
import CourseSidebar from './CourseSidebar';
import 'react-circular-progressbar/dist/styles.css';

export const QuizContext = createContext();

const ActivityDetails = ({
  userInfo,
  enrolledCourses,
  modules,
  singleUserModuleInfo,
  userModules,
}) => {
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
    const singleCourse = enrolledCourses?.filter(
      (_course) => _course.courseId._id === courseId,
    );
    singleCourse.forEach((_course) => {
      setCourse(_course?.courseId);
    });
  }, [courseId]);

  const specificModules = modules.filter(
    (module) => module.level === moduleLevel,
  );
  for (let i = 0; i < specificModules.length; i += 1) {
    specificModules[i].elementKey = i;
  }

  const moduleInfo = specificModules.find((module) => module._id === moduleId);
  if (!moduleInfo) {
    return null;
  }

  const specificUserModules = userModules
    && userModules.filter((eModule) => specificModules.some((module) => eModule.moduleId._id === module._id));

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
        .then((res) => res.json());
    }
  };
  // if this is the last lesson in this level, advance to next level
  const modLength = specificModules.length;
  const nextElementKey = moduleInfo.elementKey + 1 >= modLength ? moduleInfo.elementKey : moduleInfo.elementKey + 1; // if it is last lesson skip.
  const nextModuleDetails = specificModules?.find(
    (module) => module.elementKey === nextElementKey,
  );

  const forwardInfo = () => {
    const nextModuleId = nextModuleDetails._id;
    let modLevel = '';
    let nextModuleInfo = '';
    if (moduleInfo.elementKey + 1 === modLength) {
      modLevel = moduleLevel === 'beginner' ? 'intermediate' : 'advanced';
      nextModuleInfo = `/courses/${courseId}/modules/${modLevel}/`;
    } else {
      nextModuleInfo = `/courses/${courseId}/modules/${moduleLevel}/module-details/${nextModuleId}`;
    }

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

  const handleWatch = () => {
    setWatched(true);
    setIsOpen(true);
  };

  const advancedModules = modules.filter(
    (module) => module.level === 'advanced',
  );
  const lastAdvancedModules = advancedModules[advancedModules.length - 1];

  return (
    <div
      className={watched
        ? 'banner-bg activity-pad blur-background'
        : 'banner-bg activity-pad'}
    >
      <div
        className="activity-styles d-flex flex-column justify-content-start align-items-center w-100"
        style={{ backgroundColor: '#1C1D37' }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center mb-4 mt-4" style={{ width: '80%' }}>
          <div className="d-flex flew-row mb-2 align-items-center justify-content-start" style={{ height: '48px', textAlign: 'center', width: '100%' }}>
            <button className="ml-3 mr-3" type="button" onClick={() => router.back()}>
              {/* return button */}
              <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '40px', color: 'white' }} className="icon" />
            </button>
            <h3 className="tw-text-white text-center" style={{ fontSize: '28px', lineHeight: '48px', weight: '600' }}>
              {moduleInfo.name}
            </h3>

          </div>
          {/* youtube player */}
          <div
            className="banner-bg d-flex justify-content-center"
            style={{ borderRadius: '30px', width: '100%', height: '100%' }}>
            <div className="player-wrapper" style={{ width: '95%', height: '100%' }}>
              <div style={{ pointerEvents: (watched && isOpen) && 'none' }}>
                <ReactPlayer
                  url={moduleInfo.url}
                  controls
                  width="100%"
                  height="700px"
                  style={{ height: '100%', maxWidth: '100%', overflowX: 'hidden' }}
                  onStart={onStart}
                  onEnded={handleWatch}
                />
              </div>
              {watched && isOpen && (
                <div>
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
                </div>
              )}
            </div>
          </div>

          <div className="pt-4">
            <div className="menu-items">
              <div className="d-flex justify-content-between mx-5 nextPrev-icons">

                {moduleInfo.elementKey !== specificModules.length - 1 && (
                  <>
                    {completed === false ? (
                      <button
                        type="button"
                        disabled
                        style={{ pointerEvents: 'none' }}
                      >
                        <FontAwesomeIcon icon={faArrowRight} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={disable}
                        data-toggle="modal"
                        data-target="#exampleModal"
                      >
                        <FontAwesomeIcon icon={faArrowRight} className="icon" />
                      </button>
                    )}
                  </>
                )}
              </div>
              {/* Body description */}
              <div className="w-100 mb-3">
                <div className="course-weeks p-4 activityDetails">
                  <div className="d-flex flex-row justify-content-between">
                    <div className="duration mt-3" style={{ color: 'white', fontSize: '17px' }}>
                      <span>
                        <FontAwesomeIcon icon={faClock} />
                      </span>
                      <span className="ml-2">{moduleInfo.duration}</span>
                    </div>
                    <p
                      className={
                        completionStatus === 'completed'
                          ? 'green-activityStatus d-flex justify-content-center align-items-center'
                          : 'red-activityStatus d-flex justify-content-center align-items-center'
                      }
                      style={
                        {
                          textAlign: 'center',
                          fontSize: '17px',
                          width: 'auto',
                          paddingLeft: '10px',
                          paddingRight: '10px',
                        }
                      }
                    >
                      <span>{completionStatus.toUpperCase()}</span>
                    </p>
                  </div>
                  <div className="text-white activity-details">
                    <div className="mt-3">
                      <p style={{ fontSize: '21px' }}>{moduleInfo.description}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Buttons */}
              <div className="d-flex flex-row justify-content-between mb-4">
                <div className="d-flex flex-row justify-content-center align-items-center">
                  <button
                    type="button"
                    onClick={() => {
                      setWatched(!watched);
                      setIsOpen(true);
                    }}
                    className="quiz-button p-3"
                    style={{
                      lineHeight: '20px', border: '1px solid #6938EF', borderRadius: '20px', background: '#6938EF',
                    }}
                  >
                    <p style={{ fontSize: '17px', color: 'white' }}>
                      Take Quiz
                    </p>
                  </button>
                </div>
              </div>
              <div className="w-100 mb-3 d-flex flex-column">
                {/* <p style={{ fontSize: '28px', color: 'white' }}>Addtional Resources</p> */}
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade opacity-modal"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog activity-modal" role="document">
            <div className="modal-content">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h5
                  className="mt-4 pb-3"
                  id="exampleModalLabel"
                  style={{ fontSize: '25px', fontWeight: '600' }}
                >
                  Module Completed!
                </h5>
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
                    {userInfo != null && userInfo.profilePicture ? (
                      <img
                        src={userInfo.profilePicture}
                        className="img-fluid progress-circle"
                        alt="user_image"
                      />
                    ) : (
                      <img
                        src="/assets/images/profile.png"
                        className="img-fluid progress-circle"
                        alt="user_image"
                      />
                    )}
                  </CircularProgressbarWithChildren>
                  ;
                </div>
                <p className="mt-3 mb-4 pb-1" style={{ fontWeight: '500' }}>
                  <span className="">
                    {completionRate}
                    % Completed
                  </span>
                </p>
                <h6
                  className="pb-2"
                  style={{ fontSize: '18px', fontWeight: '500' }}
                >
                  You just completed
                </h6>
                <h5 style={{ fontSize: '1.25rem', fontWeight: '700' }}>
                  {moduleInfo.name}
                </h5>
                <button
                  type="button"
                  onClick={forwardInfo}
                  data-dismiss="modal"
                  aria-label="Close"
                  className="btn px-5 py-3 banner-btn mt-4 pt-2 font-weight-bold mb-2"
                  style={{ fontSize: '22px' }}
                >
                  Go to Next Lesson
                </button>
                <p
                  className="pb-4 pt-2"
                  data-dismiss="modal"
                  aria-label="Close"
                  style={{ cursor: 'pointer' }}
                >
                  Cancel
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default ActivityDetails;
