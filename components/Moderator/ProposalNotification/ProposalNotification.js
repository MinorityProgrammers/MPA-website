import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PaginationData from './PaginationData';
import ApprovedRejected from './ApprovedRejected.js';
import Proposal from './Proposal';
import Loader from '../../Loader';
import Pagination from '../ElectProposals/Pagination';
import electProposal from '../electProposal.json';

const ProposalNotification = function () {
  const [approvedProposal, setApprovedProposal] = useState({ status: null, data: { data: 0 } });

  const [deniedProposal, setDenied] = useState({ status: null, data: { data: 0 } });

  // userDeniedProposal ___________________

  // userDeniedProposal ___________________

  // ______________________________________________________________________________________________________________________________________________________________________

  // // Function to sort the actions by amount or date

  return (

    <section className="elect-proposal tw-w-100">
      <div className="p-notification-banner tw-flex">
        <div className="ch-pro notify tw-self-center tw-w-1/2">
          <img src="/assets/images/moderator/mod.png" alt="moderator" />
          <h2 className="text-center ">Proposal Notifications</h2>
          <p className="text-center">You have 5 new proposal notifications.</p>
        </div>
        <div className="notify-img tw-w-1/2 tw-self-center">
          <img src="/assets/images/moderator/notification.png" alt="bg" />
        </div>
      </div>

      <div className="proposals-area tw-container  tw-rounded-lg tw-h-50 ">
        <div className="headline tw-text-left tw-mb-10">
          <h3 className="tw-text-white tw-text-2xl tw-font-bold">
            Other proposals below 10% percentile
          </h3>
          <p className="tw-text-white">
            Learn more about other proposals. Ban Users who post abusive
            comments.
          </p>
        </div>

        <PaginationData />

        {/*  */}
      </div>

      <div className="other-proposals-area tw-container  tw-rounded-lg tw-h-50 ">
        <div className="headline tw-text-left tw-mb-10">
          <h3 className="tw-text-white tw-text-2xl tw-font-bold">
            Proposals approved by core team.
          </h3>
          <p className="tw-text-white">
            The following proposals you are elected, were approved by the core
            team.
          </p>
        </div>
        {/* approvedProposal ______________________  */}

        <ApprovedRejected api={`${process.env.BASE_URI}/proposalStatus/approvedProposal" status="Approved`} />

        {/* approvedProposal ______________________  */}

      </div>

      <div className="other-proposals-area tw-container  tw-rounded-lg tw-h-50 ">
        <div className="headline tw-text-center tw-mb-10">
          <h3 className="tw-text-white tw-text-2xl tw-font-bold">
            Proposals rejected by core team.
          </h3>
          <p className="tw-text-white">
            The following proposals you elected, were rejected by the core team.
          </p>
        </div>
        <ApprovedRejected api={`${process.env.BASE_URI}/proposalStatus/userDeniedProposal`} status="Rejected" />
      </div>
    </section>
  );
};

export default ProposalNotification;
