import React from 'react'
import PropTypes from 'prop-types'

const PageNav = ({onClick, prev, next, page, loading}) => (
  <div style={{ margin: 10, display: "flex", textAlign: "center" }}>
    <div style={{ width: 100+"%" }}>
    {
      prev && prev !== "" && !loading &&
        <button
          className="btn"
          onClick={onClick(-1)}
          title="Previous Page"
        >
          prev
        </button>
    }
    </div>
    <div style={{ width: 100+"%" }}>
    {
      !loading &&
        <span>Viewing Page {page}</span>
    }
    </div>
    <div style={{ width: 100+"%" }}>
    {
      next && next !== "" && !loading && 
        <button 
          className="btn"
          onClick={onClick(1)}
          title="Next Page"
        >
          next
        </button>
    }
    </div>
  </div>
)

PageNav.propTypes = {
  onClick: PropTypes.func.isRequired,
  prev: PropTypes.string,
  next: PropTypes.string,
  page: PropTypes.any.isRequired,
  loading: PropTypes.bool
}

PageNav.defaultProps = {
  onClick: () => {},
  prev: "",
  next: "",
  page: 0,
  loading: false
}

export default PageNav