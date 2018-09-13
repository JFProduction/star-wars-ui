import React from 'react'
import Flag from '../Common/Flag'
import PropTypes from 'prop-types'
import CardOptions from '../Common/CardOptions'
import { WithApiContext } from '../../../Context'
import { InfoUtils, Utils } from '../../Common/Utils'
import { IconSchedEst } from '../../../assets/icons'

class ListCard extends React.Component {
  state = {
    showOps: false,
    disableEstBtn: false
  }

  // showHideQuickOp = e => {
  //   e.stopPropagation()
  //   this.setState({showOps: !this.state.showOps})
  // }

  // handleClick = id => e => {
  //   e.stopPropagation()
  //   this.props.handleOpClick(id, this.props.idInfo)
  //   this.setState({showOps: false})
  // }

  importEstimate = info => e => {
    this.setState({disableEstBtn: true})
    InfoUtils.importEstimate(info, this.props.value.urls.jobUrl, e)
      .then(resp => {
        if (resp.result) {
          this.props.removeIdFromData(info.claimGuid, "claimGuid")
          Utils.createNotification("Success", `ADXE Estimate was successfully Imported!`)
        } else if (!resp.result && resp.message) {
          this.setState({disableEstBtn: false})
          Utils.createNotification("Error", `ADXE Estimate was NOT Imported ${resp.message}`)
        } else {
          this.setState({disableEstBtn: false})
          Utils.createNotification("Error", "An Error happend when importing ADXE Estimate")
        }
      })
      .catch(err => {
        this.setState({disableEstBtn: false})
        Utils.createNotification("Error", err.message)
        console.log(err)
      })
  }

  getOptions = () => {
    const {
      view,
      quickOps,
      info,
      currStatus
    } = this.props

    const { showOps } = this.state

    if (quickOps && quickOps.length > 0) {
      return (
        <CardOptions 
          quickOps={quickOps}
          showHideQuickOp={this.showHideQuickOp}
          showOps={showOps}
          handleClick={this.handleClick}
          currStatus={currStatus}
        />
      )
    } else if (view.tabView === "estimates") {
      return !this.state.disableEstBtn && (
        <button 
          title="Import"
          className="card-button"     
          onClick={this.importEstimate(info)}         
        >
          <span className="glyphicon glyphicon-download"></span>
        </button>
      )
    } else if (view.screenView === "scheduling" && view.activeFilter === "schedule repairs") {
      return (
        <img 
          title="Schedule"
          className="card-button"
          style={{
            top: 7,
            width: 18
          }}
          onClick={this.props.handleRescheduleClick(info)}
          src={IconSchedEst}
        />
      )
    }

    return
  }

  render() {
    let {
      missed,
      colInfo,
      imgSrc,
      handleCardClick,
      idInfo,
      estSrc
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
          estSrc && ( 
            <Flag 
              placement={{ 
                top: 7, 
                left: -7, 
                position: "absolute",
                background: "#20415f",
                color: "#fff",
                padding: "0px 5px",
                borderRadius: 2
              }}
              msg={estSrc}
            />
          )
        }
        {
          missed && (
            <Flag
              small={this.props.small}
              placement={{ 
                top: 7, 
                left: -7, 
                position: "absolute"
              }}
            />
          )
        }
        {this.getOptions()}
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

export default WithApiContext(ListCard)