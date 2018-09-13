import React from 'react'
import PropTypes from 'prop-types'

import './ViewType.css'

import { 
  IconCardviewActive, 
  IconCardview, 
  IconListViewActive,
  IconGridviewActive,
  IconGridView,
  IconListView
} from '../../../assets/icons'

const ViewType = ({handleSlide, view, handleClick, value, children, showGrid}) => {
  let cardViewIcon = view === "card" ? IconCardviewActive : IconCardview
  let listViewIcon = view === "list" ? IconListViewActive : IconListView
  let gridViewIcon = view === "grid" ? IconGridviewActive : IconGridView

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
    {
      view === "card" && (
        <input 
          className="slider"
          step={94}
          type="range" 
          min={263} max={451} 
          value={value} 
          onChange={handleSlide} 
          style={{ 
            display: "inline-block", 
            width: 150, 
            marginRight: 20
          }}
        />
      )
    }
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
      {
        showGrid && (
          <img 
            id="grid"
            title="Grid View"
            onClick={handleClick} 
            className={`view-btn ${view === "grid" ? "active" : ""}`} 
            src={gridViewIcon}
          />
        )
      }
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