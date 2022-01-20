/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import { AiOutlineSolution } from 'react-icons/ai';
// import EmptyOverviewComponent from './EmptyOverviewComponent';

const OverviewProjects = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('active'); // active - completed - all
  const [projectInfo, setProjectInfo] = useState();
  const [projectView, setProjectView] = useState('tasks'); // tasks - details
  const [, setProjects] = useState([]);

  useEffect(() => {
    const timeoutID = setTimeout(() => { setLoading(false); }, 5000);
    return () => { clearTimeout(timeoutID); };
  }, []);

  const params = {
    slidesPerView: 3,
    spaceBetween: 10,
    freeMode: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };

  useEffect(() => {
    if (token !== null) {
      axios
        .get(`${process.env.BASE_URI}/project/`)
        .then((response) => {
          //  add classification for the courses
          const tempProjects = response.data.data;
          setProjects(tempProjects);
          // console.log('Projects ', tempProjects);
          setTimeout(() => { setLoading(false); }, 5000);
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
          // setUserCourses([]);
          setLoading(true);
        });
    }
  }, []);

  //  can remove when api endpoints ready
  const dummyProjectData = [
    {
      projectId: 0,
      projectName: 'Project 1',
      tasks: [
        'Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5',
      ],
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      thumbnail: 'https://s3-alpha-sig.figma.com/img/2951/2f25/2b8152ce226e7158420ad0a7b66997d4?Expires=1639353600&Signature=NiizBF7u5Vtyxcfg5btRtH4C-ePB4viFrZKIybvsu3pX0XLxRUcrjsWZ3MRqxoWx-Fog3WBDDVu3YEpWFBoW94-qRPO1bw-p3HtsvQxzABiiV-xCzykUw1nGfYgnrPXe8y74KKC48RXpEDCjcsSeH8A5N-hpxiDOJRlDuDVUn40ntcr08waIZkzkSOJmPvB~83avTh6WvaqP~5EqdzX6NTdozn5mLycvIckur-svzdogNWrP7z3jyDHO-TnvlvOCEjhr5V7k2ABClP~wn2uUIQ91gS7ns8gbjfmBGdD6RCay75S2YXLHMZILNrpDWhkadsip9doD6ierKoC5rre-Lg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    },
    {
      projectId: 1,
      projectName: 'Project 2',
      tasks: [
        'Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5',
      ],
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      thumbnail: 'https://s3-alpha-sig.figma.com/img/95eb/9b0c/a4581433c385cef18426f59f409d4c42?Expires=1639353600&Signature=WVRXJhwJf8kXF3mj175FXXCoP5uk34jvKvcNfb-QT45lR--AKyHoz8SMj2Z-coi7Z0ZY6JYor3gFh3yVdPxudv-4ABwOHpQaNawol2ZWkFbtAyyAvzqI7oCRUK19DgnddOZchW8PECc8vnJg-Dm~e0nZ~dBwYSZd6RkKrdBBdyI66YRojG7A6hwAU4IkUofDTcxotSX56UG8-r5q0FAIV4GBywFW2eyZt24cKGD7t7SaeFq6vTm2sXOT2zjbgIbo1kXHCN98BAITS7mgGIBklo79xZZG7dUJLvfGu0r81u2CmcwQBi2F~03MbG1ZuN9dcd3BU~1bAyfwpCOWVbvPXg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    },
    {
      projectId: 2,
      projectName: 'Project 3',
      tasks: [
        'Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5',
      ],
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      thumbnail: 'https://s3-alpha-sig.figma.com/img/534b/7f4e/d21bc3c0761a4d2cb72de7952521a8b6?Expires=1639353600&Signature=JL7FL9ra9p173rG~xW9ginqFax4tmcKHeZ8o-RB9o5paUh4gB3kV0alTlOkLvsEr~7O9YVtSCwIIfRiUCNBhHmGJU5Io1D5wLh~XlHSrcZjSTZo1SH2Y5fxpI7Nc0DILHUkmn3bQ8ymlU7wHV28mt~x6Js8Ejlij4hXcCGqQo1lf1hCct47h4OlkJxMZnSS4rcdv-2drcASfCxKxfi2llzjD7B-NpAgoPPr0LrQS~DA-9faBA3q0IwTI-OsvBtzQXVH1rOpO4DgJ6Wz8GmdGjgglZaTvV5XtMiRUAC5-ncDXL4-9rlTTjWWcCYjQDhnlsjdiPaKyVXB~lwUkarefvg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    },
    {
      projectId: 3,
      projectName: 'Project 4',
      tasks: [
        'Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5',
      ],
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      thumbnail: 'https://s3-alpha-sig.figma.com/img/2951/2f25/2b8152ce226e7158420ad0a7b66997d4?Expires=1639353600&Signature=NiizBF7u5Vtyxcfg5btRtH4C-ePB4viFrZKIybvsu3pX0XLxRUcrjsWZ3MRqxoWx-Fog3WBDDVu3YEpWFBoW94-qRPO1bw-p3HtsvQxzABiiV-xCzykUw1nGfYgnrPXe8y74KKC48RXpEDCjcsSeH8A5N-hpxiDOJRlDuDVUn40ntcr08waIZkzkSOJmPvB~83avTh6WvaqP~5EqdzX6NTdozn5mLycvIckur-svzdogNWrP7z3jyDHO-TnvlvOCEjhr5V7k2ABClP~wn2uUIQ91gS7ns8gbjfmBGdD6RCay75S2YXLHMZILNrpDWhkadsip9doD6ierKoC5rre-Lg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    },
    {
      projectId: 4,
      projectName: 'Project 5',
      tasks: [
        'Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5',
      ],
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      thumbnail: 'https://s3-alpha-sig.figma.com/img/95eb/9b0c/a4581433c385cef18426f59f409d4c42?Expires=1639353600&Signature=WVRXJhwJf8kXF3mj175FXXCoP5uk34jvKvcNfb-QT45lR--AKyHoz8SMj2Z-coi7Z0ZY6JYor3gFh3yVdPxudv-4ABwOHpQaNawol2ZWkFbtAyyAvzqI7oCRUK19DgnddOZchW8PECc8vnJg-Dm~e0nZ~dBwYSZd6RkKrdBBdyI66YRojG7A6hwAU4IkUofDTcxotSX56UG8-r5q0FAIV4GBywFW2eyZt24cKGD7t7SaeFq6vTm2sXOT2zjbgIbo1kXHCN98BAITS7mgGIBklo79xZZG7dUJLvfGu0r81u2CmcwQBi2F~03MbG1ZuN9dcd3BU~1bAyfwpCOWVbvPXg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    },
    {
      projectId: 5,
      projectName: 'Project 6',
      tasks: [
        'Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5',
      ],
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      thumbnail: 'https://s3-alpha-sig.figma.com/img/534b/7f4e/d21bc3c0761a4d2cb72de7952521a8b6?Expires=1639353600&Signature=JL7FL9ra9p173rG~xW9ginqFax4tmcKHeZ8o-RB9o5paUh4gB3kV0alTlOkLvsEr~7O9YVtSCwIIfRiUCNBhHmGJU5Io1D5wLh~XlHSrcZjSTZo1SH2Y5fxpI7Nc0DILHUkmn3bQ8ymlU7wHV28mt~x6Js8Ejlij4hXcCGqQo1lf1hCct47h4OlkJxMZnSS4rcdv-2drcASfCxKxfi2llzjD7B-NpAgoPPr0LrQS~DA-9faBA3q0IwTI-OsvBtzQXVH1rOpO4DgJ6Wz8GmdGjgglZaTvV5XtMiRUAC5-ncDXL4-9rlTTjWWcCYjQDhnlsjdiPaKyVXB~lwUkarefvg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    },
  ];
  const ProjectTaskCard = ({ data }) => {
    const taskName = data;
    return (
      <div className="overview-course-card d-flex flex-row justify-content-between">
        {/* First and Second */}
        <div className="d-flex flex-row" style={{ width: '70%' }}>
          {/* First Column - logo */}
          <div className="overview-career-card-image d-flex justify-content-center align-items-center" style={{ width: '20%', height: '100%' }}>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                width: '2em', height: '2em', background: '#6A0C8B', borderRadius: '50%',
              }}
            >
              <AiOutlineSolution style={{ color: 'white' }} />
            </div>
          </div>
          {/* Second Column - Task Name + Description */}
          <div className="overview-course-card-info d-flex flex-column justify-content-center" style={{ width: '78%', marginLeft: '2%', height: '100%' }}>
            {/* INSERT DATA: replace "Host an Event and Cool idead,..." with `${data.variable}` */}
            <p className="overview-course-card-info-title">{taskName}</p>
          </div>
        </div>

        {/* Third and Fourth Column */}
        <div className="d-flex flex-row justify-content-end" style={{ width: '30%' }}>
          <div className="d-flex justify-content-center align-items-center ">
            <a href="#" target="_blank">
              <p style={{ color: '#151371', fontSize: '24px', fontWeight: '700' }}>&gt;</p>
            </a>
          </div>
        </div>
      </div>
    );
  };

  const ProjectsComponent = () => (
    <div className="d-flex flex-column" style={{ width: '100%', height: '100%' }}>
      {/* 3 rows: image and title + project tasks/details + project tasks list */}
      {/* first row: */}
      <div style={{ width: '100%', height: '47%', marginBottom: '3%' }}>
        <Swiper {...params}>
          {dummyProjectData.map((project) => (
            <div key={project.projectId} className="d-flex flex-column justify-content-between align-items-center" onClick={() => { setProjectInfo(project); }} style={{ height: '6rem' }}>
              <div style={{ height: '70%', width: '100%' }}>
                <img style={{ height: '100%', width: '100%', borderRadius: '5px' }} src={project.thumbnail} alt="project's thumbnail" />
              </div>
              <p
                style={{
                  height: '30%', fontSize: '10px', color: 'black', fontWeight: 400,
                }}
                className="text-center"
              >
                {project.projectName}
                {' '}
              </p>
            </div>
          ))}
        </Swiper>
      </div>

      {/* 2nd row */}
      <div className="d-flex flex-column" style={{ width: '100%', height: '60%' }}>
        <div className="d-flex flex-row" style={{ marginBottom: '2%', height: '13%' }}>
          <div
            className={projectView === 'tasks' ? 'project-button-selected' : 'project-button'}
            onClick={() => { setProjectView('tasks'); }}
            style={{ marginRight: '5%' }}
          >
            <p>Project Tasks</p>
          </div>
          <div className={projectView === 'details' ? 'project-button-selected' : 'project-button'} onClick={() => { setProjectView('details'); }}>
            <p>Project Details</p>
          </div>
        </div>
        {
          projectView === 'tasks'
            ? (
              <div className="overview-courses-cards d-flex flex-column" style={{ width: '100%', height: '80%' }}>
                {
                projectInfo !== undefined
                  ? projectInfo.tasks.map((task) => (
                    <ProjectTaskCard data={task} key={task} />
                  ))
                  : <p style={{ fontSize: '12px', color: 'black' }}>Select a Project to View Tasks</p>
              }
              </div>
            )
            : (
              <div className="overview-courses-cards d-flex flex-column" style={{ width: '100%' }}>
                {
                projectInfo !== undefined
                  ? <p style={{ fontSize: '12px', color: 'black' }}>{projectInfo.description}</p>
                  : <p style={{ fontSize: '12px', color: 'black' }}>Select a Project to View Tasks</p>
              }
              </div>
            )
        }
      </div>
    </div>
  );

  return (
    <div className="d-flex flex-column justify-content-between " style={{ height: '100%', width: '100%' }}>
      {/* First row */}
      <div className="d-flex flex-row justify-content-between align-items-center" style={{ height: '13%', marginBottom: '2%' }}>
        <div>
          <p style={{
            fontSize: '18px', fontWeight: '700', color: 'black', margin: 0,
          }}
          >
            Projects
          </p>
        </div>
        <div className="overview-courses-list d-flex flex-row justify-content-between align-items-center" style={{ maxWidth: '70%', overflowY: 'hidden' }}>
          <div className="d-flex flex-row justify-content-between" style={{ height: '25px' }}>
            <div
              className={currentView === 'active' ? 'overview-career-button selected' : 'overview-career-button'}
              onClick={() => { setCurrentView('active'); }}
              style={{ marginRight: '2%' }}
            >
              <p>Active Projects</p>
            </div>
            <div className={currentView === 'completed' ? 'overview-career-button selected' : 'overview-career-button'} onClick={() => { setCurrentView('completed'); }}>
              <p>Completed Projects</p>
            </div>
            <div
              className={currentView === 'all' ? 'overview-career-button selected' : 'overview-career-button'}
              onClick={() => { setCurrentView('all'); }}
            >
              <p>View All</p>
            </div>
          </div>
        </div>
      </div>
      <div className="" style={{ height: '85%', width: '100%' }}>

        {loading
          ? (
            <div className="d-flex flex-column" style={{ height: '100%', width: '100%' }}>
              {/* first row */}
              <div className="overview-proposal-cards d-flex flex-row justify-content-between align-items-center" style={{ height: '50%', overflowX: 'scroll', marginBottom: '5px' }}>
                <Skeleton width={150} height={100} style={{ marginRight: '10px' }} />
                <Skeleton width={150} height={100} style={{ marginRight: '10px' }} />
                <Skeleton width={150} height={100} style={{ marginRight: '10px' }} />
              </div>
              {/* second row - button */}
              <div className="d-flex flex-row">
                <Skeleton width={80} height={15} style={{ marginRight: '10px' }} />
                <Skeleton width={60} height={15} style={{ marginRight: '10px' }} />
              </div>
              {/* third row */}
              <div
                className="d-flex flex-row justify-content-start align-items-start"
                style={{
                  lineHeight: 2, height: '150px', overflowX: 'hidden', overflowY: 'scroll',
                }}
              >
                <Skeleton count={3} height={40} width={1200} />
              </div>
            </div>
          )
          : (
            <div style={{ height: '100%', width: '100%' }}>
              <ProjectsComponent />
            </div>
          )}
      </div>
    </div>
  );
};

export default OverviewProjects;
