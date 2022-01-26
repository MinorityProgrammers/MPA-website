import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import Moment from 'react-moment';

const Proposal = ({ proposal }) => {
  const [reply, setReply] = useState();
  const [views, setViews] = useState({ data: { data: [] } });
  const [upVotes, setUpVotes] = useState({ data: { data: 0 } });
  const [downVotes, setDownVotes] = useState({ data: { data: 0 } });

  const [votes, setVotes] = useState(null);

  const defaultVotes = downVotes.data.data.length;

  const token = window.localStorage.getItem('jwtToken');

  // Replies ___________________
  useEffect(() => {
    fetch(`${process.env.BASE_URI}/proposal/${proposal._id}/reply`)
      .then((response) => response.json())
      .then((response) => setReply(response.data.length));
  }, [proposal._id]);

  // Replies ___________________

  // Views _______________

  useEffect(() => {
    const res = axios.get(
      `${process.env.BASE_URI}/proposalViews/userProposalView`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.then((data) => setViews(data));
  }, [proposal._id]);

  // Views _______________

  // upVotes _______________

  useEffect(() => {
    const res = axios.get(
      `${process.env.BASE_URI}/upVotes/proposalUpvote/${proposal._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.then((data) => setUpVotes(data));
  }, []);

  // upVotes _______________

  // downVotes _______________

  useEffect(() => {
    const res = axios.get(
      `${process.env.BASE_URI}/downVotes/proposalDownvote/${proposal._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.then((data) => setDownVotes(data));
  }, []);

  // downVotes _______________

  return (
    <div
      className="elected-proposal  tw-bg-white d-flex-wrp tw-justify-between  tw-p-4 tw-mb-10"
      key={proposal.id}
    >
      <div className="s-p-title tw-mb-3">
        <div>
          <h3 className="tw-text-2xl tw-font-semibold">{proposal.title}</h3>
          <p>
            <span className="tw-mr-3">
              <strong>Type:</strong> {proposal.type}
            </span>

            <span>
              <strong>Category:</strong>{' '}
              {proposal.Category ? proposal.Category : 'Incubator'}
            </span>
          </p>
        </div>
        <div className="tw-mt-4">
          <div className="tw-h-2 tw-w-full tw-bg-gray-300 tw-rounded">
            <div
              style={{ width: `${proposal.progress}%` }}
              className="tw-h-full tw-rounded tw-bg-blue-500"
            />
          </div>
          <div className="progress_indicator d-flex-wrp r-t tw-justify-between res-t">
            <p className="">
              <FaSortUp />
              Unapproved
            </p>
            <p>
              <FaSortUp />
              Planned
            </p>
            <p>
              <FaSortUp />
              In Progress
            </p>
            <p>
              <FaSortUp />
              Completed
            </p>
          </div>
        </div>
      </div>
      <div className="views-replies tw-flex tw-flex-col">
        <div className=" tw-flex tw-mx-auto">
          <p className=" tw-mr-3 tw-text-center">
            <strong>{reply}</strong> <br /> Replies
          </p>
          <p className="tw-text-center">
            <strong>{views.data.data.length}</strong> <br /> Views
          </p>
        </div>

        <div className="elected ">
          <p className="tw-text-center">
            You <span className="tw-font-bold">Elected</span> this proposal on{' '}
            <br />
            <span>
              <Moment format="MMM D" withTitle>
                {proposal.createdAt}
              </Moment>
            </span>
          </p>
        </div>
      </div>
      <div className="btn-p tw-self-center">
        <p className="">
          <button type="button" className="elect-p-btn tw-shadow-lg">
            View Proposal
          </button>
        </p>
      </div>
      <div className="inc-dec-p tw-self-center">
        <p className="tw-flex tw-flex-col">
          <FaSortUp onClick={() => setVotes(upVotes.data.data.length)} />
          <strong className="tw--my-3">{votes || defaultVotes}</strong>
          <FaSortDown onClick={() => setVotes(downVotes.data.data.length)} />
        </p>
      </div>
    </div>
  );
};

export default Proposal;
