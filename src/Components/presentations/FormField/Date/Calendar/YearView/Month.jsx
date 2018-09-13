import React from 'react';
import PropTypes from 'prop-types';
import styles from './YearView.module.css';

import Tile from '../Tile';

import {
  getBeginOfMonth,
  getEndOfMonth,
  getISOLocalMonth,
} from '../shared/dates';
import { formatMonth as defaultFormatMonth } from '../shared/dateFormatter';
import { tileProps } from '../shared/propTypes';

const Month = ({
  currentMonthIndex,
  date,
  formatMonth,
  locale,
  point,
  ...otherProps
}) => (
        <Tile
            {...otherProps}
            classes={[styles.month]}
            date={date}
            dateTime={`${getISOLocalMonth(date)}T00:00:00.000`}
            maxDateTransform={getEndOfMonth}
            minDateTransform={getBeginOfMonth}
            view="year"
            activeUnit={(point === currentMonthIndex)}
        >
            {formatMonth(date, locale)}
        </Tile>
);

Month.defaultProps = {
  formatMonth: defaultFormatMonth,
};

Month.propTypes = {
  ...tileProps,
  formatMonth: PropTypes.func,
  locale: PropTypes.string,
  currentMonthIndex: PropTypes.number
};

export default Month;
