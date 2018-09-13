import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './NumberInputs.module.css';

class NumberInput extends React.Component {
    constructor(props) {
        super(props)

        this.formatter = new Intl.NumberFormat(props.languageCode, { useGrouping: props.isFormatted });
        this.separator;
        this.key;
        this.deletionSelection;

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        this.getNumberVerified = this.getNumberVerified.bind(this);
    }

    handleChange(e) {
        let changedValue = e.target.value,
            newValue,
            regexSeparator = (this.separator === ".") ? "\\." : this.separator,
            regex = new RegExp(regexSeparator, "g");

        if (this.props.isFormatted) {
            if (this.deletionSelection === this.separator) {
                let selectionStart = e.target.selectionStart;
                if (this.key === 'Delete') {
                    changedValue = changedValue.substring(0, selectionStart) + changedValue.substring(selectionStart + 1);
                } else if (this.key === 'Backspace') {
                    changedValue = changedValue.substring(0, selectionStart - 1) + changedValue.substring(selectionStart);
                }

                this.deletionSelection = undefined;
            }
        } 

        changedValue = changedValue.replace(regex, '');
        newValue = (changedValue !== "") ? Number(changedValue) : changedValue;

        if (!isNaN(newValue)) {
            newValue = this.getNumberVerified(newValue);
         } else {
            newValue = (this.props.minValue !== undefined) ? this.props.minValue : newValue;
        }

        this.props.onChange(newValue);
    }

    handleKeyDown(e) {
        let isValid = /[0-9]/.test(e.key),
            isDirectional = (e.key === 'ArrowLeft') || (e.key === 'ArrowRight'),
            isPassthrough = (e.key === 'Enter') || (e.key === 'Tab') || (e.key === 'Backspace') || (e.key === 'Delete') || isDirectional,
            selectionStart = e.target.selectionStart;

        if (isValid || isPassthrough) {
            this.key = e.key;

            if (((e.key === 'Delete') || (e.key === 'Backspace')) && (this.props.isFormatted)) {
                let offset = (e.key === 'Backspace') ? 1 : 0;
                this.deletionSelection = e.target.value.substr(selectionStart - offset, 1);
            }
        } else {
            e.preventDefault();
        }
    }

    getNumberVerified(number) {
        let verifiedNumber = number,
            maxValue = (!!this.props.maxValue) ? this.props.maxValue : Number.MAX_SAFE_INTEGER;

        verifiedNumber = Math.min(maxValue, number);

        if (this.props.minValue !== undefined) {
            verifiedNumber = Math.max(this.props.minValue, verifiedNumber);
        }

        return verifiedNumber;
    }

    componentDidMount() {
        if (this.props.isFormatted) {
            let numberTest = this.formatter.format("10000"),
                separator = numberTest.replace(/\d+/g, "");

            this.separator = separator;
        }
    }

    render() {
        let value;
        
        if (isNaN(this.props.value)) {
            value = (this.props.minValue !== undefined) ? this.formatter.format(this.props.minValue) : "";
        } else {
            value = this.getNumberVerified(this.props.value);
            value = this.formatter.format(value);
        }

        return (
            <input type='text' className={styles.numberText} value={value} readOnly={this.props.isDisabledReadOnly} name={this.props.name}
                onChange={this.handleChange} onKeyDown={this.handleKeyDown} onFocus={this.props.onFocus} onBlur={this.props.onFocus} />
        );
    }
}

NumberInput.propTypes = {
    value: PropTypes.number,
    languageCode: PropTypes.string,
    isFormatted: PropTypes.bool,
    isDisabledReadOnly: PropTypes.bool,
    maxValue: PropTypes.number,
    minValue: PropTypes.number,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func
}

NumberInput.defaultProps = {
    languageCode: "en-US",
    isFormatted: false
}

export default NumberInput;