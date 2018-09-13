import React from 'react'
import PropTypes from 'prop-types'

const Flag = ({placement, msg, className}) => (
  <div
    style={placement}
    className={className}
  >
    {<React.Fragment>{msg}</React.Fragment>}
  </div>
)

Flag.propTypes = {
  placement: PropTypes.object.isRequired,
  msg: PropTypes.string,
  className: PropTypes.string
}

export default Flag