import React, { useState, useEffect } from 'react';

const presaleCountDown = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const calculateTimeLeft = () => {
    const difference = +new Date(`9/11/${year}`) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24)
          .toString()
          .padStart(2, '0'),
        minutes: Math.floor((difference / 1000 / 60) % 60)
          .toString()
          .padStart(2, '0'),
        seconds: Math.floor((difference / 1000) % 60)
          .toString()
          .padStart(2, '0'),
      };
    }
    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
      setYear(new Date().getFullYear());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = [];
  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }
    timerComponents.push(
      <span className="interval">
        {timeLeft[interval]}
        <br />
        {interval}
      </span>
    );
  });
  return (
    <div className="presale-in">
      <div className="presale-time">
        PRE-SALE <br /> ENDS IN:
        <div className="count-down-timer">
          {timerComponents.length ? (
            timerComponents
          ) : (
            <div className="timer">
              <div>
                <div>25</div>
                <div className="time">DAYS</div>
              </div>
              <div>:</div>
              <div>
                <div>17</div>
                <div className="time">HOURS</div>
              </div>
              <div>:</div>
              <div>
                <div>37</div>
                <div className="time">MINUTES</div>
              </div>
              <div>:</div>
              <div>
                <div>07</div>
                <div className="time">SECONDS</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default presaleCountDown;
