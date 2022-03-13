import React from 'react';

const Action = ({ actions }) => (
  <div className="actions">
    {actions.map((action) => (
      <div className="minority__earned__action__outer" key={action._id}>
        <div className="minority__earned__action">
          <div className="left-side">
            {action.category && (
              <img
                className="icon"
                src={`./assets/images/minority-earned/${action.category}.svg`}
                alt={action.category}
              />
            )}
            <div className="title">
              <p className="name">{action.name}</p>
              <p className="date">
                On
                {new Date(action.date).toDateString().substr(3)}
              </p>
            </div>
          </div>
          <div className="right-side">
            <p className="points">
              <span className="number__of__pts">{action.amount}</span>
              $MINORITY
            </p>
            <i className="fas fa-chevron-right mobile-arrow" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default Action;
