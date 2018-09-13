import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './DropDownInput.module.css';
import chevronUp from './icon-chevron-up.svg';
import chevronDown from './icon-chevron-down.svg'

class DropDownInput extends React.Component {
    constructor() {
        super();

        this.isBackspace;
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleChange(e) {
        let value = (this.isBackspace) ? "" : e.target.value;
        this.props.onChange(value);
    }

    handleKeyDown(e) {
        this.isBackspace = (e.key === "Backspace");
        if ((e.key === 'ArrowDown') || (e.key === 'ArrowUp') || (e.key === 'Enter')) {
            this.props.onHighlightChange(e.key);
        }
    }

    render() {
        //let imageSource = (this.props.isOpen) ? chevronUp : "assets/images/icon-chevron-down.svg";

        return (
            <React.Fragment>
                <input className={styles.text}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    disabled={this.props.isDisabledReadOnly}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onFocus} />
                <img className={styles.button} src={this.props.isOpen ? chevronUp : chevronDown} onClick={this.props.onDropDownRequest} />
            </React.Fragment>
        );
    }
}

DropDownInput.propTypes = {
    value: PropTypes.string,
    isOpen: PropTypes.bool,
    isDisabledReadOnly: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onDropDownRequest: PropTypes.func
}

DropDownInput.defaultTypes = {
    value: ""
}

export default DropDownInput;