import React, { useState, useEffect, useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';
import EmptyOverviewComponent from './EmptyOverviewComponent';
import TasksList from './TasksList';

const OverviewMyChatper = () => {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('overviews');
  const [chapterEvents] = useState([]);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, []);

  const EventCards = useCallback(
    () => (
      <div className="d-flex flex-column justify-content-between align-items-center">
        {/* 1st card */}
        {chapterEvents?.length !== 0 ? (
          chapterEvents?.map((event) => (
            <div
              key={event._id}
              className="overview-event-card d-flex flex-row justify-content-between align-items-center w-100"
            >
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ width: '20%', marginRight: '5px' }}
              >
                <img
                  className="overview-event-thumbnail"
                  src={event.EventPicture.toString()}
                  alt="event-thumbnail"
                />
              </div>
              <div className="overview-event-details" style={{ width: '70%' }}>
                <p
                  style={{
                    fontSize: '18px',
                    marginBottom: '5px',
                    color: 'white',
                    fontWeight: '700',
                  }}
                >
                  {event.eventName}
                </p>
                <p style={{ fontSize: '12px', marginBottom: '5px' }}>
                  {event.time.toString()}
                </p>
                <div className="d-flex justify-content-center align-items-center overview-event-status">
                  {event.eventStatus}
                </div>
              </div>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ width: '10%', height: '100%' }}
              >
                <a
                  href={event.eventLink.toString()}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button type="button" className="more-details-button">
                    &gt;
                  </button>
                </a>
              </div>
            </div>
          ))
        ) : (
          <div
            className="d-flex flex-column"
            style={{ height: '100%', width: '100%', overflowX: 'hidden' }}
          >
            <Skeleton height={20} width={100} />
            <div
              className="d-flex flex-row align-items-center justify-content-start"
              style={{ marginBottom: '10px' }}
            >
              <Skeleton
                height={80}
                width={140}
                style={{ marginRight: '10px' }}
              />
              <div className="d-flex flex-column">
                <Skeleton height={15} width={130} />
                <Skeleton height={15} width={200} />
                <Skeleton height={15} width={170} />
                <Skeleton height={15} width={150} />
              </div>
            </div>
            <div
              className="d-flex flex-row justify-content-center align-items-center"
              style={{ width: '100%' }}
            >
              <Skeleton height={30} width={250} />
            </div>
          </div>
        )}
      </div>
    ),
    [],
  );

  const ChapterCard = useCallback(
    () => (
      <div
        className="d-flex flex-column align-items-center"
        style={{ height: '100%', width: '100%' }}
      >
        {/* first row */}
        <div className="dashboard-chapter-location" style={{ width: '100%', marginBottom: '4%' }}>
          <p>Washington, DC </p>
        </div>
        {/* second row */}
        <div
          className="d-flex flex-row align-items-start dashboard-chapter-details"
          style={{ width: '100%', marginBottom: '4%' }}
        >
          <div
            className="d-flex flex-column justify-content-center align-items-center img-container"
            style={{ width: '50%' }}
          >
            <img
              src="/assets/images/dashboard/chapter1.png"
              style={{ width: '80%', height: '100%', borderRadius: '10px' }}
              alt="chapter"
            />
            <p className="overview-chapter-card-description"> Washington DC</p>
          </div>
          <div
            className="d-flex flex-column justify-content-center align-items-start"
            style={{ color: 'white', width: '50%', height: '100%' }}
          >
            <p
              className="overview-chapter-card-description"
              style={{ fontSize: '12px', fontWeight: 400 }}
            >
              <span style={{ color: '#DEDEDE', marginRight: '4px' }}>Chapter President:</span>
              Jason Cole
            </p>
            <p
              className="overview-chapter-card-description"
              style={{ fontSize: '12px', fontWeight: 400 }}
            >
              <span style={{ color: '#DEDEDE', marginRight: '4px' }}>Next Meeting:</span>
              {' '}
              24th Oct, 2021 @ 5:00pm EST
            </p>
            <p
              className="overview-chapter-card-description"
              style={{ fontSize: '12px', fontWeight: 400 }}
            >
              <span style={{ color: '#DEDEDE', marginRight: '4px' }}>Member Since:</span>
              {' '}
              June 2021
            </p>
            <a
              className="button-more"
              style={{ margin: 'auto auto 0 auto' }}
            >
              Chapter Settings
            </a>
          </div>
        </div>
        {/* third row */}
        {/* <div className="tw-flex tw-justify-center" style={{ width: '100%' }}>

        </div> */}
      </div>
    ),
    [],
  );

  return (
    <div
      className="d-flex flex-column justify-content-between "
      style={{ height: '100%' }}
    >
      {/* First row */}
      <div
        className="d-flex flex-row justify-content-between align-items-center"
        style={{ height: '13%', marginBottom: '2%' }}
      >
        <div>
          <p
            style={{
              fontSize: '18px',
              fontWeight: '700',
              color: 'white',
              margin: 0,
              marginRight: '5px',
            }}
          >
            Chapters
          </p>
        </div>
        <div
          className="overview-courses-list d-flex flex-row justify-content-between align-items-center"
          style={{ overflowY: 'scroll' }}
        >
          <div
            className="d-flex flex-row justify-content-between"
            style={{ height: '25px' }}
          >
            <div
              className={
                currentView === 'overviews'
                  ? 'overview-career-button selected'
                  : 'overview-career-button'
              }
              onClick={() => {
                setCurrentView('overviews');
              }}
              style={{ marginRight: '2%' }}
            >
              <p>Overviews</p>
            </div>
            <div
              className={
                currentView === 'events'
                  ? 'overview-career-button selected'
                  : 'overview-career-button'
              }
              onClick={() => {
                setCurrentView('events');
              }}
            >
              <p>Events</p>
            </div>
            <div
              className={
                currentView === 'tasks'
                  ? 'overview-career-button selected'
                  : 'overview-career-button'
              }
              onClick={() => {
                setCurrentView('tasks');
              }}
            >
              <p>Tasks</p>
            </div>
          </div>
        </div>
      </div>
      <div className="" style={{ height: '85%' }}>
        {loading ? (
          <EmptyOverviewComponent
            imgURL="https://s3-alpha-sig.figma.com/img/19e3/44e7/4ec198df3b7bfd4e806f340dbcfd3bd3?Expires=1638748800&Signature=G4VB-qMqAue8RqTkOPa5kvXQDzQg-mGi6CSAmCvSDXe5Vy-2rQPyeHKf-uHFmgc9dherDLlcSfhNJx~5GtILjwwSROJhEUjujHn7DOuH43lB1fjiZor-DmLuxjQjREAo3hKEYi3KeU0qpR9-4FJFGfcwPZKy0UszzeOLdUzcDjxs0WIJDuWM6LfYw2SR4ls4g8lLZqEs8Z0rY-C95HBUCu5r~OKbiOerp~r90-m5~Vx3wIg9lisIQOLcZ87U2fY5IQULhPHJ0dfh7aT7sWN~CPuHhntEvfb6VA4Y5uVSvbcNHfu2DoHqycSDbpDcVsMUPfTgXgktO8t-MVGSfytXkA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            description="You don’t belong to any chapters yet. You can find chapters to join in the Chapter Section."
            btnText="Join Your First Chapter"
            btnFunction={() => {
              setLoading(!loading);
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%' }}>
            {currentView === 'overviews' ? (
              <ChapterCard />
            ) : currentView === 'events' ? (
              <EventCards />
            ) : (
              <TasksList />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewMyChatper;
