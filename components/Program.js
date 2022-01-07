import React from 'react';

const Program = (props) => (
  <div className="col-lg-6">
    <div className="pricing-one__single">
      <div className="pricing-one__inner">
        <img src={props.imgLink} width="90%" />
        <p>{props.description}</p>
      </div>
    </div>
  </div>
);

export default Program;
