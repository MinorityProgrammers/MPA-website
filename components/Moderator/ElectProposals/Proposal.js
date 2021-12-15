import React, { useState, useEffect } from 'react';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import Moment from 'react-moment';
import axios from 'axios';

const Proposal = function ({ proposal }) {
  const [views, setViews] = useState({ data: { data: [] } });
  const [reply, setReply] = useState();
  const [upVotes, setUpVotes] = useState({ data: { data: 0 } });
  const [downVotes, setDownVotes] = useState({ data: { data: 0 } });

  const [votes, setVotes] = useState(null);

  const defaultVotes = downVotes.data.data.length;

  // Replies ___________________

  useEffect(() => {
    fetch(`${process.env.BASE_URI}/proposal/${proposal._id}/reply`)
      .then((response) => response.json())
      .then((response) => setReply(response.data.length));
  }, [proposal._id]);

  // Replies ___________________

  // Views _______________
  const token = window.localStorage.getItem('jwtToken');

  useEffect(() => {
    const res = axios.get(`${process.env.BASE_URI}/proposalViews`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.then((data) => setViews(data));
  }, []);

  // upVotes _______________

  useEffect(() => {
    const res = axios.get(`${process.env.BASE_URI}/upVotes/proposalUpvote/${proposal._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.then((data) => setUpVotes(data));
  }, []);

  // upVotes _______________

  // downVotes _______________

  useEffect(() => {
    const res = axios.get(`${process.env.BASE_URI}/downVotes/proposalDownvote/${proposal._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.then((data) => setDownVotes(data));
  }, []);

  // downVotes _______________

  return (
    <div
      className="single-proposal tw-bg-white tw-p-10 tw-mb-10"
      key={proposal.id}
    >
      <div className="s-p-title tw-mb-3">
        <h3 className="tw-text-2xl tw-font-semibold">
          {' '}
          {proposal.title ? proposal.title : 'event proposal test'}
        </h3>
        <p>
          <span className="tw-mr-3">
            <strong>Type:</strong>
            {' '}
            {proposal.type}
          </span>

          <span>
            <strong>Category:</strong>
            {' '}
            {proposal.Category ? proposal.Category : 'Incubator' }
          </span>
        </p>
      </div>
      <hr />
      <div className="s-p-user d-flex-wrp tw-justify-between my-1">
        <div className="info tw-flex tw-self-center">
          <div className=" tw-mr-3">
            <img src={proposal.userId.profilePicture} className="user-img" alt="user" />
          </div>

          <div className=" tw-mr-3 -mt-1">
            <p>
              Created by
              {' '}
              <br />
              {' '}
              <strong>{proposal.userId.userName}</strong>
            </p>
          </div>

          <div className="">
            <p>
              Created on
              {' '}
              <br />
              {' '}
              <strong>

                <Moment format="MMM D" withTitle>
                  {proposal.createdAt}
                </Moment>

              </strong>
              {' '}

            </p>
          </div>
        </div>
        <div className="count tw-flex tw-self-center mr-t">
          <div className=" tw-mr-3">
            <p>
              {reply == 0 ? <strong> 1 </strong> : <strong>{reply}</strong> }
              {' '}
              <br />
              {' '}
              Replies
            </p>
          </div>

          <div className=" tw-mr-3">
            <p>
              <strong>{views.data.data.length}</strong>
              {' '}
              <br />
              {' '}
              Views
            </p>
          </div>
          <div className=" ">
            <p className="tw-flex tw-flex-col">
              <FaSortUp onClick={() => setVotes(upVotes.data.data.length)} />
              <strong className="tw--my-3">{votes || defaultVotes}</strong>
              <FaSortDown onClick={() => setVotes(downVotes.data.data.length)} />
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div className="s-p-description d-flex-wrp tw-justify-between tw-mt-3">
        <div className="description">
          <p>{proposal.description}</p>
        </div>
        <div className="s-p-view tw-w-1/5 tw-text-center mr-t">
          <p className="tw-mb-5">
            <button className="view-p-btn tw-shadow-lg">
              View Proposal
            </button>
          </p>
          <p>
            <button className="elect-p-btn tw-shadow-lg">
              Elect Proposal
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Proposal;
