import React, { useState } from 'react';
import { Chart } from 'react-google-charts';
import Select from 'react-select';

const DropdownIndicator = () => (
  <img
    style={{ maxWidth: '20px', marginRight: '10px' }}
    src="/assets/images/settings/arrow-down.svg"
    alt="link"
  />
);

const currencies = [
  { label: 'BTC', value: 'BTC' },
  { label: 'ETH', value: 'ETH' },
  { label: 'LTC', value: 'LTC' },
];

const MarketChart = () => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: 'white',
      border: state.isSelected ? '2px solid #6938EF' : state.isFocused ? '2px solid #6938EF' : '2px solid transparent',
      background: '#1C1D37',
      borderRadius: '8px',
      padding: 20,
      marginTop: 8,
      width: '100%',
      cursor: 'pointer',
      fontWeight: 'bold',
      ':active': {
        // ...styles[':active'],
        background: '#1C1D37',
      },
    }),
    control: () => ({
    // none of react-select's styles are passed to <Control />
    // width: ,
      display: 'flex',
      height: '100%',
    }),
    menu: (provided) => ({
      ...provided,
      // borderBottom: '1px dotted pink',
      background: '#1C1D37',
      padding: 5,
      border: '1px solid #6938EF',
      width: '150px',
      textAlign: 'center',
      marginLeft: '-70px',
    }),
    container: (provided) => ({
      ...provided,
      height: '35px',
      margin: '0 !important',
      cursor: 'pointer',
      paddingLeft: '8px',
      border: '1px solid #6938EF',
      borderRadius: '100px',
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    singleValue: (provided) => {
      const opacity = 1;
      const color = '#fff';
      const transition = 'opacity 300ms';

      return {
        ...provided, opacity, transition, color,
      };
    },
  };
  const [currentView, setCurrentView] = useState('Daily');
  return (
    <div className="d-flex flex-column align-items-center" style={{ width: '100%', height: '100%' }}>
      {/* First row */}
      <div className="d-flex flex-row justify-content-between market-chart-tabs" style={{ height: '20%', width: '100%' }}>
        <div className="d-flex flex-row align-items-center">
          <p style={{
            fontSize: '24px', fontWeight: '500', color: 'white', marginRight: '5px',
          }}
          >
            Market Chart
          </p>
          <div className="tw-ml-5">
            <Select
              name="fiat-currency"
              styles={customStyles}
              components={{ DropdownIndicator }}
              isClearable={false}
              isSearchable={false}
              options={currencies}
              defaultValue={currencies[0]}
            />
          </div>
        </div>

        <div>
          <a
            onClick={() => { setCurrentView('Hourly'); }}
            className={currentView === 'Hourly' ? 'trends-button-selected' : 'trends-button'}
            style={{
              borderRadius: '12px', fontSize: '12px', padding: '3px 15px',
            }}
          >
            1 H

          </a>
          <a
            onClick={() => { setCurrentView('Daily'); }}
            className={currentView === 'Daily' ? 'trends-button-selected' : 'trends-button'}
            style={{
              borderRadius: '12px', fontSize: '12px', padding: '3px 15px',
            }}
          >
            1 D

          </a>
          <a
            onClick={() => { setCurrentView('Weekly'); }}
            className={currentView === 'Weekly' ? 'trends-button-selected' : 'trends-button'}
            style={{
              borderRadius: '12px', fontSize: '12px', padding: '3px 15px',
            }}
          >
            1 W

          </a>
          <a
            onClick={() => { setCurrentView('Monthly'); }}
            className={currentView === 'Monthly' ? 'trends-button-selected' : 'trends-button'}
            style={{
              borderRadius: '12px', fontSize: '12px', padding: '3px 15px',
            }}
          >
            1 M

          </a>
          <a
            onClick={() => { setCurrentView('Annually'); }}
            className={currentView === 'Annually' ? 'trends-button-selected' : 'trends-button'}
            style={{ borderRadius: '12px', fontSize: '12px', padding: '3px 15px' }}
          >
            1 Y

          </a>
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
            ['23 oct', 0],
            ['6 nov', 10],
            ['20 nov', 23],
            ['4 dec', 17],
            ['18 dec', 18],
            ['1 jan', 9],
            ['10 feb', 11],
            ['6 may', 27],
            ['20 jun', 33],
            ['20 jul', 40],
            ['10 aug', 32],
            ['3 sep', 35],
          ]}
          options={{
            tooltip: { isHtml: true },
            colors: ['#6938EF'],
            backgroundColor: {
              stroke: 'white',
              fill: 'transparent',
            },
            hAxis: {
              baselineColor: 'transparent',
              textStyle: {
                color: '#FFFFFF',
              },
              colors: ['#fffff'],
              // title: 'Date',
              gridlines: {
                color: 'transparent',
              },
              titleTextStyle: { color: '#FFF' },
            },
            vAxis: {
              baselineColor: '#fff',
              titleTextStyle: { color: '#FFF' },
              textStyle: {
                color: '#FFFFFF',
              },
              // title: 'Prices (in USD)',
              gridlines: {
                color: '#282948',
              },
              minorGridlines: { color: '#282948' },
            },
            legend: 'none',
          }}
        />
      </div>
    </div>
  );
};

export default MarketChart;
