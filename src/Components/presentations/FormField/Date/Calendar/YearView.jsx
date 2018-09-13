import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './YearView/YearView.module.css';

import Months from './YearView/Months';

import { isMaxDate, isMinDate, isValue } from './shared/propTypes';

export default class YearView extends PureComponent {
  renderMonths() {
    return (
      <Months {...this.props} />
    );
  }

  render() {
      return (
      <div className={styles.yearView}>
        {this.renderMonths()}
      </div>
    );
  }
}

YearView.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  formatMonth: PropTypes.func,
  locale: PropTypes.string,
  maxDate: isMaxDate,
  minDate: isMinDate,
  onChange: PropTypes.func,
  setActiveRange: PropTypes.func,
  value: isValue,
  valueType: PropTypes.string,
};
