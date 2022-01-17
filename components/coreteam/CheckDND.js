import React, { useEffect, useState, useContext } from 'react';
import {
  DragDropContext, Draggable, Droppable, resetServerContext,
} from 'react-beautiful-dnd';
import itemsFromBackEnd from './taskCardData.json';
import TestTaskCard, { UserContext } from './TestTaskCard';
// Currently using JSON data for dynamic loading
// After completing backend JSON should be removed and tasks data will be loading-
//  through getStaticProps and getStaticPaths function instead of useEffect hooks
// export const getStaticPaths = async () => {
//   const res = await fetch("http://localhost:3000/viewtaskData");
//   const data = await res.json();

//   const paths = data.map((task) => {
//     return {
//       params: { id: task.id },
//     };
//   });

//   return {
//     paths: paths,
//     fallback: false,
//   };
// };

// export const getStaticProps = async (context) => {
//   const id = context.params.id;
//   const res = await fetch(`http://localhost:3000/getProposalsdata/${id}`);
//   const data = await res.json();

//   return {
//     props: {
//       task: data,
//     },
//   };
// };

const columnsFromBackend = {
  1: { name: 'Planned Task', items: itemsFromBackEnd },
  2: { name: 'In-Progress Tasks', items: [] },
  3: { name: 'Ready For Review Tasks', items: [] },
  4: { name: 'In Review Tasks', items: [] },
  5: { name: 'Revision Required Tasks', items: [] },
  6: { name: 'Completed Task', items: [] },

};

const CheckDND = function () {
  const [plannedTasks, setPlannedTasks] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [readyReview, setReadyReview] = useState([]);
  const [columns, setColumms] = useState(columnsFromBackend);
  const priorityStatus = useContext(UserContext);

  let task;

  const onDragEnd = (result, _columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (
      destination.droppableId === source.droppableId
            && destination.index === source.index
    ) {
      return;
    }
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = _columns[source.droppableId];
      const destinationColumn = _columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destinationItems = [...destinationColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destinationItems.splice(destination.index, 0, removed);
      setColumns({
        ..._columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destinationColumn,
          items: destinationItems,
        },
      });
    } else {
      const column = _columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ..._columns,
        [source.droppableId]: {
          ..._columns,
          items: copiedItems,
        },
      });
    }

    // let add;
    // const active = plannedTasks;
    // const inPro = inProgress;
    if (result.destination.droppableId === 1) {
      task = 'Planned Task';

      console.log(task);
      const newResult = [...plannedTasks, result];
      setPlannedTasks(newResult);
      console.log(plannedTasks);
    } else if (result.destination.droppableId === 2) {
      // task = "In-Progress Tasks";
      // add = active[source.index];
      // active.splice(source.index, 1);
      const newResult = [...inProgress, result];
      setInProgress(newResult);
      console.log(inProgress);
    } else if (result.destination.droppableId === 3) {
      task = 'Ready For Review Tasks';
      console.log(task);
      const newResult = [...readyReview, result];
      setReadyReview(newResult);
      console.log(readyReview);
    } else if (result.destination.droppableId === 4) {
      task = 'In Review Tasks';
      console.log(task);
    } else if (result.destination.droppableId === 5) {
      task = 'Revision Required Tasks';
      console.log(task);
    } else {
      task = 'Completed Task';
      console.log(task);
    }
  };

  useEffect(() => {
    setPlannedTasks(plannedTasks);
    setInProgress(inProgress);
    setReadyReview(readyReview);
  }, []);

  // schema for backend connection
  useEffect(() => {
    const handleTask = () => {
      const taskDetails = {
        taskstatus: task,
        priority: priorityStatus,
        date: new Date(),
        taskname: '',
        taskCreator: '',
      };
      fetch('/taskAssign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskDetails),
      })
        .then((res) => res.json())
        .then(() => {
          alert('Task submitted successfully');
        });
    };
  }, []);
  // const onDragEnd = (result) => {
  //     const { destination, source } = result;
  //     console.log(result);
  //     if (!destination) {
  //         return;
  //     }
  //     if (
  //         destination.droppableId === source.droppableId &&
  //         destination.index === source.index
  //     ) {
  //         return;
  //     }

  // }
  // handlePriority function sent to TaskStatus component as props to set the priority flag
  const handlePriority = () => { };
  // (result) => onDragEnd(result, columns, setColumms)
  return (
    <div className="tw-grid tw-grid-cols-3 tw-container tw-mx-auto tw-mt-12">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumms)}
      >
        {Object.entries(columns).map(([id, column]) => (
          <div className="tw-flex-col bg-All-card  tw-mx-5 tw-mb-12">
            <div className="palnnedTask-title tw-flex  tw-justify-center tw-m-2 tw-items-center">
              <img
                className="tw-h-7 tw-w-7 tw-m-2"
                src="/assets/images/project/tick.png"
                alt=""
              />
              <h3 className=" tw-text-xl">{column.name}</h3>
            </div>
            <Droppable droppableId={id} key={id}>
              {(provided, snapshot) => (
                <div
                  className="tw-grid  tw-grid-cols-2 tw-mt-4"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {column.items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      index={index}
                      draggableId={item.id}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="tw-justify-center"
                        >

                          <TestTaskCard
                            item={item}
                            handlePriority={handlePriority}
                          />

                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};
resetServerContext();
export default CheckDND;
