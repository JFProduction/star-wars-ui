import React from 'react'
import './CardStyles.css'

const SimpleCard = ({mainInfo, subInfo}) => {
  return (
    <div className="simple-card">
      <div className="main-info">
        {mainInfo}
      </div>
      <div className="sub-info">
        {subInfo}
      </div>
    </div>
  )
}

export default SimpleCard
