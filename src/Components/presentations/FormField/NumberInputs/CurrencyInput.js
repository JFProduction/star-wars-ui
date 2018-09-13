import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './NumberInputs.module.css';

class CurrencyInput extends React.Component {
    constructor(props) {
        super(props);

        this.formatter = new Intl.NumberFormat(props.languageCode, { style: 'currency', currency: props.currencyCode });
        this.isCurrencyLeft = true;
        this.currencySign;
        this.decimal;
        this.separator;
        this.fractionCount;
        this.positionFromRight;
        this.isNumberFraction = false;
        this.key;
        this.deletionSelection;

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    handleChange(e) {
        let changedValue = e.target.value,
            selectionStart = e.target.selectionStart,
            newValue;

        if (changedValue.length === 1) {
            newValue = Number(changedValue);
        } else {
            let regex = new RegExp("[^0-9" + this.decimal + "]", "g");
            if ((this.key === 'Backspace') && (this.deletionSelection)) {
                if (this.deletionSelection.length === 1) {
                    changedValue = changedValue.substring(0, selectionStart - 1) + this.deletionSelection + changedValue.substring(selectionStart);
                }
            } else if ((this.key === 'Delete') && (this.deletionSelection === this.decimal)) {
                changedValue = changedValue.substring(0, selectionStart) + this.deletionSelection + changedValue.substring(selectionStart + 1);
            }

            this.deletionSelection = undefined;
            newValue = changedValue.replace(regex, '');

            if (this.isNumberFraction) {
                let decimalPosition = newValue.indexOf(this.decimal),
                    rawDecimalPosition = changedValue.indexOf(this.decimal),
                    offset = selectionStart - rawDecimalPosition,
                    fractionValue = newValue.substring(decimalPosition + 1),
                    fractionDiff = fractionValue.length - this.fractionCount;

                if (this.key !== 'Delete') {
                    if (selectionStart < (rawDecimalPosition + this.fractionCount + 1)) {
                        newValue = newValue.slice(0, offset + decimalPosition) + newValue.slice(offset + decimalPosition + 1);
                    } else {
                        newValue = newValue.substring(0, newValue.length - (fractionDiff));
                    }
                }
            } 

            newValue = (this.decimal === '.') ? Number(newValue) : Number(newValue.replace(this.decimal, "."));            
        }

        if (this.props.maxValue) {
            let maxValueString = this.props.maxValue.toString(),
                maxDecimalPosition = maxValueString.indexOf(this.decimal),
                maxFraction = (maxDecimalPosition + 1),
                maxValue = maxValueString.slice(0, maxDecimalPosition) + '.' + maxFraction.slice(0, this.fractionCount);

            newValue = Math.min(newValue, Number(maxValue));
        } 

        this.props.onChange(newValue);
    }

    handleKeyDown(e) {
        let isValid = /[0-9]/.test(e.key),
            isDirectional = (e.key === 'ArrowLeft') || (e.key === 'ArrowRight'),
            isPassthrough = (e.key === 'Enter') || (e.key === 'Tab') || (e.key === 'Backspace') || (e.key === 'Delete') || isDirectional,
            selectionPosition,
            selectionStart = e.target.selectionStart,
            selectionEnd = e.target.selectionEnd,
            selectionMatch = (e.target.selectionStart == selectionEnd),
            isNumberFraction = (selectionStart > e.target.value.indexOf(this.decimal)),
            currencyOffset = (this.isCurrencyLeft) ? 0 : this.currencySign.length;

        if (isValid) {
            this.key = e.key;
            if ((isNumberFraction && selectionMatch) || (this.isNumberFraction && !selectionMatch)) {
                let value = e.target.value;

                selectionPosition = Math.min(++selectionStart, value.length - currencyOffset);
                this.positionFromRight = (value.length - selectionPosition);
                this.isNumberFraction = (this.positionFromRight <= (this.fractionCount + currencyOffset));
            } else {
                this.positionFromRight = (!!selectionStart) ? Math.max(this.fractionCount + 1 + currencyOffset, e.target.value.length - selectionStart)
                    : this.fractionCount + 1 + currencyOffset; //left side of decimal
            }
        } else if ((this.decimal && (e.key === this.decimal)) || (e.key === 'Decimal')) {
            this.isNumberFraction = true;
            this.inputText.setSelectionRange(this.inputText.value.length - this.fractionCount - currencyOffset, this.inputText.value.length - this.fractionCount - currencyOffset);
            e.preventDefault();
        } else if (isPassthrough) {
            if (isDirectional) {
                if (e.key === 'ArrowLeft') {
                    selectionPosition = (!selectionMatch) ? selectionStart : Math.max(--selectionStart, 0);
                } else {
                    selectionPosition = (!selectionMatch) ? selectionEnd : Math.min(++selectionStart, e.target.value.length);
                }

                this.positionFromRight = e.target.value.length - selectionPosition;
                this.isNumberFraction = ((this.fractionCount > 0) && (this.positionFromRight <= this.fractionCount + currencyOffset));
            } else {
                if ((e.key === 'Backspace') || (e.key === 'Delete')) {
                    let targetValue = e.target.value;
                    this.key = e.key;
                    if (selectionMatch) {
                        let currencySignLength = this.currencySign.length;
                        if (this.isCurrencyLeft &&
                            (((e.key === 'Backspace') && (selectionStart <= currencySignLength)) || ((e.key === 'Delete') && (selectionStart < currencySignLength)))) {
                            e.preventDefault();
                            let offset = Number(e.key === 'Backspace');
                            this.inputText.setSelectionRange(currencySignLength + offset, currencySignLength + offset);
                        } else {
                            let deletionSelection = (e.key === 'Backspace') ? targetValue.substring(selectionStart - 1, selectionStart) : targetValue.substring(selectionStart, selectionStart + 1),
                                isDeletionNumber = /[0-9]/.test(deletionSelection);

                            this.deletionSelection = (isDeletionNumber) ? undefined : deletionSelection;
                            if (isNumberFraction) {
                                if (e.key === 'Backspace') {
                                    this.positionFromRight = targetValue.length - selectionStart + 1;
                                    this.isNumberFraction = (!isDeletionNumber) ? false : isNumberFraction;
                                } else if (!this.positionFromRight) {
                                    this.positionFromRight = targetValue.length - selectionStart;
                                } 
                            } else {
                                if (e.key === 'Delete') {
                                    let isNextSeparator = (targetValue.substring(selectionStart + 1, selectionStart + 2)).indexOf(this.separator) > -1
                                    this.positionFromRight = targetValue.length - selectionStart - (isNextSeparator ? 2 : 1);
                                    this.isNumberFraction = (!!deletionSelection && (deletionSelection === this.decimal));
                                }
                            }
                        }
                    }
                }                    
            }
        } else {
            e.preventDefault();
        }
    }

    handleFocus(e) {
        this.inputText.setSelectionRange(0, e.target.value.length);
        this.isNumberFraction = false;
        this.positionFromRight = undefined;
        this.props.onFocus(e);
    }

    componentDidMount() {
        let decimal, separator,
            fractionCount = 0, currencySign = "",
            decimalTest = Array.from(this.formatter.format("1")),
            separatorTest = this.formatter.format("10000");

        for (let i = 0; i < decimalTest.length; i++) {
            if (decimalTest[i] !== "1") {
                currencySign += decimalTest[i];
            } else {
                if (i == 0) {
                    this.isCurrencyLeft = false;
                }
                break;
            }
        }

        if (!this.isCurrencyLeft) {
            for (let i = decimalTest.length - 1; i > -1; i--) {
                if (decimalTest[i] !== "0") {
                    currencySign += decimalTest[i];
                } else {
                    break;
                }
            }
        }

        let limit = (this.isCurrencyLeft) ? decimalTest.length - 1 : decimalTest.length - currencySign.length - 1;
        for (let i = limit; i > -1; i--) {
            if (decimalTest[i] === "0") {
                fractionCount++;
            } else {
                if (/[^1]/.test(decimalTest[i])) {
                    decimal = decimalTest[i];
                    break;
                }
            }
        }

        let rightCurrencyOffset = (this.isCurrencyLeft) ? 0 : currencySign.length;
        separatorTest = Array.from(separatorTest.substring(0, separatorTest.length - fractionCount - 1 - rightCurrencyOffset));
        for (let i = separatorTest.length - 1; i > -1; i--) {
            if (/[^0-1]/.test(separatorTest[i]) && (separatorTest[i]) != decimal) {
                separator = separatorTest[i];
                break;
            }
        }
        
        this.currencySign = currencySign;
        this.decimal = decimal;
        this.separator = separator;
        this.fractionCount = fractionCount;
        this.positionFromRight = fractionCount + 1;
    }

    componentDidUpdate(prevProps, prevState) {
        let positionFromLeft,
            selectionStart = this.inputText.selectionStart,
            selectionEnd = this.inputText.selectionEnd;

        if (!this.isCurrencyLeft && !!this.positionFromRight) {
            positionFromLeft = Math.min(this.inputText.value.length - this.positionFromRight, this.inputText.value.length - this.currencySign.length);
            this.inputText.setSelectionRange(positionFromLeft, positionFromLeft);
        } else if ((prevProps.value != this.props.value) || (selectionStart === selectionEnd)) {
            positionFromLeft = Math.max(this.inputText.value.length - this.positionFromRight, this.currencySign.length);
            this.inputText.setSelectionRange(positionFromLeft, positionFromLeft);
        } 
    }

    render() {
        let value = this.formatter.format(this.props.value);

        return (
            <input type='text' className={styles.currencyText} value={value}
                ref={(input) => (this.inputText = input)}
                onChange={this.handleChange} onKeyDown={this.handleKeyDown} onFocus={this.handleFocus} onBlur={this.props.onFocus} />
        );
    }
}

CurrencyInput.propTypes = {
    value: PropTypes.number,
    currencyCode: PropTypes.string,
    languageCode: PropTypes.string,
    isDisabledReadOnly: PropTypes.bool,
    maxValue: PropTypes.number,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func
}

CurrencyInput.defaultProps = {
    value: 0,
    currencyCode: "USD",
    languageCode: "en-US"
}

export default CurrencyInput