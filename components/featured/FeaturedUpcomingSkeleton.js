import React from 'react';
import ReactPaginate from 'react-paginate';
import { Form } from 'react-bootstrap';
import FeaturedCardSkeleton from './FeaturedCardSkeleton';

const FeaturedUpcomingSkeleton = () => (
  <section className="featured__wrapper pb-5" id="all-startups">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 featured__text">
          <h2 className="featured__title">All Startups</h2>
          <Form.Control className="search__bar" placeholder="Search Startup" />
          <p className="featured__subtitle">
            These visionary companies and disruptors are on their journey to
            change the world.
          </p>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm featured__card">
          <FeaturedCardSkeleton />
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm featured__card">
          <FeaturedCardSkeleton />
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm featured__card">
          <FeaturedCardSkeleton />
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm featured__card">
          <FeaturedCardSkeleton />
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm featured__card">
          <FeaturedCardSkeleton />
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm featured__card">
          <FeaturedCardSkeleton />
        </div>
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          marginPagesDisplayed={0}
          pageRangeDisplayed={2}
          breakLabel="..."
          breakClassName="break-me"
          pageCount={2}
          onPageChange={() => null}
          containerClassName="paginationBttns"
          previousLinkClassName="previousBttn"
          nextLinkClassName="nextBttn"
          disabledClassName="paginationDisabled"
          activeClassName="paginationActive"
        />
      </div>
    </div>
  </section>
);

export default FeaturedUpcomingSkeleton;
