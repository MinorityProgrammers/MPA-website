import React, { useState } from "react";
import EventCard from "./EventCard";
import ReactPaginate from "react-paginate";

const PastEventCard = ({
  data,
  attended,
  userSavedEvents,
  userEvent,
  active,
  handleMoreInfo,
  setClickRegister,
  clickRegister,
  userData,
  token,
  allsavedEvents,
  getUserSavedEvents,
}) => {
  const [pageNumber, setPageNumber] = useState(0);

  const perPage = 4;
  const pagesVisited = pageNumber * perPage;

  const pageCount = Math.ceil(data?.length / perPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="container">
      <div className="past_event__container">
        {data?.slice(pagesVisited, pagesVisited + perPage).map((d, i) => (
          <EventCard
            item={d}
            attended={attended}
            userSavedEvents={userSavedEvents}
            userEvent={userEvent}
            key={`${`event_card${i}`}`}
            handleMoreInfo={handleMoreInfo}
            active={active}
            setClickRegister={setClickRegister}
            clickRegister={clickRegister}
            userData={userData}
            token={token}
            allsavedEvents={allsavedEvents}
            getUserSavedEvents={getUserSavedEvents}
          />
        ))}
      </div>
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        marginPagesDisplayed={0}
        pageRangeDisplayed={1}
        breakClassName="break-me"
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName="paginationBttns"
        previousLinkClassName="previousBttn"
        nextLinkClassName="nextBttn"
        disabledClassName="paginationDisabled"
        activeClassName="paginationActive"
      />
    </div>
  );
};

export default PastEventCard;
