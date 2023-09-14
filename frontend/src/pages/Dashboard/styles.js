import styles from "styled-components"

export const Container = styles.div`
  @media screen and (min-width: 1100px) {
    display: grid;
    grid-template-columns: 1fr 300px;
  }

  .link-loading-more {
    display: block;
    color: var(--color-primary);
  }

  .react-calendar__tile--middle-active {
    background: #e99c5b!important;
    color: #333!important;
    border-radius: 0 !important;
  }

  .react-calendar__tile--first-active {
    border-radius: 50% 0 0 50% !important;
  }

  .react-calendar__tile--last-active {
    border-radius: 0 50% 50% 0 !important;
  }
`

export const Content = styles.div`
  padding: 10px 20px 10px 10px;

  @media screen and (min-width: 1100px) {
    padding: 20px 40px;
  }
`;

export const Header = styles.div`
  margin-bottom: 30px;
  padding: 0 0 20px 0;
  border-bottom: 1px solid #777;
  display: grid;
  grid-template-columns: 1fr 200px;
  align-items: center;
  gap: 10px;
`;

export const Title = styles.h2``;

export const Sidebar = styles.div``;

export const CalendarContent = styles.div`
  padding: 10px;
  background: var(--box-de-texto);
  border-radius: 10px;
  pointer-events: none;

  .react-calendar {
    color: #000;
    border-radius: 10px;
    border: none;
    background: #ddd;
    padding: 10px;
  }

  .react-calendar__month-view__days__day {
    border-radius: 50%;
  }

  .react-calendar__tile--active,
  .react-calendar__tile:active,
  .react-calendar__month-view__days__day:active,
  .react-calendar__month-view__days__day:hover {
    background: var(--secondary-color) !important;
    color: #333 !important;
  }
`;

export const EventsContent = styles.div`
  margin-top: 40px;
`
