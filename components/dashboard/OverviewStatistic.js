import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import Skeleton from 'react-loading-skeleton';
import { width } from 'dom-helpers';
import EmptyOverviewComponent from './EmptyOverviewComponent';

const OverviewStatistic = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(setLoading(false), 3000);
  }, []);

  const DonutChartComponent = (props) => {
    const { data } = props;

    return (
      <div style={{
        width: '100%', height: '20%', marginBottom: '4%', background: '#EFEFEF', borderRadius: '5px',
      }}
      >
        {/* chart area */}
        <div className="d-flex flex-row" style={{ width: '100%', height: '100%', position: 'relative' }}>
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ width: '40%', height: '100%', position: 'absolute' }}
          >
            <p
              className="text-center"
              style={{
                fontSize: '20px', lineHeight: '20px', color: 'black', fontWeight: '700', color: props.colorText,
              }}
            >
              12
            </p>
            <p
              style={{
                fontSize: '8px', lineHeight: '8px', fontWeight: 400, color: 'black', color: props.colorText,
              }}
            >
              {props.centerText}

            </p>
          </div>
          <div style={{ width: '65%', height: '100%', position: 'absolute' }}>
            <Chart
              width="100%"
              height="100%"
              chartType="PieChart"
              loader={<div> Loading Chart</div>}
              data={data}
              options={{
                pieHole: 0.7,
                backgroundColor: 'transparent',
                // reverseCategories: true,
                slices: [{ color: '#151371' }, { color: '#6A0C8B' }, { color: '#2D761B' }, { color: '#FFC700' }],
                pieSliceText: 'none',
                chartArea: { width: '100%', height: '80%', right: '0%' },
                legend: 'right',
                legend: { alignment: 'center' },
              }}
            />
          </div>
          <p style={{
            fontSize: '12px', color: 'black', fontWeight: 700, paddingLeft: '5%', position: 'relative', height: '100%', marginLeft: '40%',
          }}
          >
            {props.title}
          </p>
        </div>
        {/* Legend area */}

      </div>
    );
  };

  const LineChart = (props) => {
    const { data } = props;
    const current = props.data.pop();
    return (
      <div style={{
        width: '100%', height: '24%', marginBottom: '1%', background: '#EFEFEF', borderRadius: '5px',
      }}
      >
        <div className="d-flex flex-column" style={{ width: '100%', height: '100%' }}>
          <div style={{ width: '100%', height: '20%' }}>
            <p style={{
              width: '100%', textAlign: 'center', fontSize: '14px', color: 'black', fontWeight: 700,
            }}
            >
              Startup Investments
            </p>
          </div>
          <div style={{
            height: '75%', width: '90%', marginLeft: '5%', marginRight: '5%', marginBottom: '5%',
          }}
          >
            <div className="d-flex flex-column" style={{ height: '50%' }}>
              <p style={{ fontSize: '10px', color: 'black', fontWeight: 700 }}>Total Amount</p>
              <p style={{ fontSize: '16px', color: '#151371', fontWeight: 700 }}>
                $
                {current[1]}
              </p>
            </div>
            <div style={{ position: 'relative', height: '50%', width: '100%' }}>
              <Chart
                width="100%"
                height="100%"
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={data}
                options={{
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

  const dummyData1 = [
    ['Course Type', 'Courses Completed'],
    ['Web Dev', 7],
    ['UI/UX', 5],
    ['Entrepreneurship', 2],
    ['Blockchain', 4],
  ];

  const dummyData2 = [
    ['Proposals', 'Amount of Each'],
    ['Submitted', 5],
    ['Under Review', 4],
    ['Approved', 3],
  ];

  const dummyData3 = [
    ['Tasks Status', 'Amount of Each'],
    ['Completed', 12],
    ['Ongoing', 4],
  ];

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
    <div className="d-flex flex-column justify-content-between " style={{ height: '100%' }}>

      <p style={{
        fontSize: '18px', fontWeight: '700', color: 'black', margin: 0,
      }}
      >
        Statistics
      </p>

      {loading
        ? (
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{
              height: '100%', width: '100%', overflowY: 'scroll', overflowX: 'hidden',
            }}
          >
            <Skeleton width={1200} height={150} style={{ marginBottom: '15px' }} />
            <Skeleton width={1200} height={150} style={{ marginBottom: '15px' }} />
            <Skeleton width={1200} height={150} />
          </div>
        )
        : (
          <div className="d-flex flex-column justify-content-center align-items-center overflow-scroll" style={{ width: '100%', height: '100%', padding: '12px' }}>
            <DonutChartComponent data={dummyData1} title="Courses Completed" centerText="Completed" colorText="#6A0C8B" />
            <DonutChartComponent data={dummyData2} title="Proposals" centerText="Approved" colorText="#2D761B" />
            <DonutChartComponent data={dummyData3} title="Tasks" centerText="Completed" colorText="#6A0C8B" />
            <LineChart data={dummyLineData} />
          </div>
        )}
    </div>

  );
};

export default OverviewStatistic;
