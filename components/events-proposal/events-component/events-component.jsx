import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import styles from './events-component.module.css';
import EventsOverview from '../events-overview/events-overview';
import EventsMenu from '../events-menu/events-menu';
import MpaLoader from '../../mpa-loader/loader';

const Events = ({ token }) => {
  const [status, setStatus] = useState();
  const [eventsCopy, setEventsCopy] = useState(null);
  const [events, setEvents] = useState(null);
  const [showOverview, setShow] = useState(true);
  const [value, setValue] = useState('');

  const options = [
    { label: 'Virtual Event', value: 'Virtual Event' },
    { label: 'In-person Event', value: 'In-person Event' },
  ];

  const selectStyles = {
    menu: (provided) => ({
      ...provided,
      padding: 10,
      cursor: 'pointer',
    }),
    input: (provided) => ({
      ...provided,
      padding: 0,
      height: 50,
      minHeight: 50,
    }),
    container: (provided) => ({
      ...provided,
      padding: 0,
      height: 50,
      minHeight: 50,
      width: 200,
      minWidth: 200,
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      padding: 0,
      height: 50,
      minHeight: 50,
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: 50,
      minHeight: 50,
    }),
    control: (base) => ({
      ...base,
      '&:hover': { borderColor: 'gray' },
      border: '1px solid lightgray',
      boxShadow: 'none',
      padding: 0,
      height: 50,
      minHeight: 50,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#fff1bd' : 'none',
      '&:hover': { backgroundColor: '#fff1bd' },
      '&:focused': { backgroundColor: 'none' },
      color: '#222222',
      cursor: 'pointer',
      padding: 10,
    }),
    placeholder: (base) => ({
      ...base,
      fontSize: '1em',
      color: '#151371',
      fontWeight: 500,
    }),
    indicatorSeparator: (base) => ({
      ...base,
      display: 'none',
    }),
    groupHeading: (base) => ({
      ...base,
      fontSize: '1.02em',
      color: '#888',
      fontWeight: 700,
    }),
  };

  const fetchEvents = () => {
    axios
      .get(`${process.env.BASE_URI}/event`)
      .then((res) => res.data.data)
      .then((data) => {
        setEvents(data);
        setEventsCopy(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filter = (key, val) => eventsCopy.filter((ev) => ev[key] === val);

  const onChangeInput = (obj) => {
    setValue('');
    if (obj) {
      if (obj.value === 'Virtual Event') setEvents(filter('Virtual', true));
      if (obj.value === 'In-person Event') setEvents(filter('Virtual', false));
    } else {
      setEvents(eventsCopy);
    }
  };

  const getSearch = (e) => {
    if (e.target.value) {
      const searchValue = e.target.value;
      const newEvents = events.filter((event) =>
        event.eventName.toLowerCase().includes(searchValue.toLowerCase())
      );
      setEvents(newEvents);
    } else {
      fetchEvents();
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    getSearch(e);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <div className={styles.imageOverlay}>
            <div className={styles.title}>Event Proposals</div>
          </div>
          <div
            style={{ backgroundImage: 'url(/assets/images/events-bg.png)' }}
            className={styles.topBg}
          />
        </div>
        <div className={styles.main}>
          <div className={styles.formContainer}>
            <div className={styles.searchContainer}>
              <input
                className={styles.search}
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="What event are you looking for?"
              />
              <div className={styles.searchIcon}>
                <i className="fas fa-search" />
              </div>
            </div>

            <div className={styles.filterContainer}>
              <Select
                instanceId="form-filter"
                options={options}
                placeholder="Filter Search"
                styles={selectStyles}
                closeMenuOnSelect
                isSearchable={false}
                isClearable
                onChange={onChangeInput}
              />
            </div>
          </div>

          <div className={styles.highlights}>
            <div className={`${styles.highlight} ${styles.blue}`}>
              <div className={styles.highlightTitle}>Lectures/Webinars</div>
              <div className={styles.highlightSubtitle}>On The Last Topic</div>
            </div>

            <div className={`${styles.highlight} ${styles.pink}`}>
              <div className={styles.highlightTitle}>Workshops/Conferences</div>
              <div className={styles.highlightSubtitle}>Hands on Training</div>
            </div>

            <div className={`${styles.highlight} ${styles.yellow}`}>
              <div className={styles.highlightTitle}>Hackathons</div>
              <div className={styles.highlightSubtitle}>Compete For Pirzes</div>
            </div>

            <div className={`${styles.highlight} ${styles.pink}`}>
              <div className={styles.highlightTitle}>
                Incubators/Accelerators
              </div>
              <div className={styles.highlightSubtitle}>
                Start Your Tech Business
              </div>
            </div>
          </div>

          <div className={styles.navContainer}>
            <div className={styles.navList}>
              <div
                onClick={() => {
                  setShow(false);
                  setStatus('pending');
                }}
                className={`${styles.nav} ${
                  status === 'pending' ? styles.clicked : styles.notClicked
                }`}
              >
                For Review
              </div>
              <div
                onClick={() => {
                  setShow(false);
                  setStatus('approved');
                }}
                className={`${styles.nav} ${
                  status === 'approved' ? styles.clicked : styles.notClicked
                }`}
              >
                Approved
              </div>
              <div
                onClick={() => {
                  setShow(false);
                  setStatus('rejected');
                }}
                className={`${styles.nav} ${
                  status === 'rejected' ? styles.clicked : styles.notClicked
                }`}
              >
                Rejected
              </div>
            </div>
            <div className={styles.underline} />
          </div>
          {events ? (
            <>
              {showOverview ? (
                <EventsOverview events={events} token={token} />
              ) : (
                <EventsMenu
                  events={events}
                  eventStatus={status}
                  token={token}
                />
              )}
            </>
          ) : (
            <MpaLoader style={{ background: '#ff0068' }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
