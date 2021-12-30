import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import EmptyOverviewComponent from './EmptyOverviewComponent';

const OverviewEvents = (props) => {
  const [userEvents, setUserEvents] = useState([]);
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.token != null) {
      axios.get('https://koinstreet-learn-api.herokuapp.com/api/v1/saveEvent/userEvents', {
        // axios.get(`https://koinstreet-learn-api.herokuapp.com/api/v1/event`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type',
          Authorization: `Bearer ${props.token}`,
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        setLoading(false);
        const userEventsData = res.data.data.filter((event) => event?.time !== null);
        const tempUserEventsData = userEventsData.map((event) => event.time = new Date(event?.time));
        // console.log(userEventsData);
        setUserEvents(userEventsData.slice(0, 2));
        setDates(userEventsData.map((event) => event.time));
      }).catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
        setUserEvents([]);
        setLoading(true);
      });
    }
  }, []);

  return (
    loading
      ? (
        <div className="d-flex flex-column justify-content-between h-100">
          <p style={{ fontSize: '18px', fontWeight: '700', color: 'black' }}>Events </p>
          <EmptyOverviewComponent
            imgURL="https://s3-alpha-sig.figma.com/img/31fc/7c17/7233f396628b579fecdc6e84671283fd?Expires=1638748800&Signature=X2QnrrzjRAUkj~YcRv3an4O3YWJYSQUhuhX2AnEVa~FHseg-cm1synSLvaBOYEOzBmVM3gMf9pgowYDgSmCzwH78i0fithM2iTSCUMglNtSB1V8lniyGYSm7l3kDl8kRIaIdsoNjheCPrjP97m2i8T099fHhjK0cKgHmxzgl39i8Mo9QhhVzbfrCU8QOJYVbYthKPeGFs4p7zNUEtGVwmaVM4axtHPk38aYX0BvpKHv6MhhUU3OsxDCZ2-2mM8y50MGtB5UFpZj-UMb9MvCgUD5Rs49i6YdnmiDbYXGqAJRsjGkkh9ezQj2fsHNvCPMi1fGPa3rPyARYVdgd-plZew__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            description="You haven’t registered for any events yet. MPA has tons of events going on right now. Check them out in the Events Section."
            btnText="Schedule Your First Event"
            btnFunction={() => { setLoading(false); }}
          />
        </div>
      )
      : userEvents.length !== 0
        ? (
          <div className="d-flex flex-column justify-content-between h-100">
            <p style={{ fontSize: '18px', fontWeight: '700', color: 'black' }}>Events </p>
            <Calendar
              tileClassName={({ date, view }) => {
                const convertedDate = date?.toISOString()?.substring(0, 10);
                console.log(dates);
                // if (dates.find((x) => x?.toISOString()?.substring(0, 10) === convertedDate)) {
                //   return 'marked-date';
                // }
              }}
              maxDetail="month"
              nextLabel=">>"
              nextAriaLabel="Go to next month"
              prevLabel="<<"
              prevAriaLabel="Go to prev month"
              next2Label=""
              prev2Label=""
            />
            <p style={{ fontSize: '24px', fontWeight: '700', color: 'black' }}>Upcoming</p>
            <div className="d-flex flex-column justify-content-between align-items-center">
              {/* 1st card */}
              {userEvents.map((event) => (
                <div key={event?._id} className="overview-event-card d-flex flex-row justify-content-between align-items-center w-100">
                  <div className="d-flex justify-content-center align-items-center" style={{ width: '20%', marginRight: '5px' }}>
                    <img className="overview-event-thumbnail" src={event?.EventPicture?.toString()} alt="event-thumbnail" />
                  </div>
                  <div className="overview-event-details" style={{ width: '70%' }}>
                    <p style={{
                      fontSize: '18px', marginBottom: '5px', color: 'black', fontWeight: '700',
                    }}
                    >
                      {event.eventName}
                    </p>
                    <p style={{ fontSize: '12px', marginBottom: '5px' }}>{event.time.toString()}</p>
                    <div className="d-flex justify-content-center align-items-center overview-event-status">{event?.eventStatus}</div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center" style={{ width: '10%', height: '100%' }}>
                    <a href={event?.eventLink?.toString()} target="_blank" rel="noreferrer">
                      <button className="more-details-button">
                        &gt;
                      </button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-center align-items-center" style={{ width: '100%' }}>
              <a href="/events">
                <button type="button" className="btn btn-primary" style={{ background: '#151371', paddingLeft: '31px', paddingRight: '31px' }}>
                  More Events
                </button>
              </a>
            </div>
          </div>
        )
        : (
          <div className="d-flex flex-column justify-content-between h-100">
            <p style={{ fontSize: '18px', fontWeight: '700', color: 'black' }}>Events </p>
            <EmptyOverviewComponent
              imgURL="https://s3-alpha-sig.figma.com/img/31fc/7c17/7233f396628b579fecdc6e84671283fd?Expires=1638748800&Signature=X2QnrrzjRAUkj~YcRv3an4O3YWJYSQUhuhX2AnEVa~FHseg-cm1synSLvaBOYEOzBmVM3gMf9pgowYDgSmCzwH78i0fithM2iTSCUMglNtSB1V8lniyGYSm7l3kDl8kRIaIdsoNjheCPrjP97m2i8T099fHhjK0cKgHmxzgl39i8Mo9QhhVzbfrCU8QOJYVbYthKPeGFs4p7zNUEtGVwmaVM4axtHPk38aYX0BvpKHv6MhhUU3OsxDCZ2-2mM8y50MGtB5UFpZj-UMb9MvCgUD5Rs49i6YdnmiDbYXGqAJRsjGkkh9ezQj2fsHNvCPMi1fGPa3rPyARYVdgd-plZew__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
              description="You haven’t registered for any events yet. MPA has tons of events going on right now. Check them out in the Events Section."
              btnText="Schedule Your First Event"
              btnFunction={() => { setLoading(false); }}
            />
          </div>
        )
  );
};

export default OverviewEvents;
