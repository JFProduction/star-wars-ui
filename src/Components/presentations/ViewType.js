import React from 'react'
import PropTypes from 'prop-types'

import './ViewType.css'

import { 
  IconCardviewActive, 
  IconCardview, 
  IconListViewActive,
  IconListView
} from '../../assets/icons'

const ViewType = ({view, handleClick, children}) => {
  let cardViewIcon = view === "card" ? IconCardviewActive : IconCardview
  let listViewIcon = view === "list" ? IconListViewActive : IconListView

  return (
    <div
      style={{
      width: 100+"%",
      textAlign: "right",
      background: "transparent",
      position: "relative"
      }}
    >
    { children }
      <img 
        id="card"
        title="Card View"
        className={`view-btn ${view === "card" ? "active" : ""}`}
        src={cardViewIcon}
        onClick={handleClick}
      />
      <img 
        id="list"
        title="List View"
        onClick={handleClick} 
        className={`view-btn ${view === "list" ? "active" : ""}`} 
        src={listViewIcon}
      />
    </div>
  )
}

ViewType.propTypes = {
  handleSlide: PropTypes.func,
  view: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  value: PropTypes.number,
  showGrid: PropTypes.bool
}

export default ViewType