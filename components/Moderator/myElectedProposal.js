import React, { useEffect, useState } from 'react';
import ComingSoon from '../ComingSoon';
import Loader from '../Loader';
import Proposal from './Proposal';
import Pagination from './ElectProposals/Pagination';

const MyElectedProposal = function () {
  const [actions, setActions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [actionsPerPage] = useState(4);
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
      fetch(`${process.env.BASE_URI}/proposal/`)
        .then((response) => response.json())
        .then((response) => {
          // setProposals (response.data)
          setAllData(response.data.reverse());
          setActions(response.data);
          setLoading(false);
          console.log(response);

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
    <section className="elect-proposal tw-w-100 ">
      {allData.length >= 1 && loading != true
        ? (
          <div>
            <div className="banner tw-flex tw-items-center ">
              <div className="ch-pro tw-self-center tw-w-1/2">
                <img src="/assets/images/moderator/mod.png" alt="moderator" />
                <h2 className="text-center">My elected proposals</h2>
                <p className="text-center">
                  Check the status of proposals you are elected.
                </p>
              </div>
              <div className=" tw-w-1/2">
                <img src="/assets/images/moderator/g12.png" alt="bg" />
              </div>
            </div>

            <div className="elected-proposals-area tw-container tw-mx-auto tw-rounded-lg tw-h-50 ">
              {currentActions.slice(0, 4).map((proposal) => (
                <Proposal proposal={proposal} />
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
          </div>
        )
        : <ComingSoon />}
    </section>

  );
};

export default MyElectedProposal;
