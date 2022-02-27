import React, { useState } from 'react';
import Swiper from 'react-id-swiper';
import { AiOutlineSolution } from 'react-icons/ai';

const ProjectTaskCard = ({ data }) => {
  const taskName = data;
  return (
    <div className="overview-course-card d-flex flex-row justify-content-between" style={{ width: '48%' }}>
      {/* First and Second */}
      <div className="d-flex flex-row" style={{ width: '70%' }}>
        {/* First Column - logo */}
        <div
          className="overview-career-card-image d-flex justify-content-center align-items-center"
          style={{ width: '20%', height: '100%' }}
        >
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              width: '2em',
              height: '2em',
              background: '#6A0C8B',
              borderRadius: '50%',
            }}
          >
            <AiOutlineSolution style={{ color: 'white' }} />
          </div>
        </div>
        {/* Second Column - Task Name + Description */}
        <div
          className="overview-course-card-info d-flex flex-column justify-content-center"
          style={{ width: '78%', marginLeft: '2%', height: '100%' }}
        >
          <p className="overview-course-card-info-title">{taskName}</p>
        </div>
      </div>
      {/* Third and Fourth Column */}
      <div
        className="d-flex flex-row justify-content-end"
        style={{ width: '30%' }}
      >
        <div className="d-flex justify-content-center align-items-center ">
          <img src="/assets/images/settings/arrow-down.svg" alt="task-view" />
        </div>
      </div>
    </div>
  );
};

const ProjectsComponent = () => {
  const [projectInfo, setProjectInfo] = useState();
  const [projectView, setProjectView] = useState('tasks');

  const params = {
    slidesPerView: 3,
    spaceBetween: 10,
    freeMode: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };
  const dummyProjectData = [
    {
      projectId: 0,
      projectName: 'GenaDrop',
      tasks: ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'],
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      thumbnail:
        '/assets/images/dashboard/genadrop.png',
    },
    {
      projectId: 1,
      projectName: 'MusiSwap',
      tasks: ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'],
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      thumbnail:
        '/assets/images/dashboard/musiswap.png',
    },
    {
      projectId: 2,
      projectName: 'MPA dApp',
      tasks: ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'],
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      thumbnail:
        '/assets/images/dashboard/dApp.png',
    },
  ];
  return (
    <div
      className="d-flex flex-column"
      style={{ width: '100%', height: '100%' }}
    >
      <div style={{ width: '100%', height: '47%', marginBottom: '3%' }}>
        <Swiper {...params}>
          {dummyProjectData.map((project) => (
            <div
              key={project.projectId}
              className="d-flex flex-column justify-content-between align-items-center"
              onClick={() => {
                setProjectInfo(project);
              }}
              style={{ height: '6rem' }}
            >
              <div style={{ height: '70%', width: '100%' }}>
                <img
                  style={{
                    height: '100%', width: '100%', borderRadius: '5px', cursor: 'pointer',
                  }}
                  className={`dashboard-projects-thumbnail
                ${projectInfo ? projectInfo.projectId === project.projectId ? 'dashboard-projects-thumbnail-active' : '' : ''}`}
                  src={project.thumbnail}
                  alt="project's thumbnail"
                />
              </div>
              <p
                style={{
                  height: '30%',
                  fontSize: '10px',
                  color: 'white',
                  fontWeight: 400,
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
      <div
        className="d-flex flex-column"
        style={{ width: '100%', height: '60%' }}
      >
        <div
          className="d-flex flex-row"
          style={{ marginBottom: '2%', height: '13%' }}
        >
          <div
            className={
            projectView === 'tasks'
              ? 'overview-career-button selected'
              : 'overview-career-button'
          }
            onClick={() => {
              setProjectView('tasks');
            }}
            style={{ marginRight: '5%' }}
          >
            <p>Project Tasks</p>
          </div>
          <div
            className={
            projectView === 'details'
              ? 'overview-career-button selected'
              : 'overview-career-button'
          }
            onClick={() => {
              setProjectView('details');
            }}
          >
            <p>Project Details</p>
          </div>
        </div>
        {projectView === 'tasks' ? (
          <div
            className="overview-courses-cards d-flex tw-flex tw-flex-wrap tw-justify-between"
            style={{ width: '100%', height: '80%' }}
          >
            {projectInfo !== undefined ? (
              projectInfo.tasks.map((task) => (
                <ProjectTaskCard data={task} key={task} />
              ))
            ) : (
              <p style={{ fontSize: '12px', color: 'white' }}>
                Select a Project to View Tasks
              </p>
            )}
          </div>
        ) : (
          <div
            className="overview-courses-cards d-flex flex-column"
            style={{ width: '100%' }}
          >
            {projectInfo !== undefined ? (
              <p style={{ fontSize: '12px', color: 'white' }}>
                {projectInfo.description}
              </p>
            ) : (
              <p style={{ fontSize: '12px', color: 'white' }}>
                Select a Project to View Tasks
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsComponent;
