import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import CourseCard from './CourseCard';

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

const OverviewCourses = ({ token, userData }) => {
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
          console.log(tempUserCoursesData);
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

  return (
    <div
      className="d-flex flex-column justify-content-between "
      style={{ height: '100%' }}
    >
      {/* First row */}
      <div
        className="d-flex dashboard-cards-tab flex-row justify-content-between align-items-center"
        style={{ height: '15%', marginBottom: '2%' }}
      >
        <div>
          <p
            style={{
              fontSize: '18px',
              fontWeight: '700',
              color: 'white',
              margin: 0,
            }}
          >
            Courses
          </p>
        </div>
        <div
          className="overview-courses-list d-flex flex-row justify-content-between align-items-center"
          style={{ overflowY: 'hidden' }}
        >
          <div
            className="d-flex overview-course-tabs flex-row justify-content-between"
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
                  ? 'overview-career-button selected tw-mr-4'
                  : 'overview-career-button tw-mr-4'
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
        <CourseCard
          userCourses={userCourses}
          loading={loading}
          setLoading={setLoading}
          currentView={currentView}
          userData={userData}
          token={token}
        />
      )}
    </div>
  );
};

export default OverviewCourses;
