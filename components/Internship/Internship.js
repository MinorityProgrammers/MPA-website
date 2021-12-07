import React, { useEffect, useContext, useState } from 'react';

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
//   Modal.setAppElement('#yourAppElement');

const Internship = function ({ data }) {
  console.log(data);

  return (
    <section>
      <div className="internship__intro pl-5 pr-5">
        <div className="internship__info p-2">
          <p>
            Students across the world are given hands-on experience working with corporate teams (15-20 hours weekly). Implementing Agile SCRUM methodologies, interns use the leading project management tool ClickUp, have tri-weekly daily standups, bi-monthly sprint review, retrospective, and backlog grooming sessions with 24/7 support from mentors and other developers.
          </p>
          <p>  Interns are assigned to complete a 3-month roadmap and SMART goal for their internship after which the hiring team evaluates  to best place the intern in teams and project tasks that give the most exposure to what that intern wants to learn. After this tailored experience, interns will have a portfolio or relevant projects and industry knowledge that will prepare them for the workforce.</p>
          <span>
            Hello, (
            {data.firstName}
            )
          </span>
        </div>
      </div>

    </section>
  );
};

export default Internship;
