import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './VIN.module.css';

class VIN extends React.Component {
    constructor() {
        super();

        this.handleBlur = this.handleBlur.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleBlur(e) {
        let value = e.target.value.trim(),
            isValid = true,
            maybeValid = false;

        if (value !== "") {
            isValid = /[a-zA-Z0-9]{9}[a-zA-Z0-9-]{2}[0-9]{6}/g.test(value);
            if (!isValid) {
                maybeValid = ((value.length > 9) && (value.length < 18));
            }
        }

        this.props.onFocus(e, !(isValid || maybeValid));
    }

    handleKeyDown(e) {
        let isValid = /(?![iqIQ])[A-Za-z0-9]/.test(e.key),
            isDirectional = (e.key === 'ArrowLeft') || (e.key === 'ArrowRight'),
            isPassthrough = (e.key === 'Enter') || (e.key === 'Tab') || (e.key === 'Backspace') || (e.key === 'Delete') || isDirectional;

        if (isValid || isPassthrough) {
            //TODO: Finish validation
        } else {
            e.preventDefault();
        }
    }

    render() {
        const { name, onFocus, onChange, value } = this.props;

        return (
            <input
                value={value}
                className={styles.text}
                name={name}
                maxLength={17}
                onFocus={onFocus}
                onBlur={this.handleBlur}
                onKeyDown={this.handleKeyDown}
                onChange={onChange} />
        );
    }
}

VIN.propTypes = {
    name: PropTypes.string,
    onFocus: PropTypes.func,
    value: PropTypes.string,
    onChange: PropTypes.func
};

VIN.defaultProps = {
    onChange: () => {} ,
    value: ""
};

export default VIN;