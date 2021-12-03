import React from "react";
import TaskNameHeader from "./TaskNameHeader";
import Footer from "../../components/Footer";
// import TaskNameDescription from "./TaskNameDescription";
import TaskNameDescription from "./TaskNameDescription";

const TaskName = () => {
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
