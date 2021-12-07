import { useEffect, useState, useContext } from 'react';
import {
  DragDropContext, Draggable, Droppable, resetServerContext,
} from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import itemsFromBackEnd from './ProjectManager/viewtask.json';
import TaskStatus, { UserContext } from './ProjectManager/TaskStatus';
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
  2: { name: 'Review Task', items: [] },
  3: { name: 'Completed Task', items: [] },
};

const onDragEnd = (result, columns, setColumns) => {
  const { source, destination } = result;
  if (source.droppableId !== destination?.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination?.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destinationItems = [...destinationColumn?.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destinationItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
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
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...columns,
        items: copiedItems,
      },
    });
  }
  let task;
  if (result.destination.droppableId == 1) {
    task = 'Planned Task';
    console.log(task);
  } else if (result.destination.droppableId == 2) {
    task = 'Review Task';
    console.log(task);
  } else {
    task = 'Completed Task';
    console.log(task);
  }
};

const ViewTask = function () {
  const [plannedTasks, setPlannedTasks] = useState([]);
  const [columns, setColumms] = useState(columnsFromBackend);
  const priorityStatus = useContext(UserContext);
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
        .then((data) => {
          alert('Task submitted successfully');
        });
    };
  }, []);
  // handlePriority function sent to TaskStatus component as props to set the priority flag
  const handlePriority = () => {};

  return (
    <div className="tw-grid tw-grid-cols-3">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumms)}
      >
        {Object.entries(columns).map(([id, column]) => (
          <div className="tw-flex-col tw-bg-black tw-bg-opacity-25 tw-m-3 tw-rounded-b-lg">
            <div className="tw-flex tw-ml-5 tw-justify-center tw-items-center tw-bg-NavDark tw-mt-3 tw-w-11/12 tw-border-t-4 tw-border-white tw-rounded-b-lg tw-h-16">
              <img
                className="tw-h-8 tw-w-8 tw-m-2"
                src="/assets/images/project/tick.png"
              />
              <p className="tw-text-white tw-text-3xl">{column.name}</p>
            </div>
            <Droppable droppableId={id} key={id}>
              {(provided, snapshot) => (
                <div
                  className="tw-grid tw-grid-cols-2"
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
                            <TaskStatus
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
export default ViewTask;
