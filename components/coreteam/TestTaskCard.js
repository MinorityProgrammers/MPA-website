import React, { useState, createContext } from 'react';
import ReactTooltip from 'react-tooltip';
import { RiFlag2Fill } from 'react-icons/ri';
import { BsThreeDotsVertical } from 'react-icons/bs';
import userinfo from './User.json';

export const UserContext = createContext();
const TestTaskCard = ({ item, handlePriority }) => {
  const [open, setOpen] = useState(false);
  const [priority, setPriority] = useState('gray');
  const [newUser, setNewUser] = useState(false);
  const [users] = useState(userinfo);
  const [userCart, setUserCart] = useState([]);
  const handleUserCart = (addnew) => {
    const newUsers = [...userCart, addnew];
    setUserCart(newUsers);
  };

  const HandleRemoveUser = (id) => {
    const afterRemoveUsers = userCart.filter((remo) => remo.id !== id);
    setUserCart(afterRemoveUsers);
  };
  return (
    <UserContext.Provider value={priority}>
      <div className="task-card  tw-mx-2 tw-gap-4 tw-mb-4 tw-rounded-bl-lg tw-rounded-br-3xl">
        <div className="task-des tw-flex ">
          <p className="tw-mr-3  tw-text-indigo-900 tw-font-extrabold">
            {item.Description}
          </p>

          <div className="tw-block">
            <img
              src={item.img}
              alt="user"
              onClick={() => setNewUser(!newUser)}
              className="tw-h-6 tw-w-6  tw-block"
            />
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
                      <span>{user.name}</span>
                    </div>
                  </a>
                ))}
              </div>
            )}
            <div className="gradient tw-rounded-full tw-h-6 tw-w-6 text-center tw-block">
              <span className="tw-purple-800 te-p-2">LA</span>
            </div>
            {userCart
              && userCart.map((u) => (
                <div
                  className="tw-cursor-pointer tw-btn"
                  key={u.id}
                  onClick={() => HandleRemoveUser(u.id)}
                  data-tip={u.name}
                >
                  <img className="tw-h-5 tw-w-5" src={u.image} alt="" />
                  <ReactTooltip />
                </div>
              ))}
          </div>
        </div>
        <div className="task-date tw-flex tw-items-center tw-my-2 ">
          <div className="flag  ">
            <RiFlag2Fill
              className={`tw-text-${priority}-500 tw-m-1 tw-mt-2 tw-cursor-pointer`}
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div className="tw-absolute tw-z-24 tw-bg-white">
                <RiFlag2Fill
                  className="tw-text-red-500 tw-m-1 tw-mt-2 tw-cursor-pointer"
                  onClick={() => handlePriority(setPriority('red'), setOpen(!open))}
                />
                <RiFlag2Fill
                  className="tw-text-pink-500 tw-m-1 tw-mt-2 tw-cursor-pointer"
                  onClick={() => handlePriority(setPriority('pink'), setOpen(!open))}
                />
                <RiFlag2Fill
                  className="tw-text-yellow-500 tw-m-1 tw-mt-2 tw-cursor-pointer"
                  onClick={() => handlePriority(setPriority('yellow'), setOpen(!open))}
                />
                <RiFlag2Fill
                  className="tw-text-gray-500 tw-m-1 tw-mt-2 tw-cursor-pointer"
                  onClick={() => handlePriority(setPriority('gray'), setOpen(!open))}
                />
              </div>
            )}
          </div>
          <p className=" tw-text-center tw-text-sm tw-text-black">
            {item.createdOn}
          </p>
        </div>
        <div className="tw-flex tw-justify-between ">
          <div className="tw-text-blue-800">
            <p className=" design-shape tw-text-sm tw-mb-3">Design</p>
            <p className=" develop-shape tw-text-sm">Develop</p>
          </div>
          <div className=" tw-flex tw-items-center tw-h-auto tw-inline">
            <p className="tw-text-blue-800 more-option">More Options</p>

            <BsThreeDotsVertical className="tw-text-black" />
          </div>
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default TestTaskCard;
