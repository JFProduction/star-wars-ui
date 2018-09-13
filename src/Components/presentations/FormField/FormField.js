import React from 'react';
import PropTypes from 'prop-types';
import CurrencyInput from './NumberInputs/CurrencyInput';
import NumberInput from './NumberInputs/NumberInput';
import LoginInput from './LoginInput/LoginInput';
import DropDownInput from './DropDown/DropDownInput';
import DropDownList from './DropDown/DropDownList';
import DateInput from './Date/DateInput';
import { Calendar } from './Date/Calendar/Calendar';
import VIN from './VIN/VIN';
import styles from './FormField.module.css';
import infoBubbleOn from './Notification_Information.svg';
import infoBubbleOff from './icon-rounded-outline-info.svg';

class FormField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inFocus: false,
            inError: props.inError,
            showDropDown: false,
            showInfoBubble: false,
            value: props.value,
            highlightedItem: 0
        }

        this.focusFromChild = false;

        this.handleChangeRequest = this.handleChangeRequest.bind(this);
        this.handleFocusRequest = this.handleFocusRequest.bind(this);
        this.handleErrorRequest = this.handleErrorRequest.bind(this);
        this.handleDropDownRequest = this.handleDropDownRequest.bind(this);
        this.handleInfoRequest = this.handleInfoRequest.bind(this);
        this.handleDropDownHighlightRequest = this.handleDropDownHighlightRequest.bind(this);
    }
    
    handleChangeRequest(e, value, itemHighlight) {
        let changeValue; 

        if (this.props.fieldType === "DropDown") {
            if (!!e.target) {
                this.focusFromChild = (e.target.tagName.toLowerCase() !== 'input');
                changeValue = value;
            } else {
                changeValue = e;
            }
        } else {
            changeValue = (!!e.target && (!!e.target.value || e.target.value === "")) ? e.target.value : e;
        }

        if (itemHighlight !== undefined) {
            this.setState({ value: changeValue, highlightedItem: itemHighlight });
        } else {
            if (this.props.fieldType === "DatePicker") {
                this.setState({ value: changeValue, showDropDown: false });
            } else {
                this.setState({ value: changeValue });
            }
        }

        this.props.onChange(changeValue);
    }

    handleFocusRequest(e, inError) {
        let isFocus = (e.type === 'focus');

        if (isFocus) {
            if (this.props.fieldType === "DropDown") {
                if (this.focusFromChild) {
                    this.focusFromChild = false;
                    this.setState({ showDropDown: false })
                } else {
                    this.setState({ inFocus: isFocus, showDropDown: true });
                }
            } else {
                if ((this.props.fieldType === "DatePicker") && (this.state.showDropDown)) {

                } else {
                    this.setState({ inFocus: isFocus });
                }
            }
        } else {
            if (!!e.relatedTarget) {
                let isRequiredMissing = (!isFocus && this.props.isRequired && e.target.value === "");
                if ((this.props.fieldType === "DropDown") && (!this.state.value.text) && (this.state.value !== "")) {
                    this.setState({ inFocus: isFocus, inError: (isRequiredMissing || !!inError), showDropDown: false, showInfoBubble: false, value: "" });
                } else {
                    this.setState({ inFocus: isFocus, inError: (isRequiredMissing || !!inError), showDropDown: false, showInfoBubble: false });
                }
            }
        }
    }

    handleErrorRequest(value) {

    }

    handleDropDownRequest(e) {
        if (this.state.showDropDown) {
            this.focusFromChild = true;
        } 

        this.setState(function (prevState, props) {
            return { showDropDown: !prevState.showDropDown };
        });
    }

    handleInfoRequest(e) {
        this.setState((prevState, props) => ({
            showInfoBubble: !prevState.showInfoBubble
        }));
    }

    handleDropDownHighlightRequest(request) {
        let highlightItem;
        if (isNaN(request)) {
            if (request === 'Enter') {
                let selectedValue = this.props.items[this.state.highlightedItem];
                this.setState({ value: selectedValue });
                return;
            } else if (request === 'ArrowDown') {
                highlightItem = Math.min(this.state.highlightedItem + 1, this.props.items.length - 1);
            } else {
                highlightItem = Math.max(this.state.highlightedItem - 1, 0);
            }
        } else {
            highlightItem = request; 
        }

        if (highlightItem !== this.state.highlightedItem) {
            this.setState({ highlightedItem: highlightItem });
        }
    }

    componentDidMount() {
        if (!!this.props.items && (this.props.value !== "")) {
            let foundIndex;

            if (typeof this.props.items[0] === "string") {
                foundIndex = this.props.items.findIndex(item => ((item === this.props.value.value) && (item === this.props.value.text)));
            } else {
                foundIndex = this.props.items.findIndex(item => ((item.value === this.props.value.value) && (item.text === this.props.value.text)));
            }
            
            foundIndex = Math.max(0, foundIndex);
            this.setState({ highlightedItem: foundIndex });
        }
    }

    render() {
        let inputField, dropDown, frameStyle, title, infoBubble,
            required = (this.props.isRequired) ? (<span className={styles.required}>*</span>) : undefined,
            textValue = (!!this.state.value) ? ((!!this.state.value.text) ? this.state.value.text : this.state.value) : "";

        if (this.props.isDisabledReadOnly) {
            frameStyle = styles.locked;
        } else if (this.state.inError) {
            frameStyle = styles.error;
        } else {
            frameStyle = (this.state.inFocus) ? styles.focusedFrame : styles.frame;
        }

        switch (this.props.fieldType) {
            case 'Currency':
                let currencyValue = (textValue === "") ? 0 : textValue;

                inputField = (
                    <CurrencyInput value={currencyValue} currencyCode={this.props.currencyCode} languageCode={this.props.languageCode}
                        isDisabledReadOnly={this.props.isDisabledReadOnly} maxValue={this.props.maxValue} name={this.props.name}
                        onChange={this.handleChangeRequest} onFocus={this.handleFocusRequest} />
                );
                break;
            case 'Number':
                let numberValue = (textValue === "") ? undefined : textValue;

                inputField = (
                    <NumberInput value={numberValue} languageCode={this.props.languageCode} isFormatted={this.props.isFormattedNumber}
                        isDisabledReadOnly={this.props.isDisabledReadOnly} maxValue={this.props.maxValue} minValue={this.props.minValue} name={this.props.name}
                        onChange={this.handleChangeRequest} onFocus={this.handleFocusRequest} />
                );

                break;
            case 'DropDown':
                inputField = (
                    <DropDownInput value={textValue} isOpen={this.state.showDropDown}
                        isDisabledReadOnly={this.props.isDisabledReadOnly} placeholder={this.props.placeholder}
                        onChange={this.handleChangeRequest} onFocus={this.handleFocusRequest} 
                        onDropDownRequest={this.handleDropDownRequest} onHighlightChange={this.handleDropDownHighlightRequest} />
                );

                dropDown = (
                    <DropDownList items={this.props.items} value={this.state.value} isOpen={this.state.showDropDown} highlightedItem={this.state.highlightedItem}
                        onSelected={this.handleChangeRequest} onHighlightChange={this.handleDropDownHighlightRequest} />
                );
                break;
            case 'DatePicker':
                let calendarValue = (textValue === "") ? new Date() : textValue;

                inputField = (
                    <DateInput value={textValue} languageCode={this.props.languageCode} isOpen={this.state.showDropDown}
                        isDisabledReadOnly={this.props.isDisabledReadOnly} name={this.props.name}
                        onChange={this.handleChangeRequest} onFocus={this.handleFocusRequest} onDropDownRequest={this.handleDropDownRequest} />
                );

                dropDown = (
                    <Calendar isOpen={this.state.showDropDown} locale={this.props.languageCode} value={calendarValue} onChange={this.handleChangeRequest} />
                );
                break;
            case 'UserId':
            case 'Password':
            case 'Email':
                inputField = (
                    <LoginInput type={this.props.fieldType} value={textValue} maxLength={this.props.maxLength} name={this.props.name}
                        onChange={this.handleChangeRequest} onFocus={this.handleFocusRequest} onError={this.handleErrorRequest} />
                );

                frameStyle = [frameStyle, styles.reverse].join(' ');
                break;
            case 'VIN':
                inputField = <VIN value={textValue} name={this.props.name} onFocus={this.handleFocusRequest} onChange={this.handleChangeRequest} />
                break;
            default:
                inputField = (
                    <input type="text" className={styles.text} value={textValue} maxLength={this.props.maxLength} name={this.props.name}
                        placeholder={this.props.placeholder} readOnly={this.props.isDisabledReadOnly} required={this.props.isRequired}
                        onChange={this.handleChangeRequest} onFocus={this.handleFocusRequest} onBlur={this.handleFocusRequest} />
                );
                break;
        }

        if (!!this.props.children) {
            let infoGlyph = (this.state.showInfoBubble) ? infoBubbleOn : infoBubbleOff;

            if (this.state.showInfoBubble) {
                infoBubble = (
                    <div className={styles.infoBubble}>
                        {this.props.children}
                    </div>
                );
            }

            title = (
                <div className={styles.titleInfo}>
                    <span>
                        <span className={styles.title}>{this.props.title}</span>
                        {required}
                    </span>
                    <img className={styles.infoGlyph} src={infoGlyph} alt='' onClick={this.handleInfoRequest} />
                </div>
            )
        } else {
            title = (
                <React.Fragment>
                    <span className={styles.title}>{this.props.title}</span>
                    {required}
                </React.Fragment>
            );
        }

        let style = (this.props.fieldType === "VIN" ? styles.vin : styles.component);

        return (
            <label className={[style, this.props.styleName].join(' ')}>
                {infoBubble}
                {title}
                <div className={frameStyle}>
                    {inputField}
                </div>
                {dropDown}
            </label>
        );
    }
}

FormField.propTypes = {
    fieldType: PropTypes.oneOf(['Text', 'Number', 'Currency', 'UserId', 'Password', 'Email', 'DropDown', 'DatePicker', "VIN"]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape({ value: PropTypes.number, text: PropTypes.string }), PropTypes.instanceOf(Date)]),
    languageCode: PropTypes.string,
    currencyCode: PropTypes.string,
    items: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.arrayOf(PropTypes.string)
    ]),
    maxLength: PropTypes.number,
    maxValue: PropTypes.number,
    minValue: PropTypes.number,
    placeholder: PropTypes.string,
    isFormattedNumber: PropTypes.bool,
    isRequired: PropTypes.bool,
    inError: PropTypes.bool,
    isDisabledReadOnly: PropTypes.bool,
    title: PropTypes.string.isRequired,
    name: PropTypes.string,
    styleName: PropTypes.string,
    onChange: PropTypes.func
}

FormField.defaultProps = {
    fieldType: 'Text',
    value: "",
    onChange: () => {}
}

export default FormField;