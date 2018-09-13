import React from 'react';
import PropTypes from 'prop-types';
import styles from './Calendar.module.css';

import { tileGroupProps } from './shared/propTypes';

const TileGroup = ({
  count,
  dateTransform,
  dateType,
  end,
  hover,
  offset,
  start,
  step,
  tile: Tile,
  value,
  valueType,
  ...tileProps
}) => {
  const tiles = [];
  for (let point = start; point <= end; point += step) {
    const date = dateTransform(point);

    tiles.push(
      <Tile
        date={date}
        point={point}
        key={point}
        {...tileProps}
      />
    );
  }

  return (
    <div className={styles.tileGroup}>
      {tiles}
    </div>
  );
};

TileGroup.propTypes = {
  ...tileGroupProps,
  activeStartDate: PropTypes.instanceOf(Date),
  count: PropTypes.number,
  dateTransform: PropTypes.func.isRequired,
  offset: PropTypes.number,
  tile: PropTypes.func.isRequired,
  step: PropTypes.number,
};

TileGroup.defaultProps = {
  count: 3,
  step: 1,
};

export default TileGroup;
