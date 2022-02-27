/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'swiper/css/swiper.css';
import ProjectsComponent from './ProjectsComponent';

const OverviewProjects = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('active');

  const [, setProjects] = useState([]);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, []);

  useEffect(() => {
    if (token !== null) {
      axios
        .get(`${process.env.BASE_URI}/project/`)
        .then((response) => {
          const tempProjects = response.data.data;
          setProjects(tempProjects);
          setTimeout(() => {
            setLoading(false);
          }, 5000);
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
          setLoading(true);
        });
    }
  }, []);

  return (
    <div
      className="d-flex flex-column justify-content-between "
      style={{ height: '100%', width: '100%' }}
    >
      {/* First row */}
      <div
        className="d-flex flex-row justify-content-between align-items-center"
        style={{ height: '13%', marginBottom: '2%' }}
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
            Projects
          </p>
        </div>
        <div
          className="overview-courses-list d-flex flex-row justify-content-between align-items-center"
          style={{ overflowY: 'hidden' }}
        >
          <div
            className="d-flex flex-row justify-content-between"
            style={{ height: '25px' }}
          >
            <div
              className={
                currentView === 'active'
                  ? 'overview-career-button selected'
                  : 'overview-career-button'
              }
              onClick={() => {
                setCurrentView('active');
              }}
              style={{ marginRight: '2%' }}
            >
              <p>Active Projects</p>
            </div>
            <div
              className={
                currentView === 'completed'
                  ? 'overview-career-button selected'
                  : 'overview-career-button'
              }
              onClick={() => {
                setCurrentView('completed');
              }}
            >
              <p>Completed Projects</p>
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
              <p>View All</p>
            </div>
          </div>
        </div>
      </div>
      <div className="" style={{ height: '85%', width: '100%' }}>
        {loading ? (
          <div
            className="d-flex flex-column"
            style={{ height: '100%', width: '100%' }}
          >
            {/* first row */}
            <div
              className="overview-proposal-cards d-flex flex-row justify-content-between align-items-center"
              style={{
                height: '50%',
                overflowX: 'scroll',
                marginBottom: '5px',
              }}
            >
              <Skeleton
                width={150}
                height={100}
                style={{ marginRight: '10px' }}
              />
              <Skeleton
                width={150}
                height={100}
                style={{ marginRight: '10px' }}
              />
              <Skeleton
                width={150}
                height={100}
                style={{ marginRight: '10px' }}
              />
            </div>
            {/* second row - button */}
            <div className="d-flex flex-row">
              <Skeleton
                width={80}
                height={15}
                style={{ marginRight: '10px' }}
              />
              <Skeleton
                width={60}
                height={15}
                style={{ marginRight: '10px' }}
              />
            </div>
            {/* third row */}
            <div
              className="d-flex flex-row justify-content-start align-items-start"
              style={{
                lineHeight: 2,
                height: '150px',
                overflowX: 'hidden',
                overflowY: 'scroll',
              }}
            >
              <Skeleton count={3} height={40} width={1200} />
            </div>
          </div>
        ) : (
          <div style={{ height: '100%', width: '100%' }}>
            <ProjectsComponent />
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewProjects;
