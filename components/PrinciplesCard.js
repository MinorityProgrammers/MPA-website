import React from 'react';
// import Head from 'next/head';
import Link from 'next/link';

const PrinciplesCard = (props) => {

    return (
              <div className="item">
              <div className={props.item.category}>
                <div className="course-category-one__icon">
                  <i className={props.item.icon}></i>      
                </div>
                <h3 className="course-category-one__title">
                  <a href={props.item.link}>{props.item.name}</a>
                </h3>
              </div>
            </div>
    );
}

export default PrinciplesCard;