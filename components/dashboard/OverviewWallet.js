import React, { useState, useEffect, useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';

const OverviewWallet = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutID = setTimeout(setLoading(false), 3000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, []);

  const EmptyWallet = useCallback(
    () => (
      <div className="d-flex flex-column justify-content-between h-100 w-100 ">
        {/* title */}
        <p
          style={{
            fontSize: '18px',
            fontWeight: '700',
            color: 'white',
            height: '13%',
            marginBottom: '2%',
          }}
        >
          Wallet
        </p>
        <div
          className="overview-courses-cards d-flex flex-column justify-content-between align-items-center"
          style={{ height: '85%' }}
        >
          {/* balance 2 columns Balance and Monthly Earned */}
          <div className="overview-course-card overview-course-card-border-none d-flex flex-row justify-content-between align-items-center">
            {/* Balance column */}
            <div
              className="d-flex flex-column"
              style={{
                textAlign: 'left',
                paddingTop: '15px',
                paddingBottom: '15px',
              }}
            >
              <p
                style={{
                  fontSize: '12px',
                  margin: '0',
                  fontWeight: '700',
                  color: 'white',
                }}
              >
                Balance
              </p>
              <p
                style={{
                  fontSize: '25px',
                  margin: '0',
                  fontWeight: '700',
                  color: '#151371',
                }}
              >
                $0
              </p>
            </div>
            <div
              className="d-flex flex-column align-items-end overview-courses-list"
              style={{ textAlign: 'right', color: 'white' }}
            >
              <p style={{ fontSize: '10px', margin: '0', fontWeight: '700' }}>
                Monthly $MINORITY Earned
              </p>
              <p
                style={{
                  fontSize: '20px',
                  margin: '0',
                  fontWeight: '700',
                  lineHeight: '20px',
                }}
              >
                $0
              </p>
              <p
                style={{
                  fontSize: '10px',
                  margin: '0',
                  fontWeight: '700',
                  color: '#00AA4F',
                }}
              >
                0%
              </p>
            </div>
          </div>
          {/* Minority tracking row */}
          <div
            className="overview-course-card overview-course-card-border-none d-flex flex-row justify-content-between align-items-center"
            style={{ padding: '15px 10px' }}
          >
            {/* Logo and Name/Description */}
            <div className="d-flex flex-row" style={{ width: '70%' }}>
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  marginRight: '5px',
                  background: '#CC00FF',
                  opacity: '0.5',
                }}
              />
              <div className="d-flex flex-column" style={{ textAlign: 'left' }}>
                <p
                  style={{
                    fontSize: '10px',
                    margin: '0',
                    fontWeight: '700',
                    color: 'white',
                  }}
                >
                  MINORITY ($MINORITY)
                </p>
                <p
                  style={{
                    fontSize: '9px',
                    margin: '0',
                    fontWeight: '700',
                    lineHeight: '10px',
                  }}
                >
                  0 $MINORITY
                </p>
              </div>
            </div>

            {/* Gain */}
            <div
              className="d-flex flex-column"
              style={{ width: '30%', textAlign: 'right' }}
            >
              <p
                style={{
                  fontSize: '15px',
                  margin: '0',
                  fontWeight: '700',
                  color: 'white',
                }}
              >
                $0
              </p>
              <p
                style={{
                  fontSize: '10px',
                  margin: '0',
                  fontWeight: '700',
                  color: '#00AA4F',
                }}
              >
                0%
              </p>
            </div>
          </div>
          {/* Buttons row */}
          <div
            className="d-flex flex-row justify-content-between align-items-center"
            style={{ width: '100%' }}
          >
            <button
              type="button"
              className="btn btn-primary"
              style={{ background: '#151371', fontSize: '10px', width: '45%' }}
            >
              Settings
            </button>
            <button
              type="button"
              className="btn btn-primary"
              style={{ background: '#151371', fontSize: '10px', width: '45%' }}
            >
              Manage
            </button>
          </div>
        </div>
      </div>
    ),
    [],
  );

  return (
    <div style={{ height: '100%' }}>
      {/* <p
        style={{
          fontSize: '18px',
          fontWeight: '700',
          color: 'white',
          height: '13%',
          marginBottom: '2%',
        }}
      >
        Wallet
      </p>
      <div
        className="overview-courses-cards d-flex flex-column
        justify-content-between align-items-between"
        style={{ height: '85%' }}
      /> */}
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
          <Skeleton width={1200} height={70} style={{ marginBottom: '5px' }} />
          <Skeleton width={1200} height={70} style={{ marginBottom: '5px' }} />
          <div
            className="d-flex flex-row justify-content-between align-items-center"
            style={{ width: '100%' }}
          >
            <Skeleton width={60} height={30} />
            <Skeleton width={60} height={30} />
          </div>
        </div>
      ) : (
        <div
          className="d-flex flex-column justify-content-between"
          style={{ height: '100%' }}
        >
          {/* title */}
          <p
            style={{
              fontSize: '18px',
              fontWeight: '700',
              color: 'white',
              height: '13%',
              marginBottom: '2%',
            }}
          >
            Wallet
            {' '}
          </p>
          <div
            className="overview-courses-cards d-flex flex-column justify-content-between align-items-between"
            style={{ height: '85%' }}
          >
            {/* balance 2 columns Balance and Monthly Earned */}
            <div className="overview-course-card overview-course-card-border-none  d-flex flex-row justify-content-between align-items-center">
              {/* Balance column */}
              <div
                className="d-flex flex-column"
                style={{
                  textAlign: 'left',
                  paddingTop: '15px',
                  paddingBottom: '15px',
                }}
              >
                <p
                  style={{
                    fontSize: '12px',
                    margin: '0',
                    fontWeight: '700',
                    color: '#DEDEDE',
                  }}
                >
                  Balance
                </p>
                <p
                  style={{
                    fontSize: '25px',
                    margin: '0',
                    fontWeight: '700',
                    color: '#ffffff',
                  }}
                >
                  $350
                </p>
              </div>
              <div
                className="d-flex flex-column align-items-end overview-courses-list"
                style={{ textAlign: 'right', color: '#DEDEDE' }}
              >
                <p style={{ fontSize: '10px', margin: '0', fontWeight: '700' }}>
                  Monthly $MINORITY Earned
                </p>
                <p
                  style={{
                    fontSize: '20px',
                    margin: '0',
                    fontWeight: '700',
                    lineHeight: '20px',
                  }}
                >
                  $150
                </p>
                <p
                  style={{
                    fontSize: '10px',
                    margin: '0',
                    fontWeight: '700',
                    color: '#00AA4F',
                  }}
                >
                  ↗5%
                </p>
              </div>
            </div>
            {/* Minority tracking row */}
            <div className="overview-course-card overview-course-card-border-none d-flex flex-row justify-content-between align-items-center">
              {/* Logo and Name/Description */}
              <div className="d-flex flex-row" style={{ width: '70%' }}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    marginRight: '5px',
                    background: '#CC00FF',
                    opacity: '0.5',
                  }}
                />
                <div
                  className="d-flex flex-column"
                  style={{ textAlign: 'left' }}
                >
                  <p
                    style={{
                      fontSize: '10px',
                      margin: '0',
                      fontWeight: '700',
                      color: 'white',
                    }}
                  >
                    MINORITY ($MINORITY)
                  </p>
                  <p
                    style={{
                      fontSize: '9px',
                      margin: '0',
                      fontWeight: '700',
                      lineHeight: '10px',
                    }}
                  >
                    23.61 $MINORITY
                  </p>
                </div>
              </div>

              {/* Gain */}
              <div
                className="d-flex flex-column"
                style={{ width: '30%', textAlign: 'right' }}
              >
                <p
                  style={{
                    fontSize: '15px',
                    margin: '0',
                    fontWeight: '700',
                    color: 'white',
                  }}
                >
                  $0.04
                </p>
                <p
                  style={{
                    fontSize: '10px',
                    margin: '0',
                    fontWeight: '700',
                    color: '#00AA4F',
                  }}
                >
                  ↗5%
                </p>
              </div>
            </div>
            {/* buttons row */}
            <div
              className="d-flex flex-row justify-content-between align-items-center"
              style={{ width: '100%' }}
            >
              <button
                type="button"
                className="btn btn-primary button-setting-transparent"

              >
                Settings
              </button>
              <button
                type="button"
                className="btn btn-primary button-setting-bg"
              >
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
