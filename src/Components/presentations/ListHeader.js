import React from 'react'
import PropTypes from 'prop-types'

const defaultStyle = {
  color: "#a4a8b8",
  fontSize: 12,
  width: 100,
  letterSpacing: 1.5,
  fontWeight: 500,
  display: "inline-block",
  textTransform: "uppercase"
}

const ListHeader = ({headerList, headerClick, headerStyle, children}) => (
  <div>
    <div
      style={headerStyle}
    >
    {
      headerList.map((header, i) =>
        header && (
          <div
            key={i}
            className={`${header.sort ? "clickable" : ""}`}
            style={{
              ...defaultStyle, 
              ...header.style
            }}
            onClick={headerClick}
            id={header.id}
          >
            {header.lbl}
          </div>
        )
      )
    }
    </div>
  {children}
  </div>
)

ListHeader.propTypes = {
  headerList: PropTypes.arrayOf(
    PropTypes.shape({
      lbl: PropTypes.string.isRequired,
      sort: PropTypes.bool,
      id: PropTypes.string,
      style: PropTypes.object
    })
  ).isRequired,
  headerClick: PropTypes.func,
  headerStyle: PropTypes.object
}

ListHeader.defaultProps = {
  headerList: [],
  headerClick: () => {},
  headerStyle: {}
}

export default ListHeader