import React from 'react';

const Pagination = function ({
  actionsPerPage, totalActions, paginate, currentPage, nextPage, previousPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalActions / actionsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  const maxPage = Math.ceil(totalActions / actionsPerPage);

  return (
    <nav>
      <ul className="d-flex-wrp">
        <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
          <span className="page-link" onClick={() => previousPage(currentPage)}><i className="fas fa-chevron-left mobile-arrow" /></span>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className={`page-item${currentPage === number ? ' active' : ''}`}>
            <span onClick={() => paginate(number)} className="page-link">
              {number}
            </span>
          </li>
        ))}
        <li className={`page-item${currentPage === maxPage ? ' disabled' : ''}`}>
          <span className="page-link" onClick={() => nextPage(currentPage)}><i className="fas fa-chevron-right mobile-arrow" /></span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
