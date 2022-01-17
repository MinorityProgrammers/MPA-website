import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const options = [
  { value: 'user1', label: 'user1' },
  { value: 'user2', label: 'user2' },
  { value: 'user3', label: 'user3' },
];

let loggedInUser;
const CreateTask = () => {
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);
  const [openDefinition, setOpenDefinition] = useState(false);
  const [openSubTask, setOpenSubTask] = useState(false);

  const [selectedValue, setSelectedValue] = useState();

  const handleChangeDescripton = (e) => {
    setDescription(e.target.value);
  };
  const handleSubtask = () => {
    setOpenSubTask(!openSubTask);
  };
  const handleOpenDefinition = () => {
    setOpenDefinition(!openDefinition);
  };

  const handleAssignTask = () => {
    setOpen(!open);
  };

  const handleSelect = async (e) => {
    await setSelectedValue(Array.isArray(e) ? e.map((user) => user.value) : []);
  };

  const handleExpand = () => {
    console.log('you have assigned to the task');
  };
  const handleUpload = () => {
    const readyTask = {
      description,
      selectedValue,
    };
    useEffect(() => {
      fetch('/upload-task', {
        method: 'POST',
        header: { 'content-type': 'application/json' },
        body: JSON.stringify({ readyTask }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }, []);
  };

  return (
    <div className="tw-m-10 tw-p-10">
      <div className="tw-bg-white tw-p-10 tw-border-blue-900 tw-border-l-4 tw-border-r-4">
        <div className="tw-flex tw-m-4 tw-ml-16">
          <p className="tw-h-4 tw-mr-6 tw-mt-2 tw-w-4 tw-rounded-full tw-bg-yellow-400" />
          <h1 className="tw-text-2xl tw-font-bold tw-text-black tw-tracking-wider">
            TYPE TASK NAME HERE
          </h1>
        </div>
        <div className="tw-flex tw-justify-between tw-ml-16 tw-mr-16">
          <div className="tw-flex tw-justify-evenly">
            <img
              src="/assets/images/project/riflag.png"
              className="tw-h-8 tw-w-8 tw-place-self-center tw-ml-2 tw-mb-4"
              alt="riflag"
            />
            <img
              src="/assets/images/project/clipboard.png"
              className="tw-h-8 tw-w-8 tw-place-self-center tw-ml-2 tw-mb-4"
              alt="clipboard"
            />
            <img
              src="/assets/images/project/clip.png"
              className="tw-h-8 tw-w-8 tw-place-self-center tw-ml-2 tw-mb-4"
              alt="clip"
            />
            <img
              src="/assets/images/project/sandclock.png"
              className="tw-h-8 tw-w-8 tw-place-self-center tw-ml-2 tw-mb-4"
              alt="sandclock"
            />
            <img
              src="/assets/images/project/datastack.png"
              className="tw-h-8 tw-w-8 tw-place-self-center tw-ml-2 tw-mb-4"
              alt="datastack"
            />
            <img
              src="/assets/images/project/eyeplus.png"
              className="tw-h-9 tw-w-13 tw-place-self-center tw-ml-2 tw-mb-4"
              alt="eyeplus"
            />
          </div>
          <div className="tw-flex tw-justify-evenly">
            <p className="tw-m-3 tw-text-black">In</p>
            <div className="tw-flex-col tw-justify-center">
              <Select
                placeholder="Search List"
                onChange={(e) => handleSelect(e)}
                options={options}
                value={options.find((option) => option.value === selectedValue)}
                className="tw-h-6 tw-w-72 tw-cursor-pointer tw-m-1 tw-text-center"
                isMulti
              />
              <h3 className="tw-mt-12">{selectedValue}</h3>
            </div>
            <p className="tw-flex tw-m-2 tw-text-black tw-justify-evenly">
              For
            </p>
            <div className="tw-flex-col tw-m-1">
              <img
                onClick={handleAssignTask}
                src="/assets/images/project/people.png"
                className="tw-h-8 tw-w-8 tw-place-self-center tw-cursor-pointer tw-ml-3 tw-mb-1"
                alt="people"
              />
              {open && (
                <div className="tw-flex-col tw-m-1 tw--mb-32 tw-bg-blue-900 tw-absolute tw-z-20">
                  <img
                    onClick={handleExpand}
                    src={loggedInUser || '/assets/images/project/people.png'}
                    className="tw-h-8 tw-w-8 tw-place-self-center tw-cursor-pointer tw--mt-18 tw-ml-2 tw-mb-1"
                    alt="people"
                  />
                  <img
                    src={loggedInUser || '/assets/images/project/people.png'}
                    className="tw-h-8 tw-w-8 tw-place-self-center tw--mt-3 tw-ml-2 tw-mb-1"
                    alt="people"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="tw-grid tw-grid-cols-1 tw-z-10 tw-ab">
          <input
            onSelect={handleChangeDescripton}
            placeholder="Type task description here "
            className="tw-h-60 tw-w-11/12 tw-rounded-b-lg tw-place-self-center tw-text-black tw-border-gray-400 tw-m-5 tw-border-2 tw-placeholder-gray-400"
          />
        </div>
        <div className="tw-flex tw-justify-between tw-ml-16 tw-mr-16">
          <div className="tw-flex-col tw-text-black">
            <div className="tw-flex">
              <img
                onClick={handleSubtask}
                src="/assets/images/project/plus.png"
                className="tw-h-8 tw-cursor-pointer tw-w-8 tw-place-self-center tw-ml-2 tw-mb-4"
                alt="plus"
              />
              <p className="tw-ml-2">Add Subtask</p>
            </div>
            {openSubTask && (
              <div className="tw-flex-col tw-m-1">
                <input
                  placeholder="add additional task"
                  className="tw-border-black tw-border-2 tw-text-black"
                />
              </div>
            )}
            <div />
          </div>
          <div className="tw-flex-col tw-text-black">
            <div className="tw-flex">
              <p>Add Definition of done checklist</p>
              <img
                onClick={handleOpenDefinition}
                src="/assets/images/project/plus.png"
                className="tw-h-8 tw-cursor-pointer tw-w-8 tw-place-self-center tw-ml-2 tw-mb-4"
                alt="plus"
              />
            </div>
            {openDefinition && (
              <div className="tw-flex-col tw-m-1">
                <input
                  placeholder="add definition"
                  className="tw-border-black tw-border-2 tw-text-black"
                />
              </div>
            )}
            <div />
          </div>
        </div>
        <div className="tw-ml-16">
          <Select
            placeholder="Add attachment"
            onChange={(e) => handleSelect(e)}
            options={options}
            value={options.find((option) => option.value === selectedValue)}
            className="tw-h-6 tw-w-48 tw-cursor-pointer tw-m-1 tw-text-center"
            isMulti
          />
        </div>
        <div className="tw-flex tw-justify-between">
          <div />
          <div className="tw-mr-16 tw-p-16">
            <button
              type="button"
              onClick={handleUpload}
              className="tw-text-white tw-text-xl tw-rounded tw-h-10 tw-w-36 tw-mt-4 tw-bg-indigo-900"
            >
              Create Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
