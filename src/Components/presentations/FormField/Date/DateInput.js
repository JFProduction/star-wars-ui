import * as React from 'react';
import * as PropTypes from 'prop-types';
import { isValidMonth, isValidDay } from './dateFunctions';
import styles from './DateInput.module.css';
import calendarActive from './icon-calendar-active.svg';
import calendar from './icon-calendar.svg';

class DateInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value
        };

        this.formatter = new Intl.DateTimeFormat(props.languageCode, { year: 'numeric', month: '2-digit', day: '2-digit' });

        this.separator;
        this.yearIndex;
        this.monthIndex;
        this.dayIndex;
        this.placeholder;

        this.key;
        this.datePart;
        this.deletionSelection;
        this.nextSelectionStart;

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);

        this.setCursor = this.setCursor.bind(this);
    }


    handleChange(e) {
        let changedValue = e.target.value,
            referenceValue = this.state.value,
            postSelectionStart = e.target.selectionStart,
            selectionStart,
            regex = /[mdy]/,
            match;

        selectionStart = postSelectionStart + ((this.key === 'Backspace') ? 1 : - 1);
        selectionStart = Math.max(0, selectionStart);
        selectionStart = Math.min(selectionStart, this.placeholder.length);

        if (this.key === 'Backspace') {
            changedValue = referenceValue.substring(0, postSelectionStart) + this.datePart + referenceValue.substring(postSelectionStart + 1);
            let nextSelectionStart = postSelectionStart - 1,
                nextDatePart = this.placeholder.substr(nextSelectionStart, 1),
                index; 

            switch (nextDatePart) {
                case "m":
                    index = this.monthIndex;
                    break;
                case "d":
                    index = this.dayIndex;
                    break;
                case "y":
                    index = this.yearIndex;
                    break;
                default:
                    switch (this.datePart) {
                        case "m":
                            index = this.monthIndex;
                            break;
                        case "d":
                            index = this.dayIndex;
                            break;
                        case "y":
                            index = this.yearIndex;
                            break;
                    }
                    break;
            }

            this.nextSelectionStart = (nextSelectionStart < index) ? nextSelectionStart - 1 : nextSelectionStart;;

        } else if (this.key === 'Delete') {
            let deletedDatePart = this.placeholder.substr(postSelectionStart, 1);

            switch (deletedDatePart) {
                case "m":
                    changedValue = referenceValue.substring(0, this.monthIndex) + "mm" + referenceValue.substring(this.monthIndex + 2);
                    this.nextSelectionStart = this.monthIndex;
                    break;
                case "d":
                    changedValue = referenceValue.substring(0, this.dayIndex) + "dd" + referenceValue.substring(this.dayIndex + 2);
                    this.nextSelectionStart = this.dayIndex;
                    break;
                case "y":
                    changedValue = referenceValue.substring(0, this.yearIndex) + "yyyy" + referenceValue.substring(this.yearIndex + 4);
                    this.nextSelectionStart = this.yearIndex;
                    break;
            }
        } else {
            let numberKey = Number(this.key);
           
            switch (this.datePart) {
                case "m":
                    if (selectionStart == this.monthIndex) {
                        if (numberKey > 1) {
                            changedValue = referenceValue.substring(0, this.monthIndex) + "0" + this.key + referenceValue.substring(this.monthIndex + 2);
                            this.nextSelectionStart = postSelectionStart + 2;
                        } else {
                            changedValue = referenceValue.substring(0, selectionStart) + this.key + referenceValue.substring(postSelectionStart);
                            this.nextSelectionStart = postSelectionStart;
                        }
                    } else {
                            changedValue = referenceValue.substring(0, this.monthIndex + 1) + this.key + referenceValue.substring(this.monthIndex + 2);
                            this.nextSelectionStart = postSelectionStart + 1;
                    }

                    if ((this.dayIndex < this.monthIndex) && (/[^m]/.test(changedValue)) && (!isValidMonth(changedValue, this.dayIndex, this.monthIndex))) {
                        changedValue = referenceValue;
                        this.nextSelectionStart = selectionStart;
                    }
                    break;
                case "d":
                    let month = referenceValue.substr(this.monthIndex, 2);
                    if (selectionStart == this.dayIndex) {
                        if (((numberKey > 2) && (/[^m]/.test(month)) && (month === "02"))
                            || (numberKey > 3)) {
                            changedValue = referenceValue.substring(0, this.dayIndex) + "0" + this.key + referenceValue.substring(this.dayIndex + 2);
                            this.nextSelectionStart = postSelectionStart + 2;
                        } else {
                            changedValue = referenceValue.substring(0, selectionStart) + this.key + referenceValue.substring(postSelectionStart);
                            this.nextSelectionStart = postSelectionStart;
                        }
                    } else {
                        let priorDayKey = referenceValue.substr(this.dayIndex, 1);
                        if (priorDayKey === "3") {
                            if (numberKey < 2) {
                                changedValue = referenceValue.substring(0, this.dayIndex + 1) + this.key + referenceValue.substring(this.dayIndex + 2);
                                this.nextSelectionStart = postSelectionStart + 1;
                            } else {
                                changedValue = referenceValue;
                                this.nextSelectionStart = selectionStart;
                            }
                        } else {
                            changedValue = referenceValue.substring(0, this.dayIndex + 1) + this.key + referenceValue.substring(this.dayIndex + 2);
                            this.nextSelectionStart = postSelectionStart + 1;
                        }
                    }

                    if ((this.monthIndex < this.dayIndex) && (changedValue.indexOf('d') === -1) && (!isValidDay(changedValue, this.dayIndex, this.monthIndex, this.yearIndex))) {
                        changedValue = referenceValue;
                        this.nextSelectionStart = selectionStart;
                    }
                    break;
                case "y":
                    let year = referenceValue.substr(this.yearIndex, 4);
                    if (selectionStart == this.yearIndex) {
                        if ((numberKey == 1) || (numberKey == 2)) {
                            changedValue = referenceValue.substring(0, this.yearIndex) + this.key + referenceValue.substring(postSelectionStart);
                            this.nextSelectionStart = postSelectionStart;
                        } else {
                            changedValue = referenceValue.substring(0, this.yearIndex) + "20" + this.key + referenceValue.substring(this.yearIndex + 3);
                            this.nextSelectionStart = postSelectionStart + 3;
                        }
                    } else if (selectionStart == (this.yearIndex + 1)) {
                        let millennium = year.charAt(0),
                            proposedCentury = millennium + this.key;

                        if ((proposedCentury == "19") || (proposedCentury == "20")) {
                            changedValue = referenceValue.substring(0, this.yearIndex) + proposedCentury + referenceValue.substring(this.yearIndex + 2);
                            this.nextSelectionStart = postSelectionStart;
                        } else {
                            changedValue = referenceValue.substring(0, this.yearIndex) + "20" + proposedCentury + referenceValue.substring(this.yearIndex + 4);
                            this.nextSelectionStart = postSelectionStart + 4;
                        }
                    } else {
                        this.nextSelectionStart = postSelectionStart;
                    }
                    break;
            }
        } 

        changedValue = changedValue.substr(0, 10)
        match = regex.exec(changedValue)
        if (!!match) {
            this.setState({ value: changedValue });
        } else {
            let isValidDate = true;

            if (!isValidMonth(changedValue, this.dayIndex, this.monthIndex, this.yearIndex)) {
                changedValue = this.replaceAt(this.changedValue, this.monthIndex, "mm");
                isValidDate = false;
            }

            if (!isValidDay(changedValue, this.dayIndex, this.monthIndex, this.yearIndex)) {
                changedValue = this.replaceAt(this.changedValue, this.dayIndex, "dd");
                isValidDate = false;
            }
            
            if (!isValidMonth(changedValue, this.dayIndex, this.monthIndex, this.yearIndex)) {
                changedValue = this.replaceAt(this.changedValue, this.yearIndex, "yyyy");
                isValidDate = false;
            }

            if (isValidDate) {
                this.props.onChange(new Date(changedValue));
            } else {
                this.setState({ value: changedValue });
            }
        }
    }

    handleKeyDown(e) {
        let isValid = /[0-9]/.test(e.key),
            isDirectional = (e.key === 'ArrowLeft') || (e.key === 'ArrowRight'),
            isPassthrough = (e.key === 'Enter') || (e.key === 'Tab') || (e.key === 'Backspace') || (e.key === 'Delete'),
            selectionStart = e.target.selectionStart,
            selectionEnd = Math.min(e.target.selectionEnd, e.target.selectionStart + 1);

        if (isValid) {
            if (selectionStart < this.placeholder.length) {
                this.key = e.key;

                let offset = (selectionStart == selectionEnd) ? 1 : 0;
                this.datePart = this.placeholder.substring(selectionStart, selectionEnd + offset);
            } else {
                e.preventDefault();
            }
        } else if (isDirectional) {
            if (e.key === 'ArrowRight') {
                if (selectionStart != selectionEnd) {
                    this.inputText.setSelectionRange(selectionStart + 1, selectionStart + 2);
                } else {
                    this.inputText.setSelectionRange(selectionStart, selectionStart + 1);
                }
            } else {
                this.inputText.setSelectionRange(selectionStart - 1, selectionStart);
            }
            e.preventDefault();
        } else if (isPassthrough) {
            if ((e.key === 'Delete') || (e.key === 'Backspace')) {
                this.key = e.key;
                if (e.key === 'Backspace') {
                    if (selectionStart === selectionEnd) {
                        this.datePart = this.placeholder.substr(selectionStart - 1, 1);
                    } else {
                        this.datePart = this.placeholder.substring(selectionStart, selectionStart + 1);
                    }
                } else {
                    let datePart = this.placeholder.substring(selectionStart, selectionStart + 1);
                    if (datePart === this.separator) {
                        this.inputText.setSelectionRange(selectionStart + 1, selectionStart + 2);
                        e.preventDefault();
                    } else {
                        this.datePart = datePart;
                    }
                }
            } else {
                this.datePart = this.placeholder.substr(selectionStart, 1);
            }
        } else {
            e.preventDefault();
        }
    }

    setCursor(e) {
        let regex = /[mdy]/,
            match = regex.exec(e.target.value);

        if (!!match) {
            this.nextSelectionStart = match.index
        } else {
            this.nextSelectionStart = e.target.selectionStart;
        }
    }

    replaceAt(original, index, replacement) {
        return original.substr(0, index) + replacement + original.substr(index + replacement.length);
    }

    handleClick(e) {
        this.setCursor(e);
    }

    handleFocus(e) {
        this.setCursor(e);
        this.props.onFocus(e);
    }

    handleBlur(e) {
        this.props.onFocus(e)
    }

    componentDidMount() {
        let today = new Date(2020, 3, 8),
            dateTest = this.formatter.format(today).replace(/\u200E/g, ""),
            separator = dateTest.replace(/[\d+]/g, "").charAt(0),
            placeholder = new Array(11).join(separator);

        this.yearIndex = dateTest.indexOf("2020");
        this.monthIndex = dateTest.indexOf("04");
        this.dayIndex = dateTest.indexOf("08");

        this.separator = separator;

        placeholder = this.replaceAt(placeholder, this.yearIndex, "yyyy");
        placeholder = this.replaceAt(placeholder, this.monthIndex, "mm");
        placeholder = this.replaceAt(placeholder, this.dayIndex, "dd");
        
        this.placeholder = placeholder;

        if (this.state.value === '') {
            this.setState({ value: placeholder });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.props.value !== prevProps.value) && (this.props.value !== this.state.value)) {
            let dateString = this.formatter.format(this.props.value).replace(/\u200E/g, "");
            this.nextSelectionStart = 10;
            this.setState({ value: dateString });
        } else {
            let nextSelectionStart = Math.max(Math.min(10, this.nextSelectionStart), 0),
                nextSelectionEnd = Math.min(10, nextSelectionStart + 1);
            this.inputText.setSelectionRange(nextSelectionStart, nextSelectionEnd);
        }
    }

    render() {
        let imageSource = (this.props.isOpen) ? calendarActive : calendar;

        return (
            <React.Fragment>
                <input className={styles.text} value={this.state.value}
                    ref={(input) => (this.inputText = input)}
                    readOnly={this.props.isDisabledReadOnly}
                    name={this.props.name}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    onClick={this.handleClick}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur} />
                <img className={styles.button} src={imageSource} onClick={this.props.onDropDownRequest} />
            </React.Fragment>
        );
    }

}

DateInput.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    languageCode: PropTypes.string,
    isDisabledReadOnly: PropTypes.bool,
    isOpen: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onDropDownRequest: PropTypes.func
}

DateInput.defaultProps = {
    value: "",
    languageCode: 'en-US'
}

export default DateInput;