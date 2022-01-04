import { FaSortUp, FaSortDown } from 'react-icons/fa';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import approvedproposal from './ProjectManager/approvedproposal.json';

// Currently using JSON data for dynamic loading
// After completing backend JSON should be removed and Proposals data will be loading-
//  through getStaticProps function instead of useEffect hooks
export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3000/getProposalsdata');
  const data = await res.json();

  return {
    props: {
      proposals: data,
    },
  };
};

const ApprovedProposals = function () {
  const [proposals, setProposals] = useState([]);
  const [votes, setVotes] = useState(0);
  // This votes should ve post to database as API and will be shown on page loading from DB through API
  useEffect(() => {
    setProposals(approvedproposal);
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/addVote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(votes),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('saved to server');
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="sm:tw-grid sm:tw-grid-cols-1 sm:tw-p-2 sm:tw-m-2 tw-p-4 tw-m-16 md:tw-m-8 tw-rounded-2xl tw-bg-purple-800 ">
      {proposals.slice(0, 4).map((proposal) => (
        <div
          className={`tw-flex tw-h-48  sm:tw-h-96 sm:tw-p-4 sm:tw-grid sm:tw-grid-cols-1 md:tw-w-11/12 sm:tw-w-66 tw-justify-between md:tw-pl-2 tw-pl-8 tw-m-8 tw-bg-white  tw-place-self-center tw-border-r-8 tw-border-${proposal.border}-500 tw-border-l-8`}
        >
          <div className="tw-m-3 sm:tw-mb-0 ">
            <h1 className="tw-font-bold tw-text-3xl sm:tw-text-xl md:tw-text-xl tw-text-blue-900">
              {proposal.title}
            </h1>
            <div className="tw-flex sm:tw-grid  sm:tw-grid-cols-1">
              <h1 className="tw-text-red-700 md:tw-m-2 tw-m-2 sm:tw-text-sm sm:tw-font-bold">
                Type: {proposal.type}
              </h1>
              <h1 className="tw-text-red-700 md:tw-m-2 tw-m-2 sm:tw-text-sm sm:tw-font-bold">
                Category: {proposal.category}
              </h1>
            </div>
            <div className="tw-flex">
              <div className="tw-m-1 tw-p-2 tw-mt-4">
                <h1 className="tw-m-1 tw-text-center tw-text-black tw-text-xl">
                  {proposal.replies}
                </h1>
                <h1 className="tw-text-xl sm:tw-text-sm sm:tw-font-bold">
                  Replies
                </h1>
              </div>
              <div className="tw-m-1 tw-p-2 tw-mt-4">
                <h1 className="tw-m-1 tw-text-center tw-text-black tw-text-xl">
                  {proposal.views}
                </h1>
                <h1 className="tw-m-1 tw-text-xl sm:tw-text-sm sm:tw-font-bold">
                  Views
                </h1>
              </div>
            </div>
          </div>
          <div className="tw-flex tw-m-3 sm:tw-grid sm:tw-grid-cols-2 sm:tw-mt-0 sm:tw-mr-2 tw-mr-8">
            <div className="tw-grid tw-m-6 sm:tw-m-1 tw-items-center">
              <Link href={`/viewTask/${proposal.id}`}>
                <div>
                  <p>
                    <button className="tw-h-10 tw-text-xl sm:tw-mb-2 sm:tw-text-sm sm:tw-w-12 sm:tw-p-0 tw-w-48 md:tw-w-36 tw-border tw-rounded tw-text-center tw-border-purple-900 tw-text-blue-900">
                      View Proposal
                    </button>
                  </p>
                </div>
              </Link>
              <Link href={`/createTask/${proposal.id}`}>
                <div>
                  <p>
                    <button className="tw-h-10 tw-text-xl sm:tw-text-sm sm:tw-w-4/12 sm:tw-mt-2 md:tw-w-36 tw-w-48 tw-rounded tw-text-white tw-text-center tw-bg-blue-900">
                      Create Task
                    </button>
                  </p>
                </div>
              </Link>
            </div>
            <div className="tw-place-self-center tw-m-4 tw-text-center sm:tw-ml-16">
              <p
                onClick={() => setVotes(votes + 1)}
                className="tw-flex-col tw-text-5xl sm:tw-text-5xl tw--m-6"
              >
                <FaSortUp />
              </p>
              <p className="tw-text-xl tw-text-center sm:tw--m-2 md:tw--m-2 tw--m-2">
                {proposal.voteCount}
              </p>
              <p
                onClick={() => setVotes(votes - 1)}
                className="tw-text-5xl sm:tw-text-5xl tw--m-6"
              >
                <FaSortDown />
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApprovedProposals;
