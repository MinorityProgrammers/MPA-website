import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CgAttachment } from 'react-icons/cg';
import { GrEmoji } from 'react-icons/gr';
import { IoIosMail } from 'react-icons/io';
import ReactTooltip from 'react-tooltip';
import SingleSubTask from './SingleSubTask';

const TaskNameDescription = function () {
  const [textDescription, setTextDescription] = useState({});
  const handleText = (e) => {
    // text description-----------
    const newTextDecription = { ...textDescription };
    newTextDecription[e.target.name] = e.target.value;
    setTextDescription(newTextDecription);
    e.preventDefault();
  };
  console.log(textDescription);
  const handleTaskDescriptionFormSubmit = () => {
    const formData = new FormData();
    formData.append('text', textDescription.text);
  };
  // ------subTak------
  const [subtaskText, setSubTaskText] = useState([]);
  const [subtaskOpen, setSubTaskOpen] = useState(false);
  const { handleSubmit } = useForm();
  // { data, id: Math.floor((Math.random() * 1000) + 1)
  const onSubmitSubTask = handleSubmit((data, e) => {
    const newSubTakText = [...subtaskText, data];
    for (let i = 0; i < newSubTakText.length; i += 1) {
      newSubTakText[i].id = i;
    }
    console.log(newSubTakText);
    setSubTaskText(newSubTakText);
    e.target.reset();

    // e.preventDefault(newSubTakText);
  });

  const inputRef = useRef(null);
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handleAdd = (e) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo('');
    }
  };

  return (
    <div className=" ">
      <div className="tw-shadow-inner tw-container tw-bg-gray-100 shadow-lg">
        <div className="tw-flex tw-flex-grow tw-gap-4 tw-justify-between sm:tw-flex-col">
          <div className=" tw-overflow-y-auto tw-h-48 tw-w-3/5 sm:tw-w-auto sm:tw-mb-4">
            <div>
              <h1 className=" text-center">Task Description</h1>
            </div>
            <div className="tw-h-32 tw-p-3 tw-m-3">
              <form
                className="tw-bg-gray-200 tw-h-32  tw-relative "
                onClick={handleTaskDescriptionFormSubmit}
              >
                <div className="tw-form-group">
                  <label htmlFor="exampleFormControlTextarea1">
                    Task description here
                  </label>
                  <textarea
                    onBlur={handleText}
                    className="form-control tw-w-full tw-bg-gray-200"
                    id="exampleFormControlTextarea1"
                    name="text"
                  />
                </div>
                <section className="form-group tw-absolute tw-bottom-0 tw-right-0">
                  <select
                    className=" tw-bg-white tw-pl-2 tw-text-sm tw-w-40 tw-text-black"
                    value="Add Attachments"
                  >
                    <option value="pending">Add Attachments</option>
                    <option value="onGoing">OnGing</option>
                    <option value="done">Done</option>
                  </select>
                </section>
              </form>

              <div className=" tw-flex tw-justify-center  ">
                <button type="button" className="tw-bg-white shadow tw-p-2">
                  {' '}
                  Show More
                </button>
              </div>
              <div className="tw-flex items-center tw-gap-x-2 tw-ml-4 ">
                <svg
                  onClick={() => setSubTaskOpen(!subtaskOpen)}
                  className="tw-cursor-pointer"
                  width="23"
                  height="23"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.6428 0H5.35712C2.39991 0.00351562 0.00351562 2.39991 0 5.35712V20.6428C0.00351562 23.6 2.39991 25.9964 5.35712 25.9999H20.6428C23.6 25.9964 25.9964 23.6 25.9999 20.6428V5.35712C25.9964 2.39991 23.6 0.00351562 20.6428 0ZM18.3571 14.0714H14.0714V18.3571C14.0714 18.9489 13.5917 19.4286 13 19.4286C12.4082 19.4286 11.9285 18.9489 11.9285 18.3571V14.0714H7.64285C7.0511 14.0714 6.5714 13.5917 6.5714 13C6.5714 12.4082 7.0511 11.9285 7.64285 11.9285H11.9286V7.64285C11.9286 7.0511 12.4083 6.5714 13 6.5714C13.5918 6.5714 14.0714 7.0511 14.0714 7.64285V11.9286H18.3571C18.9489 11.9286 19.4286 12.4083 19.4286 13C19.4286 13.5918 18.9488 14.0714 18.3571 14.0714Z"
                    fill="#FF00B8"
                    fillOpacity="0.6"
                  />
                </svg>
                <h3>Add Subtask</h3>
              </div>

              {todos?.map((_todo, index) => (
                <div className="tw-flex tw-items-center tw-gap-x-2 tw-ml-4 tw-my-4">
                  <SingleSubTask
                    index={index}
                    todos={todos}
                    todo={_todo}
                    key={_todo.id}
                    setTodos={setTodos}
                  />
                </div>
              ))}

              {subtaskText.map((singleSubTask, index) => (
                <div
                  key={singleSubTask.id}
                  className="tw-flex tw-items-center tw-gap-x-2 tw-ml-4 tw-my-4"
                >
                  {
                    // singleSubTask.data.id &&
                    userCart.map((u) => (
                      <div
                        className="tw-cursor-pointer tw-btn"
                        key={u.id}
                        onClick={() => HandleRemoveUser(u.id)}
                        data-tip={u.name}
                      >
                        <img className="tw-h-5 tw-w-5" src={u.image} alt="" />
                        <ReactTooltip />
                      </div>
                    ))
                  }

                  <div
                    id={index}
                    className="tw-border-dashed tw-border-2 tw-border-gray-400 tw-text-gray-600 tw-rounded-full tw-h-6 tw-w-6 tw-flex tw-items-center tw-justify-center "
                    onClick={modifyUser}
                    key={index}
                  >
                    <svg
                      id={index}
                      width="18"
                      height="15"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                  </div>
                  <p className="  tw-font-semibold">{singleSubTask.name}</p>
                  {newUser && (
                    <div id="myDropdown" className="dropdown-content">
                      {users.map((user) => (
                        <a className="hover:tw-bg-gray-200" key={user.id}>
                          <div
                            className="tw-flex tw-gap-x-3 tw-cursor-pointer"
                            onClick={() => handleUserCart(user)}
                          >
                            <img
                              className="tw-h-5 tw-w-5"
                              src="/assets/images/coreteamimg/user.png"
                              alt=""
                            />
                            {' '}
                            <span>{user.name}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {subtaskOpen && (
                <form
                  onSubmit={(e) => {
                    handleAdd(e);
                    inputRef.current?.blur();
                  }}
                  className="tw-ml-2 tw-pl-3 tw-rounded tw-my-3 tw-mr-3 tw-bg-gray-200 w-full  tw-px-4 tw-py-3"
                >
                  <input
                    type="text"
                    placeholder="Enter a Task"
                    value={todo}
                    ref={inputRef}
                    onChange={(e) => setTodo(e.target.value)}
                    className=" tw-w-1/2 tw-bg-gray-200 tw-rounded-lg tw-text-black  tw-px-4 tw-py-1 focus:tw-outline-none text-lg"
                    placeholder="Sub Task description here"
                  />
                  {/* <input type="text" className="tw-opacity-0" /> */}
                  <button
                    className="tw-font-bold tw-py-1 tw-px-2 tw-bg-blue-600 hover:tw-bg-green-600 tw-text-white tw-text-md tw-rounded-md focus:tw-outline-none "
                    type="submit"
                  >
                    Save
                  </button>
                </form>
              )}
            </div>
          </div>
          {/* Right Site--------- */}
          <div className=" tw-overflow-y-auto tw-h-48 tw-w-2/5 sm:tw-w-auto tw-mt-8">
            <div>
              <h1 className="text-center">Definition Of Done Checklist</h1>
            </div>
            <div className="tw-bg-gray-200 tw-h-64 tw-p-3 tw-m-3  ">
              <form action="http://www.acme.com/register" method="POST">
                <input
                  type="checkbox"
                  name="selectone"
                  id="one"
                  value="hello"
                />
                <label htmlFor="name" className="tw-ml-4">
                  Checklist Point 1
                </label>
                <br />
                <input
                  type="checkbox"
                  name="selectone"
                  id="one"
                  value="hello"
                />
                <label htmlFor="name" className="tw-ml-4">
                  Checklist Point 2
                </label>
                <br />
                <input
                  type="checkbox"
                  name="selectone"
                  id="one"
                  value="hello"
                />
                <label htmlFor="name" className="tw-ml-4">
                  Checklist Point 3
                </label>
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Down part ------------ */}
      <hr />
      <div className="tw-shadow-inner tw-container tw-bg-gray-100 shadow-lg">
        <div className="tw-flex tw-flex-grow tw-gap-4 tw-justify-between sm:tw-flex-col">
          <div className="tw-overflow-y-auto tw-h-48 tw-w-3/5 sm:tw-w-auto sm:tw-mb-4">
            <div>
              <h1 className=" text-center">Task Status Updates</h1>
            </div>
            <div>
              <div className="tw-bg-gray-200 tw-h-64 tw-p-3 tw-flex  tw-justify-between ">
                <h1>Lorem created this task</h1>
                <h1>Yesterday at 11:02 am</h1>
              </div>
            </div>
          </div>
          {/* Right Site--------- */}
          <div className="tw-overflow-y-auto tw-h-48 tw-w-2/5 sm:tw-w-auto">
            <div>
              <h1 className="text-center">Definition Of Done Checklist</h1>
            </div>
            <div>
              <div className="tw-bg-gray-200 tw-h-32 tw-p-3 tw-m-3  ">
                <p>Add Comments Or Email</p>
              </div>
              <div className="tw-flex tw-justify-between tw-m-3">
                <div className="tw-flex tw-gap-x-2">
                  <CgAttachment size="30px" />
                  <GrEmoji size="30px" />
                </div>
                <div className="tw-flex tw-gap-x-2">
                  <svg
                    width="23"
                    height="25"
                    viewBox="0 0 23 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.30729 20H1.69778L2.83587 18.8619C3.44951 18.2483 3.83271 17.4501 3.93573 16.5843C1.30787 14.8598 0 12.3615 0 9.74236C0 4.9104 4.44102 0 11.3962 0C18.7644 0 22.7154 4.51849 22.7154 9.31902C22.7154 14.1512 18.7227 18.6667 11.3962 18.6667C10.1128 18.6667 8.77351 18.4953 7.57782 18.181C6.44596 19.3419 4.91236 20 3.30729 20Z"
                      fill="#FF00B8"
                    />
                  </svg>
                  <IoIosMail size="30px" />
                  <h3 className="tw-border-2  tw-border-black tw-ml-3 text-center tw-p-1 tw-text-green-900 rounded">
                    Comment
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="  move-task  tw-mx-auto">
        <div className="tw-my-8 tw-p-3 tw-container text-center">
          <h1 className="tw-lg tw-green-600 tw-my-4 parsonal-title">
            MOVE TASK TO
            {' '}
            <span className="tw-uppercase">In-Progress</span>
          </h1>
          <p>
            Claim task and notify project manager that the task is being done.
          </p>
          <div className="s-p-view tw-w-1/5 tw-text-center tw-mx-auto tw-my-6 ">
            <button
              type="button"
              className="green-btn  tw-rounded tw-p-2 tw-text-white sm:tw-w-32"
            >
              In-Progress
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TaskNameDescription;
