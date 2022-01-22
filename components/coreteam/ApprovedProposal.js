import React, { useEffect, useState } from 'react';
import { BiCheckCircle } from 'react-icons/bi';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import Loader from '../Loader';
import Pagination from '../Moderator/ElectProposals/Pagination';

const ApprovedProposal = () => {
  const [, setProposals] = useState([]);
  const [actions, setActions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [actionsPerPage] = useState(4);
  const [sortType] = useState('Sort By');
  const [filter] = useState('all');
  const [categories, setCategories] = useState([]);
  const [allData, setAllData] = useState([]);
  const [, setLoading] = useState(false);

  useEffect(() => {
    let uniqueCategories = [];
    let allCategories = [];

    const fetchData = () => {
      setLoading(true);
      fetch(`${process.env.BASE_URI}/proposal/`)
        .then((response) => response.json())
        .then((response) => {
          setProposals(response.data);
          setAllData(response.data.reverse());
          setActions(response.data);
          setLoading(false);
          allCategories = response.data.map((action) => action.category);
          uniqueCategories = [...new Set(allCategories)];
          setCategories(uniqueCategories);
        });
    };

    fetchData();
  }, []);

  const sortArray = (type) => {
    const types = {
      amountAsc: 'amount',
      amountDesc: 'amount',
      date: 'date',
    };

    const sortProperty = types[type];

    if (sortType === 'amountAsc') {
      const sorted = [...actions].sort(
        (a, b) => a[sortProperty] - b[sortProperty]
      );
      setActions(sorted);
    } else if (sortType === 'amountDesc') {
      const sorted = [...actions].sort(
        (a, b) => b[sortProperty] - a[sortProperty]
      );
      setActions(sorted);
    } else if (sortType === 'date') {
      const sorted = [...actions].sort(
        (a, b) => new Date(a[sortProperty]) - new Date(b[sortProperty])
      );
      setActions(sorted);
    } else {
      setActions(allData);
    }
  };

  const filterArray = () => {
    setCurrentPage(1);
    if (filter !== 'all') {
      for (let i = 0; i < categories.length; i += 1) {
        if (filter === categories[i]) {
          const filtered = [...allData].filter(
            (action) => action.category === categories[i]
          );
          setActions(filtered);
        }
      }
    } else {
      setActions(allData);
    }
  };

  useEffect(() => {
    filterArray();
  }, [filter]);

  useEffect(() => {
    sortArray(sortType);
  }, [sortType]);

  const indexOfLastAction = currentPage * actionsPerPage;
  const indexOfFirstAction = indexOfLastAction - actionsPerPage;
  const currentActions = actions.slice(indexOfFirstAction, indexOfLastAction);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = (_currentPage) => {
    if (_currentPage === Math.ceil(actions.length / actionsPerPage)) {
      return;
    }
    setCurrentPage(_currentPage + 1);
  };

  const previousPage = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };
  return (
    <div className="tw-container tw-mx-auto ">
      {currentActions.length ? (
        <div className=" tw-rounded-lg approved">
          <div className="tw-p-4 tw-text-white tw-m-4">
            <h1 className="tw-uppercase tw-text-2xl">approved Proposals.</h1>
            <p>
              <small>The following proposals you voted got approved.</small>
            </p>
          </div>

          {currentActions.map((info) => (
            <div
              className={`tw-p-4 tw-m-8   tw-bg-white tw-text-dark tw-mb-6 tw-border-t-8  tw-border-${info.borderColor}-500`}
            >
              <div className="pl-5 pr-5">
                <div className=" tw-flex tw-justify-between ">
                  <div className="">
                    <h1 className="parsonal-title ">Proposal Title</h1>
                    <p>
                      {' '}
                      <small>Type : Enhancement</small>{' '}
                      <small>Catergory : Incubator</small>
                    </p>
                  </div>
                  <div className="tw-flex tw-items-center">
                    <BiCheckCircle
                      className="approved-icon tw-rounded-full tw-text-white "
                      size="20px"
                    />
                    <p className="tw-ml-2 tw-text-purple-600 tw-text-lg">
                      <strong>Approved</strong>
                    </p>
                  </div>
                </div>
                <hr />
                <div className="tw-flex tw-justify-between tw-items-center ">
                  <div className="tw-flex">
                    <img src="/assets/images/coreteamimg/user.png" alt="user" />
                    <div className="tw-mr-3">
                      <p className="tw-text-muted">Created by </p>
                      <h4 className="tw-text-black">{info.createdBy}</h4>
                    </div>
                    <div>
                      <p className="tw-text-muted">Created on </p>
                      <h4 className="tw-text-black">{info.createdOn}</h4>
                    </div>
                  </div>
                  <div className="tw-flex tw-items-center">
                    <div className="tw-mr-3 tw-text-center">
                      <h3>{info.replies}</h3>
                      <p className="text-muted">Replies</p>
                    </div>

                    <div className="tw-ml-3 tw-text-center">
                      <h3>{info.views}</h3>
                      <p className="text-muted">Views</p>
                    </div>
                    <p className="tw-flex tw-flex-col tw-items-center tw-ml-3">
                      <FaSortUp size="27px" />
                      <strong className="tw--my-3">{info.voteCount}</strong>

                      <FaSortDown size="27px" />
                    </p>
                  </div>
                </div>
                <hr />
                <div className="s-p-description tw-flex tw-justify-between tw-items-center">
                  <div className="description tw-w-4/5">
                    <p>{info.description} </p>
                  </div>
                  <div className="s-p-view tw-w-1/5 tw-text-center">
                    <p>
                      <button
                        type="button"
                        className="green-btn tw-p-2 tw-rounded tw-text-white"
                      >
                        View Proposal
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Pagination
            actionsPerPage={actionsPerPage}
            totalActions={actions.length}
            paginate={paginate}
            currentPage={currentPage}
            nextPage={nextPage}
            previousPage={previousPage}
          />
        </div>
      ) : (
        <div className="minority__earned__actions">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default ApprovedProposal;
