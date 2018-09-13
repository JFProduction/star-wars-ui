import React from 'react';
import PropTypes from 'prop-types';
import styles from './MonthView/MonthView.module.css';

import { tileProps } from './shared/propTypes';

const Tile = ({
  children,
  classes,
  date,
  dateTime,
  maxDate,
  maxDateTransform,
  minDate,
  minDateTransform,
  onClick,
  onMouseOver,
  style,
  tileClassName,
  tileContent,
  tileDisabled,
  view,
  activeUnit
}) => (
    <span className={classes}
        disabled={
        (minDate && minDateTransform(minDate) > date) ||
        (maxDate && maxDateTransform(maxDate) < date) ||
        (tileDisabled && tileDisabled({ date, view }))
        }
        onClick={onClick && (() => onClick(date))}
        onMouseOver={onMouseOver && (() => onMouseOver(date))}
        >
            <time dateTime={dateTime} className={(!!activeUnit) ? styles.active : styles.time}>
          {children}
        </time>
        {typeof tileContent === 'function' ? tileContent({ date, view }) : tileContent}
    </span>
);

Tile.propTypes = {
  ...tileProps,
  children: PropTypes.node.isRequired,
  dateTime: PropTypes.string.isRequired,
  maxDateTransform: PropTypes.func.isRequired,
  minDateTransform: PropTypes.func.isRequired,
  activeUnit: PropTypes.bool
};

export default Tile;
