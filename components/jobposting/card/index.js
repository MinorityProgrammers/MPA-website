import React, { useState } from 'react';
import styles from './job-card.module.css';

const JobCard = function ({
  limit,
  body,
  savejob,
  buttonClick,
  cardClick,
  pageNumber,
}) {
  const initDataShow = limit && body ? body.slice(0, Number(limit)) : body;
  const [jobs] = useState(initDataShow);

  const jobsPerPage = 5;
  const pagesVisited = pageNumber * jobsPerPage;

  const displayedUsers = jobs
    .slice(pagesVisited, pagesVisited + jobsPerPage)
    .map((item, index) => (
      <div>
        {body && (
        <div
          key={`${index + 1}`}
          onClick={(e) => cardClick(e, item, index)}
          className={styles.root}
        >
          <div className={styles.header}>
            <h1 className="job-stub-title">{item.job_title}</h1>
            <div className="job-stub-company">
              {item?.companyId?.company_name}
            </div>
          </div>
          <div className={styles.footer}>
            <span>
              Posted:
              {' '}
              {new Date(item.updatedAt).toDateString().substr(3)}
            </span>
            <button type="button" onClick={() => buttonClick(item)}>{savejob}</button>
          </div>
        </div>
        )}
      </div>
    ));

  // const [dataShow, setDataShow] = useState(initDataShow);
  // const [currPage, setCurrPage] = useState(1);

  // const pageNumbers = [];

  // for (let i = 1; i <= Math.ceil(body.length / Number(limit)); i++) {
  //   pageNumbers.push(i);
  // }

  // // if (limit !== undefined) {
  // //   let page = Math.floor(body.length / Number(limit));
  // //   pages = body.length % Number(limit) === 0 ? page : page + 1;
  // //   // pageNumbers = [...Array(pages).keys()];
  // // }

  // /**{ACTION WHEN USERS GO TO NEXT PAGE} */
  // const nextPageClick = page => {
  //   const start = Number(limit) * page;
  //   const end = start + Number(limit);

  //   setDataShow(body.slice(start, end));

  //   setCurrPage(page);
  // };

  // /**{ACTION WHEN USERS GO TO PREVIOUS PAGE} */

  // const previousPageClick = () => {

  // }

  // const paginate = pageNumber => setCurrPage(pageNumber);

  // const nextPage = currPage => {
  //   if (currPage === Math.ceil(body.length / limit)) {
  //     return;
  //   }
  //   nextPageClick(currPage);
  //   setCurrPage(currPage + 1);
  // };

  // const previousPage = currPage => {
  //   if (currPage === 1) {
  //     return;
  //   }
  //   setCurrPage(currPage - 1);
  // };

  // let maxPage = Math.ceil(body.length / limit);

  return <>{displayedUsers}</>;
};

export default JobCard;

// <nav>
//   <ul className="pagination">
//     <li className={`page-item${currPage === 1 ? " disabled" : ""}`}>
//       <span
//         className="page-link"
//         onClick={() => previousPage(currPage)}
//       >
//         <i className="fas fa-chevron-left mobile-arrow"></i>
//       </span>
//     </li>
//     {pageNumbers.map(number => (
//       <li
//         key={number}
//         className={`page-item${currPage === number ? " active" : ""}`}
//       >
//         <span onClick={() => paginate(number)} className="page-link">
//           {number}
//         </span>
//       </li>
//     ))}
//     <li
//       className={`page-item${currPage === maxPage ? " disabled" : ""}`}
//     >
//       <span className="page-link" onClick={() => nextPage(currPage)}>
//         <i className="fas fa-chevron-right mobile-arrow"></i>
//       </span>
//     </li>
//   </ul>
// </nav>
