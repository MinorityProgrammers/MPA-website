import React from 'react';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

const DonutChartComponent = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: 35,
    layout: {
    //   padding: 5,
    },
    stroke: {
      width: 5,
    },
    legend: {
      labels: {
        fontColor: 'white',
      },
    },

    plugins: {
      datalabels: { color: '#ffffff' },
      legend: {
        display: false,
        position: 'right',
        align: 'center',
        labels: {
          color: 'white',
        },
      },
    },
  };
  return (
    <div className="statistics-charts static-card tw-flex">
      <div className="dashboard-static-chart tw-relative">
        <Doughnut options={options} width="90%" height="90%" data={data} />
        <div className="chart-static-text">
          <p>
            <span>
              {data.centerText.value}
            </span>
            {data.centerText.text}

          </p>

        </div>
      </div>
      <div className="static-chart-detail">
        <h2>
          {data.title}
        </h2>
        <div className="labels">
          {data.labels.map((t, i) => (
            <div className="tag">
              <div style={{ background: data.datasets[0].backgroundColor[i] }} />
              <p>{t}</p>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonutChartComponent;
