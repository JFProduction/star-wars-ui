import React from 'react';
import PropTypes from 'prop-types';
import styles from './DecadeView.module.css';

import Tile from '../Tile';

import { getBeginOfYear, getEndOfYear } from '../shared/dates';
import { tileProps } from '../shared/propTypes';

const Year = ({ currentYear, point, ...otherProps }) => (
  <Tile
        {...otherProps}
        classes={[styles.year]}
        dateTime={`${point}T00:00:00.000`}
        maxDateTransform={getEndOfYear}
        minDateTransform={getBeginOfYear}
        view="decade"
        activeUnit={(point === currentYear)}
  >
    {point}
  </Tile>
);

Year.propTypes = {
  point: PropTypes.number.isRequired,
  ...tileProps,
  currentYear: PropTypes.number
};

export default Year;
