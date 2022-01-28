import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import axios from 'axios';

const Proposal = (props) => {
  const {
    title,
    type,
    Category,
    proposal,
    createdAt,
    description,
    userName,
    _id,
    image,
  } = props;

  const [reply, setReply] = useState();

  const [views, setViews] = useState({ data: { data: [] } });

  const [upVotes, setUpVotes] = useState({ data: { data: 0 } });
  const [downVotes, setDownVotes] = useState({ data: { data: 0 } });

  const [votes, setVotes] = useState(null);

  const defaultVotes = downVotes.data.data.length;

  const token = window.localStorage.getItem('jwtToken');

  // Views _______________

  useEffect(() => {
    const res = axios.get(`${process.env.BASE_URI}/proposalViews`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.then((data) => setViews(data));
  }, []);
  // Views _______________

  // Replies ___________________
  useEffect(() => {
    fetch(`${process.env.BASE_URI}/proposal/${_id}/reply`)
      .then((response) => response.json())
      .then((response) => setReply(response.data.length));
  }, [_id]);

  // Replies ___________________

  // upVotes _______________

  useEffect(() => {
    const res = axios.get(
      `${process.env.BASE_URI}/upVotes/proposalUpvote/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    res.then((data) => setUpVotes(data));
  }, []);

  // upVotes _______________

  // downVotes _______________

  useEffect(() => {
    const res = axios.get(
      `${process.env.BASE_URI}/downVotes/proposalDownvote/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    res.then((data) => setDownVotes(data));
  }, []);

  // downVotes _______________
  return (
    <div className="single-proposal tw-bg-white tw-p-10 tw-mb-10" key={_id}>
      <div className="s-p-title tw-mb-3 tw-flex tw-justify-between">
        <div>
          <h3 className="tw-text-2xl tw-font-semibold">{title}</h3>
          <p>
            <span className="tw-mr-3">
              <strong>Type:</strong>
              {' '}
              {type}
            </span>

            <span>
              <strong>Category:</strong>
              {' '}
              {Category}
            </span>
          </p>
        </div>
        <div className="s-p-title-right">
          <h3>
            <span />
            {proposal}
          </h3>
        </div>
      </div>
      <hr />
      <div className="s-p-user d-flex-wrp tw-justify-between my-1">
        <div className="info tw-flex tw-self-center">
          <div className=" tw-mr-3">
            <img src={image} className="user-img" alt="user" />
          </div>

          <div className=" tw-mr-3 -mt-1">
            <p>
              Created by
              {' '}
              <br />
              {' '}
              <strong>{userName}</strong>
            </p>
          </div>

          <div className="">
            <p>
              Created on
              {' '}
              <br />
              <strong>
                <Moment format="MMM D" withTitle>
                  {createdAt}
                </Moment>
              </strong>
            </p>
          </div>
        </div>
        <div className="count tw-flex tw-self-center mr-t">
          <div className=" tw-mr-3">
            <p>
              <strong>{reply}</strong>
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
              <FaSortDown
                onClick={() => setVotes(downVotes.data.data.length)}
              />
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div className="s-p-description d-flex-wrp tw-justify-between tw-mt-3">
        <div className="description">
          <p>{description}</p>
        </div>
        <div className="s-p-view tw-w-1/5 tw-text-center mr-t">
          <p>
            <button type="button" className="elect-p-btn tw-shadow-lg">
              View Proposal
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Proposal;
