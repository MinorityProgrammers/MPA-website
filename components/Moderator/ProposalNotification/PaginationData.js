import React, { useEffect, useState } from 'react';
import Pagination from '../ElectProposals/Pagination';
import Loader from '../../Loader';
import Proposal from './Proposal';

const PaginationData = function ({ api }) {
  const [actions, setActions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [actionsPerPage] = useState(2);
  const [sortType, setSortType] = useState('Sort By');
  const [filter, setFilter] = useState('all');
  const [categories, setCategories] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    filterArray();
  }, [filter]);

  useEffect(() => {
    sortArray(sortType);
  }, [sortType]);

  useEffect(() => {
    let uniqueCategories = [];
    const allCategories = [];

    // Fetch the action data. Set loading state to true before fetch, back to false after the fetch is complete
    const fetchData = () => {
      setLoading(true);
      fetch('https://koinstreet-learn-api.herokuapp.com/api/v1/proposal/')
        .then((response) => response.json())
        .then((response) => {
          setAllData(response.data.reverse());
          setActions(response.data);
          setLoading(false);

          // Set unique categories for filter dropdown
          response.data.map((action) => {
            allCategories.push(action.category);
          });
          uniqueCategories = [...new Set(allCategories)];
          setCategories(uniqueCategories);
        });
    };

    fetchData();
  }, []);

  // Function to sort the actions by amount or date
  const sortArray = (type) => {
    const types = {
      amountAsc: 'amount',
      amountDesc: 'amount',
      date: 'date',
    };

    const sortProperty = types[type];

    if (sortType == 'amountAsc') {
      const sorted = [...actions].sort((a, b) => a[sortProperty] - b[sortProperty]);
      setActions(sorted);
    } else if (sortType == 'amountDesc') {
      const sorted = [...actions].sort((a, b) => b[sortProperty] - a[sortProperty]);
      setActions(sorted);
    } else if (sortType == 'date') {
      const sorted = [...actions].sort((a, b) => new Date(a[sortProperty]) - new Date(b[sortProperty]));
      setActions(sorted);
    } else {
      setActions(allData);
    }
  };

  // Filter the array, sets current page back to 1 after filtering
  const filterArray = () => {
    setCurrentPage(1);
    if (filter != 'all') {
      for (let i = 0; i < categories.length; i++) {
        if (filter == categories[i]) {
          const filtered = [...allData].filter((action) => action.category == categories[i]);
          setActions(filtered);
        }
      }
    } else {
      setActions(allData);
    }
  };

  // Get current actions
  const indexOfLastAction = currentPage * actionsPerPage;
  const indexOfFirstAction = indexOfLastAction - actionsPerPage;
  const currentActions = actions.slice(indexOfFirstAction, indexOfLastAction);
  // Change page

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = (currentPage) => {
    if (currentPage === Math.ceil(actions.length / actionsPerPage)) {
      return;
    }
    setCurrentPage(currentPage + 1);
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
      { allData.length >= 1 && loading != true

        ? (
          <div>
            {currentActions.map((proposal) => (
              <Proposal
                _id={proposal._id}
                title={proposal.title ? proposal.title : 'event proposal test'}
                type={proposal.type}
                Category={proposal.Category ? proposal.Category : 'Incubator'}
                proposal="2 days left to vote"
                createdAt={proposal.createdAt}
                description={proposal.description}
                userName={proposal.userId.userName}
                image={proposal.userId.profilePicture}
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

        : ''}
    </div>
  );
};

export default PaginationData;
