import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './Toggle.module.css';

import checkboxOn from './checkbox-small-checked.svg';
import checkboxOff from './checkbox-small-unchecked.svg';
import radioOn from './radio-checked.svg';
import radioOff from './radio-unchecked.svg';

export default class Toggle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: !!props.value
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState((prevState, props) => ({
            checked: !prevState.checked
        }));
    }

    render() {
        let control, imageSource,
            labelClass = (this.props.type === 'Button') ? styles.button : styles.label,
            inputType = (this.props.type === 'Radio') ? 'radio' : 'checkbox';

        switch (this.props.type) {
            case 'Switch':
                control = (<span className={styles.switch}></span>);
                break;
            case 'Checkbox':
                imageSource = (this.state.checked) ? checkboxOn : checkboxOff;
                control = (<img className={styles.image} src={imageSource} onClick={this.handleClick} />);
                break;
            case 'Radio':
                imageSource = (this.state.checked) ? radioOn : radioOff;
                control = (<img className={styles.image} src={imageSource} onClick={this.handleClick} />);
        }


        return (
            <label className={styles.container}>
                <input type={inputType} className={styles.hidden} />
                {control}
                <span className={labelClass}>{this.props.label}</span>
            </label>
        );
    }
}

Toggle.propTypes = {
    type: PropTypes.oneOf(['Checkbox', 'Radio', 'Button', 'Switch']),
    value: PropTypes.bool,
    label: PropTypes.string
}

Toggle.defaultProps = {
    type: 'Switch'
}

