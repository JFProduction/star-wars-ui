import React from 'react';
import PropTypes from 'prop-types';
import styles from './MonthView.module.css';

import Tile from '../Tile';

import {
  getBeginOfDay,
  getDay,
  getEndOfDay,
  getISOLocalDate,
  isWeekend,
} from '../shared/dates';
import { tileProps } from '../shared/propTypes';

const Day = ({
  currentMonthIndex,
  currentDay,
  date,
  point,
  ...otherProps
}) => (
  <Tile
    {...otherProps}
    classes={[
        date.getMonth() !== currentMonthIndex ? styles.neighboringMonthDay : styles.day
    ]}
    date={date}
    dateTime={`${getISOLocalDate(date)}T00:00:00.000`}
    maxDateTransform={getEndOfDay}
    minDateTransform={getBeginOfDay}
    view="month"
    activeUnit={((date.getDate() === currentDay) && (currentDay === point))}
  >
    {getDay(date)}
  </Tile>
);

Day.propTypes = {
    currentMonthIndex: PropTypes.number.isRequired,
    currentDay: PropTypes.number,
  ...tileProps
};

export default Day;
