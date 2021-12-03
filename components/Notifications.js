import React from 'react'
import { FcMoneyTransfer } from 'react-icons/fc';
import { MdDateRange } from 'react-icons/md';

function Notifications() {
    return (
        <div
                    className={`tw-flex tw-items-center tw-justify-around tw-p-2 tw-border-b  tw-cursor-pointer  tw-border-gray-200 `}
                  >
                    <div className="icon tw-bg-yellow-400 tw-cursor-pointer tw-rounded-md  tw-p-1 md:tw-p-3">
                      <FcMoneyTransfer className="tw-text-2xl tw-mr-6" />
                    </div>

                    <div className="tw-text tw-ml-4">
                      <h3 className="tw-text-sm tw-font-light tw-text-gray-600 hover:tw-text-primary-200">
                        {' '}
                        Hey Pex how was the weekend{' '}
                      </h3>

                      <span className="tw-flex tw-text-xs tw-pt-1 ">
                        {' '}
                        <MdDateRange className="tw-text-sm tw-mr-1 " /> Feb 2 2020
                      </span>
                    </div>
                  </div>
    )
}

export default Notifications
