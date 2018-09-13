import React from 'react'
import PropTypes from 'prop-types'

const wrapperStyle = { 
  height: "100%", 
  width: "100%",
  marginTop: 15, 
  textTransform: "capitalize !important"    
}

const MoreCardSubInfo = ({infoOne, infoTwo, infoThree, infoFour, fontSize}) => (
  <React.Fragment>
    <div style={{...wrapperStyle, fontSize}}>
      <div style={{marginBottom: 15}} name="cardInfo">{infoOne}</div>
      <div name="cardInfo">{infoTwo}</div>
    </div>
    <div style={{...wrapperStyle, fontSize}}>
      <div style={{marginBottom: 15}} name="cardInfo">{infoThree}</div>
      <div name="cardInfo">{infoFour}</div>
    </div>
  </React.Fragment>
)

MoreCardSubInfo.propTypes = {
  infoOne: PropTypes.any.isRequired,
  infoTwo: PropTypes.any.isRequired,
  infoThree: PropTypes.any.isRequired,
  infoFour: PropTypes.any.isRequired,
  fontSize: PropTypes.number
}

export default MoreCardSubInfo