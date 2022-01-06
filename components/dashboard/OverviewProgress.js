import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import EmptyOverviewComponent from './EmptyOverviewComponent';
import TasksList from './TasksList';

const OverviewProgress = (props) => {
  const [loading, setLoading] = useState(true);
  const ProgressMobileComponent = () => (
    <div className="d-flex flex-column" style={{ width: '100%', height: '280px' }}>
      {/* there are 2 columns: text - images */}
      <div className="d-flex flex-column" style={{ width: '100%' }}>
        {/* text area */}
        <div className="d-flex flex-column justify-content-between align-items-start" style={{ height: '90px', marginBottom: '10px', width: '100%' }}>
          <p style={{
            fontSize: ' 20px', color: 'black', marginBottom: '4%', lineHeight: '20px',
          }}
          >
            Welcome back,
            <strong>{props.userData.firstName}</strong>
          </p>
          <p style={{ fontSize: '14px', color: 'black', lineHeight: '16px' }}>
            You’ve completed
            <em style={{ color: '#151371', fontWeight: '700', fontStyle: 'normal' }}>30%</em>
            {' '}
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
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ width: '100%', height: '100%', position: 'absolute' }}>
          <p
            className="text-center"
            style={{
              fontSize: '16px', color: 'black', fontWeight: '700', marginBottom: '2%', lineHeight: '16px',
            }}
          >
            12
          </p>
          <p
            className="text-center"
            style={{
              fontSize: '12px', color: 'black', width: '25%', lineHeight: '12px',
            }}
          >
            of 40 Completed Tasks
          </p>
        </div>
        <div style={{
          width: '100%', height: '100%', position: 'absolute', textAlign: 'center',
        }}
        >
          {/* edit data variable in here when api ready */}
          <Chart
            width="100%"
            height="100%"
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
              chartArea: { width: '100%', height: '90%' },
              legend: 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
  const ProgressComponent = () => (
    <div className="d-flex flex-row" style={{ width: '100%', height: '100%' }}>
      {/* there are 2 columns: text - images */}
      {/* first column */}
      <div className="d-flex flex-column" style={{ width: '50%', height: '100%' }}>
        {/* text area */}
        <div className="d-flex flex-column justify-content-between align-items-start" style={{ height: '47%', marginBottom: '3%', width: '100%' }}>
          <p style={{ fontSize: ' 20px', color: 'black', marginBottom: '4%' }}>
            Welcome back,
            <strong>{props.userData.firstName}</strong>
          </p>
          <p style={{ fontSize: '14px', color: 'black' }}>
            You’ve completed
            <em style={{ color: '#151371', fontWeight: '700', fontStyle: 'normal' }}>30%</em>
            {' '}
            of the tasks available on Minority Programmers Association.
            <br style={{ marginTop: '2%', border: '0px' }} />
            Complete task, earn crypto!
          </p>
        </div>
        {/* list of todo */}
        <TasksList />
      </div>
      {/* second column */}
      <div style={{
        width: '50%', height: '100%', position: 'relative',
      }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ width: '100%', height: '100%', position: 'absolute' }}>
          <p
            className="text-center"
            style={{
              fontSize: '20px', color: 'black', fontWeight: '700', marginBottom: '2%',
            }}
          >
            12
          </p>
          <p className="text-center" style={{ fontSize: '14px', color: 'black', width: '45%' }}>of 40 Completed Tasks</p>
        </div>
        <div style={{
          width: '100%', height: '100%', position: 'absolute', textAlign: 'center',
        }}
        >
          {/* edit data variable in here when api ready */}
          <Chart
            width="100%"
            height="100%"
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
              chartArea: { width: '90%', height: '90%' },
              legend: 'none',
            }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="d-flex flex-column justify-content-between " style={{ height: '100%' }}>
      {loading
        ? (
          <EmptyOverviewComponent
            imgURL="https://s3-alpha-sig.figma.com/img/68a7/20a9/452929fc6a5439295987354f00239538?Expires=1638748800&Signature=fN0Sl~q93Zz1tXpq2349l-hcsZQpQF2-K88IA2S~oextAW6CgEOTdTgaW0FcZCol2tFhN~~DCYI3LGmFn5jpfi1cbR~YFy63gbUTh9vbjpVpA8qZEWcQlF3~B2Jm1HjyKnLB7F5ZOtpKTPsN3M8DyGPVOvKnv7ug8eErHswRxnMHVtdzSOPxVbsf8bKW9r8jdbxIizL0P5EjwRKApO6t0ms0-Z5lFO5kh8GgRkXObULZNFFtNAUuTsKNjzjIfSMJLRqbJ5TZNXVOGk-hl6tB0YFf8DvHNLaFLyJ0nkJFygmvABJCpwpkqB5w2~aiPz9nPVZYQPJ5Ha0hlwPN3aMiLw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            description="Oops, your progress on the MPA website right now is currently at 0%. The percentage will increase when you complete tasks that are assigned to you"
            btnText="Get Started"
            btnFunction={() => { setLoading(false); }}
          />
        )
        : props.renderMobile
          ? <ProgressMobileComponent /> : <ProgressComponent />}
    </div>
  );
};

export default OverviewProgress;