import React from "react";
import Link from "next/link";
import { numFormat, convert, percentFund } from "../../helpers/formatIncubator";

const FeaturedMyCard = ({ data }) => (
  <div className="card card__container">
    <div className="card-body">
      <div className="card__header">
        <h2 className="card__header-title">{data.name}</h2>
        <img
          src={data.startupImage}
          className="card__header-logo"
          alt="startupImage"
        />
      </div>
      <div className="row container mb-3">
        <div className="card__info mr-auto">
          <p>Amount Invested</p>
          <h3 className="">${convert(data.amount)}</h3>
        </div>
        <div className="card__info">
          <p>Shares owned</p>
          <h3 className="">{convert(data.shares)}</h3>
        </div>
      </div>
      <div className="fund__container">
        <div className="fund__top">
          <h3 className="fund__topic">Fundraised</h3>
          <h3 className="fund__percentage">
            {percentFund(data.targetAmount, data.amount)}% complete
          </h3>
        </div>
        <h3 className="fund__amount">
          ${numFormat(data.amount)}
          /$
          {numFormat(data.targetAmount)}
        </h3>
        <div className="progress" style={{ borderRadius: "30px" }}>
          <div
            className="tw-bg-gray-700 "
            role="progressbar"
            style={{
              width: `${percentFund(data.targetAmount, data.amount)}%`,
              borderRadius: "30px",
            }}
            aria-valuenow="50"
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
      </div>
      <div className="card__button-container">
        <Link href={`/startup/${data._id}`}>
          <a className="button btn-filled">More Info</a>
        </Link>
      </div>
    </div>
  </div>
);

export default FeaturedMyCard;
