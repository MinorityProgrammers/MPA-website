import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MarketChart = (props) => {
  const [currentView, setCurrentView] = useState('Daily');
  return (
    <div className="d-flex flex-column align-items-center" style={{ width: '100%', height: '100%' }}>
      {/* First row */}
      <div className="d-flex flex-row justify-content-between" style={{ height: '20%', width: '100%' }}>
        <div className="d-flex flex-row align-items-center">
          <p style={{
            fontSize: '20px', fontWeight: '700', color: 'black', marginRight: '5px',
          }}
          >
            {' '}
            Market Chart
          </p>
          <select name="crypto" className="btn btn-primary" style={{ background: '#474BFF' }}>
            <option value="BTC" selected>BTC</option>
            <option value="ETH">ETH</option>
            <option value="LTC">LTC</option>
          </select>
        </div>

        <div>
          <button
            type="button"
            onClick={() => { setCurrentView('Hourly'); }}
            className={currentView === 'Hourly' ? 'trends-button-selected' : 'trends-button'}
            style={{
              borderRadius: '12px', fontSize: '12px', padding: '3px 15px', marginRight: '3px',
            }}
          >
            1H

          </button>
          <button
            type="button"
            onClick={() => { setCurrentView('Daily'); }}
            className={currentView === 'Daily' ? 'trends-button-selected' : 'trends-button'}
            style={{
              borderRadius: '12px', fontSize: '12px', padding: '3px 15px', marginRight: '3px',
            }}
          >
            1D

          </button>
          <button
            type="button"
            onClick={() => { setCurrentView('Weekly'); }}
            className={currentView === 'Weekly' ? 'trends-button-selected' : 'trends-button'}
            style={{
              borderRadius: '12px', fontSize: '12px', padding: '3px 15px', marginRight: '3px',
            }}
          >
            1W

          </button>
          <button
            type="button"
            onClick={() => { setCurrentView('Monthly'); }}
            className={currentView === 'Monthly' ? 'trends-button-selected' : 'trends-button'}
            style={{
              borderRadius: '12px', fontSize: '12px', padding: '3px 15px', marginRight: '3px',
            }}
          >
            1M

          </button>
          <button
            type="button"
            onClick={() => { setCurrentView('Annually'); }}
            className={currentView === 'Annually' ? 'trends-button-selected' : 'trends-button'}
            style={{ borderRadius: '12px', fontSize: '12px', padding: '3px 15px' }}
          >
            1Y

          </button>
        </div>
      </div>
      {/* Second row */}
      <div style={{ width: '100%', height: '80%' }}>
        <Chart
          width="100%"
          height="100%"
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={[
            ['date', 'prices'],
            [0, 0],
            [1, 10],
            [2, 23],
            [3, 17],
            [4, 18],
            [5, 9],
            [6, 11],
            [7, 27],
            [8, 33],
            [9, 40],
            [10, 32],
            [11, 35],
          ]}
          options={{
            hAxis: {
              title: 'Date',
              gridlines: {
                color: 'transparent',
              },
            },
            vAxis: {
              title: 'Prices (in USD)',
              gridlines: {
                color: 'transparent',
              },
            },
            legend: 'none',
          }}
        />
      </div>
    </div>
  );
};

export default MarketChart;
