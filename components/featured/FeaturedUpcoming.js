import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Form } from "react-bootstrap";
import FeaturedCard from "./FeaturedCard";

const FeaturedUpcoming = ({ data, setClickRegister, userData, allfunded }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState();
  const [searchResults, setSearchResults] = useState(data);

  const startupPerPage = 6;
  const pagesVisited = pageNumber * startupPerPage;

  const displayStartups = searchResults
    .slice(pagesVisited, pagesVisited + startupPerPage)
    .map((d, index) => (
      <div
        className="col-xl-4 col-lg-4 col-md-6 col-sm featured__card"
        key={`${index + 1}`}
      >
        <FeaturedCard
          data={d}
          setClickRegister={setClickRegister}
          userData={userData}
          allfunded={allfunded}
        />
      </div>
    ));

  const pageCount = Math.ceil(data.length / startupPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const filterNames = ({ name }) =>
    name.toLowerCase().indexOf(search.toLowerCase()) !== -1;

  useEffect(() => {
    if (!search) return setSearchResults(data);

    setSearchResults(data.filter(filterNames));
  }, [search]);

  return (
    <section className="featured__wrapper pb-5" id="all-startups">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 featured__text">
            <h2 className="featured__title mb-4">All Startups</h2>
            <div className="tw-flex tw-flex-row tw-justify-around tw-items-center">
              <Form.Control
                className="search__bar"
                placeholder="Search Startup"
                onChange={(e) => setSearch(e.target.value)}
              />
              <div>
                <button className="searchBtn" type="submit">
                  Search
                </button>
              </div>
            </div>
          </div>
          {!data ? (
            <div className="container text-center mt-3 mb-3 featured__card-empty">
              <h1 className="featured__card-title mb-3">
                There is no startup yet.
              </h1>
              <div className="btn__container">
                <a href="#" className="button btn-filled sm">
                  Start your own Startup
                </a>
              </div>
            </div>
          ) : (
            <>
              {displayStartups}
              <ReactPaginate
                previousLabel="<"
                nextLabel=">"
                marginPagesDisplayed={0}
                pageRangeDisplayed={2}
                breakLabel="..."
                breakClassName="break-me"
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName="paginationBttns"
                previousLinkClassName="previousBttn"
                nextLinkClassName="nextBttn"
                disabledClassName="paginationDisabled"
                activeClassName="paginationActive"
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedUpcoming;
