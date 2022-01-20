import React, { useState, createContext } from 'react';
import { RiFlag2Fill } from 'react-icons/ri';
import { BsThreeDotsVertical } from 'react-icons/bs';

export const UserContext = createContext();

const TaskStatus = function ({ item, handlePriority }) {
  const [creators, setCreators] = useState(false);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(false);
  const [develops, setDevelops] = useState(false);
  const [designs, setDesigns] = useState(false);
  const [priority, setPriority] = useState('green');
  const [userCart, setUserCart] = useState([]);
  // const [removedUser, setRemovedUser] = useState([]);

  const handleRemoveUser = (id) => {
    const afterRemovedUser = userCart.filter(
      (_removedUser) => _removedUser.id !== id,
    );
    setUserCart(afterRemovedUser);
  };

  const handleAddUser = (addNew) => {
    setUserCart({ ...userCart, addNew });
    setCreators(!creators);
  };

  const handleDevelop = () => {
    setDevelops(!develops);
  };
  const handleDesign = () => {
    setDesigns(!designs);
  };
  return (
    <UserContext.Provider value={priority}>
      <div className="tw-border tw-box-border tw-h-48 tw-w-48 tw-place-self-center note tw-rounded-bl-md tw-bg-white tw-rounded-br-3xl tw-p-1 tw-m-6">
        <div className="tw-grid tw-grid-cols-5">
          <p className="tw-col-span-4 tw-mt-5 tw-text-justify tw-text-purple-800 tw-font-semibold">
            {item.sDescription}
          </p>
          <div className="tw-grid tw-grid-cols-1">
            <div className="tw-flex">
              {userCart.length
                && userCart.forEach((user) => {
                  <img
                    src={user.img}
                    className="tw-h-6 tw-w-6 tw-rounded-full tw-place-self-center tw-mb-1 tw-mt-2"
                    onClick={(id) => handleRemoveUser(id, setCreators(!creators))}
                    alt=""
                  />;
                })}
              <img
                src="/assets/images/project/rafiul.jpg"
                className="tw-h-6 tw-w-6 tw-rounded-full tw-place-self-center tw-mb-1 tw-mt-2"
                onClick={() => setCreators(!creators)}
                alt="rafiul"
              />
            </div>
            {creators && (
              <div className="tw-grid tw-grid-cols-1">
                <div className="tw-absolute tw-z-20 tw-justify-end">
                  <img
                    src="/assets/images/project/rafiul.jpg"
                    className="tw-h-6 tw-w-6 tw-rounded-full tw-place-self-center tw-mb-1"
                    onClick={(addNew) => handleAddUser(addNew)}
                    alt="rafiul"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="tw-flex tw-z-10">
          <div className="tw-flex tw-justify-around">
            <div>
              <RiFlag2Fill
                className={`tw-text-${priority}-500 tw-m-1 tw-mt-2`}
                onClick={() => setOpen(!open)}
              />
              {open && (
                <div className="tw-absolute tw-z-20">
                  <RiFlag2Fill
                    className="tw-text-red-500 tw-m-1 tw-mt-2"
                    onClick={() => handlePriority(setPriority('red'), setOpen(!open))}
                  />
                  <RiFlag2Fill
                    className="tw-text-pink-500 tw-m-1 tw-mt-2"
                    onClick={() => handlePriority(setPriority('pink'), setOpen(!open))}
                  />
                  <RiFlag2Fill
                    className="tw-text-yellow-500 tw-m-1 tw-mt-2"
                    onClick={() => handlePriority(setPriority('yellow'), setOpen(!open))}
                  />
                </div>
              )}
            </div>
            <div className="tw-z-10">
              <p className="tw-text-center tw-text-sm tw-text-black tw-m-1">
                {item.createdOn}
              </p>
            </div>
          </div>
        </div>
        <div className="tw-flex tw-justify-between tw-mt-2">
          <div className="tw-text-blue-800">
            <p
              className="card-design tw-text-sm tw-ml-1 tw-mb-3"
              onClick={() => setDesigns(!designs)}
            >
              {item.design}
            </p>
            {designs && (
              <div className="tw-absolute tw-z-20">
                <p
                  className="card-design tw-text-sm tw-ml-1 tw-mb-3"
                  onClick={handleDesign}
                >
                  {item.design}
                </p>
              </div>
            )}
            <p
              className="card-develop tw-ml-1 tw-text-sm"
              onClick={() => setDevelops(!develops)}
            >
              {item.develop}
            </p>
            {develops && (
              <div className="tw-absolute tw-z-20">
                <p
                  className="card-develop tw-mt-1 tw-ml-1 tw-text-sm"
                  onClick={handleDevelop}
                >
                  {item.develop}
                </p>
              </div>
            )}
          </div>
          <div className="more-option tw-flex tw-self-center tw-h-auto">
            <p
              className="tw-text-blue-800 tw-text-xs"
              onClick={() => setOptions(!options)}
            >
              {item.options}
              More options
            </p>
            {options && (
              <div className="tw-absolute tw-z-20">
                <h3 className="tw-text-black tw-m-6 tw-z-10">
                  Something inside
                </h3>
              </div>
            )}
            <p className="tw-text-black">
              <BsThreeDotsVertical />
            </p>
          </div>
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default TaskStatus;
