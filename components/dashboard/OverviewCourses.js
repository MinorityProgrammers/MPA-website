import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import EmptyOverviewComponent from './EmptyOverviewComponent';

const categories = [
  {
    category: 'webdev',
    tags: ['HTML', 'Web development', 'React', 'Javascript'],
  },
  {
    category: 'blockchain',
    tags: ['Solidity', 'Smart Contract'],
  },
  {
    category: 'ui/ux',
    tags: ['UI/UX', 'Figma'],
  },
  {
    category: 'entrepeneurship',
    tags: ['Entrepeneurship'],
  },
  {
    category: 'all',
    tags: [
      'HTML',
      'Web development',
      'React',
      'Javascript',
      'Solidity',
      'Smart Contract',
      'UI/UX',
      'Figma',
      'Entrepeneurship',
    ],
  },
];

const OverviewCourses = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('webdev');
  const [, setAllCourses] = useState([]);
  const [userCourses, setUserCourses] = useState([]);

  useEffect(() => {
    if (token !== null) {
      axios
        .get(`${process.env.BASE_URI}/learn/`)
        .then((response) => {
          const tempAllCoursesData = response.data.data;
          tempAllCoursesData.forEach((course) => {
            course.categories = [];
            categories.forEach((category) => {
              course.courseId.tags.some(
                (tag) => category.tags.includes(tag)
                  && course.categories.push(category.category),
              );
            });
          });
          setAllCourses(tempAllCoursesData);
          return axios.get(`${process.env.BASE_URI}/learn/userCourses`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        })
        .then((response) => {
          const tempUserCoursesData = response.data.data;
          tempUserCoursesData.forEach((course) => {
            course.categories = [];
            categories.forEach((category) => {
              course.courseId.tags.some(
                (tag) => category.tags.includes(tag)
                  && course.categories.push(category.category),
              );
            });
          });
          setUserCourses(tempUserCoursesData);
          setLoading(false);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
          console.log(error.config);
          setUserCourses([]);
          setLoading(true);
        });
    }
  }, []);

  const ProgressBar = useCallback((props) => {
    let value = props.completionRate;
    if (typeof value === 'number' || typeof value === 'string') {
      value = props.completionRate;
    } else {
      value = 0;
    }
    return (
      <div className="overview-wrapper">
        <div className="overview-barContainer">
          <div className="overview-filler" style={{ width: `${value}%` }} />
        </div>
      </div>
    );
  }, []);

  const CourseCard = useCallback(() => {
    const courses = userCourses.filter((course) => course.categories.includes(currentView));

    return (
      <>
        {courses.length > 0 ? (
          <div className="overview-courses-cards d-flex flex-column">
            {courses.map((course) => (
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
                      color: 'black',
                      textAlign: 'center',
                    }}
                  >
                    {course.completionRate}
                    % Completed
                    {' '}
                  </p>
                  <ProgressBar
                    completionRate={parseInt(course?.completionRate, 10)}
                  />
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
                  {/* Fifth Column */}
                  <div className="d-flex justify-content-center align-items-center ">
                    <a href="#" target="_blank">
                      <button
                        type="button"
                        className="btn btn-primary overview-course-viewcourse-btn"
                        style={{ fontSize: '0.7rem', background: '#151371' }}
                      >
                        View Course
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyOverviewComponent
            imgURL="https://s3-alpha-sig.figma.com/img/4ee3/cff9/cf0ef958c8ee474d3c466885d8a7acb2?Expires=1639353600&Signature=TUwGQk6amGy9LVngHcQ9lpNszIIYYHcey9eFrtByZlXq4AYii34O9UV9gD6A12kkvefHyADputgq6M3rDcTSa693YyLBsATyREcjTHgqfSE3vIIzXCpyfxnfMQgt-TWTTyHYiGIO0V-6N0rj7Q0LcOK4Bou5G7gmGnbKSlQ1UGy19IXXOuSwtNaM2E1Yil-4DhsxCGDFN6shDvn6CiMzy~DPjAzOw2iLucONYSLAeHBvb4AkRf6T9f3UXtG3xhXG-RY69Yw2MP-NZFGgXYu0fivIn1CDxZf-PdnaSrvKjjg-vxylIHFfY1UviTIlhbj1WorWh~N1Y3d8SIPe~6FhNA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            description={`You haven’t  enrolled for any courses in ${currentView} on MPA yet. You can enroll for one in the Courses Section. Remember, you earn $MINORITY tokens when you complete a course.`}
            btnText="Enroll For Your First Course"
            btnFunction={() => {
              setLoading(!loading);
            }}
          />
        )}
      </>
    );
  }, []);

  return (
    <div
      className="d-flex flex-column justify-content-between "
      style={{ height: '100%' }}
    >
      {/* First row */}
      <div
        className="d-flex flex-row justify-content-between align-items-center"
        style={{ height: '15%', marginBottom: '2%' }}
      >
        <div>
          <p
            style={{
              fontSize: '18px',
              fontWeight: '700',
              color: 'black',
              margin: 0,
            }}
          >
            Courses
          </p>
        </div>
        <div
          className="overview-courses-list d-flex flex-row justify-content-between align-items-center"
          style={{ maxWidth: '60%', overflowY: 'hidden' }}
        >
          <div
            className="d-flex flex-row justify-content-between"
            style={{ height: '25px' }}
          >
            <div
              className={
                currentView === 'webdev'
                  ? 'overview-career-button selected'
                  : 'overview-career-button'
              }
              onClick={() => {
                setCurrentView('webdev');
              }}
              style={{ marginRight: '2%' }}
            >
              <p
                onClick={() => {
                  setCurrentView('webdev');
                }}
              >
                Web Dev
              </p>
            </div>
            <div
              className={
                currentView === 'blockchain'
                  ? 'overview-career-button selected'
                  : 'overview-career-button'
              }
              onClick={() => {
                setCurrentView('blockchain');
              }}
            >
              <p
                onClick={() => {
                  setCurrentView('blockchain');
                }}
              >
                Blockchain
              </p>
            </div>
            <div
              className={
                currentView === 'ui/ux'
                  ? 'overview-career-button selected'
                  : 'overview-career-button'
              }
              onClick={() => {
                setCurrentView('ui/ux');
              }}
            >
              <p
                onClick={() => {
                  setCurrentView('ui/ux');
                }}
              >
                UI/UX Design
              </p>
            </div>
            <div
              className={
                currentView === 'entrepeneurship'
                  ? 'overview-career-button selected'
                  : 'overview-career-button'
              }
              onClick={() => {
                setCurrentView('entrepeneurship');
              }}
            >
              <p
                onClick={() => {
                  setCurrentView('entrepeneurship');
                }}
              >
                Entrepeneurship
              </p>
            </div>
            <div
              className={
                currentView === 'all'
                  ? 'overview-career-button selected'
                  : 'overview-career-button'
              }
              onClick={() => {
                setCurrentView('all');
              }}
            >
              <p
                onClick={() => {
                  setCurrentView('all');
                }}
              >
                View all Courses
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Second row */}
      {loading ? (
        <div
          className="d-flex flex-row justify-content-start align-items-center"
          style={{ lineHeight: 2, height: '100%', overflowX: 'hidden' }}
        >
          <Skeleton count={5} height={50} width={1200} />
        </div>
      ) : (
        <CourseCard />
      )}
    </div>
  );
};

export default OverviewCourses;
