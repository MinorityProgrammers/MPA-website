import React from 'react';

const TaskBanner = function () {
  return (
    <div className=" core-notification-banner tw-flex tw-justify-around tw-items-center xs:tw-grid xs:tw-grid-cols-1">
      <div className="tw-self-center sm:tw-w-auto">
        {/* <img src="/assets/images/coreteamimg/star.png" className="sm:tw-ml-8" alt="star" /> */}
        <h2 className="tw-font-bold tw-text-6xl tw-text-white tw-text-center sm:tw-text-3xl ">
          <img src="/assets/images/coreteamimg/star.png" alt="" />
          View Tasks
        </h2>
        <p className="tw-text-center tw-text-white tw-text-xl sm:tw-text-base tw-mt-5 sm:tw-mt-2">
          View, organize and access your tasks here.
        </p>
      </div>
      <div className="tw-self-center sm:tw-w-auto">
        <img className="tw-h-64 sm:tw-h-40" src="/assets/images/coreteamimg/taskbannar.png" alt="bg" />
      </div>
    </div>
  );
};

export default TaskBanner;
