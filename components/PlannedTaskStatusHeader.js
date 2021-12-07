import { FaSortUp, FaSortDown } from 'react-icons/fa';

const PlannedTaskStatusHeader = function () {
  return (
    <div className="tw-grid tw-grid-cols-1 tw-bg-blue-900">
      <div className="single-proposal tw-w-11/12 tw-place-self-center tw--mb-16 tw-mt-16 tw-bg-white tw-p-10">
        <div className="s-p-title tw-mb-3 tw-flex tw-justify-between">
          <div>
            <h3 className="tw-text-2xl tw-font-semibold">Title</h3>
            <p>
              <span className="tw-mr-3">
                <strong>Type:</strong>
                {' '}
                Type
              </span>

              <span>
                <strong>Category:</strong>
                {' '}
                Category
              </span>
            </p>
          </div>
          <div className="s-p-title-right">
            <h3>Vote</h3>
          </div>
        </div>
        <hr />
        <div className="s-p-user tw-flex tw-justify-between my-1">
          <div className="info tw-flex tw-self-center">
            <div className=" tw-mr-3">
              <img src="/assets/images/moderator/user.png" alt="user" />
            </div>

            <div className=" tw-mr-3 -mt-1">
              <p>
                Created by
                {' '}
                <br />
                {' '}
                <strong>Created By</strong>
              </p>
            </div>

            <div className="">
              <p>
                Created on
                {' '}
                <br />
                {' '}
                <strong>Created On</strong>
              </p>
            </div>
          </div>
          <div className="count tw-flex tw-self-center">
            <div className=" tw-mr-3">
              <p>
                <strong>Replies</strong>
                {' '}
                <br />
                {' '}
                Replies
              </p>
            </div>

            <div className=" tw-mr-3">
              <p>
                <strong>Views</strong>
                {' '}
                <br />
                {' '}
                Views
              </p>
            </div>
            <div className=" ">
              <p className="tw-flex tw-flex-col">
                <FaSortUp />
                <strong className="tw--my-3">Count</strong>
                <FaSortDown />
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div className="s-p-description tw-flex tw-justify-between tw-mt-3">
          <div className="description tw-w-4/5">
            <p>description</p>
          </div>
          <div className="s-p-view tw-w-1/5 tw-text-center">
            <p>
              <button className="elect-p-btn tw-shadow-lg">Read more</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannedTaskStatusHeader;
