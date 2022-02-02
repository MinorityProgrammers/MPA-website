/* eslint-disable jsx-a11y/heading-has-content */
import { RiFlag2Fill } from 'react-icons/ri';
import { BsThreeDotsVertical } from 'react-icons/bs';
import React, { useState, useEffect } from 'react';
import taskNotification from './taskNotification.json';

const TaskNotification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications(taskNotification);
  }, []);
  return (
    <div className="tw-m-28">
      <div className="tw-grid tw-grid-cols-12 tw-bg-white tw-bg-opacity-50">
        <h1 className="tw-col-span-1 tw-font-bold tw-text-3xl tw-text-center tw-text-blue-800">
          NEW
        </h1>
        <h1 className="tw-col-span-11 tw-border-t-2 tw-mt-4 tw-align-middle tw-border-blue-800" />
      </div>
      <div className="tw-grid tw-grid-cols-2">
        <div className="tw-grid tw-grid-cols-1 tw-bg-black tw-bg-opacity-25 tw-m-8 tw-rounded-b-lg">
          <div className="tw-flex tw-place-self-center tw-justify-center tw-items-center tw-bg-NavDark tw-w-full tw-border-t-4 tw-border-white tw-rounded-b-lg tw-h-16">
            <img
              className="tw-h-8 tw-w-8 tw-m-2"
              src="/assets/images/project/tick.png"
              alt="tick"
            />
            <p className="tw-text-white tw-text-3xl">Completed Task</p>
          </div>

          <div className="tw-grid tw-grid-cols-2 tw-m-8 tw-place-self-center">
            {notifications.slice(0, 4).map((notification) => (
              <div className="tw-border tw-box-border tw-h-48 tw-w-48 note tw-rounded-bl-md tw-bg-white tw-rounded-br-3xl tw-p-1 tw-m-3">
                <div className="tw-grid tw-grid-cols-5">
                  <p className="tw-col-span-4 tw-mt-5 tw-text-justify tw-text-purple-800 tw-font-semibold">
                    {notification.sDes}
                  </p>
                  <img
                    src="/assets/images/project/rafiul.jpg"
                    className="tw-h-6 tw-w-6 tw-rounded-full tw-place-self-center tw-mb-4"
                    alt="rafiul"
                  />
                </div>
                <div className="tw-flex">
                  <div className="tw-flex tw-justify-around">
                    <div>
                      <RiFlag2Fill className="tw-text-pink-500 tw-m-1 tw-mt-2" />
                    </div>
                    <div>
                      <p className="tw-text-center tw-text-sm tw-text-black tw-m-1">
                        {notification.createdOn}
                      </p>
                    </div>
                  </div>
                  <div />
                </div>

                <div className="tw-flex tw-justify-between tw-mt-2">
                  <div className="tw-text-blue-800">
                    <p className="card-design tw-text-sm tw-ml-1 tw-mb-3">
                      {notification.design}
                    </p>
                    <p className="card-develop tw-ml-1 tw-text-sm">
                      {notification.develop}
                    </p>
                  </div>
                  <div className="more-option tw-flex tw-self-center tw-h-auto">
                    <p className="tw-text-blue-800 tw-text-xs">More Options</p>
                    <p className="tw-text-black">
                      <BsThreeDotsVertical />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="tw-grid tw-grid-cols-1 tw-bg-black tw-bg-opacity-25 tw-m-8 tw-rounded-b-lg">
          <div className="tw-flex tw-place-self-center tw-justify-center tw-items-center tw-bg-NavDark tw-w-full tw-border-t-4 tw-border-white tw-rounded-b-lg tw-h-16">
            <img
              className="tw-h-8 tw-w-8 tw-m-2"
              src="/assets/images/project/tick.png"
              alt="tick"
            />
            <p className="tw-text-white tw-text-3xl">Completed Task</p>
          </div>

          <div className="tw-grid tw-grid-cols-2 tw-m-8 tw-place-self-center">
            {notifications.slice(0, 3).map((notification) => (
              <div className="tw-border tw-box-border tw-h-48 tw-w-48 note tw-rounded-bl-md tw-bg-white tw-rounded-br-3xl tw-p-1 tw-m-3">
                <div className="tw-grid tw-grid-cols-5">
                  <p className="tw-col-span-4 tw-mt-5 tw-text-justify tw-text-purple-800 tw-font-semibold">
                    {notification.sDes}
                  </p>
                  <img
                    src="/assets/images/project/rafiul.jpg"
                    className="tw-h-6 tw-w-6 tw-rounded-full tw-place-self-center tw-mb-4"
                    alt="rafiul"
                  />
                </div>
                <div className="tw-flex">
                  <div className="tw-flex tw-justify-around">
                    <div>
                      <RiFlag2Fill className="tw-text-pink-500 tw-m-1 tw-mt-2" />
                    </div>
                    <div>
                      <p className="tw-text-center tw-text-sm tw-text-black tw-m-1">
                        {notification.createdOn}
                      </p>
                    </div>
                  </div>
                  <div />
                </div>

                <div className="tw-flex tw-justify-between tw-mt-2">
                  <div className="tw-text-blue-800">
                    <p className="card-design tw-text-sm tw-ml-1 tw-mb-3">
                      {notification.design}
                    </p>
                    <p className="card-develop tw-ml-1 tw-text-sm">
                      {notification.develop}
                    </p>
                  </div>
                  <div className="more-option tw-flex tw-self-center tw-h-auto">
                    <p className="tw-text-blue-800 tw-text-xs">More Options</p>
                    <p className="tw-text-black">
                      <BsThreeDotsVertical />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="tw-grid tw-mt-16 tw-grid-cols-12 tw-bg-white tw-bg-opacity-50">
        <h1 className="tw-col-span-1 tw-font-bold tw-text-3xl tw-text-center tw-text-blue-800">
          NEW
        </h1>
        <h1 className="tw-col-span-11 tw-border-t-2 tw-mt-4 tw-align-middle tw-border-blue-800" />
      </div>
      <div className="tw-grid  tw-grid-cols-2">
        <div className="tw-grid tw-grid-cols-1 tw-bg-black tw-bg-opacity-25 tw-m-8 tw-rounded-b-lg">
          <div className="tw-flex tw-place-self-center tw-justify-center tw-items-center tw-bg-NavDark tw-w-full tw-border-t-4 tw-border-white tw-rounded-b-lg tw-h-16">
            <img
              className="tw-h-8 tw-w-8 tw-m-2"
              src="/assets/images/project/tick.png"
              alt="tick"
            />
            <p className="tw-text-white tw-text-3xl">Completed Task</p>
          </div>

          <div className="tw-grid tw-grid-cols-2 tw-m-8 tw-place-self-center">
            {notifications.slice(0, 4).map((notification) => (
              <div className="tw-border tw-box-border tw-h-48 tw-w-48 note tw-rounded-bl-md tw-bg-white tw-rounded-br-3xl tw-p-1 tw-m-3">
                <div className="tw-grid tw-grid-cols-5">
                  <p className="tw-col-span-4 tw-mt-5 tw-text-justify tw-text-purple-800 tw-font-semibold">
                    {notification.sDes}
                  </p>
                  <img
                    src="/assets/images/project/rafiul.jpg"
                    className="tw-h-6 tw-w-6 tw-rounded-full tw-place-self-center tw-mb-4"
                    alt="rafiul"
                  />
                </div>
                <div className="tw-flex">
                  <div className="tw-flex tw-justify-around">
                    <div>
                      <RiFlag2Fill className="tw-text-pink-500 tw-m-1 tw-mt-2" />
                    </div>
                    <div>
                      <p className="tw-text-center tw-text-sm tw-text-black tw-m-1">
                        {notification.createdOn}
                      </p>
                    </div>
                  </div>
                  <div />
                </div>

                <div className="tw-flex tw-justify-between tw-mt-2">
                  <div className="tw-text-blue-800">
                    <p className="card-design tw-text-sm tw-ml-1 tw-mb-3">
                      {notification.design}
                    </p>
                    <p className="card-develop tw-ml-1 tw-text-sm">
                      {notification.develop}
                    </p>
                  </div>
                  <div className="more-option tw-flex tw-self-center tw-h-auto">
                    <p className="tw-text-blue-800 tw-text-xs">More Options</p>
                    <p className="tw-text-black">
                      <BsThreeDotsVertical />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="tw-grid tw-grid-cols-1 tw-bg-black tw-bg-opacity-25 tw-m-8 tw-rounded-b-lg">
          <div className="tw-flex tw-place-self-center tw-justify-center tw-items-center tw-bg-NavDark tw-w-full tw-border-t-4 tw-border-white tw-rounded-b-lg tw-h-16">
            <img
              className="tw-h-8 tw-w-8 tw-m-2"
              src="/assets/images/project/tick.png"
              alt="tick"
            />
            <p className="tw-text-white tw-text-3xl">Completed Task</p>
          </div>

          <div className="tw-grid tw-grid-cols-2 tw-m-8 tw-place-self-center">
            {notifications.slice(0, 4).map((notification) => (
              <div className="tw-border tw-box-border tw-h-48 tw-w-48 note tw-rounded-bl-md tw-bg-white tw-rounded-br-3xl tw-p-1 tw-m-3">
                <div className="tw-grid tw-grid-cols-5">
                  <p className="tw-col-span-4 tw-mt-5 tw-text-justify tw-text-purple-800 tw-font-semibold">
                    {notification.sDes}
                  </p>
                  <img
                    src="/assets/images/project/rafiul.jpg"
                    className="tw-h-6 tw-w-6 tw-rounded-full tw-place-self-center tw-mb-4"
                    alt="rafiul"
                  />
                </div>
                <div className="tw-flex">
                  <div className="tw-flex tw-justify-around">
                    <div>
                      <RiFlag2Fill className="tw-text-pink-500 tw-m-1 tw-mt-2" />
                    </div>
                    <div>
                      <p className="tw-text-center tw-text-sm tw-text-black tw-m-1">
                        {notification.createdOn}
                      </p>
                    </div>
                  </div>
                  <div />
                </div>

                <div className="tw-flex tw-justify-between tw-mt-2">
                  <div className="tw-text-blue-800">
                    <p className="card-design tw-text-sm tw-ml-1 tw-mb-3">
                      {notification.design}
                    </p>
                    <p className="card-develop tw-ml-1 tw-text-sm">
                      {notification.develop}
                    </p>
                  </div>
                  <div className="more-option tw-flex tw-self-center tw-h-auto">
                    <p className="tw-text-blue-800 tw-text-xs">More Options</p>
                    <p className="tw-text-black">
                      <BsThreeDotsVertical />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskNotification;
