import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../Loader';
import Proposal from './Proposal';
import Pagination from '../ElectProposals/Pagination';

const ApprovedRejected = function (props) {
  const { api, status } = props;

  // _________________________________________________________________________________________

  const [actions, setActions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [actionsPerPage] = useState(2);
  const [sortType/* , setSortType */] = useState('Sort By');
  const [filter/* , setFilter */] = useState('all');
  const [categories, setCategories] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to sort the actions by amount or date
  const sortArray = (type) => {
    const types = {
      amountAsc: 'amount',
      amountDesc: 'amount',
      date: 'date',
    };

    const sortProperty = types[type];

    if (sortType === 'amountAsc') {
      const sorted = [...actions].sort((a, b) => a[sortProperty] - b[sortProperty]);
      setActions(sorted);
    } else if (sortType === 'amountDesc') {
      const sorted = [...actions].sort((a, b) => b[sortProperty] - a[sortProperty]);
      setActions(sorted);
    } else if (sortType === 'date') {
      const sorted = [...actions].sort(
        (a, b) => new Date(a[sortProperty]) - new Date(b[sortProperty]),
      );
      setActions(sorted);
    } else {
      setActions(allData);
    }
  };

  // Filter the array, sets current page back to 1 after filtering
  const filterArray = () => {
    setCurrentPage(1);
    if (filter !== 'all') {
      for (let i = 0; i < categories.length; i += 1) {
        if (filter === categories[i]) {
          const filtered = [...allData].filter((action) => action.category === categories[i]);
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

  useEffect(() => {
    const uniqueCategories = [];
    const allCategories = [];

    const token = window.localStorage.getItem('jwtToken');
    setLoading(true);
    const res = axios.get(api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    res.then((response) => {
      setAllData(response.data.data.reverse());
      setActions(response.data.data);
      setLoading(false);

      response.data.data.forEach((action) => {
        allCategories.push(action.category);
      });
      setCategories(uniqueCategories);
    });
  }, []);

  // Get current actions
  const indexOfLastAction = currentPage * actionsPerPage;
  const indexOfFirstAction = indexOfLastAction - actionsPerPage;
  const currentActions = actions.slice(indexOfFirstAction, indexOfLastAction);
  // Change page

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

  if (loading) {
    return (
      <div className="minority__earned__actions">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      { allData.length >= 1 && loading !== true

        ? (
          <div>

            {currentActions.map((proposal) => (

              <Proposal
                key={proposal._id}
                _id={proposal._id}
                title={proposal.proposal_id.title}
                type={proposal.proposal_id.type}
                Category={proposal.proposal_id.Category ? proposal.Category : 'Incubator'}
                proposal={proposal.approved ? status : ''}
                createdAt={proposal.createdAt}
                description={proposal.proposal_id.description}
                userName={proposal.authorId.userName}
                image={proposal.authorId.profilePicture}
              />
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
        )

        : (
          <div className="single-proposal tw-bg-white tw-p-10 tw-mb-10">
            <h3 className="tw-text-black tw-text-2xl tw-font-bold"> Nothing  rejected by core team yet. </h3>
          </div>
        )}
    </div>
  );
};

export default ApprovedRejected;
