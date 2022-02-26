import React, { useCallback, useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Spinner } from 'react-bootstrap';
// import { Chart } from 'react-google-charts';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import TasksList from './TasksList';

const OverviewProgress = ({ userData, renderMobile }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, []);
  // Chart Config
  const data = {
    legend: {
      display: false, // This will do the task
    },
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [28, 12],
        backgroundColor: ['#783EFD', '#FE8F66'],
        color: ['#783EFD', '#FE8F66'],
        borderColor: ['#783EFD', '#FE8F66'],
        borderWidth: 1,
      },

    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: 40,
    legend: {
      display: false,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    // elements: {
    //   center: {
    //     text: 'Red is 2/3 of the total numbers',
    //     color: '#FF6384', // Default is #000000
    //     fontStyle: 'Arial', // Default is Arial
    //     sidePadding: 20, // Default is 20 (as a percentage)
    //     minFontSize: 25, // Default is 20 (in px), set to false and text will not wrap.
    //     lineHeight: 25, // Default is 25 (in px), used for when text wraps
    //   },
    // },
  };
  // const plugins = [{
  //   beforeDraw(chart) {
  //     const { width } = chart;
  //     const { height } = chart;
  //     const { ctx } = chart;
  //     ctx.restore();
  //     const fontSize = (height / 160).toFixed(2);
  //     ctx.font = `${fontSize} sans-serif`;
  //     ctx.textBaseline = 'top';
  //     ctx.fillStyle = 'white';
  //     const text = '12 of 40 task completed';
  //     const textX = Math.round((width - ctx.measureText(text).width) / 2);
  //     const textY = height / 2;
  //     ctx.fillText(text, textX, textY);
  //     ctx.save();
  //   },
  // }];
  const ProgressMobileComponent = useCallback(
    () => (
      <div
        className="d-flex flex-column"
        style={{ width: '100%', height: '280px' }}
      >
        {/* there are 2 columns: text - images */}
        <div className="d-flex flex-column" style={{ width: '100%' }}>
          {/* text area */}
          <div
            className="d-flex flex-column justify-content-between align-items-start"
            style={{ height: '90px', marginBottom: '10px', width: '100%' }}
          >
            <p
              style={{
                fontSize: ' 20px',
                color: 'white',
                marginBottom: '4%',
                lineHeight: '20px',
              }}
            >
              Welcome back,
              <strong>{userData.firstName}</strong>
            </p>
            <p style={{ fontSize: '14px', color: 'white', lineHeight: '16px' }}>
              You’ve completed
              <em
                style={{
                  color: '#151371',
                  fontWeight: '700',
                  fontStyle: 'normal',
                }}
              >
                30%
              </em>
              of the tasks available on Minority Programmers Association.
              <br style={{ marginTop: '2%', border: '0px' }} />
              Complete task, earn crypto!
            </p>
          </div>
          {/* list of todo */}
          <div style={{ height: '80px' }}>
            <TasksList />
          </div>
        </div>
        <div style={{ width: '100%', height: '110px', position: 'relative' }}>
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ width: '100%', height: '100%', position: 'absolute' }}
          >
            <p
              className="text-center"
              style={{
                fontSize: '16px',
                color: 'white',
                fontWeight: '700',
                marginBottom: '2%',
                lineHeight: '16px',
              }}
            >
              12
            </p>
            <p
              className="text-center"
              style={{
                fontSize: '12px',
                color: 'white',
                width: '25%',
                lineHeight: '12px',
              }}
            >
              of 40 Completed Tasks
            </p>
          </div>
          <div>
            {/* edit data variable in here when api ready */}
            {/* <Chart
              width="200px"
              height="300px%"
              chartType="PieChart"
              loader={<div> Loading Chart</div>}
              data={[
                ['Tasks', 'Hours per Day'],
                ['Completed', 12],
                ['Remaining', 28],
              ]}
              options={{
                pieHole: 0.8,
                backgroundColor: 'transparent',
                slices: [{ color: '#151371' }, { color: '#6A0C8B' }],
                pieSliceText: 'none',
                chartArea: { width: '30%', height: '90%' },
                legend: 'none',
              }}
            /> */}
          </div>
        </div>
      </div>
    ),
    [],
  );

  const ProgressComponent = useCallback(
    () => (
      <div
        className="d-flex flex-col"
        style={{ width: '100%', height: '100%' }}
      >
        {/* there are 2 columns: text - images */}
        {/* first column */}
        <div
          className="d-flex flex-column"
          style={{ width: '100%', height: '100%' }}
        >
          {/* text area */}
          <div
            className="d-flex flex-column justify-content-between align-items-start"
            style={{ height: '47%', marginBottom: '3%', width: '100%' }}
          >
            <div className="tw-flex">
              <div className="tw-w-8/12">
                <p
                  style={{ fontSize: ' 20px', color: 'white', marginBottom: '4%' }}
                >
                  Welcome back,
                  <strong>{userData.firstName}</strong>
                </p>
                <p style={{ fontSize: '14px', color: 'white' }}>
                  You’ve completed
                  <span
                    style={{
                      color: '#9379FF',
                    }}
                  >
                    {' '}
                    30%
                    {' '}
                  </span>
                  of the tasks available on Minority Programmers Association.
                  <br style={{ marginTop: '2%', border: '0px' }} />
                  Complete task, earn
                  {' '}
                  <span
                    style={{
                      color: '#9379FF',
                    }}
                  >
                    crypto!
                  </span>
                </p>
              </div>
              <div className="tw-w-4/12 tw-relative">
                <Doughnut options={options} width="100%" height="100%" data={data} />
                <div className="chart-inner-text">
                  <p>
                    <span> 12 </span>
                    of 40 task completed

                  </p>

                </div>
              </div>
            </div>

          </div>
          {/* list of todo */}
          <TasksList />
        </div>
      </div>
    ),
    [],
  );

  return (
    <div
      className="d-flex flex-column justify-content-between "
      style={{ height: '100%', width: '100%' }}
    >
      {loading ? (
        <div
          className="d-flex flex row"
          style={{ width: '100%', height: '100%', overflowY: 'scroll' }}
        >
          <div
            style={{ width: '50%', marginRight: '2.5%', marginLeft: '2.5%' }}
          >
            <div
              className="d-flex flex-column"
              style={{
                width: '100%',
                height: '27%',
                marginBottom: '5px',
                overflowX: 'hidden',
              }}
            >
              <Skeleton height={20} width={130} />
              <Skeleton height={15} width={250} />
              <Skeleton height={15} width={230} />
              <Skeleton height={15} width={200} />
            </div>
            <div
              className="overview-proposal-cards d-flex flex-row justify-content-start align-items-start"
              style={{
                lineHeight: 2,
                height: '70%',
                overflowX: 'hidden',
                overflowY: 'scroll',
              }}
            >
              <Skeleton count={6} height={35} width={1200} />
            </div>
          </div>
          <div
            className="d-flex flex-row justify-content-center align-items-center"
            style={{ width: '42.5%', marginLeft: '2.5%' }}
          >
            <Spinner animation="border" variant="secondary" size="lg" />
          </div>
        </div>
      ) : renderMobile ? (
        <ProgressMobileComponent />
      ) : (
        <ProgressComponent />
      )}
    </div>
  );
};

export default OverviewProgress;
