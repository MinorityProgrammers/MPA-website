import React, { useEffect, useState } from 'react';
import { RiFlag2Fill } from 'react-icons/ri';
import { BsThreeDotsVertical } from 'react-icons/bs';
import electProposal from './electProposal.json';

const TaskStatus = function () {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    setProposals(electProposal);
  }, []);

  return (
    <section className="elect-proposal tw-w-100">
      <div className="p-notification-banner tw-flex ">
        <div className="ch-pro notify tw-self-center tw-w-1/2">
          <img src="/assets/images/moderator/mod.png" alt="moderator" />
          <h2 className="text-center ">Proposal Notifications</h2>
          <p className="text-center">You have 5 new proposal notifications.</p>
        </div>
        <div className=" notify-img tw-w-1/2 tw-self-center">
          <img src="/assets/images/moderator/notification.png" alt="bg" />
        </div>
      </div>

      <div className="tw-container  tw-mx-auto tw-my-20 ">
        <div className="task-container ">
          <div className="palnnedTask tw-mr-2">
            <div className="palnnedTask-title tw-flex  tw-justify-center ">
              <p className="tw-mr-4">
                <img src="/assets/images/moderator/check-circle.png" alt="" />
              </p>
              <h3>Planned Task</h3>
            </div>

            <div className="tw-grid  tw-grid-cols-2 tw-mt-4">
              {proposals.slice(0, 4).map((proposal) => (
                <ProposalList {...proposal} key={proposal.id} />
              ))}
            </div>
          </div>

          <div className="palnnedTask  tw-mr-2">
            <div className="palnnedTask-title tw-flex  tw-justify-center ">
              <p className="tw-mr-4">
                <img src="/assets/images/moderator/check-circle.png" alt="" />
              </p>
              <h3>In Review Task</h3>
            </div>
            <div className="tw-grid  tw-grid-cols-2 tw-mt-4">
              {proposals.slice(0, 4).map((proposal) => (
                <ProposalList {...proposal} key={proposal.id} />
              ))}
            </div>
          </div>

          <div className="palnnedTask">
            <div className="palnnedTask-title tw-flex  tw-justify-center ">
              <p className="tw-mr-4">
                <img src="/assets/images/moderator/check-circle.png" alt="" />
              </p>
              <h3>Completed Task</h3>
            </div>

            <div className="tw-grid  tw-grid-cols-2 tw-mt-4">
              {proposals.slice(0, 4).map((proposal) => (
                <ProposalList {...proposal} key={proposal.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProposalList = function ({ id, sDes, flag }) {
  return (
    <div className="task-card tw-col-span-1 tw-mr-2 tw-mb-2">
      <div className="task-des tw-flex">
        <p className="tw-mr-3">{sDes}</p>
        <p>
          <img src="/assets/images/moderator/user.png" alt="" />
        </p>
      </div>
      <div className="task-date tw-flex tw-items-center tw-mt-4">
        <p className={`flag ${flag}`}>
          <RiFlag2Fill />
        </p>
        <p className=" tw-text-center tw-text-sm tw-text-black">May 27</p>
      </div>
      <div className="tw-flex tw-justify-between tw-mt-2">
        <div className="tw-text-blue-800">
          <p className=" design tw-text-sm tw-mb-3">Design</p>
          <p className=" develop tw-text-sm">Develop</p>
        </div>
        <div className="more-option tw-flex tw-self-center tw-h-auto">
          <p className="tw-text-blue-800">More Options</p>
          <p className="tw-text-black">
            <BsThreeDotsVertical />
          </p>
        </div>
      </div>
    </div>
  );
};
export default TaskStatus;
