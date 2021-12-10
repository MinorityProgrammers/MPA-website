import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import ApplyIcon from './svg/icons';

const JoinBar = function (props) {
  const buildMinorityHandler = () => {
    Router.push('/auth?redirect=startups');
  };

  return (
    <div>
      {props.link
        ? (
          <Link target={props.newWindow} href={props.link}>
            <div className="bar-container">
              <div className="first" style={{ backgroundColor: props.color }} />
              <div className="second">
                <div className="image">
                  {/* <img classname="svg" src={props.icon} alt="Join"/> */}
                  <a className="roundedArea">
                    <props.icon />
                  </a>
                </div>

                <div className="bar-content">
                  <div className="card-text">
                    <h3 className="maintext">{props.maintext}</h3>
                    <span className="subtext">{props.subtext}</span>
                  </div>

                  <div className="icon">
                    <FaChevronRight />
                  </div>
                </div>

              </div>

            </div>
          </Link>
        )
        : (
          <div className="bar-container" onClick={buildMinorityHandler}>
            <div className="first" style={{ backgroundColor: props.color }} />
            <div className="second">
              <div className="image">

                <a className="roundedArea">
                  <props.icon />
                </a>

              </div>

              <div className="bar-content">
                <div className="card-text">
                  <h3 className="maintext">{props.maintext}</h3>
                  <span className="subtext">{props.subtext}</span>
                </div>

                <div className="icon">
                  <FaChevronRight />
                </div>
              </div>

            </div>

          </div>
        )}
    </div>
  );
};

export default JoinBar;
