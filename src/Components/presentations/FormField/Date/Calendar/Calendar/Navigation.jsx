import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Navigation.module.css';
import arrow from './icon--arrow.svg';

import {
    getDecadeLabel,
    getBeginNext,
    getBeginPrevious,
    getEndPrevious,
    getYear,
} from '../shared/dates';
import { formatMonthYear as defaultFormatMonthYear } from '../shared/dateFormatter';
import { isView, isViews } from '../shared/propTypes';

export default class Navigation extends Component {
    shouldComponentUpdate(nextProps) {
        return (
            nextProps.activeStartDate !== this.props.activeStartDate ||
                nextProps.view !== this.props.view
        );
    }

    get drillUpAvailable() {
        const { view, views } = this.props;
        return views.indexOf(view) > 0;
    }

    get prevButtonDisabled() {
        const { activeStartDate: date, minDate, view } = this.props;
        const previousActiveStartDate = getBeginPrevious(view, date);
        if (previousActiveStartDate.getFullYear() < 1000) {
            return true;
        }
        const previousActiveEndDate = getEndPrevious(view, date);
        return minDate && minDate >= previousActiveEndDate;
    }

    get nextButtonDisabled() {
        const { activeStartDate: date, maxDate, view } = this.props;
        const nextActiveStartDate = getBeginNext(view, date);
        return maxDate && maxDate <= nextActiveStartDate;
    }

    onClickPrevious = () => {
        const { activeStartDate: date, view, setActiveStartDate } = this.props;
        setActiveStartDate(getBeginPrevious(view, date));
    }

    onClickNext = () => {
        const { activeStartDate: date, view, setActiveStartDate } = this.props;
        setActiveStartDate(getBeginNext(view, date));
    }

    get label() {
        const {
            activeStartDate: date, formatMonthYear, locale, view,
        } = this.props;

        switch (view) {
        case 'decade':
            return getDecadeLabel(date);
        case 'year':
            return getYear(date);
        case 'month':
            return formatMonthYear(date, locale);
        default:
            throw new Error(`Invalid view: ${view}.`);
        }
    }

    render() {
        const { label } = this;
        const { drillUp, view } = this.props;

        const imageSource = "assets/images/icon--arrow.svg";

        return (
            <div className={styles.header}>
                <img src={arrow} className={styles.left} onClick={this.onClickPrevious} />
                <span className={styles.title} onClick={drillUp} disabled={!this.drillUpAvailable}>
                    {label}
                </span>
                <img src={arrow} className={styles.right} onClick={this.onClickNext} />
            </div>
        );
    }
}

Navigation.defaultProps = {
    formatMonthYear: defaultFormatMonthYear,
};

Navigation.propTypes = {
    activeStartDate: PropTypes.instanceOf(Date).isRequired,
    drillUp: PropTypes.func.isRequired,
    formatMonthYear: PropTypes.func,
    locale: PropTypes.string,
    maxDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    nextLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    prevLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    setActiveStartDate: PropTypes.func.isRequired,
    view: isView.isRequired,
    views: isViews.isRequired,
};
