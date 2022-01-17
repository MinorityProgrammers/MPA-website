import React, { useEffect, useState } from 'react';
import coreteamInfo from './coreteamInfo.json';
import TaskCard from './TaskCard';

const ViewTask = function () {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    setProposals(coreteamInfo);
  }, []);
  return (
    <section className="page-gradient tw-w-100">
      {/* change------ */}
      <div className=" core-notification-banner tw-flex tw-justify-around tw-items-center xs:tw-grid xs:tw-grid-cols-1">
        <div className="tw-self-center sm:tw-w-auto">
          <h2 className="tw-font-bold tw-text-6xl tw-text-white tw-text-center sm:tw-text-3xl ">
            <img src="/assets/images/coreteamimg/star.png" alt="" />
            View Tasks
          </h2>
          <p className="tw-text-center tw-text-white tw-text-xl sm:tw-text-base tw-mt-5 sm:tw-mt-2">
            View, organize and access your tasks here.
          </p>
        </div>
        <div className="tw-self-center sm:tw-w-auto">
          <img
            className="tw-h-64 sm:tw-h-40"
            src="/assets/images/coreteamimg/taskbannar.png"
            alt="bg"
          />
        </div>
      </div>

      {/* Part----------one */}
      <div className="tw-flex tw-my-20 tw-container tw-mx-auto tw-gap-4">
        <div className="palnnedTask tw-w-1/2 tw-mr-10">
          <div className="palnnedTask-title tw-flex  tw-justify-center ">
            <p className="tw-mr-4">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.3924 4.60721L27.7848 6L13.4961 20.2928L7.45507 14.25L8.84746 12.8572L13.1425 17.1535L13.4961 17.5072L13.8497 17.1535L26.3924 4.60721ZM14.9957 27.5C21.7027 27.5 27.2177 22.1466 27.4823 15.5H29.4828C29.217 23.245 22.7998 29.5 14.9957 29.5C7.02434 29.5 0.5 22.974 0.5 15C0.5 7.02601 7.02434 0.5 14.9957 0.5C16.5998 0.5 18.2163 0.817095 19.7588 1.27835L18.1464 2.89117C17.1448 2.63015 16.1323 2.5 14.9957 2.5C8.12131 2.5 2.49914 8.12399 2.49914 15C2.49914 21.876 8.12131 27.5 14.9957 27.5Z"
                  stroke="#FFC700"
                />
              </svg>
            </p>
            <h3>Planned Task</h3>
          </div>
          <div className="tw-grid  tw-grid-cols-2 tw-mt-4">
            {proposals.slice(0, 4).map(() => (
              <TaskCard />
            ))}
          </div>
        </div>
        <div className="palnnedTask tw-w-1/2 tw-mr-10">
          <div className="palnnedTask-title tw-flex  tw-justify-center ">
            <p className="tw-mr-4">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.3924 4.60721L27.7848 6L13.4961 20.2928L7.45507 14.25L8.84746 12.8572L13.1425 17.1535L13.4961 17.5072L13.8497 17.1535L26.3924 4.60721ZM14.9957 27.5C21.7027 27.5 27.2177 22.1466 27.4823 15.5H29.4828C29.217 23.245 22.7998 29.5 14.9957 29.5C7.02434 29.5 0.5 22.974 0.5 15C0.5 7.02601 7.02434 0.5 14.9957 0.5C16.5998 0.5 18.2163 0.817095 19.7588 1.27835L18.1464 2.89117C17.1448 2.63015 16.1323 2.5 14.9957 2.5C8.12131 2.5 2.49914 8.12399 2.49914 15C2.49914 21.876 8.12131 27.5 14.9957 27.5Z"
                  stroke="#FFC700"
                />
              </svg>
            </p>
            <h3>In-Progress Tasks</h3>
          </div>
          <div className="tw-grid  tw-grid-cols-2 tw-mt-4">
            {proposals.slice(0, 3).map(() => (
              <TaskCard />
            ))}
          </div>
        </div>
        <div className="palnnedTask tw-w-1/2 tw-mr-10">
          <div className="palnnedTask-title tw-flex  tw-justify-center ">
            <p className="tw-mr-4">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.3924 4.60721L27.7848 6L13.4961 20.2928L7.45507 14.25L8.84746 12.8572L13.1425 17.1535L13.4961 17.5072L13.8497 17.1535L26.3924 4.60721ZM14.9957 27.5C21.7027 27.5 27.2177 22.1466 27.4823 15.5H29.4828C29.217 23.245 22.7998 29.5 14.9957 29.5C7.02434 29.5 0.5 22.974 0.5 15C0.5 7.02601 7.02434 0.5 14.9957 0.5C16.5998 0.5 18.2163 0.817095 19.7588 1.27835L18.1464 2.89117C17.1448 2.63015 16.1323 2.5 14.9957 2.5C8.12131 2.5 2.49914 8.12399 2.49914 15C2.49914 21.876 8.12131 27.5 14.9957 27.5Z"
                  stroke="#FFC700"
                />
              </svg>
            </p>
            <h3>Ready for review tasks</h3>
          </div>
          <div className="tw-grid  tw-grid-cols-2 tw-mt-4">
            {proposals.slice(0, 4).map(() => (
              <TaskCard />
            ))}
          </div>
        </div>
      </div>
      {/* part-------------two */}
      <div className="tw-flex tw-my-20 tw-container tw-mx-auto tw-gap-4">
        <div className="palnnedTask tw-w-1/2 tw-mr-10">
          <div className="palnnedTask-title tw-flex  tw-justify-center ">
            <p className="tw-mr-4">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.3924 4.60721L27.7848 6L13.4961 20.2928L7.45507 14.25L8.84746 12.8572L13.1425 17.1535L13.4961 17.5072L13.8497 17.1535L26.3924 4.60721ZM14.9957 27.5C21.7027 27.5 27.2177 22.1466 27.4823 15.5H29.4828C29.217 23.245 22.7998 29.5 14.9957 29.5C7.02434 29.5 0.5 22.974 0.5 15C0.5 7.02601 7.02434 0.5 14.9957 0.5C16.5998 0.5 18.2163 0.817095 19.7588 1.27835L18.1464 2.89117C17.1448 2.63015 16.1323 2.5 14.9957 2.5C8.12131 2.5 2.49914 8.12399 2.49914 15C2.49914 21.876 8.12131 27.5 14.9957 27.5Z"
                  stroke="#FFC700"
                />
              </svg>
            </p>
            <h3>In Review Tasks</h3>
          </div>
          <div className="tw-grid  tw-grid-cols-2 tw-mt-4">
            {proposals.slice(0, 4).map(() => (
              <TaskCard />
            ))}
          </div>
        </div>
        <div className="palnnedTask tw-w-1/2 tw-mr-10">
          <div className="palnnedTask-title tw-flex  tw-justify-center ">
            <p className="tw-mr-4">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.3924 4.60721L27.7848 6L13.4961 20.2928L7.45507 14.25L8.84746 12.8572L13.1425 17.1535L13.4961 17.5072L13.8497 17.1535L26.3924 4.60721ZM14.9957 27.5C21.7027 27.5 27.2177 22.1466 27.4823 15.5H29.4828C29.217 23.245 22.7998 29.5 14.9957 29.5C7.02434 29.5 0.5 22.974 0.5 15C0.5 7.02601 7.02434 0.5 14.9957 0.5C16.5998 0.5 18.2163 0.817095 19.7588 1.27835L18.1464 2.89117C17.1448 2.63015 16.1323 2.5 14.9957 2.5C8.12131 2.5 2.49914 8.12399 2.49914 15C2.49914 21.876 8.12131 27.5 14.9957 27.5Z"
                  stroke="#FFC700"
                />
              </svg>
            </p>
            <h3>Revision Required Tasks</h3>
          </div>
          <div className="tw-grid  tw-grid-cols-2 tw-mt-4">
            {proposals.slice(0, 3).map(() => (
              <TaskCard />
            ))}
          </div>
        </div>
        <div className="palnnedTask tw-w-1/2 tw-mr-10">
          <div className="palnnedTask-title tw-flex  tw-justify-center ">
            <p className="tw-mr-4">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.3924 4.60721L27.7848 6L13.4961 20.2928L7.45507 14.25L8.84746 12.8572L13.1425 17.1535L13.4961 17.5072L13.8497 17.1535L26.3924 4.60721ZM14.9957 27.5C21.7027 27.5 27.2177 22.1466 27.4823 15.5H29.4828C29.217 23.245 22.7998 29.5 14.9957 29.5C7.02434 29.5 0.5 22.974 0.5 15C0.5 7.02601 7.02434 0.5 14.9957 0.5C16.5998 0.5 18.2163 0.817095 19.7588 1.27835L18.1464 2.89117C17.1448 2.63015 16.1323 2.5 14.9957 2.5C8.12131 2.5 2.49914 8.12399 2.49914 15C2.49914 21.876 8.12131 27.5 14.9957 27.5Z"
                  stroke="#FFC700"
                />
              </svg>
            </p>
            <h3>Completed Tasks</h3>
          </div>
          <div className="tw-grid  tw-grid-cols-2 tw-mt-4">
            {proposals.slice(0, 4).map(() => (
              <TaskCard />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewTask;
