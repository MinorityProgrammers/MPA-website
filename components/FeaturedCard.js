import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { numFormat, percentFund } from '../helpers/formatIncubator';
import FeaturedPopup from './FeaturedPopup';
import { errorToast, successToast } from '../contexts/utils/toasts';

const FeaturedCard = function ({
  data, setClickRegister, userData, allfunded,
}) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [secondPopup, setSecondPopup] = useState(false);
  const [amount, setAmount] = useState();

  const fundStartup = async (id, token) => {
    await axios
      .post(
        `${process.env.BASE_URI}/funded`,
        {
          startup_id: id,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        successToast(res.data.message);
        setButtonPopup(false);
        setSecondPopup(false);
      })
      .catch((err) => {
        errorToast(err);
      });
  };
  const inputAmount = (e) => {
    e.preventDefault();
    setAmount(e.target.value);
  };

  const signIfNotLoggedIn = (data) => {
    const token = window.localStorage.getItem('jwtToken');
    if (userData === undefined) {
      setClickRegister(true);
      errorToast('Log in to continue');
    } else {
      fundStartup(data._id, token);
    }
  };

  return (
    <>
      <div className="card card__container">
        <div className="card-body">
          <div className="card__header">
            <img src={data.startupImage} className="card__header-logo" />
            <h2 className="card__header-title">{data.name}</h2>
          </div>
          <p className="card-text card__text">
            {`${data.about.substring(
              0,
              50,
            )}...`}
          </p>

          <div className="fund__container">
            <div className="fund__top">
              <h3 className="fund__topic">Fundraised</h3>
              <h3 className="fund__percentage">
                {percentFund(data.targetAmount, data.amount)}
                % complete
              </h3>
            </div>
            <h3 className="fund__amount">
              $
              {numFormat(data.amount)}
              /$
              {numFormat(data.targetAmount)}
            </h3>
            <div className="progress" style={{ borderRadius: '30px' }}>
              <div
                className="tw-bg-gray-700"
                role="progressbar"
                style={{
                  width: `${percentFund(data.targetAmount, data.amount)}%`,
                  borderRadius: '30px',
                }}
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          </div>

          <div className="card__button-container md:tw-flex-col">
            {/* Add popup when button is clicked */}
            {!allfunded.includes(data._id) && (
              <button
                style={{ outline: 'none' }}
                className="button btn-filled"
                onClick={() => (userData !== null
                  ? setButtonPopup(true)
                  : setClickRegister(true))}
              >
                Fund Startup
              </button>
            )}
            <Link href={`/startup/${data._id}`}>
              <a className="button btn-outline">Learn More</a>
            </Link>
          </div>
        </div>
      </div>
      {/* Popup content */}
      <FeaturedPopup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <div className="card__header">
          <img src={data.startupImage} className="card__header-logo" />
          <h2 className="card__header-title">{data.name}</h2>
        </div>
        <p style={{ marginTop: '20px' }}>
          {`${data.about.substring(
            0,
            1000,
          )}...`}
        </p>
        <button
          style={{ float: 'right', width: '100px' }}
          className="button btn-filled"
          onClick={() => setButtonPopup(false) + setSecondPopup(true)}
        >
          Next
        </button>
      </FeaturedPopup>
      <FeaturedPopup trigger={secondPopup} setTrigger={setSecondPopup}>
        <br />
        <form>
          <label style={{ marginLeft: '10px' }}>Enter amount</label>
          <input
            type="number"
            name="amout"
            placeholder="Enter amount"
            style={{
              marginLeft: '20px',
              border: '1px solid grey',
              padding: '5px',
              outline: 'none',
              width: '250px',
              borderRadius: '2px',
              marginBottom: '20px',
            }}
            amount={amount}
            required
          />
        </form>
        <button
          className="button btn-filled"
          onClick={(e) => {
            e.preventDefault();
            signIfNotLoggedIn(data);
          }}
          onChange={inputAmount}
        >
          Fund Now!
        </button>
      </FeaturedPopup>
    </>
  );
};
export default FeaturedCard;
