import { useEffect } from 'react';
import * as Styles from './styles';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const CalendarItem = ({ selectedDates = [] }) => {
  function transformDatesInDateForExtension(dates) {
    return dates.map(date => {
      // get day as '9 de agosto de 2023'
      const dateObject = new Date(date.split('-').join('/'));
      const day = dateObject.getDate();
      const month = dateObject.toLocaleString('pt-BR', { month: 'long' });
      const year = dateObject.getFullYear();
      return `${day} de ${month} de ${year}`;
    });
  }

  function mountDateInterval(dateStart, dateEnd) {
    const dates = [];
    const dateStartObject = new Date(dateStart.split('-').join('/'));
    const dateEndObject = dateEnd? new Date(dateEnd.split('-').join('/')): null;
    const dateStartObjectCopy = new Date(dateStartObject);
    const dateEndObjectCopy = new Date(dateEndObject);
    while (dateStartObjectCopy <= dateEndObjectCopy) {
      dates.push(dateStartObjectCopy.toISOString().split('T')[0]);
      dateStartObjectCopy.setDate(dateStartObjectCopy.getDate() + 1);
    }
    return dates;
  }

  function getElementsDaysInCalendar(dates) {
    return [...dates].map(dateKey => {
      return document.querySelector(`.react-calendar__month-view__days__day abbr[aria-label="${dateKey}"]`);
    }).filter(element => element !== null).map(element => {
      return element.parentElement;
    });
  }

  function setIntervalDatesInCalendar(dateStart, dateEnd) {
    const dates = mountDateInterval(dateStart, dateEnd);
    const datesKeys = transformDatesInDateForExtension(dates);
    getElementsDaysInCalendar(datesKeys).forEach(element => {
      element.classList.add('react-calendar__tile--middle-active');
    });
  }

  useEffect(() => {
    selectedDates.forEach(dates => {
      setIntervalDatesInCalendar(dates.data_inicio, dates.data_fim);
    });
  }, [ selectedDates ]);

  return (
    <Styles.Container>
      <Calendar
        calendarType="US"
      />
    </Styles.Container>
  )
}
