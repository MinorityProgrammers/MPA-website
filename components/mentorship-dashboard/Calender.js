import React, { useState, useEffect } from 'react';
import { isSameDay, set } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { Calendar } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';
import { Events } from './Utils';
import styles from '../../styles/MentorCSS/Calendar.module.css';
import stylesE from '../../styles/MentorCSS/Dashboard.module.css';
import PopModel from './PopModel';

export default function CalendarEvent({ events: data, user_id }) {
  const [modalShow, setModalShow] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [date, setDate] = useState([]);
  const [events, setEvents] = useState([]);
  // const [ampm, setAmpm] = useState("");
  // console.log(selectedDates);
  useEffect(() => {
    const arr = [];
    data.map((d) => {
      const date = new Date(Date.parse(d.event_date));
      if (date) {
        arr.push(new Date(Date.parse(d.event_date)));
      }
    });
    setSelectedDates([...selectedDates, ...arr]);
    setEvents(data);
  }, []);

  const modifiers = {
    selected: (date) =>
      selectedDates.some((selectedDate) => isSameDay(selectedDate, date)),
  };
  const handleDayClick = (date) => {
    const day =
      date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + '';
    const month =
      date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1 + '';
    const newDate = `${date.getFullYear()}-${month}-${day}`;
    setDate(newDate);
    setModalShow(true);
  };

  return (
    <div>
      <div className={stylesE.teamImg}>
        <img src={'/assets/images/mentor/calendarIcon.png'} alt="calendar" />
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
