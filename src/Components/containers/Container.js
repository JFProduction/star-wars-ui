import React, { Component } from 'react'
import { Utils } from '../../Utils';
import MainCard from './MainCard';
import ListCard from './ListCard'
import { icons, Height, Gender, Mass, Default, Films } from '../../assets/icons';
import SimpleCardSubInfo from '../presentations/SimpleCardSubInfo'
import Loading from '../presentations/Loading'
import PageNav from '../presentations/PageNav'
import MyModal from './MyModal';
import ViewType from '../presentations/ViewType'
import ListHeader from '../presentations/ListHeader';

class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      people: [],
      filteredPeople: [],
      next: "",
      prev: "",
      loading: false,
      page: 0,
      selectedPerson: {},
      layout: "card"
    }

    this.inputRef = React.createRef()
  }

  componentDidMount() {
    this.setState({loading: true})
    Utils.get(`https://swapi.co/api/people`)
      .then(resp => {
        this.setState({
          people: resp.results, 
          filteredPeople: resp.results,
          next: resp.next, 
          loading: false
        })
      })
      .catch(err => console.log(err))
  }

  search = e => {
    e.preventDefault()
    
    if (this.inputRef.current.value.trim().length > 0) {
      Utils.get(`https://swapi.co/api/people?search=${this.inputRef.current.value}`)
        .then(resp => {
          if (resp.count === 1) {
            this.setState({
              selectedPerson: resp.results[0]
            })
          }
        })
    }
  }

  handleCardClick = id => () => {
    let person = this.state.people.filter(p => p.name === id)[0]
    this.setState({selectedPerson: person})
  }

  clickNextPrev = which => _ => {
    let people = [...this.state.people]
    this.setState({loading: true})
    const url = which === 1 ? this.state.next : this.state.prev

    Utils.get(url)
      .then(resp => {
        people = resp.results
        this.setState({
          people, 
          next: resp.next, 
          prev: resp.previous, 
          loading: false,
          page: this.state.page + which
        })
      })
      .catch(err => console.log(err))
  }

  handleClose = () => {
    this.setState({selectedPerson: {}})
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
      prev,
      next,
      page,
      loading,
      selectedPerson,
      layout
    } = this.state

    return (
      <div
        style={{position: "relative"}}
      >
        <form
          onSubmit={this.search}
          style={{
            position: "absolute",
            top: -60,
            right: 10
          }}
        >
          <input
            ref={this.inputRef}
            style={{
              padding: 10,
              width: 150,
              borderRadius: 5,
              border: "1px solid #ddd",
              marginRight: 10
            }}
            placeholder="Global Search..."
          />
          <button
            className="btn"
            type="submit"
          >go</button>
        </form>
        <PageNav
          onClick={this.clickNextPrev}
          prev={prev}
          next={next}
          page={page}
          loading={loading}
        />
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
        layout === "list" && !loading && (
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
        this.state.people.length > 0 && !this.state.loading ?
          this.state.people.map((person, i) => {
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

export default Container