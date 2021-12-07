import { FaSortUp, FaSortDown } from 'react-icons/fa';

const ProposalDetailsHeader = function () {
  return (
    <div>
      <div className="tw-m-3">
        <h1 className="tw-font-bold tw-text-3xl tw-text-blue-900">
          Proposal Title
        </h1>
        <h1 className="tw-text-red-700">
          Type: Enhancement
          {' '}
          <span className="tw-ml-5">Category: Incubator</span>
        </h1>
      </div>
      <div className="tw-flex tw-justify-between tw-border-gray-600 tw-border-t-2 tw-border-b-2">
        <div>
          <div className="tw-flex">
            <div>
              <img src="/assets/images/project/flag.png" alt="task" />
            </div>
            <div className="tw-m-1 tw-p-2 tw-mt-4">
              <h1 className="tw-m-1 tw-text-center tw-text-black tw-text-xl">
                Created by
              </h1>
              <h1 className="tw-text-xl">Usename</h1>
            </div>
            <div className="tw-m-1 tw-p-2 tw-mt-4">
              <h1 className="tw-m-1 tw-text-center tw-text-black tw-text-xl">
                Created On
              </h1>
              <h1 className="tw-m-1 tw-text-xl">Date</h1>
            </div>
          </div>
        </div>
        <div className="tw-flex ">
          <div className="tw-m-1 tw-p-2 tw-mt-4">
            <h1 className="tw-m-1 tw-text-center tw-text-black tw-text-xl">
              58
            </h1>
            <h1 className="tw-text-xl">Replies</h1>
          </div>
          <div className="tw-m-1 tw-p-2 tw-mt-4">
            <h1 className="tw-m-1 tw-text-center tw-text-black tw-text-xl">
              74
            </h1>
            <h1 className="tw-m-1 tw-text-xl">Views</h1>
          </div>
          <div className="tw-place-self-center">
            <p className="tw-flex-col tw-items-center">
              <FaSortUp />

              <strong>267</strong>

              <FaSortDown />
            </p>
          </div>
        </div>
      </div>
      <div className="tw-flex tw-justify-between">
        <div>
          Details about proposal - Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nullam ornare ullamcorper tellus, vel euismod odio
          posuere ut. Quisque quis lacinia tortor. Donec auctor consectetur
          nibh, eu varius mi porta nec. Quisque ultricies odio vitae nibh
          malesuada tristique vel sed leo. Donec egestas, urna eu auctor
          ultricies, massa lorem pellentesque quam, vitae congue urna quam
          ultricies ex.
        </div>
        <div className="tw-grid tw-m-8 tw-items-center">
          <p>
            <button className="tw-h-10 tw-m-2 tw-text-xl tw-w-48 tw-text-center tw-border tw-rounded tw-border-purple-900 tw-text-blue-900">
              View Proposal
            </button>
          </p>
          <p>
            <button className="tw-h-10 tw-bg-blue-900 tw-text-xl tw-m-2 tw-rounded tw-w-48 tw-text-white tw-text-center">
              Create Task
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProposalDetailsHeader;
