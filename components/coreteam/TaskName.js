import React from 'react';
import TaskNameHeader from './TaskNameHeader';
import TaskNameDescription from './TaskNameDescription';

const TaskName = () => (
  <div className=" page-gradient">
    <div className="tw-container tw-mx-auto">
      <TaskNameHeader />
      <TaskNameDescription />
    </div>
  </div>
);

export default TaskName;
