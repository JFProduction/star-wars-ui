import React, { Component } from 'react'
import { Utils } from '../../Utils';
import MainCard from './MainCard';
import { icons, Height, Gender, Mass, Default } from '../../assets/icons';
import SimpleCardSubInfo from '../presentations/SimpleCardSubInfo'
import Loading from '../presentations/Loading'

class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      people: [],
      next: "",
      prev: "",
      loading: false,
      page: 0
    }
  }

  componentDidMount() {
    this.setState({loading: true})
    Utils.get(`https://swapi.co/api/people`)
      .then(resp => {
        this.setState({people: resp.results, next: resp.next, loading: false})
      })
      .catch(err => console.log(err))
  }

  handleCardClick = id => () => {
    let person = this.state.people.filter(p => p.name === id)[0]
    console.log(person)
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
  
  render() {
    return (
      <div>
        <div style={{ margin: 10, display: "flex", textAlign: "center" }}>
          <div style={{ width: 100+"%" }}>
          {
            this.state.prev !== "" && !this.state.loading &&
              <button
                class="btn"
                onClick={this.clickNextPrev(-1)}
                title="Next"
              >
                prev
              </button>
          }
          </div>
          <div
            style={{ width: 100+"%" }}
          >
          {
            !this.state.loading && this.state.page > 0 &&
              <span>Viewing Page {this.state.page}</span>
          }
          </div>
          <div
            style={{ width: 100+"%" }}
          >
          {
            this.state.next !== "" && !this.state.loading && 
              <button 
                class="btn"
                onClick={this.clickNextPrev(1)}
                title="Next"
              >
                next
              </button>
          }
          </div>
        </div>
      {
        this.state.people.length > 0 && !this.state.loading ?
          this.state.people.map((person, i) => {
            let color = person.gender === "female" ? "#ff5252" : "#59C3C3"
            return (
              person.name && (
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
                              title="Mass" 
                              src={Mass} 
                              alt="Mass"
                              style={{width: 30, marginTop: 10}}
                            />
                          </div>
                          {person.mass}
                        </div>
                      )
                    }}
                  />
                </MainCard>
              )
            )
          })
          : <Loading />
      }
      </div>
    )
  }
}

export default Container