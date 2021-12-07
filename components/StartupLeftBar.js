import React, { useState, useEffect } from 'react';
import { numFormat, convert } from '../helpers/formatIncubator';

const StartupLeftBar = function ({ data }) {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const { tags, website, location } = data;
  const websiteName = website
    .replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
    .split('.')[0];

  useEffect(() => {
    const l = location.map((lo) => {
      setCity(lo.city);
      setCountry(lo.state);
    });
  }, [data]);

  return (
    <>
      {/* portfolio section */}
      {data.shareOwner === true ? (
        <div className="row left__container">
          <div className="container p-4 mb-5">
            <h2 className="portfolio__header">Portfolio</h2>
            <div className="row container">
              <div className="col portfolio__items mb-3">
                <p>Amount Invested</p>
                <h3 className="portfolio__amount">{convert(data.amount)}</h3>
              </div>
              <div className="col portfolio__items">
                <p>Shares owned</p>
                <h3 className="portfolio__amount">{convert(data.shares)}</h3>
              </div>
            </div>
            <div className="row container">
              <div className="col portfolio__items">
                <p>Startup Valuation</p>
                <h3 className="portfolio__amount">
                  $
                  {convert(data.valuation)}
                </h3>
              </div>
              <div className="col portfolio__items">
                <p>Total Shares Volume</p>
                <h3 className="portfolio__amount">
                  {convert(data.totalShare)}
                </h3>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}

      {/* details section */}
      <div className="row left__container">
        <div className="container p-4">
          <div className="row container">
            <h2 className="left__topic">
              Founded
              {data.found}
            </h2>
          </div>
          <hr className="mt-3 mb-3" />
          <div className="row container d-flex flex-column">
            <div>
              <p className="left__detail-topic">Website</p>
              <a
                className="left__detail-detail tw-mb-2"
                href={`${data.website}`}
                target="_blank"
                rel="noreferrer"
              >
                {websiteName}
              </a>
              <a
                target="_blank"
                href={`${data.twitterLink}`}
                className="mr-2 ml-2"
                rel="noreferrer"
              >
                <i className="fab fa-twitter" />
              </a>
              <a
                target="_blank"
                href={`${data.facebookLink}`}
                className="mr-2 ml-2"
                rel="noreferrer"
              >
                <i className="fab fa-linkedin-in" />
              </a>
              <a
                target="_blank"
                href={`${data.linkedInLink}`}
                className="mr-2 ml-2"
                rel="noreferrer"
              >
                <i className="fab fa-facebook-f" />
              </a>
            </div>
            <p className="left__detail-topic">Location</p>
            <p className="left__detail-detail text-cap tw-mb-2">
              {city}
              ,
              {country}
            </p>
            <p className="left__detail-topic">Team Size</p>
            <p className="left__detail-detail tw-mb-2">
              {data.teamSizeMin}
              -
              {data.teamSizeMax}
              {' '}
              people
            </p>
            <p className="left__detail-topic">User Base</p>
            <p>
              {numFormat(data.userBase)}
              {' '}
              Users
            </p>
          </div>
          <hr className="mt-3 mb-3" />
          <div className="row container">
            <h2 className="left__topic mb-3 mt-1">Meet the team</h2>
          </div>
          <div className="row container d-flex flex-column">
            <hr className="mt-3 mb-3" />
            <div className="row container d-flex flex-column">
              <h2 className="left__topic mb-3 mt-1">Tags</h2>
              <div className="tags-container">
                {tags.map((t, i) => (
                  <a href="#" className="badge left__badge" key={i}>
                    {t}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default StartupLeftBar;
