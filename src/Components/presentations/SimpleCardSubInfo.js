import React from 'react'
import PropTypes from 'prop-types'

const infoStyle = {
  marginTop: 16,
  width: "100%",
  fontSize: 14
}

const SimpleCardSubInfo = ({infoOne, infoTwo, infoThree}) => (
  <React.Fragment>
    <div name="cardInfo" 
      style={{
        ...infoOne.style,
        ...infoStyle
      }}
    >
      {infoOne.content}
    </div>
    <div name="cardInfo" 
      style={{
        ...infoOne.style,
        ...infoStyle
      }}
    >
      {infoTwo.content}
    </div>
    <div name="cardInfo" 
      style={{
        ...infoOne.style,
        ...infoStyle
      }}
    >
      {infoThree.content}
    </div>
  </React.Fragment>
)

const infoShape = {
  content: PropTypes.any, 
  style: PropTypes.object
}

SimpleCardSubInfo.propTypes = {
  infoOne: PropTypes.shape(infoShape),
  infoTwo: PropTypes.shape(infoShape),
  infoThree: PropTypes.shape(infoShape)
}

export default SimpleCardSubInfo