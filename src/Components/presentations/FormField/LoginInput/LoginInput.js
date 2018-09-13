import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './LoginInput.module.css';
import lockImage from './icon-locked.svg';
import userImage from './icon-user.svg';

class LoginInput extends React.Component {
    constructor() {
        super();

        this.handleBlur = this.handleBlur.bind(this);
    }

    handleBlur(e) {
        if (this.props.type === "Email") {
            let value = e.target.value.trim(),
                isValid = true;

            if (value !== "") {
                isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
            }
            this.props.onFocus(e, !isValid);
        } else {
            this.props.onFocus(e);
        }
    }

    render() {
        let inputType, image, placeHolder;
        
        switch (this.props.type) {
            case "Password":
                inputType = "password";
                placeHolder = this.props.type;
                image = (!!this.props.value) ? undefined : (<img className={styles.icon} src={lockImage} />);
                break;
            default:
                inputType = "text";
                placeHolder = (this.props.type === "Email") ? "Email Address" : "Username";
                image = (<img className={styles.icon} src={userImage} />);
                break;
        }

        return (
            <React.Fragment>
                <input className={styles.text} type={inputType} placeholder={placeHolder} value={this.props.value} onChange={this.props.onChange} onFocus={this.props.onFocus} onBlur={this.handleBlur} name={this.props.name} />
                {image}
            </React.Fragment>
        );
    }
}

LoginInput.propTypes = {
    type: PropTypes.oneOf(['UserId', 'Password', 'Email']).isRequired,
    value: PropTypes.string.isRequired,
    maxLength: PropTypes.number,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired
}

export default LoginInput;



