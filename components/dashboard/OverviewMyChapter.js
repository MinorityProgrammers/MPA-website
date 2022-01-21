import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import EmptyOverviewComponent from './EmptyOverviewComponent';
import TasksList from './TasksList';

const OverviewMyChatper = (props) => {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('overviews');
  const [chapterEvents, setChapterEvents] = useState([]);

  useEffect(() => {
    setTimeout(() => { setLoading(false); }, 3000);
  }, []);

  const EventCards = () => (
    <div className="d-flex flex-column justify-content-between align-items-center">
      {/* 1st card */}
      {chapterEvents?.length !== 0
        ? chapterEvents?.map((event) => (
          <div key={event._id} className="overview-event-card d-flex flex-row justify-content-between align-items-center w-100">
            <div className="d-flex justify-content-center align-items-center" style={{ width: '20%', marginRight: '5px' }}>
              <img className="overview-event-thumbnail" src={event.EventPicture.toString()} alt="event-thumbnail" />
            </div>
            <div className="overview-event-details" style={{ width: '70%' }}>
              <p style={{
                fontSize: '18px', marginBottom: '5px', color: 'black', fontWeight: '700',
              }}
              >
                {event.eventName}
              </p>
              <p style={{ fontSize: '12px', marginBottom: '5px' }}>{event.time.toString()}</p>
              <div className="d-flex justify-content-center align-items-center overview-event-status">{event.eventStatus}</div>
            </div>
            <div className="d-flex justify-content-center align-items-center" style={{ width: '10%', height: '100%' }}>
              <a href={event.eventLink.toString()} target="_blank" rel="noreferrer">
                <button className="more-details-button">
                  &gt;
                </button>
              </a>
            </div>
          </div>
        ))
        : (
          <div className="d-flex flex-column" style={{ height: '100%', width: '100%', overflowX: 'hidden' }}>
            <Skeleton height={20} width={100} />
            <div className="d-flex flex-row align-items-center justify-content-start" style={{ marginBottom: '10px' }}>
              <Skeleton height={80} width={140} style={{ marginRight: '10px' }} />
              <div className="d-flex flex-column">
                <Skeleton height={15} width={130} />
                <Skeleton height={15} width={200} />
                <Skeleton height={15} width={170} />
                <Skeleton height={15} width={150} />
              </div>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center" style={{ width: '100%' }}>
              <Skeleton height={30} width={250} />
            </div>
          </div>
        )}
    </div>
  );

  const ChapterCard = () =>
    // 3 row: Location (drop down list?)- Image + chapter info - Chapter button
    (
      <div className="d-flex flex-column align-items-center" style={{ height: '100%', width: '100%' }}>
        {/* first row */}
        <div style={{ width: '100%', marginBottom: '4%' }}>
          <p>Washington, DC </p>
        </div>
        {/* second row */}
        <div className="d-flex flex-row align-items-start" style={{ width: '100%', marginBottom: '4%' }}>
          {/* first column image + location */}
          <div className="d-flex flex-column justify-content-center align-items-center" style={{ width: '50%' }}>
            <img src="https://s3-alpha-sig.figma.com/img/617f/6418/32b8d9273c0bc3217256454133a9cd75?Expires=1638748800&Signature=bYu-2ydeD22ONchi0p0WOk48IfTtD4pIkXlpDwDq-PGcYTdQSslzpoOwvdbB1ZrGOIQ3Hs1LD-eQ9pFdSy4RZNN4QGo2JLCE6nL7OmOHaPz9ECd7ICkApB4IjeVv9o1TB61KSSxVtZ4YOccd9tmXdwFAFyLmRscMVSsE36deCOFeIMaJ6ehaY8CXy~E9-NWitoyayIqu4QbmAOqeWdndndKEAVuQucn~BcfQSAGZ6CkPTz8iIVU9Cjk2JTPU8zhgPaDhgpQorV6IEoMIFtfQ137YKa~FCFFyKqQ4HQx~HMiamoT0keVcCtPwSjJaqpNrfeaHQrLZpJAQA~UPkNQAYw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" style={{ width: '80%', height: 'auto', borderRadius: '10px' }} />
            <p className="overview-chapter-card-description"> Washington DC</p>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-start" style={{ color: 'black', width: '50%' }}>

            <p className="overview-chapter-card-description" style={{ fontSize: '10px', fontWeight: 400 }}>
              <strong>Chapter President:</strong>
              Jason Cole
            </p>
            <p className="overview-chapter-card-description" style={{ fontSize: '10px', fontWeight: 400 }}>
              <strong>Next Meeting:</strong>
              {' '}
              24th Oct, 2021 @ 5:00pm EST
            </p>
            <p className="overview-chapter-card-description" style={{ fontSize: '10px', fontWeight: 400 }}>
              <strong>Member Since:</strong>
              {' '}
              June 2021
            </p>

          </div>

        </div>
        {/* third row */}
        <div style={{ width: '100%' }}>
          <button
            className="btn btn-primary"
            style={{
              background: '#151371', fontSize: '10px', width: '80%', margin: '0 10%',
            }}
          >
            Chapter Settings
          </button>
        </div>
      </div>
    );
  return (
    <div className="d-flex flex-column justify-content-between " style={{ height: '100%' }}>
      {/* First row */}
      <div className="d-flex flex-row justify-content-between align-items-center" style={{ height: '13%', marginBottom: '2%' }}>
        <div>
          <p style={{
            fontSize: '18px', fontWeight: '700', color: 'black', margin: 0, marginRight: '5px',
          }}
          >
            Chapters
          </p>
        </div>
        <div className="overview-courses-list d-flex flex-row justify-content-between align-items-center" style={{ overflowY: 'scroll' }}>
          <div className="d-flex flex-row justify-content-between" style={{ height: '25px' }}>
            <div
              className={currentView === 'overviews' ? 'overview-career-button selected' : 'overview-career-button'}
              onClick={() => { setCurrentView('overviews'); }}
              style={{ marginRight: '2%' }}
            >
              <p>Overviews</p>
            </div>
            <div className={currentView === 'events' ? 'overview-career-button selected' : 'overview-career-button'} onClick={() => { setCurrentView('events'); }}>
              <p>Events</p>
            </div>
            <div
              className={currentView === 'tasks' ? 'overview-career-button selected' : 'overview-career-button'}
              onClick={() => { setCurrentView('tasks'); }}
            >
              <p>Tasks</p>
            </div>
          </div>
        </div>
      </div>
      <div className="" style={{ height: '85%' }}>

        {loading
          ? (
            <EmptyOverviewComponent
              imgURL="https://s3-alpha-sig.figma.com/img/19e3/44e7/4ec198df3b7bfd4e806f340dbcfd3bd3?Expires=1638748800&Signature=G4VB-qMqAue8RqTkOPa5kvXQDzQg-mGi6CSAmCvSDXe5Vy-2rQPyeHKf-uHFmgc9dherDLlcSfhNJx~5GtILjwwSROJhEUjujHn7DOuH43lB1fjiZor-DmLuxjQjREAo3hKEYi3KeU0qpR9-4FJFGfcwPZKy0UszzeOLdUzcDjxs0WIJDuWM6LfYw2SR4ls4g8lLZqEs8Z0rY-C95HBUCu5r~OKbiOerp~r90-m5~Vx3wIg9lisIQOLcZ87U2fY5IQULhPHJ0dfh7aT7sWN~CPuHhntEvfb6VA4Y5uVSvbcNHfu2DoHqycSDbpDcVsMUPfTgXgktO8t-MVGSfytXkA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
              description="You don’t belong to any chapters yet. You can find chapters to join in the Chapter Section."
              btnText="Join Your First Chapter"
              btnFunction={() => { setLoading(!loading); }}
            />
          )
          : (
            <div style={{ width: '100%', height: '100%' }}>
              {currentView === 'overviews'
                ? <ChapterCard />
                : currentView === 'events'
                  ? <EventCards />
                  : <TasksList />}
            </div>
          )}
      </div>
    </div>
  );
};

export default OverviewMyChatper;
