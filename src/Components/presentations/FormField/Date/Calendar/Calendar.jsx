import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './Calendar.module.css';

import Navigation from './Calendar/Navigation';
import DecadeView from './DecadeView';
import YearView from './YearView';
import MonthView from './MonthView';

import { getBegin } from './shared/dates';
import { isCalendarType, isClassName, isMaxDate, isMinDate, isValue } from './shared/propTypes';
import { between, callIfDefined, mergeFunctions } from './shared/utils';

const allViews = ['decade', 'year', 'month'];
const allValueTypes = [...allViews.slice(1), 'day'];

const datesAreDifferent = (date1, date2) => (
    (date1 && !date2) ||
        (!date1 && date2) ||
        (date1 && date2 && date1.getTime() !== date2.getTime())
);

export class Calendar extends React.Component {
    get drillDownAvailable() {
        const views = this.getLimitedViews();
        const { view } = this.state; //receive 'month' as the first view. This is a Default value but can be received by Calendar component.

        return views.indexOf(view) < views.length - 1;
    }

    get drillUpAvailable() {
        const views = this.getLimitedViews();
        const { view } = this.state; //receive 'month' as the first view. This is a Default value but can be received by Calendar component.

        return views.indexOf(view) > 0;
    }

    /**
     * Returns value type that can be returned with currently applied settings. 'month'
     */
    get valueType() {
        const { maxDetail } = this.props;
        return allValueTypes[allViews.indexOf(maxDetail)];
    }

    /**
     * Verifies if the value selected or typed are valid based on minDate and maxDate if declared.
     */
    getValueFrom = (value) => {
        if (!value) {
            return null;
        }
        //} else {
        //    value = new Date();
        //}

        const { maxDate, minDate } = this.props;
        const rawValueFrom = value instanceof Array && value.length === 2 ? value[0] : value;
        const valueFromDate = new Date(rawValueFrom);

        if (isNaN(valueFromDate.getTime())) {
            throw new Error(`Invalid date: ${value}`);
        }

        const valueFrom = getBegin(this.valueType, valueFromDate);

        return between(valueFrom, minDate, maxDate);
    }

    /**
     * Returns views array with disallowed values cut off.
     * The slice() method returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included).
     * The original array will not be modified.
     */
    getLimitedViews(props = this.props) {
        const { minDetail, maxDetail } = props;

        return allViews.slice(allViews.indexOf(minDetail), allViews.indexOf(maxDetail) + 1);
    }

    /**
     * Determines whether a given view is allowed with currently applied settings.
     */
    isViewAllowed(props = this.props, view = this.state.view) {
        const views = this.getLimitedViews(props);

        return views.indexOf(view) !== -1;
    }

    /**
     * Gets current value in a desired format.
     */
    getProcessedValue(value) {
        return this.getValueFrom(value);
    }

    state = {
        activeStartDate: this.getActiveStartDate(),
        hover: null,
        view: this.getView(),
        value: this.props.value,
    }

    componentWillReceiveProps(nextProps) {
        const { value: nextValue } = nextProps;
        const { value } = this.state;

        const nextState = {};

        const allowedViewChanged = (
            nextProps.minDetail !== this.props.minDetail ||
            nextProps.maxDetail !== this.props.maxDetail
        );

        if (allowedViewChanged && !this.isViewAllowed(nextProps)) {
            nextState.view = this.getView(nextProps);
        }

        if (
            allowedViewChanged ||
            datesAreDifferent(...[nextValue, value].map(this.getValueFrom))
        ) {
            this.updateValues(nextProps);
        } else {
            nextState.activeStartDate = this.getActiveStartDate(nextProps);
        }

        this.setState(nextState);
    }

    updateValues = (props = this.props) => {
        this.setState({
            value: props.value,
            activeStartDate: this.getActiveStartDate(props),
        });
    }

    getActiveStartDate(props = this.props) {
        const rangeType = this.getView(props);
        const valueFrom = (
            this.getValueFrom(props.value) ||
            props.activeStartDate ||
            new Date()
        );
        return getBegin(rangeType, valueFrom);
    }

    getView(props = this.props) {
        const { view } = props;

        if (view && this.getLimitedViews(props).indexOf(view) !== -1) {
            return view;
        }

        return this.getLimitedViews(props).pop();
    }

    /**
     * Called when the user uses navigation buttons.
     */
    setActiveStartDate = (activeStartDate) => {
        this.setState({ activeStartDate }, () => {
            callIfDefined(this.props.onActiveDateChange, {
                activeStartDate,
                view: this.state.view,
            });
        });
    }

    drillDown = (activeStartDate) => {
        if (!this.drillDownAvailable) {
            return;
        }

        const views = this.getLimitedViews();

        this.setState((prevState) => {
            const nextView = views[views.indexOf(prevState.view) + 1];
            return {
                activeStartDate,
                view: nextView,
            };
        }, () => {
            callIfDefined(this.props.onDrillDown, {
                activeStartDate,
                view: this.state.view,
            });
        });
    }

    drillUp = () => {
        if (!this.drillUpAvailable) {
            return;
        }

        const views = this.getLimitedViews();

        this.setState((prevState) => {
            const nextView = views[views.indexOf(prevState.view) - 1];
            const activeStartDate = getBegin(nextView, prevState.activeStartDate);

            return {
                activeStartDate,
                view: nextView,
            };
        }, () => {
            callIfDefined(this.props.onDrillUp, {
                activeStartDate: this.state.activeStartDate,
                view: this.state.view,
            });
        });
    }

    onChange = (value) => {
        const { onChange } = this.props;

        let nextValue = this.getProcessedValue(value),
            callback = () => callIfDefined(onChange, nextValue),
            nextStartDate = getBegin(this.valueType, nextValue), //Verifies the new value to select the corresponding month view.
            activeStartDate = new Date(nextStartDate.getFullYear(), nextStartDate.getMonth(), 1);

        this.setState({ value: value, activeStartDate: activeStartDate }, callback);
    }

    onMouseOver = (value) => {
        this.setState({ hover: value });
    }

    onToday = () => {
        const today = new Date();
        const activeStartDate = getBegin(this.valueType, today); //Verifies today's date.
        this.setState({ value: today, view: this.getView(), activeStartDate: new Date(activeStartDate.getFullYear(), activeStartDate.getMonth(), 1) }); //Set the first day of the actual month to ActiveStartDate
    }

    renderContent() {
        const {
      calendarType,
            locale,
            maxDate,
            minDate,
            renderChildren,
            tileClassName,
            tileContent,
            tileDisabled,
    } = this.props;
        const {
      activeStartDate, hover, value, view,
    } = this.state;
        const { onMouseOver, valueType } = this;

        const commonProps = {
            activeStartDate,
            hover,
            locale,
            maxDate,
            minDate,
            onMouseOver: this.props.selectRange ? onMouseOver : null,
            tileClassName,
            tileContent: tileContent || renderChildren, // For backwards compatibility
            tileDisabled,
            value,
            valueType,
        };

        const clickAction = this.drillDownAvailable ? this.drillDown : this.onChange;

        switch (view) {
            case 'decade':
                return (
                    <DecadeView
                        onClick={mergeFunctions(clickAction, this.props.onClickYear)}
                        {...commonProps}
                    />
                );
                break;
            case 'year':
                return (
                    <YearView
                        formatMonth={this.props.formatMonth}
                        onClick={mergeFunctions(clickAction, this.props.onClickMonth)}
                        {...commonProps}
                    />
                );
                break;
            case 'month':
                return (
                    <MonthView
                        calendarType={calendarType}
                        formatShortWeekday={this.props.formatShortWeekday}
                        onClick={mergeFunctions(clickAction, this.props.onClickDay)}
                        onClickWeekNumber={this.props.onClickWeekNumber}
                        showNeighboringMonth={this.props.showNeighboringMonth}
                        showWeekNumbers={this.props.showWeekNumbers}
                        {...commonProps}
                    />
                );
                break;
            default:
                throw new Error(`Invalid view: ${view}.`);
        }
    }

    renderNavigation() {
        const { showNavigation } = this.props;

        if (!showNavigation) {
            return null;
        }

        return (
            <Navigation
                activeRange={this.state.activeRange}
                activeStartDate={this.state.activeStartDate}
                drillUp={this.drillUp}
                formatMonthYear={this.props.formatMonthYear}
                locale={this.props.locale}
                maxDate={this.props.maxDate}
                minDate={this.props.minDate}
                nextLabel={this.props.nextLabel}
                prevLabel={this.props.prevLabel}
                setActiveStartDate={this.setActiveStartDate}
                view={this.state.view}
                views={this.getLimitedViews()}
            />
        );
    }

    render() {
        const { className, selectRange, isOpen } = this.props;
        const { value } = this.state;
        const valueArray = [].concat(value);

        let content, frameClass;

        if (isOpen) {
            frameClass = styles.frame;
            content = (
                <React.Fragment>
                    { this.renderNavigation() }
                    { this.renderContent() }
                    <div className={styles.footer} onClick={this.onToday}>Today</div>
                </React.Fragment>
            );
        }

        return (
            <div className={frameClass}>
                {content}
            </div>
        );
    }
}

Calendar.defaultProps = {
    isOpen: true, //the component that will call it, must open this component to see it.
    locale: 'en-US', //this prop will be using to change the calendar to different languages and to determine the first day of the week.
    maxDetail: 'month', 
    minDetail: 'decade',
    returnValue: 'start',
    showNavigation: true,
    showNeighboringMonth: true, //with this prop, it is posible to see previous and next days of each month.
    view: 'month', //the first view will be MonthView
    value: new Date() //the value will be today's date unless the value is changed.
};

Calendar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    activeStartDate: PropTypes.instanceOf(Date),
    calendarType: isCalendarType,
    className: isClassName,
    formatMonth: PropTypes.func,
    formatMonthYear: PropTypes.func,
    formatShortWeekday: PropTypes.func,
    locale: PropTypes.string.isRequired,
    maxDate: isMaxDate,
    maxDetail: PropTypes.oneOf(allViews).isRequired,
    minDate: isMinDate,
    minDetail: PropTypes.oneOf(allViews).isRequired,
    nextLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    onActiveDateChange: PropTypes.func,
    onChange: PropTypes.func,
    onClickDay: PropTypes.func,
    onClickDecade: PropTypes.func,
    onClickMonth: PropTypes.func,
    onClickYear: PropTypes.func,
    onDrillDown: PropTypes.func,
    onDrillUp: PropTypes.func,
    prevLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    renderChildren: PropTypes.func, // For backwards compatibility
    returnValue: PropTypes.oneOf(['start', 'end']),
    selectRange: PropTypes.bool,
    showNavigation: PropTypes.bool.isRequired,
    showNeighboringMonth: PropTypes.bool.isRequired,
    tileClassName: PropTypes.oneOfType([
        PropTypes.func,
        isClassName,
    ]),
    tileContent: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node,
    ]),
    tileDisabled: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.string,
        isValue,
    ]).isRequired,
    view: PropTypes.oneOf(allViews).isRequired,
};
