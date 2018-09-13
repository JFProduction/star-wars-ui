import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import TileGroup from '../TileGroup';
import Month from './Month';

import { getYear, getMonthIndex } from '../shared/dates';
import { tileGroupProps } from '../shared/propTypes';

export default class Months extends PureComponent {
  start = 0

  end = 11

  get year() {
    const { activeStartDate } = this.props;
    return getYear(activeStartDate);
  }

  get monthIndex() {
      const { value } = this.props;
      const selectedYear = getYear(value);

      let month = (selectedYear === this.year) ? getMonthIndex(value) : -1;
      return month;
  }  

  render() {
    const { monthIndex } = this;

    const {
      activeStartDate,
      ...otherProps
    } = this.props;

    return (
      <TileGroup
            {...otherProps}
            dateTransform={monthIndex => new Date(this.year, monthIndex, 1)}
            dateType="month"
            end={this.end}
            start={this.start}
            tile={Month}
            // Tile props
            currentMonthIndex={monthIndex}
      />
    );
  }
}

Months.propTypes = {
  ...tileGroupProps,
  locale: PropTypes.string,
};
