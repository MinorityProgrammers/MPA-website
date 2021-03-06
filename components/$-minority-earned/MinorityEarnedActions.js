import React, { useState, useEffect, Fragment } from 'react';
import Action from './Action';
import Pagination from './Pagination';
import NoData from './NoData';
import Loader from '../Loader';

const MinorityEarnedActions = () => {
  const [actions, setActions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [actionsPerPage] = useState(5);
  const [sortType, setSortType] = useState('Sort By');
  const [filter, setFilter] = useState('all');
  const [categories, setCategories] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);

  const filterArray = () => {
    setCurrentPage(1);
    if (filter !== 'all') {
      for (let i = 0; i < categories.length; i += 1) {
        if (filter === categories[i]) {
          const filtered = [...allData].filter(
            (action) => action.category === categories[i],
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

  const sortArray = (type) => {
    const types = {
      amountAsc: 'amount',
      amountDesc: 'amount',
      date: 'date',
    };

    const sortProperty = types[type];

    if (sortType === 'amountAsc') {
      const sorted = [...actions].sort(
        (a, b) => a[sortProperty] - b[sortProperty],
      );
      setActions(sorted);
    } else if (sortType === 'amountDesc') {
      const sorted = [...actions].sort(
        (a, b) => b[sortProperty] - a[sortProperty],
      );
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

  useEffect(() => {
    sortArray(sortType);
  }, [sortType]);

  useEffect(() => {
    let uniqueCategories = [];
    let allCategories = [];

    const fetchData = () => {
      setLoading(true);
      fetch(`${process.env.BASE_URI}/minority_earned/`)
        .then((response) => response.json())
        .then((response) => {
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
    <div
      className={`minority__earned__actions${
        allData.length >= 1 ? '' : ' small'
      }`}
    >
      {allData.length >= 1 && loading !== true ? (
        <>
          <div className="sort">
            <select
              name="filter"
              defaultValue="category"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="category" disabled>
                Category
              </option>
              <option value="all">All</option>
              {categories.map((category, idx) => (
                <option value={category} key={`${category + idx}`}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            <select
              name="sort"
              defaultValue="sort-by"
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="sort-by" disabled>
                Sort By
              </option>
              <option value="amountAsc">Amount &#8593;</option>
              <option value="amountDesc">Amount &#8595;</option>
              <option value="date">Date</option>
            </select>
          </div>

          <Action actions={currentActions} />
          <Pagination
            actionsPerPage={actionsPerPage}
            totalActions={actions.length}
            paginate={paginate}
            currentPage={currentPage}
            nextPage={nextPage}
            previousPage={previousPage}
          />
        </>
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default MinorityEarnedActions;
