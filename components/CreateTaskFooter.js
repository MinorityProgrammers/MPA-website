import React from "react";

const CreateTaskFooter = () => {
  return (
    <div className="tw-grid tw-grid-cols-1">
      <div className="tw-bg-white tw-bg-opacity-40 tw-text-center tw-m-4 tw-h-56 tw-mb-16 tw-w-8/12 tw-place-self-center tw-p-16">
        <div className="tw-items-center tw-pb-10">
          <h1 className="tw-text-4xl tw-font-bold tw-text-blue-900">
            Change status of proposal
          </h1>
          <p className="tw-text-black">
            Notify users that the proposal moved to planned stage, once task has
            been created and assigned.
          </p>
          <p>
            <button className="tw-text-white tw-rounded tw-h-8 tw-w-24 tw-mt-4 tw-bg-blue-700">
              Planned
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskFooter;
