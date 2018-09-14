import React from 'react'
import PropTypes from 'prop-types'

class ListCard extends React.Component {
  state = {
    showOps: false,
    disableEstBtn: false
  }

  render() {
    let {
      colInfo,
      imgSrc,
      handleCardClick,
      idInfo
    } = this.props

    let clickable = handleCardClick ? "clickable" : ""
    
    return (  
      <div
        className={`list-card ${clickable}`} 
        onClick={handleCardClick(idInfo.id)}
        style={{
          height: 84
        }}
      >
        {
          imgSrc && (
            <div className="listcardcol">
              <img 
                style={{
                  height: 55,
                  marginTop: -7,
                  marginLeft: 30
                }}
                src={imgSrc}
                alt="Main Img"
              />
            </div>
          )
        }
        {
          colInfo && (
            colInfo.map((list, i) => {
              return (
                list &&
                  <div 
                    className="listcardcol"
                    key={i}
                  >
                  {
                    list.map((info, j) => {
                      return (
                        info && !info.type ?
                          <div
                            key={j}
                            className="main-text"
                          >
                            { info }
                          </div>
                        : info && <React.Fragment key={j}>{info}</React.Fragment>
                      )
                    })
                  }
                  </div>
              )
            })
          )
        }
        { this.props.children }
      </div>
    )
  }
}

ListCard.propTypes = {
  missed: PropTypes.bool,
  colInfo: PropTypes.array.isRequired,
  imgSrc: PropTypes.string,
  handleCardClick: PropTypes.func,
  currStatus: PropTypes.string,
  idInfo: PropTypes.shape({
    id: PropTypes.any,
    roNum: PropTypes.any
  }),
  estSrc: PropTypes.string
}

export default ListCard