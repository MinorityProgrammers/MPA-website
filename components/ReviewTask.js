import { MdArrowDropDown } from 'react-icons/md';
import { CgAttachment } from 'react-icons/cg';
import { GrEmoji } from 'react-icons/gr';
import { BiMessageRounded } from 'react-icons/bi';
import { IoIosMail } from 'react-icons/io';

const ReviewTask = function () {
  return (
    <div className="tw-grid tw-grid-cols-1 tw-mb-16">
      <div className="tw-w-11/12 tw-place-self-center tw-mt-32 tw-shadow-2xl">
        <div className="tw-bg-white tw-p-10">
          <div className="tw-flex tw-justify-between">
            <div className="tw-flex tw-justify-evenly">
              <p className="tw-text-black tw-m-2">In</p>
              <p className="tw-m-2">
                Category
                <span className="tw-text-black">{'>'}</span>
                <span>Subcategory </span>
              </p>
              <p className="tw-mt-2 tw-ml-2 tw-text-black">For </p>
              <div className="tw-mt-2 tw-ml-1">
                <img
                  src="/assets/images/project/rafiul.jpg"
                  className="tw-h-6 tw-w-6 tw-rounded-full tw-place-self-center tw-mb-4"
                />
              </div>
            </div>
            <div className="tw-flex">
              <div className="tw-m-3">
                <img
                  src="/assets/images/project/print.png"
                  className="tw-h-6 tw-w-6 tw-place-self-center tw-mb-2"
                />
              </div>
              <div className="tw-m-3">
                <img
                  src="/assets/images/project/share.png"
                  className="tw-h-6 tw-w-6 tw-place-self-center tw-mb-2"
                />
              </div>
            </div>
          </div>
          <div>
            <p className="tw-m-3 tw-text-black tw-font-semibold tw-text-lg tw-space-x-2">
              Task Name Here
            </p>
            <div className="tw-flex tw-justify-between">
              <div className="tw-flex tw-justify-between tw-m-5">
                <div className="tw-flex">
                  <p className="card-design tw-w-12 tw-ml-2 tw-h-6 tw-text-sm tw-mb-3">
                    Design
                  </p>
                  <p className="card-develop tw-w-14 tw-ml-2 tw-h-6 tw-text-sm">
                    Feature
                  </p>
                  <img
                    src="/assets/images/project/clip.png"
                    className="tw-h-6 tw-w-6 tw-place-self-center tw-ml-2 tw-mb-4"
                  />
                  <img
                    src="/assets/images/project/datastack.png"
                    className="tw-h-6 tw-w-6 tw-place-self-center tw-ml-2 tw-mb-4"
                  />
                  <img
                    src="/assets/images/project/riflag.png"
                    className="tw-h-6 tw-w-6 tw-place-self-center tw-ml-2 tw-mb-4"
                  />
                </div>
              </div>
              <div className="tw-flex tw-mr-5">
                <p className="tw-place-self-center tw-ml-2 tw-mb-4 tw-text-xs">
                  CREATED
                </p>
                <p className=" tw-place-self-center tw-ml-2 tw-mb-4 tw-text-xs">
                  TIME TRACKED
                </p>
                <p className=" tw-place-self-center tw-ml-2 tw-mb-4 tw-text-xs">
                  ESTIMATE
                </p>
                <p className=" tw-place-self-center tw-ml-2 tw-mb-4 tw-text-xs">
                  START DATE
                </p>
                <p className=" tw-place-self-center tw-ml-2 tw-mb-4 tw-text-xs">
                  DUE DATE
                </p>
                <div className="tw-h-6 tw-w-10 tw-place-self-center tw-ml-2 tw-mb-4 tw-text-xs">
                  <img
                    src="/assets/images/project/eye.png"
                    className="tw-h-6 tw-w-10 tw-place-self-center tw-mb-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tw-w-11/12 tw-place-self-center">
        <div className="tw-shadow-inner tw-bg-gray-100 shadow-lg">
          <div className="tw-grid tw-grid-flow-col tw-grid-cols-2 tw-gap-4 tw-justify-between">
            <div className=" tw-overflow-y-auto tw-h-48 ">
              <div>
                <h1 className=" text-center">Task Description</h1>
              </div>
              <div>
                <div className="tw-bg-gray-200 tw-h-32 tw-p-3 tw-m-3 tw-relative ">
                  <h1>Task description here</h1>
                  <div className="tw-absolute tw-bottom-0 tw-right-0">
                    <select
                      className=" tw-bg-white tw-pl-2 tw-text-sm tw-w-40 tw-text-black"
                      value="Add Attachments"
                    >
                      <option value="pending">Add Attachments</option>
                      <option value="onGoing">OnGing</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                </div>
                <div className=" tw-flex tw-justify-center  ">
                  <button className="tw-bg-white shadow tw-p-2">
                    {' '}
                    Show More
                  </button>
                </div>
                <div className="tw-flex items-center tw-gap-x-2 tw-ml-4">
                  <svg
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

                <div className="tw-bg-gray-200 tw-h-6 tw-ml-2 tw-pl-3 tw-rounded tw-my-3">
                  <p className="">Sub Task description here</p>
                </div>
              </div>
            </div>

            {/* Right Site--------- */}
            <div className=" tw-overflow-y-auto tw-h-48 ">
              <div>
                <h1 className="text-center">Definition Of Done Checklist</h1>
              </div>
              <div>
                <div className="tw-bg-gray-200 tw-h-48 tw-p-3 tw-m-3  ">
                  <div className="tw-flex tw-items-center tw-justify-start tw-gap-2">
                    <div className="tw-bg-gray-400 tw-h-2 tw-w-2" />

                    <p>Checklist Point 1</p>
                  </div>
                  <div className="tw-flex tw-items-center tw-justify-start tw-gap-2">
                    <div className="tw-bg-gray-400 tw-h-2 tw-w-2" />

                    <p>Checklist Point 1</p>
                  </div>
                  <div className="tw-flex tw-items-center tw-justify-start tw-gap-2">
                    <div className="tw-bg-gray-400 tw-h-2 tw-w-2" />

                    <p>Checklist Point 1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Down part ------------ */}
        <hr />
        <div className="tw-shadow-inner tw-h-5/6 tw-bg-gray-100 shadow-lg">
          <div className="tw-grid tw-grid-flow-col tw-grid-cols-2 tw-gap-4 tw-justify-between ">
            <div className=" tw-overflow-y-auto tw-h-32 tw-mt-4">
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
            <div className=" tw-overflow-y-auto tw-h-32  tw-mt-4">
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
      </div>
      <div className="tw-grid tw-grid-cols-11">
        <div className="tw-bg-blue-900 tw-text-center tw-border-2 tw-border-white tw-col-span-5 tw-m-1 tw-mt-8 tw-h-56 tw-mb-16 tw-w-10/12 tw-place-self-center tw-p-16">
          <div className="tw-items-center tw-pb-10">
            <h1 className="tw-text-2xl tw-font-bold tw-text-white">
              SEND TASK BACK TO CORE TEAM
            </h1>
            <p className="tw-text-white tw-text-sm tw-font-thin tw-text-center">
              Send the task back to core team if the task
              {' '}
              <br />
              {' '}
              doesnt meet
              definition of done.
            </p>
            <p>
              <button className="tw-text-black tw-rounded tw-h-8 tw-w-24 tw-mt-4 tw-bg-white">
                Send
              </button>
            </p>
          </div>
        </div>
        <div className="tw-grid tw-grid-cols-1">
          <div className="tw-border-l-2 tw-place-self-center tw-h-24 tw-mt-4 tw-border-black" />
          <div className="tw-place-self-center tw-text-black">Or</div>
          <div className="tw-border-l-2 tw-place-self-center tw-h-24 tw-mb-4 tw-border-black" />
        </div>
        <div className="tw-bg-white tw-bg-opacity-40 tw-border-2 tw-border-black tw-col-span-5 tw-text-center tw-mt-8 tw-m-1 tw-h-56 tw-mb-16 tw-w-10/12 tw-place-self-center tw-p-16">
          <div className="tw-items-center tw-pb-10">
            <h1 className="tw-text-2xl tw-font-bold tw-text-blue-900">
              CHANGE STATUS OF PROPOSAL
            </h1>
            <p className="tw-text-black tw-text-sm tw-font-thin tw-text-center">
              Notify users that the proposal moved to completed stage,
              <br />
              {' '}
              once task has been checked to satisfy DOD.
            </p>
            <p>
              <button className="tw-text-white tw-rounded tw-h-8 tw-w-24 tw-mt-4 tw-bg-blue-700">
                Completed
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewTask;
