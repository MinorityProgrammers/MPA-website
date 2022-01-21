import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios';

const OverviewWallet = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(setLoading(false), 3000);
  }, []);

  const EmptyWallet = () => (
    <div className="d-flex flex-column justify-content-between h-100 w-100 ">
      {/* title */}
      <p style={{
        fontSize: '18px', fontWeight: '700', color: 'black', height: '13%', marginBottom: '2%',
      }}
      >
        Wallet
      </p>
      <div className="overview-courses-cards d-flex flex-column justify-content-between align-items-center" style={{ height: '85%' }}>

        {/* balance 2 columns Balance and Monthly Earned */}
        <div className="overview-course-card d-flex flex-row justify-content-between align-items-center">
          {/* Balance column */}
          <div className="d-flex flex-column" style={{ textAlign: 'left', paddingTop: '15px', paddingBottom: '15px' }}>
            <p style={{
              fontSize: '12px', margin: '0', fontWeight: '700', color: 'black',
            }}
            >
              Balance
            </p>
            <p style={{
              fontSize: '25px', margin: '0', fontWeight: '700', color: '#151371',
            }}
            >
              $0
            </p>
          </div>
          <div className="d-flex flex-column align-items-end overview-courses-list" style={{ textAlign: 'right', color: 'black' }}>
            <p style={{ fontSize: '10px', margin: '0', fontWeight: '700' }}>Monthly $MINORITY Earned</p>
            <p style={{
              fontSize: '20px', margin: '0', fontWeight: '700', lineHeight: '20px',
            }}
            >
              $0
            </p>
            <p style={{
              fontSize: '10px', margin: '0', fontWeight: '700', color: '#00AA4F',
            }}
            >
              0%
            </p>
          </div>

        </div>
        {/* Minority tracking row */}
        <div className="overview-course-card d-flex flex-row justify-content-between align-items-center" style={{ padding: '15px 10px' }}>
          {/* Logo and Name/Description */}
          <div className="d-flex flex-row" style={{ width: '70%' }}>
            <img
              style={{
                width: '30px', height: '30px', borderRadius: '50%', marginRight: '5px',
              }}
              src="/assets/images/mpicon.svg"
            />
            <div className="d-flex flex-column" style={{ textAlign: 'left' }}>
              <p style={{
                fontSize: '10px', margin: '0', fontWeight: '700', color: 'black',
              }}
              >
                MINORITY ($MINORITY)
              </p>
              <p style={{
                fontSize: '9px', margin: '0', fontWeight: '700', lineHeight: '10px',
              }}
              >
                0 $MINORITY
              </p>
            </div>
          </div>

          {/* Gain */}
          <div className="d-flex flex-column" style={{ width: '30%', textAlign: 'right' }}>
            <p style={{
              fontSize: '15px', margin: '0', fontWeight: '700', color: 'black',
            }}
            >
              $0
            </p>
            <p style={{
              fontSize: '10px', margin: '0', fontWeight: '700', color: '#00AA4F',
            }}
            >
              0%
            </p>
          </div>
        </div>
        {/* Buttons row */}
        <div className="d-flex flex-row justify-content-between align-items-center" style={{ width: '100%' }}>
          <button
            type="button"
            className="btn btn-primary"
            style={{ background: '#151371', fontSize: '10px', width: '45%' }}
          >
            Settings
          </button>
          <button type="button" className="btn btn-primary" style={{ background: '#151371', fontSize: '10px', width: '45%' }}>
            Manage
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ height: '100%' }}>
      <p style={{
        fontSize: '18px', fontWeight: '700', color: 'black', height: '13%', marginBottom: '2%',
      }}
      >
        Wallet
      </p>
      <div className="overview-courses-cards d-flex flex-column justify-content-between align-items-between" style={{ height: '85%' }} />
      {loading
        ? (
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{
              height: '100%', width: '100%', overflowY: 'scroll', overflowX: 'hidden',
            }}
          >
            <Skeleton width={1200} height={70} style={{ marginBottom: '5px' }} />
            <Skeleton width={1200} height={70} style={{ marginBottom: '5px' }} />
            <div className="d-flex flex-row justify-content-between align-items-center" style={{ width: '100%' }}>
              <Skeleton width={60} height={30} />
              <Skeleton width={60} height={30} />
            </div>
          </div>
        )
        : (
          <div className="d-flex flex-column justify-content-between" style={{ height: '100%' }}>
            {/* title */}
            <p style={{
              fontSize: '18px', fontWeight: '700', color: 'black', height: '13%', marginBottom: '2%',
            }}
            >
              Wallet
              {' '}
            </p>
            <div className="overview-courses-cards d-flex flex-column justify-content-between align-items-between" style={{ height: '85%' }}>

              {/* balance 2 columns Balance and Monthly Earned */}
              <div className="overview-course-card d-flex flex-row justify-content-between align-items-center">
                {/* Balance column */}
                <div className="d-flex flex-column" style={{ textAlign: 'left', paddingTop: '15px', paddingBottom: '15px' }}>
                  <p style={{
                    fontSize: '12px', margin: '0', fontWeight: '700', color: 'black',
                  }}
                  >
                    Balance
                  </p>
                  <p style={{
                    fontSize: '25px', margin: '0', fontWeight: '700', color: '#151371',
                  }}
                  >
                    $350
                  </p>
                </div>
                <div className="d-flex flex-column align-items-end overview-courses-list" style={{ textAlign: 'right', color: 'black' }}>
                  <p style={{ fontSize: '10px', margin: '0', fontWeight: '700' }}>Monthly $MINORITY Earned </p>
                  <p style={{
                    fontSize: '20px', margin: '0', fontWeight: '700', lineHeight: '20px',
                  }}
                  >
                    $150
                  </p>
                  <p style={{
                    fontSize: '10px', margin: '0', fontWeight: '700', color: '#00AA4F',
                  }}
                  >
                    ↗5%
                  </p>
                </div>

              </div>
              {/* Minority tracking row */}
              <div className="overview-course-card d-flex flex-row justify-content-between align-items-center">
                {/* Logo and Name/Description */}
                <div className="d-flex flex-row" style={{ width: '70%' }}>
                  <img
                    style={{
                      width: '30px', height: '30px', borderRadius: '50%', marginRight: '5px',
                    }}
                    src="/assets/images/mpicon.svg"
                  />
                  <div className="d-flex flex-column" style={{ textAlign: 'left' }}>
                    <p style={{
                      fontSize: '10px', margin: '0', fontWeight: '700', color: 'black',
                    }}
                    >
                      MINORITY ($MINORITY)
                    </p>
                    <p style={{
                      fontSize: '9px', margin: '0', fontWeight: '700', lineHeight: '10px',
                    }}
                    >
                      23.61 $MINORITY
                    </p>
                  </div>
                </div>

                {/* Gain */}
                <div className="d-flex flex-column" style={{ width: '30%', textAlign: 'right' }}>
                  <p style={{
                    fontSize: '15px', margin: '0', fontWeight: '700', color: 'black',
                  }}
                  >
                    $0.04
                  </p>
                  <p style={{
                    fontSize: '10px', margin: '0', fontWeight: '700', color: '#00AA4F',
                  }}
                  >
                    ↗5%
                  </p>
                </div>
              </div>
              {/* buttons row */}
              <div className="d-flex flex-row justify-content-between align-items-center" style={{ width: '100%' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ background: '#151371', fontSize: '10px', width: '45%' }}
                >
                  Settings
                </button>
                <button type="button" className="btn btn-primary" style={{ background: '#151371', fontSize: '10px', width: '45%' }}>
                  Manage
                </button>

              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default OverviewWallet;
