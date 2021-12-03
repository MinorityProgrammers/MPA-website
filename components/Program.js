import React from 'react';
import Link from 'next/link';

const Program = (props) => {
    return (
        <div className="col-lg-6">
        <div className="pricing-one__single">
            <div className="pricing-one__inner">                           
              {/* <h2 className="pricing-one__price">ThinkTank </h2>
              <p className="pricing-one__name">Policy & Tech R&D</p> */}
                <img src={props.imgLink} width="90%"></img>
                <p>{props.description}</p>
                {/* <a href={props.link} className="thm-btn pricing-one__btn">Apply</a> */}
            
            </div>
        </div>
    </div>
    );
};

export default Program;
