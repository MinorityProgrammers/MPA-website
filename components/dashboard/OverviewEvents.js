import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import EmptyOverviewComponent from './EmptyOverviewComponent';

const OverviewEvents = ({ token }) => {
  const [userEvents, setUserEvents] = useState([]);
  const [, setDates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token != null) {
      axios
        .get(`${process.env.BASE_URI}/event`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          setLoading(false);
          const userEventsData = res.data.data.filter(
            (event) => event?.time !== null,
          );

          setUserEvents(userEventsData.slice(0, 2));
          setDates(userEventsData.map((event) => event.time));
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
          console.log(error.config);
          setUserEvents([]);
          setLoading(true);
        });
    }
  }, []);
  // date
  function formatAMPM(time) {
    const date = new Date(time);
    const day = date.toString().split(' ')[0];
    const month = date.toString().split(' ')[1];
    const monthDay = date.toString().split(' ')[2];
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours %= 12;
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes} ${ampm} - ${day}, ${month} ${monthDay}th`;
    return strTime;
  }
  return loading ? (
    <div
      className="d-flex flex-column justify-content-start h-100"
      style={{ overflowY: 'scroll' }}
    >
      <p style={{ fontSize: '18px', fontWeight: '700', color: 'white' }}>
        Events
      </p>
      <div
        className="d-flex flex-row justify-content-start align-items-center"
        style={{ lineHeight: 2, overflowX: 'hidden' }}
      >
        <Skeleton count={7} height={20} width={1200} />
      </div>
      <p style={{ fontSize: '18px', fontWeight: '700', color: 'white' }}>
        Upcoming
      </p>
      <div
        className="d-flex flex-column justify-content-start align-items-center"
        style={{ lineHeight: 2, overflowX: 'hidden' }}
      >
        <div style={{ marginBottom: '20px', width: '100%' }}>
          <Skeleton count={3} height={80} width={1200} />
        </div>
        <Skeleton height={30} width={1200} />
      </div>
    </div>
  ) : userEvents.length !== 0 ? (
    <div className="d-flex flex-column justify-content-between h-100">
      <p style={{ fontSize: '18px', fontWeight: '700', color: 'white' }}>
        Events
      </p>
      <Calendar
        maxDetail="month"
        nextLabel="  >"
        nextAriaLabel="Go to next month"
        prevLabel="<  "
        prevAriaLabel="Go to prev month"
        next2Label=""
        prev2Label=""
      />
      <p style={{ fontSize: '16px', fontWeight: '600', color: 'white' }}>
        Upcoming
      </p>
      <div className="d-flex flex-column justify-content-between align-items-center">
        {/* 1st card */}
        {userEvents.map((event) => (
          <div
            key={event?._id}
            className="overview-event-card d-flex flex-row justify-content-between align-items-center w-100"
          >
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ width: '20%', marginRight: '5px' }}
            >
              <img
                className="overview-event-thumbnail"
                src={event?.EventPicture?.toString()}
                alt="event-thumbnail"
              />
            </div>
            <div className="overview-event-details" style={{ width: '70%' }}>
              <p
                style={{
                  fontSize: '12px',
                  marginBottom: '5px',
                  color: 'white',
                  fontWeight: '500',
                }}
              >
                {event.eventName}
              </p>
              <p style={{ fontSize: '10px', color: ' #DEDEDE', marginBottom: '5px' }}>
                {formatAMPM(event.time)}
                {/* {event.time.toString()} */}
              </p>
              {/* <div className="d-flex justify-content-center
              align-items-center overview-event-status">
                {event?.eventStatus}
              </div> */}
            </div>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: '100%' }}
            >

              {/* Third Column */}
              <div
                className="overview-course-currency d-flex justify-content-center flex-column align-items-center"
                style={{ marginRight: '2%' }}
              >
                <p style={{ fontSize: '10px', marginRight: '4px' }}>
                  {event?.eventStatus}
                </p>
              </div>
              {/* Fourth Column */}
              <div className="d-flex justify-content-center align-items-center ">
                <a
                  href={event?.eventLink?.toString()}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i style={{ fontSize: '20px' }} className="far fa-arrow-alt-circle-right" />

                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ width: '100%' }}
      >
        <a
          className="button-more"
          href="/events"
        >
          More Events
        </a>
      </div>
    </div>
  ) : (
    <div className="d-flex flex-column justify-content-between h-100">
      <p style={{ fontSize: '18px', fontWeight: '700', color: 'white' }}>
        Events
      </p>
      <EmptyOverviewComponent
        imgURL="https://s3-alpha-sig.figma.com/img/31fc/7c17/7233f396628b579fecdc6e84671283fd?Expires=1638748800&Signature=X2QnrrzjRAUkj~YcRv3an4O3YWJYSQUhuhX2AnEVa~FHseg-cm1synSLvaBOYEOzBmVM3gMf9pgowYDgSmCzwH78i0fithM2iTSCUMglNtSB1V8lniyGYSm7l3kDl8kRIaIdsoNjheCPrjP97m2i8T099fHhjK0cKgHmxzgl39i8Mo9QhhVzbfrCU8QOJYVbYthKPeGFs4p7zNUEtGVwmaVM4axtHPk38aYX0BvpKHv6MhhUU3OsxDCZ2-2mM8y50MGtB5UFpZj-UMb9MvCgUD5Rs49i6YdnmiDbYXGqAJRsjGkkh9ezQj2fsHNvCPMi1fGPa3rPyARYVdgd-plZew__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
        description="You haven’t registered for any events yet. MPA has tons of events going on right now. Check them out in the Events Section."
        btnText="Schedule Your First Event"
        btnFunction={() => {
          setLoading(false);
        }}
      />
    </div>
  );
};

export default OverviewEvents;
