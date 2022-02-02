import React from 'react';
import { RiFlag2Fill } from 'react-icons/ri';
import { BsThreeDotsVertical } from 'react-icons/bs';

const TaskCard = () => (
  <div className="task-card  tw-mx-2 tw-gap-4 tw-mb-4 tw-rounded-bl-lg tw-rounded-br-3xl">
    <div className="task-des tw-flex ">
      <p className="tw-mr-3  tw-text-indigo-900 tw-font-extrabold">
        Lorem ipsum dolor sit amet, consecte tur adipiscing elit.
      </p>

      <div className="tw-block">
        <img
          src="/assets/images/coreteamimg/user.png"
          alt="user"
          className="tw-h-6 tw-w-6  tw-block"
        />
        <div className="gradient tw-rounded-full tw-h-6 tw-w-6 text-center tw-block">
          <span className="tw-purple-800 te-p-2">LA</span>
        </div>
      </div>
    </div>
    <div className="task-date tw-flex tw-items-center tw-my-2 ">
      <p className="flag pink ">
        <RiFlag2Fill />
      </p>
      <p className=" tw-text-center tw-text-sm tw-text-black">May 27</p>
    </div>
    <div className="tw-flex tw-justify-between ">
      <div className="tw-text-blue-800">
        <p className=" design-shape tw-text-sm tw-mb-3">Design</p>
        <p className=" develop-shape tw-text-sm">Develop</p>
      </div>
      <div className="more-option tw-flex tw-items-center tw-h-auto tw-inline">
        <p className="tw-text-blue-800 more-option">More Options</p>

        <BsThreeDotsVertical className="tw-text-black" />
      </div>
    </div>
  </div>
);

export default TaskCard;
