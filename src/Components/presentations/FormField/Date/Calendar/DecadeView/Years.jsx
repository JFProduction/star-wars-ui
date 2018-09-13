import React, { PureComponent } from 'react';

import TileGroup from '../TileGroup';
import Year from './Year';

import { getBeginOfDecadeYear, getYear } from '../shared/dates';
import { tileGroupProps } from '../shared/propTypes';

export default class Years extends PureComponent {
  get start() {
    const { activeStartDate } = this.props;
    return getBeginOfDecadeYear(activeStartDate);
  }

  get end() {
    return this.start + 9;
  }

  get year() {
      const { value } = this.props;
      return getYear(value);
  }  

  render() {
      const { year } = this;

    const {
      activeStartDate,
      ...otherProps
    } = this.props;

    return (
      <TileGroup
            {...otherProps}
            dateTransform={year => new Date(year, 0, 1)}
            dateType="year"
            end={this.end}
            start={this.start}
            tile={Year}
            //Tile props
            currentYear={year}
      />
    );
  }
}

Years.propTypes = {
  ...tileGroupProps,
};
