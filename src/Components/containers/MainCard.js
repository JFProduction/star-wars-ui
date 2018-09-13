import React from 'react'
import PropTypes from 'prop-types'
import Flag from '../presentations/Flag'

import "./CardStyles.css"

class MainCard extends React.Component {
  state = {
    showOps: false,
    widthHeight: {},
    disableEstBtn: false
  }

  componentDidMount() {
    this.getImgHeightAndWidth(this.props.imgSrc)
  }

  componentWillUnmount() {
    this.getImgHeightAndWidth = () => {}
  }

  getImgHeightAndWidth = src => {
    let img = new Image()
    img.src = src
  
    img.onload = () => {
      let height = img.height
      let width = img.width
  
      this.setState({
        widthHeight: {width, height}
      })
    }
  }

  render() {
    let {
      size, 
      handleCardClick,
      imgSrc,
      mainText,
      secondaryText,
      thirdText,
      fourthText,
      idInfo,
      estSrc,
      icons
    } = this.props

    let {
      widthHeight
    } = this.state

    let mainFs = size * .05
    let subFs = size * .04
    let clickable = handleCardClick ? "clickable" : ""
    let imgW = size - 160

    if (widthHeight.height === widthHeight.width) {
      imgW = size - 228 < 75 ? 75 : size - 228 > 200 ? 140 : size - 228
    }

    return (
      <div
        style={{
          width: size === 451 ? 540 : size,
          height: size,
          fontSize: mainFs
        }}
        className={`main-card ${clickable}`}
        onClick={handleCardClick(idInfo.id)}
      >
      {
        icons && (
          <div className="card-icon-wrapper">
            {icons}
          </div>
        )
      }
      {
        estSrc && ( 
          <Flag 
            placement={{
              top: 8, 
              left: -7,
              position: "relative",
              background: "#20415f",
              color: "#fff",
              padding: "0px 5px",
              borderRadius: 2,
              width: "4em"
            }}
            msg={estSrc}
          />
        )
      }
        <div
          style={{
            textAlign: "center",
            position: "absolute",
            top: 23,
            left: 0,
            right: 0
          }}
        >
          {
            imgSrc && ( 
              <img
                id="car-img"
                style={{
                  width: imgW,
                  animation: "200ms ease-in-out"
                }} 
                src={imgSrc}
                alt="img"
              />
            )
          }
          <div
            className="main-text"
            style={{
              fontSize: mainFs
            }}
          >
            { mainText }
          </div>
          <div
            className="secondary-text"
            style={{
              fontSize: subFs,
            }}
          >
            { secondaryText }
          </div>
          { thirdText && (
              <div
                style={{
                  fontSize: mainFs,
                  height: 50
                }}
              >
                { thirdText }
              </div>
            )
          }
          <div
            className="main-text"
            style={{
              fontSize: mainFs,
              marginTop: 15
            }}
          >
            { fourthText || "" }
          </div>
        </div>
        <div
          style={{
            background: "#F3F6F9",
            width: 100+"%",
            position: "absolute",
            height: 45 + Math.ceil(size * .07),
            bottom: 0,
            padding: "10px 0px",
            textAlign: "center",
            display: "flex",
            flexDirection: "row"
          }}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

MainCard.propTypes = {
  size: PropTypes.number, 
  handleCardClick: PropTypes.func,
  missed: PropTypes.bool, 
  imgSrc: PropTypes.string,
  mainText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string,
  thirdText: PropTypes.any,
  fourthText: PropTypes.string,
  quickOps: PropTypes.array,
  currStatus: PropTypes.string,
  idInfo: PropTypes.shape({
    id: PropTypes.any
  }),
  handleOpClick: PropTypes.func,
  view: PropTypes.object
}

export default MainCard