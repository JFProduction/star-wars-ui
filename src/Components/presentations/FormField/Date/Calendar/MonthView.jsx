import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './MonthView/MonthView.module.css';

import Days from './MonthView/Days';
import Weekdays from './MonthView/Weekdays';

import { isCalendarType, isMaxDate, isMinDate, isValue } from './shared/propTypes';

export default class MonthView extends PureComponent {
  get calendarType() {
    const { calendarType, locale } = this.props;

    if (calendarType) {
      return calendarType;
    }

    switch (locale) {
        case 'en-US':
        case 'es-US':
            return locale.substring(3); //return 'US' if you want Sunday as the first day of the month
            break;
        default:
            return 'ISO 8601';
            break;
    }
  }

  renderWeekdays() {
    return (
      <Weekdays
        calendarType={this.calendarType}
        locale={this.props.locale}
        month={this.props.activeStartDate}
        formatShortWeekday={this.props.formatShortWeekday}
      />
    );
  }

  renderDays() {
    const { calendarType, showWeekNumbers, ...childProps } = this.props;

    return (
      <Days activeStartDate={this.props}
        calendarType={this.calendarType}
        {...childProps}
      />
    );
  }

  render() {
    const { showWeekNumbers } = this.props;

    return (
        <div className={styles.monthView}>
            <div>
                {this.renderWeekdays()}
                {this.renderDays()}
            </div>
        </div>
    );
  }
}

MonthView.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  calendarType: isCalendarType,
  formatShortWeekday: PropTypes.func,
  locale: PropTypes.string.isRequired,
  maxDate: isMaxDate,
  minDate: isMinDate,
  onChange: PropTypes.func,
  setActiveRange: PropTypes.func,
  showNeighboringMonth: PropTypes.bool,
  value: isValue,
  valueType: PropTypes.string,
};