/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import Skeleton from 'react-loading-skeleton';
import DonutChartComponent from './DonutChartComponent';

const OverviewStatistic = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutID = setTimeout(setLoading(false), 3000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, []);

  const LineChart = (props) => {
    const { data } = props;
    const current = props.data.pop();
    return (
      <div
        className="static-card"
        style={{
          width: '100%',
          height: '24%',
          marginBottom: '1%',
        }}
      >
        <div
          className="d-flex flex-column"
          style={{ width: '100%', height: '100%' }}
        >
          <div style={{ width: '100%', height: '20%' }}>
            <p
              style={{
                width: '100%',
                textAlign: 'center',
                fontSize: '14px',
                color: 'white',
                fontWeight: 700,
              }}
            >
              Startup Investments
            </p>
          </div>
          <div
            style={{
              height: '75%',
              width: '90%',
              marginLeft: '5%',
              marginRight: '5%',
              marginBottom: '5%',
            }}
          >
            <div className="tw-flex tw-justify-between" style={{ height: '50%' }}>

              <div className="tw-flex-col">
                <p style={{ fontSize: '10px', color: '#DEDEDE', fontWeight: 600 }}>
                  Total Amount
                </p>
                <p
                  style={{ fontSize: '18px', color: '#FFFFFF', fontWeight: 600 }}
                >
                  $
                  {current[1]}
                </p>
              </div>
              <div className="tw-flex-col">
                <p style={{ fontSize: '12px', color: '#16A34A', fontWeight: 600 }}>
                  <i style={{ transform: 'rotate(45deg)' }} className="fas fa-arrow-up" />
                  {' '}
                  1.2m
                </p>
                <p
                  style={{ fontSize: '12px', color: '#D50E0E', fontWeight: 600 }}
                >
                  <i style={{ transform: 'rotate(225deg)' }} className="fas fa-arrow-up" />
                  {' '}
                  0.1m
                </p>
              </div>
            </div>
            <div style={{ position: 'relative', height: '50%', width: '100%' }}>
              <Chart
                width="100%"
                height="100%"
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={data}
                options={{
                  colors: ['#FE8F66'],
                  backgroundColor: 'transparent',
                  hAxis: {
                    baselineColor: 'transparent',
                    textPosition: 'none',
                    gridlines: {
                      color: 'transparent',
                    },
                  },
                  vAxis: {
                    baselineColor: 'transparent',
                    textPosition: 'none',
                    gridlines: {
                      color: 'transparent',
                    },
                  },
                  chartArea: { width: '100%', height: '100%' },
                  legend: 'none',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  const dummyData1 = {
    title: 'Courses Completed',
    centerText: {
      text: 'Completed',
      value: 18,
    },
    labels: ['Web Dev', 'UI/UX', 'Entrepreneurship', 'Blockchain'],
    datasets: [
      {
        data: [7, 5, 2, 4],
        backgroundColor: ['#783EFD', '#FFCC40', '#FD05B3', '#FE8F66'],
        color: ['#783EFD', '#FFCC40', '#FD05B3', '#FE8F66'],
        borderColor: ['#24253D', '#24253D', '#24253D', '#24253D'],
        borderWidth: 1,
      },

    ],
  };
  const dummyData2 = {
    title: 'Proposals',
    labels: ['Submitted', 'Under Review', 'Approved'],
    centerText: {
      text: 'Approved',
      value: 3,
    },
    datasets: [
      {
        data: [5, 4, 3],
        backgroundColor: ['#783EFD', '#FD05B3', '#FE8F66'],
        color: ['#783EFD', '#FD05B3', '#FE8F66'],
        borderColor: ['#24253D', '#24253D', '#24253D'],
        borderWidth: 1,
      },

    ],
  };
  const dummyData3 = {
    title: 'Tasks (40)',
    centerText: {
      text: 'Completed',
      value: 12,
    },
    labels: ['Completed', 'Ongoing'],
    datasets: [
      {
        data: [12, 4],
        backgroundColor: ['#783EFD', '#FD05B3'],
        color: ['#783EFD', '#FD05B3'],
        borderColor: ['#24253D', '#24253D'],
        borderWidth: 1,
      },

    ],
  };

  const dummyLineData = [
    ['Month', 'Earning'],
    ['January', 0],
    ['Febuary', 10],
    ['March', 23],
    ['April', 17],
    ['May', 18],
    ['June', 9],
    ['July', 11],
    ['August', 27],
    ['September', 33],
    ['October', 40],
    ['November', 32],
    ['December', 35],
  ];

  return (
    <div
      className="d-flex flex-column justify-content-between "
      style={{ height: '100%' }}
    >
      <p
        style={{
          fontSize: '18px',
          fontWeight: '700',
          color: 'white',
          margin: 0,
        }}
      >
        Statistics
      </p>

      {loading ? (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{
            height: '100%',
            width: '100%',
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}
        >
          <Skeleton
            width={1200}
            height={150}
            style={{ marginBottom: '15px' }}
          />
          <Skeleton
            width={1200}
            height={150}
            style={{ marginBottom: '15px' }}
          />
          <Skeleton width={1200} height={150} />
        </div>
      ) : (
        <div
          className="d-flex flex-column overflow-scroll"
          style={{
            width: '100%', height: '100%', padding: '5px', justifyContent: 'flex-end',
          }}
        >
          <DonutChartComponent
            data={dummyData1}
            title="Courses Completed"
            centerText="Completed"
            colorText="#6A0C8B"
          />
          <DonutChartComponent
            data={dummyData2}
            title="Proposals"
            centerText="Approved"
            colorText="#2D761B"
          />
          <DonutChartComponent
            data={dummyData3}
            title="Tasks"
            centerText="Completed"
            colorText="#6A0C8B"
          />
          <LineChart data={dummyLineData} />
        </div>
      )}
    </div>
  );
};

export default OverviewStatistic;
