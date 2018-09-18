import React, { Component } from 'react'
import MainCard from './MainCard';
import ListCard from './ListCard'
import { icons, Height, Gender, Default, Films } from '../../assets/icons';
import SimpleCardSubInfo from '../presentations/SimpleCardSubInfo'
import Loading from '../presentations/Loading'
import PageNav from '../presentations/PageNav'
import MyModal from './MyModal';
import ViewType from '../presentations/ViewType'
import ListHeader from '../presentations/ListHeader';
import SearchStuff from '../presentations/SearchStuff'

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { requestApiData, requestPersonApi, removePerson } from "../../sagas/actions";

class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      layout: "card"
    }

    this.inputRef = React.createRef()
  }

  componentDidMount() {
    this.props.requestApi("https://swapi.co/api/people")
  }

  search = e => {
    e.preventDefault()
    
    if (this.inputRef.current.value.trim().length > 0) {
      this.props.requestPerson(`https://swapi.co/api/people?search=${this.inputRef.current.value}`)
    }
  }

  handleCardClick = id => () => {
    let person = this.props.data.results.filter(p => p.name === id)[0]
    this.setState({selectedPerson: person})
  }

  clickNextPrev = which => _ => {
    const url = which === 1 ? this.props.data.next : this.props.data.previous
    this.props.requestApi(url)
  }

  handleClose = () => {
    this.props.removeSelectedPerson()
  }

  handleClickViewType = ({target}) => {
    this.setState({layout: target.id})
  }

  getLayout = (person, i) => {
    const { layout } = this.state
    let color = person.gender === "female" ? "#ff5252" : "#59C3C3"

    if (layout === "card") {
      return (
        <MainCard
          size={263}
          mainText={person.name}
          secondaryText={person.birth_year}
          key={i}
          handleCardClick={this.handleCardClick}
          idInfo={{
            id: person.name
          }}
          imgSrc={icons[person.name] || Default}
        >
          <SimpleCardSubInfo
            infoOne={{
              content: (
                <div>
                  <div className="card-sub-icon-wrapper">
                    <img
                      title="Height" 
                      src={Height} 
                      alt="Height"
                      style={{width: 50}}
                    />
                  </div>
                  {person.height}
                </div>
              )
            }}
            infoTwo={{
              content: (
                <div
                  style={{
                    color
                  }}
                >
                  <div className="card-sub-icon-wrapper">
                    <img
                      title="Gender" 
                      src={Gender} 
                      alt="Gender"
                      style={{width: 30, marginTop: 10}}
                    />
                  </div>
                  {person.gender}
                </div>
              )
            }}
            infoThree={{
              content: (
                <div>
                  <div className="card-sub-icon-wrapper">
                    <img
                      title="films" 
                      src={Films} 
                      alt="films"
                      style={{width: 30, marginTop: 10}}
                    />
                  </div>
                  {person.films.length}
                </div>
              )
            }}
          />
        </MainCard>
      )
    } else if (layout === "list") {
      return (
        <ListCard
          key={i}
          info={person}
          small={true}
          handleCardClick={this.handleCardClick}
          imgSrc={icons[person.name] || Default}
          colInfo={[
            [person.name, `Films - ${person.films.length}`],
            [person.gender],
            [person.mass],
            [person.height]
          ]}
          idInfo={{
            id: person.name
          }}
        />
      )
    }
  }
  
  render() {
    const {
      layout
    } = this.state

    const { people, selectedPerson } = this.props

    return (
      <div
        style={{position: "relative"}}
      >
        <SearchStuff
          search={this.search}
          inputRef={this.inputRef}
        />
        {
          people &&
            <PageNav
              onClick={this.clickNextPrev}
              prev={people.previous}
              next={people.next}
              page={0}
              loading={false}
            />
        }
        <ViewType
          handleClick={this.handleClickViewType}
          view={layout}
          value={263}
        />
      {
        selectedPerson.films && 
          <MyModal
            handleClose={this.handleClose}
            open={!!selectedPerson.films}
            person={selectedPerson}
          />
      }
      {
        layout === "list" && (
          <ListHeader
            headerList={[
              {lbl: "name", style: {marginLeft: 255}},
              {lbl: "gender", style: {marginLeft: 117}},
              {lbl: "height", style: {marginLeft: 120}},
              {lbl: "mass", style: {marginLeft: 118}},
            ]}
            headerClick={this.handleClose}
            headerStyle={{marginBottom: 12}}
          />
        )
      }
      {
        people.results && people.results.length > 0 ?
          people.results.map((person, i) => {
            return (
              person.name && this.getLayout(person, i)
            )
          })
          : <Loading />
      }
      </div>
    )
  }
}

const mapStateToProps = ({DataReducer}) => {
  return DataReducer
}

const mapDispatchToProps = dispatch => bindActionCreators({ 
  requestApi: url => requestApiData(url),
  requestPerson: url => requestPersonApi(url),
  removeSelectedPerson: () => removePerson()
}, dispatch)

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Container)