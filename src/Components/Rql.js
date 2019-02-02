import React, { useEffect } from 'react'
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import {
  icons, 
  Height, 
  Gender, 
  Default, 
  Films
} from '../assets/icons'
import { gqlGetPeople } from '../sagas/actions'
import MainCard from './containers/MainCard'
import SimpleCardSubInfo from './presentations/SimpleCardSubInfo'

const Rql = ({getPeople, people}) =>  {
  useEffect(() => {
    getPeople()
  }, [])
  
  return (
    <React.Fragment>
    {
      people && people.map(person => (
        <MainCard
          key={person.name}
          handleCardClick={() => () => console.log(person.name)}
          size={263}
          mainText={person.name}
          secondaryText={person.birthYear}
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
                <div>
                  <div className="card-sub-icon-wrapper">
                    <img
                      title="Gender" 
                      src={Gender} 
                      alt="Gender"
                      style={{width: 30, marginTop: 10}}
                    />
                  </div>
                  {person.homeworld.name}
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
                  {person.filmConnection.films.length}
                </div>
              )
            }}
          />
        </MainCard>
      ))
    }
    </React.Fragment>
  )
}

const mapStateToProps = ({people}) => {
  return {people}
}

const mapDispatchToProps = dispatch => bindActionCreators({ 
  getPeople: () => gqlGetPeople(),
}, dispatch)

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Rql)