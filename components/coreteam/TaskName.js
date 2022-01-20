import React from 'react';
import TaskNameHeader from './TaskNameHeader';
// import TaskNameDescription from "./TaskNameDescription";
import TaskNameDescription from './TaskNameDescription';

const TaskName = function () {
  return (
    <div className=" page-gradient">
      <div className="tw-container tw-mx-auto">
        <TaskNameHeader />
        {/* <TaskNameDescription /> */}
        <TaskNameDescription />
      </div>
    </div>
  );
};

export default TaskName;
