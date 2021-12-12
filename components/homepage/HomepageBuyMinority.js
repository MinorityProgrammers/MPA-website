import Link from 'next/link';
import React from 'react';

const HomepageBuyMinority = () => (
  <div className="homepage__buy">
    <div className="heading__number mt-5 mb-5">
      <h3 className="tw-text-blue-900">02</h3>
    </div>
    <div className="container">
      <div className="container-buy">
        <div className="content-buy">
          <div className="heading-buy mb-5">
            <h2 className="title-buy tw-text-blue-900">
              Buy $MINORITY
              {' '}
              <br />
              {' '}
              FAIR LAUNCH
            </h2>
          </div>
          <div className="link__container-buy">
            <Link href="#/register">
              <a>
                <div className="link-buy">
                  LEARN MORE
                  {' '}
                  <i className="fas fa-caret-down" />
                </div>
              </a>
            </Link>
          </div>
        </div>
        <div className="bg__container-buy">
          <img
            className="bg__image-buy"
            src="./assets/images/buy-$minority.png"
            alt=""
          />
        </div>
        <div className="bg__layer-buy" />
      </div>
    </div>
  </div>
);

export default HomepageBuyMinority;
