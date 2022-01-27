import React, { useState, useEffect } from 'react';
import { isSameDay, set } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { Calendar } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';
import { Events } from './Utils';
import styles from '../../styles/MentorCSS/Calendar.module.css';
import stylesE from '../../styles/MentorCSS/Dashboard.module.css';
import PopModel from './PopModel';

export default function CalendarEvent({
  events: data,
  user_id,
  setUpdate,
  update,
}) {
  const [modalShow, setModalShow] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [date, setDate] = useState([]);
  const [events, setEvents] = useState([]);
  // const [ampm, setAmpm] = useState("");

  useEffect(() => {
    const arr = [];
    data.forEach((d) => {
      const _date = new Date(Date.parse(d.event_date));
      if (_date) {
        arr.push(new Date(Date.parse(d.event_date)));
      }
    });
    setSelectedDates([...selectedDates, ...arr]);
    setEvents(data);
  }, []);

  const modifiers = {
    selected: (_date) => selectedDates.some((selectedDate) => isSameDay(selectedDate, _date)),
  };
  const handleDayClick = (_date) => {
    const day = _date.getDate() < 10 ? `0${_date.getDate()}` : `${_date.getDate()}`;
    const month = _date.getMonth() + 1 < 10
      ? `0${_date.getMonth() + 1}`
      : `${_date.getMonth() + 1}`;
    const newDate = `${_date.getFullYear()}-${month}-${day}`;
    setDate(newDate);
    setModalShow(true);
  };

  return (
    <div>
      <div className={stylesE.teamImg}>
        <img src="/assets/images/mentor/calendarIcon.png" alt="calendar" />
        <p>CALENDER/EVENTS</p>
      </div>
      <PopModel
        show={modalShow}
        onHide={() => setModalShow(false)}
        events={events}
        setEvents={setEvents}
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
        date={date}
        setDate={setDate}
        setModalShow={setModalShow}
        user_id={user_id}
        setUpdate={setUpdate}
        update={update}
      />

      <div className={styles.calenderMentor}>
        <Events
          events={events}
          selectedDates={selectedDates}
          setEvents={setEvents}
          user_id={user_id}
          setSelectedDates={setSelectedDates}
        />
        <div className={styles.calender}>
          <Calendar
            onDayClick={handleDayClick}
            modifiers={modifiers}
            locale={enGB}
          />
        </div>
      </div>
    </div>
  );
}
