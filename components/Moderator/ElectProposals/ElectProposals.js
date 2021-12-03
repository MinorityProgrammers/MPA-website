import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaSortUp } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa";
import Moment from "react-moment";
import Pagination from './Pagination';
import Loader from '../../Loader';
import ComingSoon from "../../ComingSoon";
import TenPercentile from "./TenPercentile";

const ElectProposals = () => {
  const [proposals, setProposals] = useState([]);

  const [actions, setActions] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [actionsPerPage] = useState(4)
  const [sortType, setSortType] = useState('Sort By')
  const [filter, setFilter] = useState('all')
  const [categories, setCategories] = useState([])
  const [allData, setAllData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    filterArray()
  }, [filter])

  useEffect(() => {
    sortArray(sortType)
  }, [sortType])

  useEffect(() => {

    let uniqueCategories = []
    const allCategories = []

    // Fetch the action data. Set loading state to true before fetch, back to false after the fetch is complete
    const fetchData = () => {

      setLoading(true)
      fetch("https://koinstreet-learn-api.herokuapp.com/api/v1/proposal/")
        .then(response => response.json())
        .then((response) => {
          setProposals(response.data)
          setAllData(response.data.reverse())
          setActions(response.data)
          setLoading(false)


          // Set unique categories for filter dropdown
          response.data.map((action) => {
            allCategories.push(action.category)
          })
          uniqueCategories = [...new Set(allCategories)]
          setCategories(uniqueCategories)
        })
    }

    fetchData()

  }, [])

  // Function to sort the actions by amount or date
  const sortArray = type => {
    const types = {
      amountAsc: 'amount',
      amountDesc: 'amount',
      date: 'date'
    }

    const sortProperty = types[type]

    if (sortType == 'amountAsc') {
      const sorted = [...actions].sort((a, b) => a[sortProperty] - b[sortProperty])
      setActions(sorted)
    } else if (sortType == 'amountDesc') {
      const sorted = [...actions].sort((a, b) => b[sortProperty] - a[sortProperty])
      setActions(sorted)
    } else if (sortType == 'date') {
      const sorted = [...actions].sort((a, b) => new Date(a[sortProperty]) - new Date(b[sortProperty]))
      setActions(sorted)
    } else {
      setActions(allData)
    }
  }

  // Filter the array, sets current page back to 1 after filtering
  const filterArray = () => {
    setCurrentPage(1)
    if (filter != 'all') {
      for (let i = 0; i < categories.length; i++) {
        if (filter == categories[i]) {
          const filtered = [...allData].filter(action => action.category == categories[i])
          setActions(filtered)
        }
      }
    } else {
      setActions(allData)
    }
  }

  // Get current actions
  const indexOfLastAction = currentPage * actionsPerPage;
  const indexOfFirstAction = indexOfLastAction - actionsPerPage;
  const currentActions = actions.slice(indexOfFirstAction, indexOfLastAction)
  // Change page

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = (currentPage) => {
    if (currentPage === Math.ceil(actions.length / actionsPerPage)) {
      return
    }
    setCurrentPage(currentPage + 1)
  }

  const previousPage = () => {
    if (currentPage === 1) {
      return
    }
    setCurrentPage(currentPage - 1)
  }
  console.log("proposal Data", proposals)
  console.log("all data", allData)
  console.log("actions", actions)

  if (loading) {
    return (
      <div className='minority__earned__actions'>
        <Loader />
      </div>
    )
  }

  return (
    <section className="elect-proposal tw-w-100">

      {allData.length >= 1 && loading != true ?
        <div>
          <div>
          </div>
          <div className="banner tw-flex tw-items-center ">
            <div className="ch-pro tw-self-center tw-w-1/2">
              <img src="/assets/images/moderator/mod.png" alt="moderator" />
              <h2 className="text-center">Choose proposals to be elected</h2>
              <p className="text-center">
                You can elect upto 3 proposals a again day from the <br /> proposals
                that made it to the 10 % percentile.
              </p>
            </div>
            <div className="tw-w-1/2">
              <img src="/assets/images/moderator/g12.png" alt="bg" />
            </div>
          </div>

          <div className="proposals-area tw-container  tw-rounded-lg tw-h-50 ">
            <div className="headline tw-text-center tw-mb-10">
              <h3 className="tw-text-white tw-text-2xl tw-font-bold">
                Other proposals below 10% percentile
              </h3>
              <p className="tw-text-white">
                Learn more about other proposals. Ban Users who post abusive
                comments.
              </p>
            </div>


            {currentActions.map((proposal) => (
              <div
                className="single-proposal tw-bg-white tw-p-10 tw-mb-10"
                key={proposal.id}
              >
                <div className="s-p-title tw-mb-3">
                  <h3 className="tw-text-2xl tw-font-semibold"> {proposal.title ? proposal.title : "event proposal test"}</h3>
                  <p>
                    <span className="tw-mr-3">
                      <strong>Type:</strong> {proposal.type}
                    </span>

                    <span>
                      <strong>Category:</strong> {proposal.Category ? proposal.Category : "Incubator"}
                    </span>
                  </p>
                </div>
                <hr />
                <div className="s-p-user tw-flex tw-justify-between my-1">
                  <div className="info tw-flex tw-self-center">
                    <div className=" tw-mr-3">
                      <img src={proposal.userId.profilePicture} className="user-img" alt="user" />
                    </div>

                    <div className=" tw-mr-3 -mt-1">
                      <p>
                        Created by <br /> <strong>{proposal.userId.userName}</strong>
                      </p>
                    </div>

                    <div className="">
                      <p>
                        Created on <br /> <strong>

                          <Moment format="MMM D" withTitle>
                            {proposal.createdAt}
                          </Moment>

                        </strong>                  </p>
                    </div>
                  </div>
                  <div className="count tw-flex tw-self-center">
                    <div className=" tw-mr-3">
                      <p>
                        <strong>{proposal.replies ? proposal.replies : "58"}</strong> <br /> Replies
                      </p>
                    </div>

                    <div className=" tw-mr-3">
                      <p>
                        <strong>{proposal.views ? proposal.views : "75"}</strong> <br /> Views
                      </p>
                    </div>
                    <div className=" ">
                      <p className="tw-flex tw-flex-col">
                        <FaSortUp />
                        <strong className="tw--my-3">{proposal.count ? proposal.count : "250"}</strong>
                        <FaSortDown />
                      </p>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="s-p-description tw-flex tw-justify-between tw-mt-3">
                  <div className="description tw-w-4/5">
                    <p>{proposal.description}</p>
                  </div>
                  <div className="s-p-view tw-w-1/5 tw-text-center">
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

          <TenPercentile />

        </div> :

        <ComingSoon />
      }
    </section>
  );
};

export default ElectProposals;